// ==UserScript==
// @name       NagiosQuick
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match       http://*/cgi-bin/extinfo.cgi*
// @match       http://*/nagios/cgi-bin/extinfo.cgi*
// @match       https://*/cgi-bin/extinfo.cgi*
// @match       https://*/nagios/cgi-bin/extinfo.cgi*
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     http://code.jquery.com/ui/1.9.2/jquery-ui.js
// @resource    uis  http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @copyright  2012+, You
// ==/UserScript==

GM_addStyle (GM_getResourceText ("uis") );

Date.prototype.toLocaleFormat = function(format) {
	var f = {y : this.getYear() + 1900,m : this.getMonth() + 1,d : this.getDate(),H : this.getHours(),M : this.getMinutes(),S : this.getSeconds()};
	for (k in f) format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
	return format;
};

var today = new Date();
var add1 = new Date();
var add2 = new Date();
var add12 = new Date();
today.setHours(today.getHours()-1); // use CET
add1.setHours(today.getHours()+1);
add2.setHours(today.getHours()+2);
add12.setHours(today.getHours()+12);

var im = $( "i:eq( 0 )" ).css( "white-space", "nowrap" );

$(document).ready(function(){
    var $form = $('<form action="cmd.cgi" method="post"> \
    <input type="HIDDEN" name="cmd_typ" value="55"> \
    <input type="HIDDEN" name="cmd_mod" value="2"> \
    <input type="HIDDEN" name="host" value="' + nagios_get_host_name() + '"> \
    <input type="HIDDEN" name="com_data" value="Temporarily suspended by ' + im.text() + '"> \
    <input type="HIDDEN" name="trigger" value="0"> \
    <input type="HIDDEN" name="start_time" value="' + today.toLocaleFormat("%d-%m-%y %H:%M:%S") + '"> \
    <input type="HIDDEN" name="fixed" value="1"> \
    <input type="HIDDEN" name="hours" value="2"> \
    <input type="HIDDEN" name="minutes" value="0"> \
    <input type="HIDDEN" name="childoptions" value="0"> \
    <div>\
    <div id="radio"> \
    <input type="radio" id="radio1" name="end_time" value="' + add1.toLocaleFormat("%d-%m-%y %H:%M:%S") + '" checked="checked" /><label for="radio1">1hr</label> \
    <input type="radio" id="radio2" name="end_time" value="' + add2.toLocaleFormat("%d-%m-%y %H:%M:%S") + '" /><label for="radio2">2hr</label> \
    <input type="radio" id="radio3" name="end_time" value="' + add12.toLocaleFormat("%d-%m-%y %H:%M:%S") + '" /><label for="radio3">12 hr</label> \
    </div> \
	<button type="submit" name="btnSubmit" value="Commit" id="btnSubmit">Schedule</button></div>\
	</form>');
    $form.appendTo($( "td:eq( 3 )" ).css( "border", "none" ));
         
    $( "#btnSubmit" ).button();    
    $( "#radio" ).buttonset();
});