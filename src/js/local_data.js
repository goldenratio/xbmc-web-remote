/**
 * @author: Karthik VJ
 **/

var LocalData = function(context)
{

    var thisObject = this;
    this.context = context;


    /**
     * Check if local storage is supported in browser
     * @return {boolean} true - supported, false - not supported
     */
    this.isSupported = function()
    {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }

    };


    /**
     * Store the host and port value to local storage
     * @param host
     * @param port
     */
    this.storeData = function(host, port)
    {
        if (!host || !port)
        {
            console.write("host or port is undefined!");
            return;
        }

        if (thisObject.isSupported())
        {
            localStorage.setItem("host", host);
            localStorage.setItem("port", port);
        }
        else
        {
            alert("local storage not supported in your browser!");
        }
    };

    this.storeMediaList = function(displayName, host, port)
    {
        if (!host || !port)
        {
            console.write("host or port is undefined!");
            return;
        }

        if (thisObject.isSupported())
        {
            var data = {"displayName" : displayName, "host" : host, "port": port};
            var existingData = localStorage.getItem("mediaList");

            if(!existingData)
            {
                existingData = {"mediaList": [data]};
            }
            else
            {
                console.log(existingData);
                existingData = JSON.parse(existingData);
                var mediaList = existingData["mediaList"];
                var isNewData = true;
                for(var i = 0; i < mediaList.length; i++)
                {
                    if(displayName == mediaList[i].displayName || host == mediaList[i].host)
                    {
                        mediaList[i].displayName = displayName;
                        mediaList[i].host = host;
                        mediaList[i].port = port;
                        isNewData = false;

                        break;
                    }
                }

                if(isNewData)
                {
                    mediaList.push(data);
                }
            }

            console.log(existingData);
            localStorage.setItem("mediaList", JSON.stringify(existingData));
        }
        else
        {
            alert("local storage not supported in your browser!");
        }
    };

    /**
     * Deletes single mediaData from mediaList
     * @param data
     */
    this.deleteDataFromMediaList = function(data)
    {
        if (!data)
        {
            console.write("mediaData is undefined!");
            return;
        }

        if (thisObject.isSupported())
        {
            var existingData = localStorage.getItem("mediaList");
            existingData = JSON.parse(existingData);
            var mediaList = existingData["mediaList"];

            for(var i = mediaList.length - 1; i >= 0; i--)
            {
                if(data.displayName == mediaList[i].displayName && data.host == mediaList[i].host && data.port == mediaList[i].port)
                {
                    console.log("removed data " + data.displayName);
                    mediaList.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("mediaList", JSON.stringify(existingData));
        }
    };

    /**
     * Deletes hot and port value from local storage
     */
    this.deleteHostAndPort = function()
    {
        localStorage.removeItem("host");
        localStorage.removeItem("port");
    };

    /**
     * Get host or IP address from localStorage
     * @param callback
     */
    this.getHostName = function(callback)
    {

        var host;
        if (thisObject.isSupported())
        {
            host = localStorage.getItem("host");
            callback(host);
        }
        else
        {
            callback();
        }
    };

    /**
     * Get Port value from localStorgae
     * @param callback
     */
    this.getPort = function(callback)
    {
        var port;
        if (thisObject.isSupported())
        {
            port = localStorage.getItem("port");
            callback(port);
        }
        else
        {
            callback();
        }
    };

    /**
     * Get mediaList from localStorage
     * @param callback
     */
    this.getMediaList = function(callback)
    {
        var mediaList;
        if (thisObject.isSupported())
        {
            mediaList = localStorage.getItem("mediaList");
            callback(mediaList);
        }
        else
        {
            callback();
        }
    };

    /**
     * Clear local storage data
     */
    this.clear = function()
    {
        if (this.isSupported())
        {
            localStorage.clear();
        }
    };

};
