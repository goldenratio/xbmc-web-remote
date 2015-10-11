/**
 * @author: Karthik VJ
 */

if (ENABLE_CONSOLE == false)
{
    var console = console || {};
    console.log = function() {};
}


var Keyboard = function()
{
    this.isDown = false;

    /**
     * @type {Keyboard}
     */
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

    };

    var onKeyDown = function(event)
    {
        if (thisObject.isDown)
        {
            console.log("key is down!");
            return;
        }

        thisObject.isDown = true;
        var isValidKey = false;

        console.log("key code = " + event.keyCode + ", ctrl = " + event.ctrlKey);
        var isCtrl = event.ctrlKey || event.metaKey;

        if (isCtrl == true)
        {
            isValidKey = true;
            thisObject.isDown = false;
        }

        switch(event.keyCode)
        {
            case Key.SPACE:
                isValidKey = true;
                remote.sendRequest(RequestType.PAUSE);
                $("#pause").toggleClass("#pause active");
                break;

            case Key.PLAY:
                isValidKey = true;
                remote.sendRequest(RequestType.PLAY);
                break;
            case Key.INFO:
                isValidKey = true;
                remote.sendRequest(RequestType.INFO);
                break;

            case Key.CONTEXT:
                isValidKey = true;
                if(isCtrl)
                {
                    remote.sendRequest(RequestType.CONTEXT_MENU);
                    event.preventDefault();
                }
                break;

            case Key.ENTER:
                // select
                isValidKey = true;
                $("#selectButton").addClass("select_active");
                remote.sendRequest(RequestType.SELECT);
                break;

            case Key.BACKSPACE:
                // back
                isValidKey = true;
                remote.sendRequest(RequestType.BACK);
                break;

            case Key.ESCAPE:
                // back
                if (popout == 1 && window["chrome"] && window["chrome"].extension)
                {
                    remote.sendRequest(RequestType.BACK);
                }
                break;

            case Key.STOP:
            case Key.STOP_DEP:
                isValidKey = true;
                remote.sendRequest(RequestType.STOP);
                break;

            case Key.MUTE:
                isValidKey = true;
                remote.sendRequest(RequestType.MUTE);
                break;

            case Key.MENU:
                isValidKey = true;
                remote.sendRequest(RequestType.HOME);
                break;

            case Key.OSD:
                isValidKey = true;
                remote.sendRequest(RequestType.SHOW_OSD);
                break;

            case Key.LEFT:
                // left arrow
                isValidKey = true;
                thisObject.isDown = false;
                if(isCtrl)
                {
                    // seek backward
                    remote.sendRequest(RequestType.SEEK_BACK);
                }
                else
                {
                    $("#leftArrow").addClass("left_arrow_active");
                    remote.sendRequest(RequestType.MOVE_LEFT);
                }
                break;

            case Key.RIGHT:
                isValidKey = true;
                thisObject.isDown = false;
                if (isCtrl)
                {
                    // seek forward
                    remote.sendRequest(RequestType.SEEK_FRONT);
                }
                else
                {
                    $("#rightArrow").addClass("right_arrow_active");
                    remote.sendRequest(RequestType.MOVE_RIGHT);
                }
                break;

            case Key.UP:
                isValidKey = true;
                thisObject.isDown = false;
                if (isCtrl)
                {
                    remote.sendRequest(RequestType.VOLUME_UP);
                }
                else
                {
                    $("#upArrow").addClass("up_arrow_active");
                    remote.sendRequest(RequestType.MOVE_UP);
                }
                break;

            case Key.DOWN:
                isValidKey = true;
                thisObject.isDown = false;
                if (isCtrl)
                {
                    remote.sendRequest(RequestType.VOLUME_DOWN);
                }
                else
                {
                    $("#downArrow").addClass("down_arrow_active");
                    remote.sendRequest(RequestType.MOVE_DOWN);
                }
                break;

            case Key.Q:
            case Key.EQUALS:
                isValidKey = true;
                thisObject.isDown = false;
                remote.sendRequest(RequestType.VOLUME_UP);
                break;

            case Key.W:
            case Key.MINUS:
                isValidKey = true;
                thisObject.isDown = false;
                remote.sendRequest(RequestType.VOLUME_DOWN);
                break;

            case Key.SKIP_NEXT:
                isValidKey = true;
                remote.sendRequest(RequestType.SKIP_NEXT);
                break;

            case Key.SKIP_PREVIOUS:
                isValidKey = true;
                remote.sendRequest(RequestType.SKIP_PREVIOUS);
                break;
        }

        if (isValidKey == true)
        {
            event.preventDefault();
        }

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
    /**
     * @type {Remote}
     */
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
        if (data.params)
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

            case "Input.OnInputFinished":
                thisObject.hideSendPanel();
                break;
        }
    };

    this.bindFastClick = function(element, callback)
    {
        $(element).bind("touchend click", function(event)
        {
            event.stopPropagation();
            event.preventDefault();
            document.activeElement.blur();

            if (event.handled !== true) {

                // vibrate for button touch
                if("vibrate" in navigator && event.type == "touchend")
                {
                    navigator["vibrate"](30);
                }

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

    this.init = function()
    {
        thisObject.bindFastClick($("#info"), function(event)
        {
            thisObject.sendRequest(RequestType.INFO);
        });

        thisObject.bindFastClick($("#osd"), function(event)
        {
            thisObject.sendRequest(RequestType.SHOW_OSD);
        });

        thisObject.bindFastClick($("#back"), function(event)
        {
            thisObject.sendRequest(RequestType.BACK);
        });

        thisObject.bindFastClick($("#menu"), function(event)
        {
            thisObject.sendRequest(RequestType.HOME);
        });

        thisObject.bindFastClick($("#selectButton"), function(event)
        {
            thisObject.sendRequest(RequestType.SELECT);
        });

        thisObject.bindFastClick($("#upArrow"), function(event)
        {
            thisObject.sendRequest(RequestType.MOVE_UP);
        });

        thisObject.bindFastClick($("#downArrow"), function(event)
        {
            thisObject.sendRequest(RequestType.MOVE_DOWN);
        });

        thisObject.bindFastClick($("#leftArrow"), function(event)
        {
            thisObject.sendRequest(RequestType.MOVE_LEFT);
        });


        thisObject.bindFastClick($("#rightArrow"), function(event)
        {
            thisObject.sendRequest(RequestType.MOVE_RIGHT);
        });

        thisObject.bindFastClick($("#pause"), function(event)
        {
            thisObject.sendRequest(RequestType.PAUSE);
        });

        thisObject.bindFastClick($("#stop"), function(event)
        {
            thisObject.sendRequest(RequestType.STOP);
        });

        thisObject.bindFastClick($("#play"), function(event)
        {
            thisObject.sendRequest(RequestType.PLAY);
        });

        thisObject.bindFastClick($("#backward"), function(event)
        {
            thisObject.sendRequest(RequestType.SEEK_BACK);
        });

        thisObject.bindFastClick($("#forward"), function(event)
        {
            thisObject.sendRequest(RequestType.SEEK_FRONT);
        });

        thisObject.bindFastClick($("#prevTrack"), function(event)
        {
            thisObject.sendRequest(RequestType.SKIP_PREVIOUS);
        });

        thisObject.bindFastClick($("#nextTrack"), function(event)
        {
            thisObject.sendRequest(RequestType.SKIP_NEXT);
        });


        thisObject.bindFastClick($("#mute"),function(event)
        {
            thisObject.sendRequest(RequestType.MUTE);
        });

        thisObject.bindFastClick($("#context_menu"), function(event)
        {
            thisObject.sendRequest(RequestType.CONTEXT_MENU);
        });

        thisObject.bindFastClick($("#update_library"), function(event)
        {
            thisObject.sendRequest(RequestType.UPDATE_LIBRARY);
        });

        thisObject.bindFastClick($("#sendTextButton"), function(event)
        {
            thisObject.showSendTextPanel();
        });

        thisObject.bindFastClick($("#power"), function(event)
        {
            thisObject.showShutDownPanel();
        });

        ///// shutdown panel ////
        thisObject.bindFastClick($("#cancelButton-shutDownPanel"), function(event)
        {
            thisObject.hideShutDownPanel();
        });

        thisObject.bindFastClick($("#restartButton-shutDownPanel"), function(event)
        {
            thisObject.hideShutDownPanel();
            thisObject.sendRequest(RequestType.RESTART);
        });

        thisObject.bindFastClick($("#shutDownButton-shutDownPanel"), function(event)
        {
            thisObject.hideShutDownPanel();
            thisObject.sendRequest(RequestType.SHUTDOWN);
        });

        thisObject.bindFastClick($("#quitButton-shutDownPanel"), function(event)
        {
            thisObject.hideShutDownPanel();
            thisObject.sendRequest(RequestType.QUIT);
        });

        thisObject.bindFastClick($("#suspendButton-shutDownPanel"), function(event)
        {
            thisObject.hideShutDownPanel();
            thisObject.sendRequest(RequestType.SUSPEND);
        });

        thisObject.bindFastClick($("#hibernateButton-shutDownPanel"), function(event)
        {
            thisObject.hideShutDownPanel();
            thisObject.sendRequest(RequestType.HIBERNATE);
        });


        //////// send text /////////////////
        thisObject.bindFastClick($("#sendTextDataButton"), function(event)
        {
            thisObject.hideSendPanel();

            var sendText = document.getElementById("sendTeatArea").value;

            var params = { text: sendText, done: true };
            xbmcSocket.send("Input.SendText", params);

        });

        $('#sendTeatArea').keypress(function (event)
        {

            var sendText = document.getElementById("sendTeatArea").value;
            var params;

            // enter key
            if (event.which == Key.ENTER)
            {
                params = { text: sendText, done: true };
                xbmcSocket.send("Input.SendText", params);

                return false;
            }
        });

        thisObject.bindFastClick($("#backDataButton"), function(event)
        {
            thisObject.hideSendPanel();

            var sendText = ""; //document.getElementById("sendTeatArea").value;

            var params = { text: sendText, done: true };
            xbmcSocket.send("Input.SendText", params);
        });


        ///////////// send password /////////////////

        thisObject.bindFastClick($("#sendPasswordDataButton"), function(event)
        {
            thisObject.hideSendPanel();

            var sendPassword = document.getElementById("sendPasswordInput").value;

            var params = { text: sendPassword, done: true };
            xbmcSocket.send("Input.SendText", params);

        });

        thisObject.bindFastClick($("#backPasswordDataButton"), function(event)
        {
            thisObject.hideSendPanel();

            var sendPassword = document.getElementById("sendPasswordInput").value;

            var params = { text: sendPassword, done: true };
            xbmcSocket.send("Input.SendText", params);
        });

        ///////////////////////////////////

        $("#power").addClass("power_on");
        $("#power").removeClass("power_off");

        // show media display name
        localData.getMediaList(thisObject.onMediaListReceived);

        window.onbeforeunload = thisObject.closeSocket;
    };

    this.onMediaListReceived = function(mediaRawData)
    {
        if (mediaRawData == undefined || mediaRawData == "")
            return;


        var mediaListJSON = JSON.parse(mediaRawData);
        var mediaList = mediaListJSON.mediaList;
        for(var i = 0; i < mediaList.length; i++)
        {
            if(connectionDetails.host == mediaList[i].host && connectionDetails.port == mediaList[i].port)
            {
                // found
                console.log("found.. " + mediaList[i].displayName);
                document.getElementById("media_display_name").innerHTML = mediaList[i].displayName;
                break;
            }
        }
    };

    /**
     * Send Request to XBMC Socket
     * @param type {String}
     */
    this.sendRequest = function(type)
    {
        var params;
        switch (type)
        {
            case RequestType.PLAY:
                xbmcSocket.send("Player.GetActivePlayers", null, function(data)
                {
                    var obj = JSON.parse(data);
                    console.log("done");
                    if (obj.result.length > 0)
                    {
                        // in player.. something is playing
                        for (var i = 0; i < obj.result.length; i++)
                        {
                            var params = { playerid: obj.result[i].playerid };
                            xbmcSocket.send("Player.PlayPause", params);
                        }


                    }
                    else
                    {
                        console.log("just select!");
                        params = { action: "play" };
                        xbmcSocket.send("Input.ExecuteAction", params);
                        //xbmcSocket.send("Input.Select");
                    }

                });
                break;

            case RequestType.STOP:
                xbmcSocket.send("Player.GetActivePlayers", null, function(data)
                {
                    var obj = JSON.parse(data);
                    console.log("done");
                    if (obj.result.length > 0)
                    {
                        // in player.. something is playing
                        for (var i = 0; i < obj.result.length; i++)
                        {
                            var params = { playerid: obj.result[i].playerid };
                            xbmcSocket.send("Player.Stop", params);
                        }


                    }

                });

                break;

            case RequestType.PAUSE:
                xbmcSocket.send("Player.GetActivePlayers", null, function(data)
                {
                    var obj = JSON.parse(data);
                    console.log("done");
                    if (obj.result.length > 0)
                    {
                        // in player.. something is playing
                        for (var i = 0; i < obj.result.length; i++)
                        {
                            var params = { playerid: obj.result[i].playerid };
                            xbmcSocket.send("Player.PlayPause", params);
                        }


                    }


                });

                break;

            case RequestType.INFO:
                xbmcSocket.send("Input.Info");
                break;

            case RequestType.CONTEXT_MENU:
                xbmcSocket.send("Input.ContextMenu");
                break;

            case RequestType.SELECT:
                xbmcSocket.send("Input.Select");
                break;

            case RequestType.BACK:
                xbmcSocket.send("Input.Back");
                break;

            case RequestType.MUTE:
                params = { action: "mute" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case RequestType.HOME:
                xbmcSocket.send("Input.Home");
                break;

            case RequestType.SHOW_OSD:
                xbmcSocket.send("Input.ShowOSD");
                break;

            case RequestType.MOVE_LEFT:
                xbmcSocket.send("Input.Left");
                break;

            case RequestType.SEEK_BACK:
                params = { action: "stepback" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case RequestType.MOVE_RIGHT:
                xbmcSocket.send("Input.Right");
                break;

            case RequestType.SEEK_FRONT:
                params = { action: "stepforward" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case RequestType.MOVE_UP:
                xbmcSocket.send("Input.Up");
                break;

            case RequestType.MOVE_DOWN:
                xbmcSocket.send("Input.Down");
                break;

            case RequestType.VOLUME_UP:
                params = { action: "volumeup" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case RequestType.VOLUME_DOWN:
                params = { action: "volumedown" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case RequestType.SHUTDOWN:
                xbmcSocket.send("System.Shutdown");
                break;

            case RequestType.RESTART:
                xbmcSocket.send("System.Reboot");
                break;

            case RequestType.HIBERNATE:
                xbmcSocket.send("System.Hibernate");
                break;

            case RequestType.SUSPEND:
                xbmcSocket.send("System.Suspend");
                break;

            case RequestType.QUIT:
                xbmcSocket.send("Application.Quit");
                break;

            case RequestType.UPDATE_LIBRARY:
                xbmcSocket.send("VideoLibrary.Scan");
                break;

            case RequestType.SKIP_NEXT:
                params = { action: "skipnext" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

            case RequestType.SKIP_PREVIOUS:
                params = { action: "skipprevious" };
                xbmcSocket.send("Input.ExecuteAction", params);
                break;

        }

    };

    this.showShutDownPanel = function()
    {
        $("#main, #footer").fadeTo("fast", 0.1).promise().done(function()
        {
            $("#shutdown_panel").show();

        });
    };

    this.hideShutDownPanel = function()
    {
        $("#shutdown_panel").hide();
        $("#main, #footer").fadeTo("fast", 1);
    };


    this.showSendTextPanel = function(value)
    {
        $("#main, #footer").fadeTo("fast", 0.1).promise().done(function()
        {
            $("#send_text_panel").show();
            var sendTextArea = document.getElementById("sendTeatArea");
            sendTextArea.value = "";
            if (value != undefined)
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
            if (value != undefined)
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
        if (xbmcSocket)
        {
            xbmcSocket.disconnect();
            connectionDetails.host = host;
            connectionDetails.port = port;

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

        thisObject.offFastClick($("#info"));

        thisObject.offFastClick($("#osd"));

        thisObject.offFastClick($("#back"));

        thisObject.offFastClick($("#menu"));

        thisObject.offFastClick($("#selectButton"));

        thisObject.offFastClick($("#upArrow"));

        thisObject.offFastClick($("#downArrow"));

        thisObject.offFastClick($("#leftArrow"));

        thisObject.offFastClick($("#rightArrow"));

        thisObject.offFastClick($("#pause"));

        thisObject.offFastClick($("#stop"));

        thisObject.offFastClick($("#play"));

        thisObject.offFastClick($("#backward"));

        thisObject.offFastClick($("#forward"));

        thisObject.offFastClick($("#prevTrack"));

        thisObject.offFastClick($("#nextTrack"));

        thisObject.offFastClick($("#power"));

        thisObject.offFastClick($("#mute"));

        thisObject.offFastClick($("#context_menu"));

        thisObject.offFastClick($("#update_library"));

        thisObject.offFastClick($("#sendTextButton"));

        thisObject.offFastClick($("#backDataButton"));

        thisObject.offFastClick($("#sendTextDataButton"));

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

var connectionDetails = {"host" : null, "port": 9090};

////////////////

window.addEventListener("load", loadComplete, false);
window.addEventListener("contextmenu", onContextMenu, false);

function onContextMenu(event)
{
    event.preventDefault();     // cancel default menu
}

function loadComplete()
{

    if (window["chrome"] && window["chrome"].extension)
    {
        console.log("chrome extension");
        background = chrome.extension.getBackgroundPage();
    }



    $("#settings_new").bind("touchend click",function(event)
    {
        event.stopPropagation();
        event.preventDefault();

        if (event.handled !== true) {

            window.location.href = "settings.html?popout=" + popout;
            event.handled = true;

        } else {
            return false;
        }
    });

    $("#popOut").hide();

    if (ALLOW_POPOUT)
    {
        var loc = window.location.toString();
        console.log("loc, " + loc);
        popout = Utils.findPropertyFromString(loc, "popout");

        if (popout == undefined)
        {
            popout = 0;
        }

        if (popout == 0)
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
    if (background)
    {
        background.handlePopup();
    }

    window.close();

    if (event) {
        event.preventDefault();
    }
}

function onContentDragged(e)
{
    showPopoutWindow(e);
}

function connect()
{
    if (xbmcSocket)
    {
        localData.getHostName(function(hostName)
        {
            var loc = window.location.toString();
            var removeCheck = Utils.findPropertyFromString(loc, "removecheck");
            console.log("hostname, " + hostName);
            if (hostName)
            {
                localData.getPort(function(port)
                {

                    console.log("port, " + port);
                    if (port)
                    {
                        connectionDetails.host = hostName;
                        connectionDetails.port = port;
                        xbmcSocket.connect(hostName, port, remote);
                    }
                    else
                    {
                        if (removeCheck != 1)
                        {
                            window.location.href = "settings.html?popout=" + popout;
                        }
                    }

                });

            }
            else
            {
                if (removeCheck != 1)
                {
                    window.location.href = "settings.html?popout=" + popout;
                }

            }

        });
        //xbmcSocket.connect("192.168.1.74", 9090, remote);
    }
}
