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

function abrirProjeto(e) {
	var id = $(e).attr("data");
	$(id).toggle("slow");
	$(e).find("span").toggleClass( "glyphicon-minus" );
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

var jsonModalAjuda = {
	"Dados Gerais":"textos de <b>ajuda</b>  1",
 	"Áreas de Atuação":"textos de ajuda  2",
 	"Descrição da OSC":"textos de ajuda  3",
 	"Titulações e Certificações":"textos de ajuda  4",
 	"Relações de Trabalho":"textos de ajuda  5",
 	"Espaços de Participação Social":"textos de <b>ajuda  6</b>",
 	"Projetos, atividades e/ou programas":"textos de ajuda  7",
 	"Fonte de recursos anual da OSC":"textos de ajuda  8"
};

function abrirModalAjuda(titulo) {

	var	corpo = jsonModalAjuda[titulo];
	var tituloCompleto = "Ajuda - Campos de "+titulo;
	acionarModalAjuda(tituloCompleto, corpo);
}

function acionarModalAjuda(titulo, corpo) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
  $("#modalAjuda").modal('show');
  verificarContraste();
}

function validateObject(obj){
  if(obj === null){
    return false;
  }
  if(Object.keys(obj).length === 0 && obj.constructor === Object){
    return false;
  }
  return true;
}
