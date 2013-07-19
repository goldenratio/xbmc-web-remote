/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
var LocalData=function(context)
{var thisObject=this;this.context=context;this.isSupported=function()
{try{return'localStorage'in window&&window['localStorage']!==null;}catch(e){return false;}};this.storeData=function(host,port)
{if(!host||!port)
{console.write("host or port is undefined!");return;}
if(thisObject.isSupported())
{localStorage.setItem("host",host);localStorage.setItem("port",port);}
else
{alert("local storage not supported in your browser!");}};this.getHostName=function(callback)
{var host;if(thisObject.isSupported())
{host=localStorage.getItem("host");callback(host);}
else
{callback();}};this.getPort=function(callback)
{var port;if(thisObject.isSupported())
{port=localStorage.getItem("port");callback(port);}
else
{callback();}};this.clear=function()
{if(this.isSupported())
{localStorage.clear();}};};