/**
 * @author: Karthik VJ
 */

var XBMCSocket = function()
{
    /**
     * @type {XBMCSocket}
     */
    var thisObject = this;

    this.socket;
    this.path;
    this.isConnected = false;
    this.isPending = false;
    this.context;
    this.callback;

    var isSecondConnectionWaiting = false;
    var socketClosedWantedly = false;


    /**
     * Create web socket handshake
     * @param host
     * @param port
     * @param context
     */
    this.connect = function(host, port, context)
    {
        thisObject.path = "ws://" + host + ":" + port + "/jsonrpc";
        thisObject.context = context;

        if(!thisObject.path)
        {
            alert("host is not configured!");
            return;
        }

        if(!window.WebSocket)
        {
            alert("Web socket is not supported in your browser!");
            return;
        }

        if(thisObject.socket)
        {
            console.log("wait for it, socket is closing!");
            isSecondConnectionWaiting = true;
            socketClosedWantedly = true;
            thisObject.socket.close();
            return;
        }

        performSocketConnection();

    };

    var performSocketConnection = function()
    {
        isSecondConnectionWaiting = false;
        socketClosedWantedly = false;

        try
        {
            thisObject.socket = new WebSocket(thisObject.path);
            thisObject.socket.onopen = onOpen;
            thisObject.socket.onerror = onError;
            thisObject.socket.onmessage = onMessage;
            thisObject.socket.onclose = onClose;
        }
        catch (error)
        {
            alert(error.message);
        }

    };

    /**
     * Disconnect from web socket
     */
    this.disconnect = function()
    {
        if(thisObject.socket)
        {
            thisObject.socket.close();
        }
    };

    /**
     * Invoked when connection is established
     */
    var onOpen = function()
    {
        console.log("socket open");
        thisObject.isConnected = true;
        if(thisObject.context)
        {
            thisObject.context.onConnect();
        }

    };

    /**
     * Invoked when there is a error in web socket
     * @param error
     */
    var onError = function(error)
    {
        thisObject.isPending = false;
        console.log("socket error " + error);
        thisObject.callback = null;
    };

    /**
     * Invoked when server sends response message
     * @param event
     */
    var onMessage = function(event)
    {
        thisObject.isPending = false;
        console.log("received data, "  + event.data);
        if(thisObject.callback)
        {
            console.log("has callback!");
            thisObject.callback(event.data);
            thisObject.callback = null;
        }

        thisObject.context.onMessage(JSON.parse(event.data));
    };

    /**
     * Send messages to server
     * @param method JSONRPC methods
     * @param params
     * @param callback {Function} optional
     */
    this.send = function(method, params, callback)
    {
        if(!thisObject.isConnected)
        {
            alert("connection error! Socket is not connected.");
            return;
        }

        thisObject.callback = callback;

        var data = { jsonrpc: "2.0", method: method, id: "1" };
        if(params)
        {
            data.params = params;
        }

        if(thisObject.isPending == true)
        {
            console.warn("a request is still pending!");
            return;
        }

        thisObject.isPending = true;
        console.log(method + " >> " + JSON.stringify(data));
        thisObject.socket.send(JSON.stringify(data));
    };

    /**
     * Invoked when socket is closed
     * @param event
     */
    var onClose = function(event)
    {
        console.log("socket closed!");
        thisObject.isPending = false;
        thisObject.isConnected = false;

        thisObject.socket = null;

        if(thisObject.context)
        {
            thisObject.context.onClose(socketClosedWantedly);
        }

        if(isSecondConnectionWaiting)
        {
            performSocketConnection();
        }

    };



};

