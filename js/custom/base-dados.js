"use strict";require(["rotas","jquery-ui"],function(s){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(s,o){$(this).css(s),$("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}}),jQuery(document).ready(function(o){o(".scroll").click(function(s){s.preventDefault(),o("html,body").animate({scrollTop:o(this.hash).offset().top},800)})});var o=new Rotas;$.ajax({url:o.ModuloBySlug("base_dados"),type:"GET",dataType:"json",error:function(s){console.log("ERRO no AJAX :"+s),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(s){if(0<s.length){var o=new Date,i=function(s,o){return s+" de "+o}(function(s){var o=new Array(12);return o[0]="Janeiro",o[1]="Fevereiro",o[2]="Março",o[3]="Abril",o[4]="Maio",o[5]="Junho",o[6]="Julho",o[7]="Agosto",o[8]="Setembro",o[9]="Outubro",o[10]="Novembro",o[11]="Dezembro",o[s]}(o.getMonth()),o.getFullYear()),a='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+s[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>";if(a+='<div class="row"><div class="col-md-12 txt_datahora">'+s[0].modulos.tx_descricao_modulo+"<b>&nbsp;"+i+"</b>.</div></div>",0<s[0].itens.length){for(var t in a+='<div class="row"><div class="col-md-12"><ul class="media-list">',s[0].itens)a+='<li class="media tutorial"><div class="media-left"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div><div class="media-body">',a+='<h4 class="media-heading">'+s[0].itens[t].tx_titulo_itens+"</h4>",a+='<div class="text-justify">'+s[0].itens[t].tx_descricao_itens+"</div></div></li>";a+="</div></div></ul>"}$("#base_dados").prepend(a)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});