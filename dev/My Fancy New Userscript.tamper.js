// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/nagios/cgi-bin/cmd.cgi
// @match      https://*/nagios/cgi-bin/cmd.cgi
// @copyright  2012+, You
// ==/UserScript==

console.log(document.referrer);

   setTimeout(function () {
       window.location.href = document.referrer;
    }, 1500);

$("form, div, table, tr, td").each(function(i) {
   $(this).attr("id", this.nodeName.toLowerCase() + "_" + i);
});
