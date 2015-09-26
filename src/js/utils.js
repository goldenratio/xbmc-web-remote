/**
 * @author: Karthik VJ
 **/

var Utils = new function()
{
    /**
     * Find param value from URL string
     * @param stringValue
     * @param property
     * @return {*}
     */
    this.findPropertyFromString = function(stringValue, property)
    {
        property = property + "=";
        var index = stringValue.indexOf("?");
        stringValue = stringValue.substring(index + 1);

        var list = stringValue.split('&');
        //console.log("list.length, " + list.length);
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].search(property) == 0)
            {
                return list[i].replace(property, "");
            }
        }
        return undefined;
    };
};
