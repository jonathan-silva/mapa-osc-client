"use strict";require(["rotas","jquery-ui"],function(s){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(s,i){$(this).css(s),$("<div>").addClass("arrow").addClass(i.vertical).addClass(i.horizontal).appendTo(this)}}}),jQuery(document).ready(function(i){i(".scroll").click(function(s){s.preventDefault(),i("html,body").animate({scrollTop:i(this.hash).offset().top},800)})});var i=new Rotas;$.ajax({url:i.ModuloBySlug("tutorial"),type:"GET",dataType:"json",error:function(s){console.log("ERRO no AJAX :"+s),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(s){if(0<s.length){var i='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+s[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>";if(i+='<div class="row"><div class="col-md-12">'+s[0].modulos.tx_descricao_modulo+"</div></div>",0<s[0].itens.length){for(var o in i+='<div class="row"><div class="col-md-12"><ul class="media-list">',s[0].itens)i+='<li class="media tutorial"><div class="media-left"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div><div class="media-body">',i+='<h4 class="media-heading">'+s[0].itens[o].tx_titulo_itens+"</h4>",i+='<div class="text-justify txtBloco">'+s[0].itens[o].tx_descricao_itens+"</div></div></li>";i+="</div></div></ul>"}$("#tutorial").prepend(i)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});