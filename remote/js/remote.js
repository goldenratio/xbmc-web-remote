/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
if(ENABLE_CONSOLE==false)
{var console=console||{};console.log=function(){};}
var Keyboard=function()
{this.isDown=false;var thisObject=this;this.init=function()
{document.onkeydown=onKeyDown;document.onkeyup=onKeyUp;};var onKeyUp=function(event)
{console.log("key up");thisObject.isDown=false;$("#rightArrow").removeClass("right_arrow_active");$("#selectButton").removeClass("select_active");$("#leftArrow").removeClass("left_arrow_active");$("#upArrow").removeClass("up_arrow_active");$("#downArrow").removeClass("down_arrow_active");event.preventDefault();}
var onKeyDown=function(event)
{if(thisObject.isDown)
{console.log("key is down!");return;}
thisObject.isDown=true;var isCtrl=event.ctrlKey||event.metaKey;var params;switch(event.keyCode)
{case Key.CTRL:thisObject.isDown=false;break;case Key.SPACE:params={playerid:1};xbmcSocket.send("Player.PlayPause",params);$("#pause").toggleClass("#pause active");break;case Key.PLAY:xbmcSocket.send("Player.GetActivePlayers",null,function(data)
{var obj=JSON.parse(data);console.log("done");if(obj.result.length>0)
{var params={playerid:1};xbmcSocket.send("Player.PlayPause",params);}
else
{console.log("just select");xbmcSocket.send("Input.Select");}});break;case Key.INFO:xbmcSocket.send("Input.Info");break;case Key.CONTEXT:if(isCtrl)
{xbmcSocket.send("Input.ContextMenu");event.preventDefault();}
break;case Key.ENTER:$("#selectButton").addClass("select_active");xbmcSocket.send("Input.Select");break;case Key.BACKSPACE:case Key.ESCAPE:xbmcSocket.send("Input.Back");break;case Key.STOP:params={playerid:1};xbmcSocket.send("Player.Stop",params);break;case Key.MUTE:params={action:"mute"};xbmcSocket.send("Input.ExecuteAction",params);break;case Key.MENU:xbmcSocket.send("Input.Home");break;case Key.OSD:xbmcSocket.send("Input.ShowOSD");break;case Key.LEFT:thisObject.isDown=false;if(isCtrl)
{params={action:"stepback"};xbmcSocket.send("Input.ExecuteAction",params);}
else
{$("#leftArrow").addClass("left_arrow_active");xbmcSocket.send("Input.Left");}
break;case Key.RIGHT:thisObject.isDown=false;if(isCtrl)
{params={action:"stepforward"};xbmcSocket.send("Input.ExecuteAction",params);}
else
{$("#rightArrow").addClass("right_arrow_active");xbmcSocket.send("Input.Right");}
break;case Key.UP:thisObject.isDown=false;if(isCtrl)
{params={action:"volumeup"};xbmcSocket.send("Input.ExecuteAction",params);}
else
{$("#upArrow").addClass("up_arrow_active");xbmcSocket.send("Input.Up");}
break;case Key.DOWN:thisObject.isDown=false;if(isCtrl)
{params={action:"volumedown"};xbmcSocket.send("Input.ExecuteAction",params);}
else
{$("#downArrow").addClass("down_arrow_active");xbmcSocket.send("Input.Down");}
break;}
event.preventDefault();};this.dispose=function()
{document.onkeydown=null;document.onkeyup=null;};};var Remote=function()
{var thisObject=this;this.onConnect=function()
{console.log("connected");keyboard.init();thisObject.init();};this.onMessage=function(data)
{console.log("remote, onMessage "+data);var paramsData={type:"",value:""};if(data.params)
{paramsData=data.params.data;}
var method=data.method;console.log("method "+method);switch(method)
{case"Input.OnInputRequested":if(paramsData.type=="keyboard"||paramsData.type=="ip")
{thisObject.showSendTextPanel(paramsData.value);}
else if(paramsData.type=="password")
{thisObject.showSendPasswordPanel(paramsData.value);}
break;}};this.bindFastClick=function(element,callback)
{$(element).bind("touchend click",function(event)
{event.stopPropagation();event.preventDefault();document.activeElement.blur();if(event.handled!==true){callback();event.handled=true;}else{return false;}});};this.offFastClick=function(element)
{$(element).off("touchend click");};this.init=function()
{thisObject.bindFastClick($("#info"),function(event)
{xbmcSocket.send("Input.Info");});thisObject.bindFastClick($("#osd"),function(event)
{xbmcSocket.send("Input.ShowOSD");});thisObject.bindFastClick($("#back"),function(event)
{xbmcSocket.send("Input.Back");});thisObject.bindFastClick($("#menu"),function(event)
{xbmcSocket.send("Input.Home");});thisObject.bindFastClick($("#selectButton"),function(event)
{xbmcSocket.send("Input.Select");});thisObject.bindFastClick($("#upArrow"),function(event)
{xbmcSocket.send("Input.Up");});thisObject.bindFastClick($("#downArrow"),function(event)
{xbmcSocket.send("Input.Down");});thisObject.bindFastClick($("#leftArrow"),function(event)
{xbmcSocket.send("Input.Left");});thisObject.bindFastClick($("#rightArrow"),function(event)
{xbmcSocket.send("Input.Right");});thisObject.bindFastClick($("#pause"),function(event)
{var params={playerid:1};xbmcSocket.send("Player.PlayPause",params);});thisObject.bindFastClick($("#stop"),function(event)
{var params={playerid:1};xbmcSocket.send("Player.Stop",params);});thisObject.bindFastClick($("#play"),function(event)
{xbmcSocket.send("Player.GetActivePlayers",null,function(data)
{var obj=JSON.parse(data);console.log("done");if(obj.result.length>0)
{var params={playerid:1};xbmcSocket.send("Player.PlayPause",params);}
else
{console.log("just select");xbmcSocket.send("Input.Select");}});});thisObject.bindFastClick($("#backward"),function(event)
{var params={action:"stepback"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#forward"),function(event)
{var params={action:"stepforward"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#prevTrack"),function(event)
{var params={action:"skipprevious"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#nextTrack"),function(event)
{var params={action:"skipnext"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#power"),function(event)
{xbmcSocket.send("System.Shutdown");});thisObject.bindFastClick($("#mute"),function(event)
{params={action:"mute"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#context_menu"),function(event)
{xbmcSocket.send("Input.ContextMenu");});thisObject.bindFastClick($("#update_library"),function(event)
{xbmcSocket.send("VideoLibrary.Scan");});thisObject.bindFastClick($("#sendTextButton"),function(event)
{thisObject.showSendTextPanel();});thisObject.bindFastClick($("#backDataButton"),function(event)
{thisObject.hideSendPanel();params={action:"close"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#backPasswordDataButton"),function(event)
{thisObject.hideSendPanel();params={action:"close"};xbmcSocket.send("Input.ExecuteAction",params);});thisObject.bindFastClick($("#sendTextDataButton"),function(event)
{thisObject.hideSendPanel();var sendText=document.getElementById("sendTeatArea").value;params={text:sendText,done:true};xbmcSocket.send("Input.SendText",params);});thisObject.bindFastClick($("#sendPasswordDataButton"),function(event)
{thisObject.hideSendPanel();var sendPassword=document.getElementById("sendPasswordInput").value;params={text:sendPassword,done:true};xbmcSocket.send("Input.SendText",params);});$("#power").addClass("power_on");$("#power").removeClass("power_off");window.onbeforeunload=thisObject.closeSocket;};this.showSendTextPanel=function(value)
{$("#main, #footer").fadeTo("fast",0.1).promise().done(function()
{$("#send_text_panel").show();var sendTextArea=document.getElementById("sendTeatArea");sendTextArea.value="";if(value!=undefined)
{console.log("send text, "+value);sendTextArea.value=value;}
sendTextArea.focus();keyboard.dispose();});};this.showSendPasswordPanel=function(value)
{$("#main, #footer").fadeTo("fast",0.1).promise().done(function()
{$("#send_pwd_panel").show();var passwordInput=document.getElementById("sendPasswordInput");passwordInput.value="";if(value!=undefined)
{console.log("password, "+value);passwordInput.value=value;}
passwordInput.focus();keyboard.dispose();});};this.hideSendPanel=function()
{$("#send_text_panel").hide();$("#send_pwd_panel").hide();$("#main, #footer").fadeTo("fast",1);keyboard.init();};this.localDataChanged=function(host,port)
{console.log("local data changed, "+host+", "+port);if(xbmcSocket)
{xbmcSocket.disconnect();xbmcSocket.connect(host,port,remote);}
else
{console.log("socket do not exist!");}};this.dispose=function()
{console.log("dispose");thisObject.offFastClick($("#info"));thisObject.offFastClick($("#osd"));thisObject.offFastClick($("#back"));thisObject.offFastClick($("#menu"));thisObject.offFastClick($("#selectButton"));thisObject.offFastClick($("#upArrow"));thisObject.offFastClick($("#downArrow"));thisObject.offFastClick($("#leftArrow"));thisObject.offFastClick($("#rightArrow"));thisObject.offFastClick($("#pause"));thisObject.offFastClick($("#stop"));thisObject.offFastClick($("#play"));thisObject.offFastClick($("#backward"));thisObject.offFastClick($("#forward"));thisObject.offFastClick($("#prevTrack"));thisObject.offFastClick($("#nextTrack"));thisObject.offFastClick($("#power"));thisObject.offFastClick($("#mute"));thisObject.offFastClick($("#context_menu"));thisObject.offFastClick($("#update_library"));thisObject.offFastClick($("#sendTextButton"));thisObject.offFastClick($("#backDataButton"));thisObject.offFastClick($("#sendTextDataButton"));};this.closeSocket=function()
{xbmcSocket.disconnect();};this.onClose=function()
{keyboard.dispose();thisObject.dispose();$("#power").addClass("power_off");$("#power").removeClass("power_on");setTimeout(connect,RECONNECT_TIME_DELAY);};};var remote=new Remote();var keyboard=new Keyboard();var xbmcSocket=new XBMCSocket();var localData=new LocalData(remote);var popout=0;var background;window.addEventListener("load",loadComplete,false);window.addEventListener("contextmenu",onContextMenu,false);function onContextMenu(e)
{e.preventDefault();}
function loadComplete()
{if(window["chrome"]&&window["chrome"].extension)
{console.log("chrome extension");background=chrome.extension.getBackgroundPage();}
else
{$("#settings").hide();}
$("#settings, #settings_new").bind("touchend click",function(event)
{event.stopPropagation();event.preventDefault();if(event.handled!==true){window.location.href="settings.html?popout="+popout;event.handled=true;}else{return false;}});$("#popOut").hide();if(ALLOW_POPOUT)
{var loc=window.location.toString();console.log("loc, "+loc);popout=Utils.findPropertyFromString(loc,"popout");if(popout==undefined)
{popout=0;}
if(popout==0)
{$("#popOut").show();$("#popOut").click(showPopoutWindow);var contentDiv=document.getElementById("content");contentDiv.draggable=true;contentDiv.addEventListener("dragend",onContentDragged,false);}}
connect();}
function showPopoutWindow(event)
{if(background)
{background.handelPopup();}
window.close();if(event){event.preventDefault();}}
function onContentDragged(e)
{showPopoutWindow(e);}
function connect()
{if(xbmcSocket)
{localData.getHostName(function(hostName)
{var loc=window.location.toString();var removeCheck=Utils.findPropertyFromString(loc,"removecheck");console.log("hostname, "+hostName);if(hostName)
{localData.getPort(function(port)
{console.log("port, "+port);if(port)
{xbmcSocket.connect(hostName,port,remote);}
else
{if(removeCheck!=1)
{window.location.href="settings.html?popout="+popout;}}});}
else
{if(removeCheck!=1)
{window.location.href="settings.html?popout="+popout;}}});}}