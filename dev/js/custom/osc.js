var controller = angular.module('oscApp', []);

controller.controller('OscCtrl', ['$http', '$location', function($http, $location) {
	var self = this;

	self.carregarDadosGerais = function(){
		var idOsc = $location.path().split('/')[1];
		
		$http({
		     url: rotas.OSCByID(idOsc),
		     method: "GET",
		}).then(function(response) {
			if(response.data.msg == undefined){
				self.osc = response.data;
	    	self.msg = '';
			}else{
				self.msg = response.data.msg;
			}
		});
	};
}]);
