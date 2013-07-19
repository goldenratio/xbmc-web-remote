/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
var Utils=new function()
{this.findPropertyFromString=function(stringValue,property)
{property=property+"=";var index=stringValue.indexOf("?");stringValue=stringValue.substring(index+1);var list=stringValue.split('&');for(var i=0;i<list.length;i++)
{if(list[i].search(property)==0)
{return list[i].replace(property,"");}}
return undefined;};};