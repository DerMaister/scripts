// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://derry.gotdns.org/tmp/h.html
// @match      http://*/nagios/cgi-bin/cmd.cgi
// @copyright  2012+, You
// ==/UserScript==

console.log(document.referrer);

   setTimeout(function () {
       window.location.href = document.referrer;
    }, 1500);