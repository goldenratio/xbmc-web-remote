/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
var windowID=-1;var isPopupOpen=false;function handelPopup(){var defaultRes={width:340,height:540};var winRes={width:350,height:570};var selectedRes=defaultRes;if(navigator.platform==="Win32"){selectedRes=winRes;}
var obj={url:"remote.html?popout=1",focused:true,type:"popup",width:selectedRes.width,height:selectedRes.height};if(windowID===-1){openPopup(obj);}
else{switchWindow();}}
function openPopup(obj){chrome.windows.create(obj,function(response){windowID=response.id;isPopupOpen=true;var data={};data.popup="";chrome.browserAction.setPopup(data);});}
function switchWindow(){chrome.windows.update(windowID,{focused:true},function(){isPopupOpen=true;});}
function onWindowClose(id){if(id===windowID){windowID=-1;isPopupOpen=false;resetPopup();}}
function onActionIconClicked(tab){if(isPopupOpen===true){switchWindow();}}
function loadComplete(event)
{resetPopup();}
function resetPopup()
{var data={};data.popup="remote.html";chrome.browserAction.setPopup(data);}
chrome.windows.onRemoved.addListener(onWindowClose);chrome.browserAction.onClicked.addListener(onActionIconClicked);window.addEventListener("load",loadComplete,false);