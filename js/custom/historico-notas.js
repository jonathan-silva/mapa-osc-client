"use strict";require(["rotas","jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,s){$(this).css(a),$("<div>").addClass("arrow").addClass(s.vertical).addClass(s.horizontal).appendTo(this)}}}),jQuery(document).ready(function(s){s(".scroll").click(function(a){a.preventDefault(),s("html,body").animate({scrollTop:s(this.hash).offset().top},800)})});var s=new Rotas;$.ajax({url:s.ModuloBySlug("historico_notas"),type:"GET",dataType:"json",error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(a){if(0<a.length){var s='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+a[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>";for(var l in s+='<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+a[0].modulos.tx_descricao_modulo+"</div></div></div>",s+='<div class="col-md-12">',s+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">',a[0].itens){var o="heading_"+l,i="collapse_"+l;s+='<div class="panel panel-default">',s+='<a role="button" data-toggle="collapse" data-parent="#accordion" href="#'+i+'" aria-expanded="true" aria-controls="#'+i+'">',s+='<div class="panel-heading" role="tab" id="'+o+'">',s+='<h4 class="panel-title"><b>'+a[0].itens[l].tx_titulo_itens+"</b>",s+='<span class="glyphicon glyphicon-plus" style="float:right" aria-hidden="true"></span></h4></div></a>',s+='<div id="'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="'+o+'">',s+='<div class="panel-body">'+a[0].itens[l].tx_descricao_itens+"</div></div></div>"}s+="</div></div>",$("#historico_notas").append(s)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});