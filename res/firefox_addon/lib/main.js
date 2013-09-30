/**
 * Firefox addon
 * @author Karthik VJ
 */


var data = require("sdk/self").data;
var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var panels = require("sdk/panel");

// Construct a panel
var remote_panel = panels.Panel({
    width: 340,
    height: 520,
    contentURL: data.url("remote.html")
});

var widget = widgets.Widget({
    id: "xbmc-remote",
    label: "XBMC Remote",
    contentURL: data.url("icons/16.png"),
    panel: remote_panel
});