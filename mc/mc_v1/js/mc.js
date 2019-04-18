document.getElementById("confirmBtn").addEventListener('tap', function() {
		var btnArray = ['好的'];
		mui.confirm('信息', '', btnArray, function(e) {
//			if (e.index == 0) {
//				info.innerText = '你刚确认MUI是个好框架';
//			} else {
//				info.innerText = 'MUI没有得到你的认可，继续加油'
//			}
		})
});	