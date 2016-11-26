var controller = angular.module('oscApp', []);
var idOsc;

controller.controller('OscCtrl', ['$http', '$location', function($http, $location) {
	var self = this;
	var rotas = new Rotas();//rotas.js
	//createCookie('ppkcookie','2',7);
 //console.log(readCookie('cookieDetalhar'));
	self.carregarDadosGerais = function(){
		idOsc = $location.path().split('/')[1];//readCookie('cookieDetalhar');
		var url = rotas.OSCByID(idOsc);

		$http.get(url).then(function(response) {
      //console.log(response);
			if(response.data.msg == undefined){
				self.osc = response.data;
	    	self.msg = '';
        //console.log(self.osc);
			}else{
				self.msg = response.data.msg;
        //console.log(self.msg);
			}
		});
	};
}]);

function vai(e) {
	var id = $(e).attr("data");
	$(id).toggle("slow");
}


require(["jquery-ui"], function (React) {


  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

	jQuery(document).ready(function($) {
$("#btnEditar").attr("href","editar-osc.html#/"+idOsc);
	    $(".scroll").click(function(event){
	        event.preventDefault();
	        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
	   });
	});

});

function validateObject(obj){
  if(obj === null){
    return false;
  }
  if(Object.keys(obj).length === 0 && obj.constructor === Object){
    return false;
  }
  return true;
}
