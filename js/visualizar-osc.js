var controller = angular.module('oscApp', []);

controller.controller('OscCtrl', ['$http', '$location', function($http, $location) {
	var self = this;

	//createCookie('ppkcookie','2',7);
 console.log(readCookie('cookieDetalhar'));
	self.carregarDadosGerais = function(){
		var idOsc = $location.path().split('/')[1];//readCookie('cookieDetalhar');
		var url = 'http://mapaosc-desenv.ipea.gov.br:8383/api/osc/'+ idOsc; //rotas.OSCByID(id)'

		$http.get(url).then(function(response) {
      console.log(response);
			if(response.data.msg == undefined){
				self.osc = response.data;
	    	self.msg = '';
        console.log(self.osc);
			}else{
				self.msg = response.data.msg;
        console.log(self.msg);
			}
		});
	};
}]);
