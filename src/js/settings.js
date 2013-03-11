/**
 * Settings Javascript
 * @author: Karthik VJ
 **/

var Settings = function()
{
    var thisObject = this;

    this.hostName;
    this.port;
    var popout = 0;

    this.init = function()
    {
        var loc = window.location.toString();
        popout = Utils.findPropertyFromString(loc, "popout");
        if(popout == undefined)
        {
            popout = 0;
        }

        $("#" + SettingsElementID.BACK_BUTTON).click(function(event)
        {
            window.location.href = "remote.html?popout=" + popout;
            event.preventDefault();
        });

        $("#" + SettingsElementID.SAVE_BUTTON).click(function(event)
        {
            thisObject.hostname = thisObject.getIPValue();
            thisObject.port = thisObject.getPortValue();
            if(thisObject.port == "")
            {
                thisObject.port = PORT_DEFAULT;
            }

            if(thisObject.hostname == "" || thisObject.port == "")
            {
                console.log("enter details");
                messages.showMissingData();
                return;
            }

            messages.showWaitMessage();
            //localData.storeData(thisObject.hostname, thisObject.port);
            socket.connect(thisObject.hostname, thisObject.port, thisObject);
            event.preventDefault();
        });

        localData.getHostName(thisObject.setIPValue);
        localData.getPort(thisObject.setPortValue);


    };

    this.localDataChanged = function(host, port)
    {
        console.log("local data changed, " + host + ", " + port);

        thisObject.setIPValue(host);
        thisObject.setPortValue(port);
    };

    this.getIPValue = function()
    {
        var value = document.getElementById(SettingsElementID.IP_TEXTFIELD).value;
        return value;
    };

    this.setIPValue = function(value)
    {
        if(value == undefined)
            return;

        var host = document.getElementById(SettingsElementID.IP_TEXTFIELD);
        host.value = value;
    };

    this.getPortValue = function()
    {
        var value = document.getElementById(SettingsElementID.PORT_TEXTFIELD).value;
        return value;
    };

    this.setPortValue = function(value)
    {
        if(value == undefined || value == "")
            return;

        var port = document.getElementById(SettingsElementID.PORT_TEXTFIELD);
        port.value = value;
    };

    this.onConnect = function()
    {
        messages.showConnectionSuccess();

        // store to local data
        localData.storeData(thisObject.hostname, thisObject.port);

    };

    this.onClose = function()
    {
        messages.showConnectionFail();
    };
};

var Messages = function()
{
    var thisObject = this;

    this.showConnectionSuccess = function()
    {
        thisObject.hideAll();
        var msg = document.getElementById(SettingsElementID.MESSAGE_SUCCESS);
        msg.style.display = "block";
    };

    this.showMissingData = function()
    {
        thisObject.hideAll();
        var msg = document.getElementById(SettingsElementID.MISSING_DATA);
        msg.style.display = "block";
    };

    this.showConnectionFail = function()
    {
        thisObject.hideAll();
        var msg = document.getElementById(SettingsElementID.MESSAGE_FAIL);
        msg.style.display = "block";
    };

    this.showWaitMessage = function()
    {
        thisObject.hideAll();
        var msg = document.getElementById(SettingsElementID.MESSAGE_WAIT);
        msg.style.display = "block";

    };


    this.hideAll = function()
    {
        var msg = document.getElementById(SettingsElementID.MESSAGE_SUCCESS);
        msg.style.display = "none";

        msg = document.getElementById(SettingsElementID.MISSING_DATA);
        msg.style.display = "none";

        msg = document.getElementById(SettingsElementID.MESSAGE_FAIL);
        msg.style.display = "none";

        msg = document.getElementById(SettingsElementID.MESSAGE_WAIT);
        msg.style.display = "none";
    };
};


var settings = new Settings();
var messages = new Messages();
var socket = new XBMCSocket();
var localData = new LocalData(settings);


////////////////

window.addEventListener("load", loadComplete, false);

function loadComplete()
{
    if(settings)
    {
        settings.init();
    }

}