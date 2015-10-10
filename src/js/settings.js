/**
 * Settings Javascript
 * @author: Karthik VJ
 **/

if (ENABLE_CONSOLE == false)
{
    var console = console || {};
    console.log = function() {};
}

var Settings = function()
{
    var DEFAULT_DISPLAY_NAME = "Living Room TV";
    var DEFAULT_PORT = "9090";

    var thisObject = this;

    var popout = 0;

    var displayNameTextField;
    var hostTextfield;
    var portTextfield;

    var mediaListJSON = {};

    var connectionDetails = {"host" : null, "port": DEFAULT_PORT};

    this.init = function()
    {
        var loc = window.location.toString();
        //console.log("loc, " + loc);
        popout = Utils.findPropertyFromString(loc, "popout");
        if (popout == undefined)
        {
            popout = 0;
        }

        thisObject.bindFastClick($("#" + SettingsElementID.BACK_BUTTON), function(event)
        {
            window.location.href = encodeURI("remote.html?popout=" + popout + "&removecheck=1");
            //event.preventDefault();
        });

        thisObject.bindFastClick($("#" + SettingsElementID.DELTE_BUTTON), function(event)
        {
            console.log("delete this media center data!");
            messages.hideAll();
            var mediaData = thisObject.getMediaDataFromDisplayName(displayNameTextField.value);
            if(mediaData)
            {
                localData.deleteDataFromMediaList(mediaData);
                if(connectionDetails.host == mediaData.host && connectionDetails.port == mediaData.port)
                {
                    localData.deleteHostAndPort();
                }

                // clear settings TF
                displayNameTextField.value = "";
                hostTextfield.value = "";
                portTextfield.value = "";

                thisObject.updateInitialTextFields();

            }
            else
            {
                console.log("no media selected, cannot delete!");
            }

        });

        thisObject.bindFastClick($("#" + SettingsElementID.SAVE_BUTTON), function(event)
        {
            var hostname = thisObject.getIPValue();
            var port = thisObject.getPortValue();
            var displayName = thisObject.getDisplayNameValue();

            if (port == "")
            {
                port = DEFAULT_PORT;
            }

            if (hostname == "" || port == "")
            {
                console.log("enter details");
                messages.showMissingData();
                return;
            }

            messages.showWaitMessage();
            socket.connect(hostname, port, thisObject);


        });

        displayNameTextField = document.getElementById(SettingsElementID.DISPLAY_NAME_TEXTFIELD);
        hostTextfield = document.getElementById(SettingsElementID.IP_TEXTFIELD);
        portTextfield = document.getElementById(SettingsElementID.PORT_TEXTFIELD);

        $(displayNameTextField).bind("input", function (e) {

            //console.log(displayNameTextField.value);
            var mediaData = thisObject.getMediaDataFromDisplayName(displayNameTextField.value);
            if(mediaData)
            {
                messages.hideAll();
                console.log(mediaData);
                hostTextfield.value = mediaData.host;
                portTextfield.value = mediaData.port;
            }

        });


        thisObject.updateInitialTextFields();
    };

    this.getMediaDataFromDisplayName = function(displayName)
    {
        if(!mediaListJSON["mediaList"])
        {
            return null;
        }

        var mediaList = mediaListJSON["mediaList"];
        for(var i = 0; i < mediaList.length; i++)
        {
            if(displayName == mediaList[i].displayName)
            {
                return mediaList[i];
            }
        }
        return null;
    };

    this.updateInitialTextFields = function()
    {
        localData.getHostName(thisObject.setIPValue);
        localData.getPort(thisObject.setPortValue);

        localData.getMediaList(thisObject.setDisplayNameList);
    };

    var onTextFieldFocus = function(event)
    {
        var inputElement = event.target;
        inputElement.value = "";
    };

    this.bindFastClick = function(element, callback)
    {
        $(element).bind("touchend click", function(event)
        {
            event.stopPropagation();
            event.preventDefault();

            if (event.handled !== true) {

                callback();

                event.handled = true;
            } else {
                return false;
            }

        });
    };

    this.offFastClick = function(element)
    {
        $(element).off("touchend click");
    };

    this.localDataChanged = function(host, port)
    {
        console.log("local data changed, " + host + ", " + port);

        thisObject.setIPValue(host);
        thisObject.setPortValue(port);
    };

    this.getIPValue = function()
    {
        return document.getElementById(SettingsElementID.IP_TEXTFIELD).value;
    };

    this.setIPValue = function(value)
    {
        if (value == undefined)
            return;

        var host = document.getElementById(SettingsElementID.IP_TEXTFIELD);
        host.value = value;
        connectionDetails.host = value;
    };

    this.getPortValue = function()
    {
        return document.getElementById(SettingsElementID.PORT_TEXTFIELD).value || DEFAULT_PORT;
    };

    this.getDisplayNameValue = function()
    {
        return displayNameTextField.value || DEFAULT_DISPLAY_NAME;
    };

    this.setPortValue = function(value)
    {
        if (value == undefined || value == "")
            return;

        var port = document.getElementById(SettingsElementID.PORT_TEXTFIELD);
        port.value = value;

        connectionDetails.port = value;
    };

    this.setDisplayNameList = function(value)
    {
        if (value == undefined || value == "")
            return;

        mediaListJSON = JSON.parse(value);

        console.log(mediaListJSON);

        var dataList = document.getElementById("displayNameList");
        var mediaList = mediaListJSON.mediaList;
        var options = "";

        var host = thisObject.getIPValue();
        var port = thisObject.getPortValue();
        //var displayName = thisObject.getDisplayNameValue();
        var selectedDisplayName = "";

        for(var i = 0; i < mediaList.length; i++)
        {
            options += '<option value="' + mediaList[i].displayName + '" />';
            if(mediaList[i].host == host && mediaList[i].port == port)
            {
                selectedDisplayName = mediaList[i].displayName;
            }
        }

        dataList.innerHTML = options;
        if(selectedDisplayName != "")
        {
            displayNameTextField.value = selectedDisplayName;
        }
    };

    this.onConnect = function()
    {
        var hostname = thisObject.getIPValue();
        var port = thisObject.getPortValue();
        var displayName = thisObject.getDisplayNameValue();

        console.log("socket success!");
        messages.showConnectionSuccess();

        // store to local data
        localData.storeData(hostname, port);
        localData.storeMediaList(displayName, hostname, port);

        thisObject.updateInitialTextFields();

    };

    this.onMessage = function(data)
    {
        console.log("settings, onMessage " + data);
    };

    this.onClose = function(socketClosedWantedly)
    {
        if(socketClosedWantedly == false)
        {
            console.log("socket close!");
            messages.showConnectionFail();
        }

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
        var portMsg = document.getElementById(SettingsElementID.MESSAGE_PORT_ERROR);
        var portValue = settings.getPortValue();

        portMsg.style.display = "none";

        if (portValue == "80" || portValue == "8080")
        {
            var portMessageText = PORT_ERROR_MESSAGE;
            portMessageText = portMessageText.replace("$port", settings.getPortValue());

            portMsg.textContent = portMessageText;
            portMsg.style.display = "block";
        }


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
window.addEventListener("contextmenu", onContextMenu, false);

function onContextMenu(e)
{
    e.preventDefault();     // cancel default menu
}

function loadComplete()
{
    if (settings)
    {
        settings.init();
    }

}
