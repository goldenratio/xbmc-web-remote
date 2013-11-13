XBMC Remote Control
===================

XBMC Remote Control using Web Sockets. (Frodo v12 and above)

[![Build Status](https://travis-ci.org/goldenratio/xbmc-web-remote.png?branch=master)](https://travis-ci.org/goldenratio/xbmc-web-remote)

**Live Web Demo:** http://goldenratio.github.io/xbmc-web-remote/remote/remote.html

**Chrome Extension:** Install from Chrome WebStore, https://chrome.google.com/webstore/detail/xbmc-remote-control/jgannjdjlpnoibphpbmmfjkejcfhcmjp?hl=en-US

**Firefox Browser Add-on:** Download xpi file, http://goldenratio.github.io/xbmc-web-remote/firefox_addon/xbmc-remote.xpi

**Firefox OS:** Install from Marketplace, https://marketplace.firefox.com/app/xbmc-remote-control

**Opera 11-12 add-on (legacy):** https://addons.opera.com/en/extensions/details/xbmc-remote/

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

**Compile Chrome Extension**

1. Run ant target "package_chrome_extension".
2. Build files will be generated in target folder.
3. Zip file in target folder is used for Chrome WebStore.
4. `target/chrome_extension/xbmc_remote` can loaded directly to Chrome as unpacked extension in Developer mode.

**Compile Firefox OS App**

1. Run ant target "package_firefox_OS_app".
2. Build files will be generated in target folder.
3. Zip file in target folder is used for Firefox OS Marketplace.
4. `target/fxosapp/xbmc_remote` can loaded directly using Firefox OS simulator add-on.


**Compile Firefox Browser Add-on**

1. Run ant target "package_firefox_addon".
2. Build files will be generated in target folder.
3. xpi file in target folder, is used for distribution.
3. `target/firefox_addon/xbmc_remote` can be loaded directly to firefox using CFX command line tool, more details [here](https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/tutorials/getting-started-with-cfx.html)
  1. Open terminal and enter `source bin/activate`
  2. Navigate to folder `target/firefox_addon/xbmc_remote/`
  3. Enter `cfx run` will run an instance of Firefox with add-on installed.

**Compile Opera 11-12 extension**

1. Run ant target "package_opera_legacy".
2. Build files will be generated in target folder.
3. oex file in target folder, is used for distribution.
4. `target/opera_legacy_extension/xbmc_remote` can loaded directly to Opera. Just drag and drop `config.xml` to Opera.


**Compile Ubuntu Click App**

1. Run ant target "package_ubuntu_click_app".
2. Build files will be generated in target folder.
3. *.click file in "target/ubuntuapp" folder is used for distribution

