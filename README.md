XBMC Remote Control
===================

XBMC Remote Control using Web Sockets. (Frodo v12 and above)

Live Web Demo: http://goldenratio.github.io/xbmc-web-remote/remote/remote.html

**Chrome Extension:** Install from Chrome WebStore, https://chrome.google.com/webstore/detail/xbmc-remote-control/jgannjdjlpnoibphpbmmfjkejcfhcmjp?hl=en-US

**Firefox Browser Add-on:** Download xpi file, http://goldenratio.github.io/xbmc-web-remote/firefox_addon/xbmc-remote.xpi

**Firefox OS:** Install from Marketplace, https://marketplace.firefox.com/app/xbmc-remote-control



**Standalone Executable**
-------------------------

1. Linux 32 bit - https://www.dropbox.com/s/864763xzz1tarhw/linux_32.tgz?dl=1
2. Windows - https://www.dropbox.com/s/xzotd1j9fjeo3ie/win.zip?dl=1


**Requirements**:
----------------
1. Works with XBMC Frodo (v12) and above.
2. You need to enable "Allow program on other system to control XBMC" option. You can find this under,
   `System > Settings > Services > Remote Control`


**Building Project:**
-------------------

**Compile for Chrome Extension**

1. Run ant target "package_chrome_extension".
2. Build files will be generated in target folder.
3. Zip file in target folder is used for Chrome WebStore.
4. `target/chrome_extension/xbmc_remote` can loaded directly to Chrome as unpacked extension in Developer mode.

**Compile for Firefox OS**

1. Run ant target "package_firefox_OS_app".
2. Build files will be generated in target folder.
3. Zip file in target folder is used for Firefox OS Marketplace.
4. `target/fxosapp/xbmc_remote` can loaded directly using Firefox OS simulator add-on.


**Compile for Firefox Browser Add-on**

1. Run ant target "package_firefox_addon".
2. Build files will be generated in target folder.
3. CFX command line too is needed, more details [here](https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/tutorials/getting-started-with-cfx.html)
  1. Open terminal and enter `source bin/activate`
  2. Navigate to folder `target/firefox_addon/xbmc_remote/`
  3. Enter `cfx run` will run an instance of Firefox with add-on installed.
  4. Enter `cfx xpi` build an installable XPI file to distribute.

