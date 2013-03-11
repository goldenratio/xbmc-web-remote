/**
 * @author: Karthik VJ
**/

var Utils = new function()
{
    this.findPropertyFromString = function(str, property)
    {
        //console.log("findPropertyFromString, str = " + str);
        //console.log("findPropertyFromString, property = " + property);
        property = property + "=";
        var index = str.indexOf('?');
        str = str.substring(index + 1);
        //console.log("index = " + index);
        //console.log("str = " + str);

        var list = str.split('&');
        //console.log("list.length, " + list.length);
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].search(property) == 0)
            {
                return list[i].replace(property, "");
            }
        }
        return undefined;
    }
};