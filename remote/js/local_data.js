/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
var LocalData=function(context)
{var thisObject=this;this.context=context;this.isSupported=function()
{try{return'localStorage'in window&&window['localStorage']!==null;}catch(e){return false;}};this.storeData=function(host,port)
{if(!host||!port)
{console.write("host or port is undefined!");return;}
if(thisObject.isSupported())
{localStorage.setItem("host",host);localStorage.setItem("port",port);}
else
{alert("local storage not supported in your browser!");}};this.storeMediaList=function(displayName,host,port)
{if(!host||!port)
{console.write("host or port is undefined!");return;}
if(thisObject.isSupported())
{var data={"displayName":displayName,"host":host,"port":port};var existingData=localStorage.getItem("mediaList");if(!existingData)
{existingData={"mediaList":[data]};}
else
{console.log(existingData);existingData=JSON.parse(existingData);var mediaList=existingData["mediaList"];var isNewData=true;for(var i=0;i<mediaList.length;i++)
{if(displayName==mediaList[i].displayName||host==mediaList[i].host)
{mediaList[i].displayName=displayName;mediaList[i].host=host;mediaList[i].port=port;isNewData=false;break;}}
if(isNewData)
{mediaList.push(data);}}
console.log(existingData);localStorage.setItem("mediaList",JSON.stringify(existingData));}
else
{alert("local storage not supported in your browser!");}};this.deleteDataFromMediaList=function(data)
{if(!data)
{console.write("mediaData is undefined!");return;}
if(thisObject.isSupported())
{var existingData=localStorage.getItem("mediaList");existingData=JSON.parse(existingData);var mediaList=existingData["mediaList"];for(var i=mediaList.length-1;i>=0;i--)
{if(data.displayName==mediaList[i].displayName&&data.host==mediaList[i].host&&data.port==mediaList[i].port)
{console.log("removed data "+data.displayName);mediaList.splice(i,1);break;}}
localStorage.setItem("mediaList",JSON.stringify(existingData));}};this.deleteHostAndPort=function()
{localStorage.removeItem("host");localStorage.removeItem("port");};this.getHostName=function(callback)
{var host;if(thisObject.isSupported())
{host=localStorage.getItem("host");callback(host);}
else
{callback();}};this.getPort=function(callback)
{var port;if(thisObject.isSupported())
{port=localStorage.getItem("port");callback(port);}
else
{callback();}};this.getMediaList=function(callback)
{var mediaList;if(thisObject.isSupported())
{mediaList=localStorage.getItem("mediaList");callback(mediaList);}
else
{callback();}};this.clear=function()
{if(this.isSupported())
{localStorage.clear();}};};