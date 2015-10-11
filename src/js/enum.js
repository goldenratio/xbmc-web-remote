/**
 * @author: Karthik VJ
 */

// enable / disable console log
var ENABLE_CONSOLE = false;

// time delay to try reconnection when disconnected
var RECONNECT_TIME_DELAY = 5000; // milliseconds

// used only in chrome extension, value is set in ant task
// Nb! disabled this feature now, not really that useful feature. And permission description is a bit creepy!
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

    this.SKIP_NEXT = 221;
    this.SKIP_PREVIOUS = 219;

    this.INFO = 73; // i
    this.STOP = 88; // x
    this.MENU = 72; // h
    this.OSD = 90; // z
    this.MUTE = 77; // m
    this.PLAY = 80; // p
    this.CONTEXT = 79; // o

    this.MINUS = 189; // - (volume down)
    this.EQUALS = 187; // = (volume up)

    this.Q = 81; // Volume up, alternative for Ctrl + right arrow
    this.W = 87; // Volume down, alternative for Ctrl + left arrow

    /**
     * @deprecated
     * @type {number}
     */
    this.STOP_DEP = 83; // S - stop
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
    this.DISPLAY_NAME_TEXTFIELD = "displayNameValue";

    this.SAVE_BUTTON = "saveButton";
    this.BACK_BUTTON = "backButton";
    this.DELTE_BUTTON = "deleteButton";
};

var RequestType = new function()
{
    this.PLAY = "play";
    this.PAUSE = "pause";
    this.STOP = "stop";
    this.INFO = "info";
    this.CONTEXT_MENU = "context_menu";
    this.SELECT = "select";
    this.BACK = "back";
    this.MUTE = "mute";
    this.HOME = "home";
    this.SHOW_OSD = "show_osd";
    this.MOVE_LEFT = "move_left";
    this.MOVE_RIGHT = "move_right";
    this.MOVE_UP = "move_up";
    this.MOVE_DOWN = "move_down";

    this.SEEK_BACK = "seek_back";
    this.SEEK_FRONT = "seek_front";

    this.SKIP_NEXT = "skip_next";
    this.SKIP_PREVIOUS = "skip_previous";

    this.VOLUME_UP = "volume_up";
    this.VOLUME_DOWN = "volume_down";

    this.UPDATE_LIBRARY = "update_library";

    this.SHUTDOWN = "shutdown";
    this.RESTART = "restart";
    this.HIBERNATE = "hibernate";
    this.SUSPEND = "suspend";
    this.QUIT = "quit";
};

