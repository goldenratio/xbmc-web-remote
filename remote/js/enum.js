/* (c) 2013 Karthikeyan VJ https://github.com/goldenratio/xbmc-web-remote */
var PORT_DEFAULT=9090;var ENABLE_CONSOLE=true;var RECONNECT_TIME_DELAY=5000;var ALLOW_POPOUT=false;var PORT_ERROR_MESSAGE="Port $port is a typical HTTP Port, but remote uses TCP Port (default 9090) to connect.";var Key=new function()
{this.UP=38;this.DOWN=40;this.RIGHT=39;this.LEFT=37;this.SPACE=32;this.BACKSPACE=8;this.ENTER=13;this.ESCAPE=27;this.CTRL=17;this.INFO=73;this.STOP=83;this.MENU=72;this.OSD=90;this.MUTE=77;this.PLAY=80;this.CONTEXT=79;this.Q=81;this.W=87;};var SettingsElementID=new function()
{this.MISSING_DATA="message_missing_data";this.MESSAGE_SUCCESS="message_success";this.MESSAGE_FAIL="message_fail";this.MESSAGE_WAIT="message_wait";this.MESSAGE_PORT_ERROR="port_msg";this.IP_TEXTFIELD="ipValue";this.PORT_TEXTFIELD="portValue";this.SAVE_BUTTON="saveButton";this.BACK_BUTTON="backButton";};var RequestType=new function()
{this.PLAY="play";this.PAUSE="pause";this.STOP="stop";this.INFO="info";this.CONTEXT_MENU="context_menu";this.SELECT="select";this.BACK="back";this.MUTE="mute";this.HOME="home";this.SHOW_OSD="show_osd";this.MOVE_LEFT="move_left";this.MOVE_RIGHT="move_right";this.MOVE_UP="move_up";this.MOVE_DOWN="move_down";this.SEEK_BACK="seek_back";this.SEEK_FRONT="seek_front";this.VOLUME_UP="volume_up";this.VOLUME_DOWN="volume_down";this.UPDATE_LIBRARY="update_library";this.SHUTDOWN="shutdown";};