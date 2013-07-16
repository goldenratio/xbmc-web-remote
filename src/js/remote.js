/**
 * @author: Karthik VJ
 */

if(ENABLE_CONSOLE == false)
{
    var console = console || {};
    console.log = function() {};
}


var Keyboard = function()
{
	this.isDown = false;
	var thisObject = this;
	
	this.init = function()
	{
		document.onkeydown = onKeyDown;
		document.onkeyup = onKeyUp;
		
	};
	
	var onKeyUp = function(event)
	{
		console.log("key up");
		thisObject.isDown = false;
        $("#rightArrow").removeClass("right_arrow_active");
        $("#selectButton").removeClass("select_active");
        $("#leftArrow").removeClass("left_arrow_active");

        $("#upArrow").removeClass("up_arrow_active");
        $("#downArrow").removeClass("down_arrow_active");

        event.preventDefault();

	}

	var onKeyDown = function(event)
	{
        if(thisObject.isDown)
		{
            console.log("key is down!");
			return;
		}

        thisObject.isDown = true;
		console.log("key code = " + event.keyCode + ", ctrl = " + event.ctrlKey);
		var isCtrl = event.ctrlKey;

		var params;
		switch(event.keyCode)
		{
            case Key.CTRL:
                thisObject.isDown = false;
                break;
			case Key.SPACE:
				params = { playerid: 1 };
				xbmcSocket.send("Player.PlayPause", params);
                $("#pause").toggleClass("#pause active");
				break;

            case Key.PLAY:
                xbmcSocket.send("Player.GetActivePlayers", null, function(data)
                {
                    var obj = JSON.parse(data);
                    console.log("done");
                    if(obj.result.length > 0)
                    {
                        // in player.. something is playing
                        var params = { playerid: 1 };
                        xbmcSocket.send("Player.PlayPause", params);

                    }
                    else
                    {
                        console.log("just select");
                        xbmcSocket.send("Input.Select");
                    }

                });
                break;
			case Key.INFO:
				xbmcSocket.send("Input.Info");
				break;

            case Key.CONTEXT:
                if(isCtrl)
                {
                    xbmcSocket.send("Input.ContextMenu");
                    event.preventDefault();
                }
                break;

            case Key.ENTER:
                // select
                $("#selectButton").addClass("select_active");
                xbmcSocket.send("Input.Select");
                break;

            case Key.BACKSPACE:
            case Key.ESCAPE:
                // back
                xbmcSocket.send("Input.Back");
                break;

            case Key.STOP:
                params = { playerid: 1 };
                xbmcSocket.send("Player.Stop", params);
                break;

            case Key.MUTE:
                params = { action: "mute" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case Key.MENU:
                xbmcSocket.send("Input.Home");
                break;

            case Key.OSD:
                xbmcSocket.send("Input.ShowOSD");
                break;

			case Key.LEFT:
				// left arrow
                thisObject.isDown = false;
				if(isCtrl)
				{
					// seek backward
                    params = { action: "stepback" };
                    xbmcSocket.send("Input.ExecuteAction", params);
				}
                else
                {
                    $("#leftArrow").addClass("left_arrow_active");
                    xbmcSocket.send("Input.Left");
                }
				break;

            case Key.RIGHT:
                thisObject.isDown = false;
                if(isCtrl)
                {
                    // seek forward
                    params = { action: "stepforward" };
                    xbmcSocket.send("Input.ExecuteAction", params);
                }
                else
                {
                    $("#rightArrow").addClass("right_arrow_active");
                    xbmcSocket.send("Input.Right");
                }
                break;

            case Key.UP:
                thisObject.isDown = false;
                if(isCtrl)
                {
                    params = { action: "volumeup" };
                    xbmcSocket.send("Input.ExecuteAction", params);
                }
                else
                {
                    $("#upArrow").addClass("up_arrow_active");
                    xbmcSocket.send("Input.Up");
                }
                break;

            case Key.DOWN:
                thisObject.isDown = false;
                if(isCtrl)
                {
                    params = { action: "volumedown" };
                    xbmcSocket.send("Input.ExecuteAction", params);
                }
                else
                {
                    $("#downArrow").addClass("down_arrow_active");
                    xbmcSocket.send("Input.Down");
                }
                break;
		}

		event.preventDefault();
	};

    /**
     * remove listeners
     */
    this.dispose = function()
    {
        document.onkeydown = null;
        document.onkeyup = null;
    };
	
};

var Remote = function()
{
    var thisObject = this;

    /**
     * Invoked when server is connected, called from <code>xbmcSocket</code>
     */
    this.onConnect = function()
    {
        console.log("connected");
        keyboard.init();
        thisObject.init();
    };

    this.onMessage = function(data)
    {
        console.log("remote, onMessage " + data);

        var paramsData = { type : "", value: ""};
        if(data.params)
        {
            paramsData = data.params.data;
        }

        var method = data.method;
        console.log("method " + method);
        switch(method)
        {
            case "Input.OnInputRequested":
                if(paramsData.type == "keyboard" || paramsData.type == "ip")
                {
                    thisObject.showSendTextPanel(paramsData.value);
                }
                else if(paramsData.type == "password")
                {
                    thisObject.showSendPasswordPanel(paramsData.value);
                }
                break;
        }
    };

    this.init = function()
    {
        $("#info").click(function(event)
        {
            xbmcSocket.send("Input.Info");
            event.preventDefault();
        });

        $("#osd").click(function(event)
        {
            xbmcSocket.send("Input.ShowOSD");
            event.preventDefault();
        });

        $("#back").click(function(event)
        {
            xbmcSocket.send("Input.Back");
            event.preventDefault();
        });

        $("#menu").click(function(event)
        {
            xbmcSocket.send("Input.Home");
            event.preventDefault();
        });

        $("#selectButton").click(function(event)
        {
            xbmcSocket.send("Input.Select");
            event.preventDefault();
        });

        $("#upArrow").click(function(event)
        {
            xbmcSocket.send("Input.Up");
            event.preventDefault();
        });

        $("#downArrow").click(function(event)
        {
            xbmcSocket.send("Input.Down");
            event.preventDefault();
        });

        $("#leftArrow").click(function(event)
        {
            xbmcSocket.send("Input.Left");
            event.preventDefault();
        });

        $("#rightArrow").click(function(event)
        {
            xbmcSocket.send("Input.Right");
            event.preventDefault();
        });

        $("#pause").click(function(event)
        {
            var params = { playerid: 1 };
            xbmcSocket.send("Player.PlayPause", params);
            event.preventDefault();
        });

        $("#stop").click(function(event)
        {
            var params = { playerid: 1 };
            xbmcSocket.send("Player.Stop", params);
            event.preventDefault();
        });

        $("#play").click(function(event)
        {
            xbmcSocket.send("Player.GetActivePlayers", null, function(data)
            {
                var obj = JSON.parse(data);
                console.log("done");
                if(obj.result.length > 0)
                {
                    // in player.. something is playing
                    var params = { playerid: 1 };
                    xbmcSocket.send("Player.PlayPause", params);

                }
                else
                {
                    console.log("just select");
                    xbmcSocket.send("Input.Select");
                }

            });
            event.preventDefault();
        });

        $("#backward").click(function(event)
        {
            var params = { action: "stepback" };
            xbmcSocket.send("Input.ExecuteAction", params);
            event.preventDefault();
        });

        $("#forward").click(function(event)
        {
            var params = { action: "stepforward" };
            xbmcSocket.send("Input.ExecuteAction", params);
            event.preventDefault();
        });

        $("#prevTrack").click(function(event)
        {
            var params = { action: "skipprevious" };
            xbmcSocket.send("Input.ExecuteAction", params);
            event.preventDefault();
        });

        $("#nextTrack").click(function(event)
        {
            var params = { action: "skipnext" };
            xbmcSocket.send("Input.ExecuteAction", params);
            event.preventDefault();
        });

        $("#power").click(function(event)
        {
            xbmcSocket.send("System.Shutdown");
            event.preventDefault();
        });

        $("#mute").click(function(event)
        {
            params = { action: "mute" };
            xbmcSocket.send("Input.ExecuteAction", params);
            event.preventDefault();
        });

        $("#context_menu").click(function(event)
        {
            xbmcSocket.send("Input.ContextMenu");
            event.preventDefault();
        });

        $("#update_library").click(function(event)
        {
            xbmcSocket.send("VideoLibrary.Scan");
            event.preventDefault();
        });

        $("#sendTextButton").click(function(event)
        {
            thisObject.showSendTextPanel();
            event.preventDefault();
        });

        $("#backDataButton, #backPasswordDataButton").click(function(event)
        {
            thisObject.hideSendPanel();

            params = { action: "close" };
            xbmcSocket.send("Input.ExecuteAction", params);

            event.preventDefault();
        });

        $("#sendTextDataButton").click(function(event)
        {
            thisObject.hideSendPanel();

            var sendText = document.getElementById("sendTeatArea").value;

            params = { text: sendText, done: true };
            xbmcSocket.send("Input.SendText", params);

            event.preventDefault();
        });

        $("#sendPasswordDataButton").click(function(event)
        {
            thisObject.hideSendPanel();

            var sendPassword = document.getElementById("sendPasswordInput").value;

            params = { text: sendPassword, done: true };
            xbmcSocket.send("Input.SendText", params);

            event.preventDefault();
        });



        $("#power").addClass("power_on");
        $("#power").removeClass("power_off");

        window.onbeforeunload = thisObject.closeSocket;
    };

    this.showSendTextPanel = function(value)
    {
        $("#main, #footer").fadeTo("fast", 0.1).promise().done(function()
        {
            $("#send_text_panel").show();
            var sendTextArea = document.getElementById("sendTeatArea");
            sendTextArea.value = "";
            if(value != undefined)
            {
                console.log("send text, " + value);
                sendTextArea.value = value;
            }
            sendTextArea.focus();
            keyboard.dispose();
        });
    };

    this.showSendPasswordPanel = function(value)
    {
        $("#main, #footer").fadeTo("fast", 0.1).promise().done(function()
        {
            $("#send_pwd_panel").show();
            var passwordInput = document.getElementById("sendPasswordInput");
            passwordInput.value = "";
            if(value != undefined)
            {
                console.log("password, " + value);
                passwordInput.value = value;
            }
            passwordInput.focus();
            keyboard.dispose();
        });
    };

    this.hideSendPanel = function()
    {
        $("#send_text_panel").hide();
        $("#send_pwd_panel").hide();
        $("#main, #footer").fadeTo("fast", 1);
        keyboard.init();
    };

    this.localDataChanged = function(host, port)
    {
        console.log("local data changed, " + host + ", " + port);
        if(xbmcSocket)
        {
            xbmcSocket.disconnect();
            xbmcSocket.connect(host, port, remote);
        }
        else
        {
            console.log("socket do not exist!");
        }

    };

    this.dispose = function()
    {
        console.log("dispose");

        $("#info").off("click");

        $("#osd").off("click");

        $("#back").off("click");

        $("#menu").off("click");

        $("#selectButton").off("click");

        $("#upArrow").off("click");

        $("#downArrow").off("click");

        $("#leftArrow").off("click");

        $("#rightArrow").off("click");

        $("#pause").off("click");

        $("#stop").off("click");

        $("#play").off("click");

        $("#backward").off("click");

        $("#forward").off("click");

        $("#prevTrack").off("click");

        $("#nextTrack").off("click");

        $("#power").off("click");

        $("#mute").off("click");

        $("#context_menu").off("click");

        $("#update_library").off("click");

        $("#sendTextButton").off("click");

        $("#backDataButton").off("click");

        $("#sendTextDataButton").off("click");

        //$("#popOut").off("click");

    };

    this.closeSocket = function()
    {
        xbmcSocket.disconnect();
    };

    /**
     * Invoked when web socket is closed, called from <code>xbmcSocket</code>
     */
    this.onClose = function()
    {
        keyboard.dispose();
        thisObject.dispose();

        $("#power").addClass("power_off");
        $("#power").removeClass("power_on");

        setTimeout(connect, RECONNECT_TIME_DELAY);
    };

};

var remote = new Remote();
var keyboard = new Keyboard();
var xbmcSocket = new XBMCSocket();
var localData = new LocalData(remote);
var popout = 0;
var background;


////////////////

window.addEventListener("load", loadComplete, false);
window.addEventListener("contextmenu", onContextMenu, false);

function onContextMenu(e)
{
    e.preventDefault();     // cancel default menu
}

function loadComplete()
{
    if(chrome.extension)
    {
        background = chrome.extension.getBackgroundPage();
    }


    $("#settings").click(function(event)
    {
        window.location.href = "settings.html?popout=" + popout;
        event.preventDefault();
    });

    $("#popOut").hide();

    if(ALLOW_POPOUT)
    {
        var loc = window.location.toString();
        console.log("loc, " + loc);
        popout = Utils.findPropertyFromString(loc, "popout");

        if(popout == undefined)
        {
            popout = 0;
        }

        if(popout == 0)
        {
            $("#popOut").show();
            $("#popOut").click(showPopoutWindow);

            var contentDiv = document.getElementById("content");
            contentDiv.draggable = true;
            contentDiv.addEventListener("dragend", onContentDragged, false);
        }

    }

    // connect webscoket
    connect();

}

function showPopoutWindow(event)
{
    if(background)
    {
        background.handelPopup();
    }

    window.close();

    if(event) {
        event.preventDefault();
    }
}

function onContentDragged(e)
{
    showPopoutWindow(e);
}

function connect()
{
    if(xbmcSocket)
    {
        localData.getHostName(function(hostName)
        {
            var loc = window.location.toString();
            var removeCheck = Utils.findPropertyFromString(loc, "removecheck");
            console.log("hostname, " + hostName);
            if(hostName)
            {
                localData.getPort(function(port)
                {

                    console.log("port, " + port);
                    if(port)
                    {
                        xbmcSocket.connect(hostName, port, remote);
                    }
                    else
                    {
                        if(removeCheck != 1)
                        {
                            window.location.href = "settings.html?popout=" + popout;
                        }
                    }

                });

            }
            else
            {
                if(removeCheck != 1)
                {
                    window.location.href = "settings.html?popout=" + popout;
                }

            }

        });
        //xbmcSocket.connect("192.168.1.74", 9090, remote);
    }
}