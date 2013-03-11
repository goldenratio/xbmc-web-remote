/**
 * @author: Karthik VJ
 **/

var LocalData = function(context)
{
    //chrome.storage.local.clear();

    var thisObject = this;
    this.context = context;

    chrome.storage.onChanged.addListener(function(changes, area)
    {
        console.log("local data changed! " + area)
        console.log(JSON.stringify(changes));

        thisObject.getHostName(function(hostName)
        {
            console.log(hostName);

            thisObject.getPort(function(port)
            {

                console.log(port);
                thisObject.context.localDataChanged(hostName,port);
            });

        });


    });

    this.storeData = function(host, port)
    {
        if(!host || !port)
        {
            console.write("host or port is undefined!");
            return;
        }

        chrome.storage.local.set({'host': host, 'port': port}, function()
        {
            console.log("data saved");
        });
    };

    this.getHostName = function(callback)
    {

        chrome.storage.local.get(function(item)
        {
            if(item.host)
            {
                callback(item.host);
            }
            else
            {
                callback();
            }


        });

    };

    this.getPort = function(callback)
    {
        chrome.storage.local.get(function(item)
        {
            if(item.port)
            {
                callback(item.port);
            }
            else
            {
                callback();
            }
        });

    };

    this.onLocalDataChanged = function(changes, area)
    {
        console.log("local data changed!")
    };
};