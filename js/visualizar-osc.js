var controller = angular.module('oscApp', []);
var idOsc;
var absUrl;

controller.controller('OscCtrl', ['$http', '$location', function($http, $location) {
	absUrl = $location.$$absUrl;
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

controller.filter('tel', function() {
	return function(input) {
		if(input !== null && input !== undefined  && input !== ""){
	  	var str = input+ '';
	    str = str.replace(/\D/g,'');
			if(str.length === 11 ){
				if(str[0] === 0){
					str=str.replace(/^(\d{4})(\d{3})(\d{4})/,'$1-$2-$3');
				}
				else{
					  str=str.replace(/^(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
				}
	    }
			else if(str.length === 10){
	    	str=str.replace(/^(\d{2})(\d{4})(\d{4})/,'($1) $2-$3');
	    }
			else if(str.length === 9){
	    	str=str.replace(/^(\d{0})(\d{5})(\d{4})/,'($1) $2-$3');
	    }
			else if(str.length === 8){
	        str=str.replace(/^(\d{0})(\d{4})(\d{4})/,'($1) $2-$3');
	    }
	    return str;
		}
		return "Não informado";
  };
});

function abrirProjeto(e) {
	var id = $(e).attr("data");
	$(id).toggle("slow");
	$(e).find(".glyphicon").toggleClass( "glyphicon-minus" );
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

			verificarBotaoEditar(idOsc);
	    $(".scroll").click(function(event){
	        event.preventDefault();
	        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
	   });
		 window.onload = function () {
				 verificarContraste();
		 };

	});

});

var jsonModalAjuda = {
	"Dados Gerais":"Os campos abaixo trazem informações mais gerais sobre a OSC. Essas informações podem ser preenchidas ou editadas pelo(a) representante da OSC cadastrado(a) no Mapa, com a exceção do endereço, que é informação oficial proveniente da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho.",
 	"Áreas e Subáreas de Atuação da OSC":"A seção informa, em primeiro lugar, a atividade econômica da OSC proveniente da declaração da RAIS (Relação Anual de Informações Sociais) do Ministério do Trabalho. Informações adicionais acerca de outras áreas e subáreas de atuação da organização podem ser adicionadas pelo representante da OSC.",
 	"Descrição da OSC":"Aqui a OSC pode contar um pouco de sua história, identificar a sua missão e visão (quando houver) e finalidades (previstas no seu estatuto). Os campos podem ser preenchidos pelo(a) representante da OSC cadastrado(a) no Mapa.",
 	"Titulações e Certificações":"Essa seção indica os títulos (Utilidade pública estadual ou municipal), qualificações (OSCIP) e certificações (CEBAS) concedidos pelo Poder Público à OSC.<br><br>Para saber mais sobre cada um dos títulos ou certificações, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
 	"Relações de Trabalho e Governança":"Aqui o(a) representante da OSC pode indicar nominalmente quem compõe o quadro de dirigentes e de conselheiros da sua organização, além de preencher o número de trabalhadores voluntários da entidade. Isso garante transparência para quem busca informações sobre a OSC. Os campos relativos ao número de empregados formais provêm das informações lançadas na RAIS/MTE.",
 	"Espaços de Participação Social":"Nesse espaço, o(a) representante da OSC pode indicar a participação em espaços colegiados com o Poder Público (conselhos de políticas públicas), as oportunidades que teve de integrar espaços que traçaram diretrizes de políticas (conferências de políticas públicas), bem como outros espaços de participação compartilhados com o Poder Público ou autoorganizados pela própria sociedade civil (fóruns, redes etc.).<br><br>Para saber mais sobre cada um dos espaços de participação social, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
 	"Projetos, atividades e/ou programas":"Nesse espaço, o(a) representante da OSC pode trazer com riqueza de informações os trabalhos que a organização desenvolve (em projetos, atividades ou programas), especificando suas fontes de recursos, público envolvido, dentre outras informações. Aqui constarão também as informações oficiais de parcerias celebradas com o Poder Público, em respeito à Lei de Acesso à Informação.<br><br>Para saber mais sobre os termos referentes a parcerias e fontes de recursos das OSCs, visite o nosso <a href='glossario.html' class='' target='_blank' title='Link para glossário' >Glossário</a>.",
 	"Fonte de recursos anual da OSC":"Essa seção informa o somatório de todos os recursos por fonte autodeclarados pela OSC ano a ano."
};

function abrirModalAjuda(titulo) {

	var	corpo = jsonModalAjuda[titulo];
	var tituloCompleto = "Ajuda - "+titulo;
	var btn = "<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>";

	acionarModalAjuda(tituloCompleto, corpo, btn);
}

function abrirModalRelatorio(titulo) {

	var	corpo = "<fieldset id='escolhaImpressao'><legend>Escolha quais seções para imprimir</legend>";
	corpo += "<input type='checkbox' name='secao' value='dados_gerais' checked> Dados Gerais<br>";
  corpo += "<input type='checkbox' name='secao' value='areas_de_atuacao' checked> Áreas e Subáreas de Atuação da OSC<br>";
	corpo += "<input type='checkbox' name='secao' value='descricao' checked> Descrição da OSC<br>";
	corpo += "<input type='checkbox' name='secao' value='titulacao' checked> Titulações e Certificações<br>";
	corpo += "<input type='checkbox' name='secao' value='relacao_trabalho' checked> Relações de Trabalho e Governança<br>";
	corpo += "<input type='checkbox' name='secao' value='participacao_social' checked> Espaços de Participação Social<br>";
	corpo += "<input type='checkbox' name='secao' value='projetos' checked> Projetos, atividades e/ou programas<br>";
	corpo += "<input type='checkbox' name='secao' value='recursos' checked> Fonte de recursos anual da OSC<br>";
	corpo += "</fieldset>";

	var btn = "<button type='button' class='btn btn-success' data-dismiss='modal' onclick='imprimir()'>Imprimir</button>";
	btn += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>";

	var tituloCompleto = "Gerar "+titulo;
	acionarModalAjuda(tituloCompleto, corpo, btn);
}

function acionarModalAjuda(titulo, corpo, btn) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
	$("#btnFooter").html("");
	$("#btnFooter").html(btn);
  $("#modalAjuda").modal('show');
  verificarContraste();
}

function imprimir(){

	$("#escolhaImpressao input:checkbox[name=secao]:not(:checked)").each(function(){
	  valor = $(this).val();
		$("#"+valor).hide();
	});

	$("#modalAjuda").hide();
	if(window.print){
		window.print();
	}
	window.location.href = absUrl;
	window.location.reload();
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

function verificarBotaoEditar(id){
	if(verificarPermissaoBotao(id)){
		$(".btnEditar").append('<a id="btnEditar" type="button" title="Clique para Editar"  class="btn btn-info btn-sm">Editar OSC</a>');
		$("#btnEditar").attr("href","editar-osc.html#/"+id);
	}
}

function verificarPermissaoBotao(id){
	var osc  = JSON.parse(window.localStorage.getItem('Osc'));
	if(osc != "undefined" && osc !== null){
		for (var i = 0; i < osc.length; i++) {
			if (osc[i] == id) {
     		return true;
   		}
		}
	}
	return false;
}
