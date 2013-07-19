/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
window.addEventListener("contextmenu",onContextMenu,false);window.addEventListener("app-ready",onLoad,false);function onLoad()
{console.log(window.frame)
var emailLink=document.getElementById("email_link");emailLink.addEventListener("click",onEmailClick,false);var twitterLink=document.getElementById("twitter_link");twitterLink.addEventListener("click",onTwitterClick,false);}
function onEmailClick(e)
{window.dispatchEvent(new Event("open-email"));e.preventDefault();}
function onTwitterClick(e)
{window.dispatchEvent(new Event("open-twitter"));e.preventDefault();}
function onContextMenu(e)
{e.preventDefault();}