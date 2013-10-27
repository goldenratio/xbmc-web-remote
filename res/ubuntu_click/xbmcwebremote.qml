import QtQuick 2.0
import Ubuntu.Components 0.1
import Ubuntu.Components.Extras.Browser 0.1

/*!
    \brief MainView with a Flickable WebView.
*/

MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    objectName: "mainView"
    
    // Note! applicationName needs to match the "name" field of the click manifest
    applicationName: "com.ubuntu.developer.goldenratio.xbmcwebremote"
    
    /* 
     This property enables the application to change orientation 
     when the device is rotated. The default is false.
    */
    automaticOrientation: true
    
    width: units.gu(100)
    height: units.gu(75)
    
    Flickable {
        id: webViewFlickable
        anchors.fill: parent
        
        UbuntuWebView {
            id: webView
            anchors.fill: parent
            url: "remote.html"
        }
    }
}
