/**
 * @author: Karthik VJ
 */

var XBMCSocket = function()
{
	this.socket;
	this.path;
	this.isConnected = false;
	this.isPending = false;
	this.context;
    this.callback;

	var thisObject = this;


	this.connect = function(host, port, context)
	{
        thisObject.path = "ws://" + host + ":" + port + "/jsonrpc";

        if(!thisObject.path)
        {
            alert("host is not configured!")
            return;
        }

        if(thisObject.socket)
        {
            thisObject.socket.close();
        }
        thisObject.context = context;
		thisObject.socket = new WebSocket(thisObject.path);
		thisObject.socket.onopen = thisObject.onOpen;
		thisObject.socket.onerror = thisObject.onError;
		thisObject.socket.onmessage = thisObject.onMessage;
		thisObject.socket.onclose = thisObject.onClose;
		
	};

    this.disconnect = function()
    {
        if(thisObject.socket)
        {
            thisObject.socket.close();
        }
    };
	
	this.onOpen = function()
	{
		console.log("socket open");
		thisObject.isConnected = true;
        if(thisObject.context)
        {
            thisObject.context.onConnect();
        }

	};
	
	this.onError = function(error)
	{
		thisObject.isPending = false;
		console.log("socket error " + error);
        thisObject.callback = null;
	};
	
	this.onMessage = function(event)
	{
		thisObject.isPending = false;
		console.log("received data, "  + event.data);
        if(thisObject.callback)
        {
            console.log("has callback!");
            thisObject.callback(event.data);
            thisObject.callback = null;
        }
	};
	
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

		thisObject.isPending = true;
        console.log(method + " >> " + JSON.stringify(data));
		thisObject.socket.send(JSON.stringify(data));
	};
	
	this.onClose = function(event)
	{
        console.log("socket closed!");
		thisObject.isPending = false;
		thisObject.isConnected = false;

        if(thisObject.context)
        {
            thisObject.context.onClose();
        }

	};
	
	
	
};

