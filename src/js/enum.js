/**
 * @author: Karthik VJ
 */

var PORT_DEFAULT = 9090;

// enable / disable console log
var ENABLE_CONSOLE = false;

// time delay to try reconnection when disconnected
var RECONNECT_TIME_DELAY = 5000; // milliseconds

// used only in chrome extension, value is set in ant task
var ALLOW_POPOUT = @allow_popout;

// this message is shown when user tries to connect with typical HTTP port
var PORT_ERROR_MESSAGE = "Port $port is a typical HTTP Port, but remote uses TCP Port (default 9090) to connect.";

var Key = new function()
{
    this.UP = 38;
    this.DOWN = 40;
    this.RIGHT = 39;
    this.LEFT = 37;
    this.SPACE = 32;
    this.BACKSPACE = 8;
    this.ENTER = 13;
    this.ESCAPE = 27;
    this.CTRL = 17;

    this.INFO = 73; // i
    this.STOP = 83; // s
    this.MENU = 72; // h
    this.OSD = 90; // z
    this.MUTE = 77; // m
    this.PLAY = 80; // p
    this.CONTEXT = 79; // o
};

var SettingsElementID = new function()
{
    this.MISSING_DATA = "message_missing_data";
    this.MESSAGE_SUCCESS = "message_success";
    this.MESSAGE_FAIL = "message_fail";
    this.MESSAGE_WAIT = "message_wait";

    this.MESSAGE_PORT_ERROR = "port_msg";

    this.IP_TEXTFIELD = "ipValue";
    this.PORT_TEXTFIELD = "portValue";

    this.SAVE_BUTTON = "saveButton";
    this.BACK_BUTTON = "backButton";
};

