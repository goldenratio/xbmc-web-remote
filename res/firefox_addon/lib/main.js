/**
 * Firefox addon
 * @author Karthik VJ
 * @source https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/panel
 */


var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
    id: "kassi-remote-button",
    label: "Kassi",
    icon: {
        "16": "./icons/16.png",
        "32": "./icons/32.png",
        "64": "./icons/64.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    width: 340,
    height: 520,
    contentURL: self.data.url("remote.html"),
    onHide: handleHide
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}
