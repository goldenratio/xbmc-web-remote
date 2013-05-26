/**
 * Appjs window script
 * This is part of the executable.
 */

var app = module.exports = require('appjs');
var open = require('open');

app.serveFilesFrom(__dirname + '/content');
process.title = 'Remote Control - XBMC';

var Rectangle = function(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

var windowSize = {
    WIN : new Rectangle(0, 0, 350, 600),
    LINUX: new Rectangle(0, 0, 350, 540),
    MAC: new Rectangle(0, 0, 350, 540),
    OTHERS: new Rectangle(0, 0, 350, 580)
};

console.log(windowSize.WIN.width);
console.log(windowSize.WIN.height);

var menubar = app.createMenu([
    {
        label:'&File',
            submenu:[
            {
                label:'E&xit',
                action: function()
                {
                    window.close();
                }
            }
        ]
    },
    {
        label:'&Options',
        submenu:[
            {
                label:'&Settings',
                action: function()
                {
                    window.location.href = "settings.html";
                }
            }
        ]
    },
    {
        label:'&Help',
        submenu:[
            {
                label:'&About',
                action: function()
                {
                    aboutWindow.show();
                }
            }
        ]
    }

]);

menubar.on('select',function(item)
{
    console.log("menu item "+item.label+" clicked");
});

var selectWindowSize = windowSize.OTHERS;
var platform = process.platform;

if(platform == "win32")
{
    selectWindowSize = windowSize.WIN;
}
else if(platform == "linux")
{
    selectWindowSize = windowSize.LINUX;
}
else if(platform == "darwin")
{
    selectWindowSize = windowSize.MAC;
}
else
{
    selectWindowSize = windowSize.OTHERS;
}


var window = app.createWindow({
    width           : selectWindowSize.width,
    height          : selectWindowSize.height,
    icons           : __dirname + '/content/icons',
    resizable       : true,
    topmost         : false,
    url             : 'http://appjs/remote.html',
    disableSecurity : true,
    autoResize      : false
});

window.on('create', function(){
    //console.log("Window Created");
    window.frame.show();
    window.frame.center();
    window.frame.setMenuBar(menubar);
    //window.frame.topmost = false;
});

window.on('ready', function(){
    console.log("Window Ready");
    window.process = process;
    window.module = module;

    /*function F12(e){ return e.keyIdentifier === 'F12' }
    function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

    window.addEventListener('keydown', function(e){
        if (F12(e) || Command_Option_J(e)) {
          window.frame.openDevTools();

        }
    });*/


});

window.on('close', function(){
    aboutWindow.close();
    console.log("Window Closed");
});




var aboutWindow = new function()
{
    var aWindow;

    this.show =function()
    {
        if(aWindow)
        {
            if(aWindow.window.frame)
            {
                aWindow.close();
            }
        }

        aWindow = app.createWindow({
            width           : 350,
            height          : 250,
            icons           : __dirname + '/content/icons',
            resizable       : false,
            topmost         : false,
            url             : 'http://appjs/about.html'
        });

        aWindow.on('create', function(){
            //console.log("Window Created");
            aWindow.frame.show();
            aWindow.frame.center();
            //aWindow.frame.openDevTools();
        });

        aWindow.on('ready', function(){
            console.log("About Window Ready");
            aWindow.process = process;
            aWindow.module = module;

            aWindow.addEventListener("open-email", function()
            {
                open("mailto:karthikeyanvj@gmail.com");
            });

            aWindow.addEventListener("open-twitter", function()
            {
                open("https://twitter.com/karthikvj");
            });

        });
    };

    this.close = function()
    {
        if(aWindow)
        {
            if(aWindow.window.frame)
            {
                aWindow.close();
            }
        }
    };

    this.openDevTools = function()
    {
        if(aWindow)
        {
            aWindow.frame.openDevTools();
        }

    };
};


