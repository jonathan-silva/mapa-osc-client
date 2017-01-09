var controller = angular.module('oscApp', []);

controller.controller('OscCtrl', ['$http', '$location', function($http, $location) {
	var self = this;

	self.carregarDadosGerais = function(){
		var idOsc = $location.path().split('/')[1];
		//var url = 'http://localhost:8080/api/osc/' + idOsc;

		var url = 'http://localhost:8383/api/osc/' + idOsc;

		$http.get(url).then(function(response) {
			if(response.data.msg == undefined){
				self.osc = response.data;
	    	self.msg = '';
			}else{
				self.msg = response.data.msg;
			}
		});
	};
}]);
