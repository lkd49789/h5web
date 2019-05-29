(function(data) {
	data.getInfo = function(succ) {
		$.ajax({
			url:"https://snhwxapi.48.cn/fans/api/poker/v1/pokerIndex",
			type: "post",
			contentType: "application/json; charset=utf-8",

			timeout: 5000,
			success: function(data) {
				succ(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				              // alert("eee");
			}
		});
	};
}(window.main = {}));