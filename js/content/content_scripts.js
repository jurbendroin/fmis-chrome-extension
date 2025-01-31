// console.log('run content_script.js');

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    // th.appendChild(s);
    th.insertBefore(s, th.firstChild);
}
injectScript( chrome.extension.getURL('/config.js'), 'html');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log('sender, request', sender, request);
	var current_url = window.location.href;
	if(request.type == 'response-fecth-url'){
		var res = request.data;
		var _alert = true;
		var hide_loading = true;
		if(res.action == 'get_ssh'){
			_alert = false;
			hide_loading = false;
			singkronisasi_ssh(res);
		}
		if(hide_loading){
			jQuery('#wrap-loading').hide();
			jQuery('#persen-loading').html('');
			jQuery('#persen-loading').attr('persen', '');
			jQuery('#persen-loading').attr('total', '');
		}
		if(_alert){
			alert(res.message);
		}
	}
	return sendResponse("THANKS from content_script!");
});