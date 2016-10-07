var controller = angular.module('oscApp', []);

controller.controller('OscCtrl', ['$http', '$location', function($http, $location) {
	var self = this;

	function createCookie(name,value,days) {
	  if (days) {
	      var date = new Date();
	      date.setTime(date.getTime()+(days*24*60*60*1000));
	      var expires = "; expires="+date.toGMTString();
	  }
	  else var expires = "";
	  document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}

	function eraseCookie(name) {
	    createCookie(name,"",-1);
	}
	createCookie('ppkcookie','2',7);

	self.carregarDadosGerais = function(){
		var idOsc = readCookie('ppkcookie');
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
//				console.log(readCookie('ppkcookie'));
			}
		});
	};
}]);
