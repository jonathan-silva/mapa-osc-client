"use strict";require(["rotas","jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,l){$(this).css(a),$("<div>").addClass("arrow").addClass(l.vertical).addClass(l.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(l){l.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})});var l=new Rotas;l.getBaseUrlCMS();$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"consulta",rota:l.ModuloBySlug("historico_notas")},error:function(a){console.log("ERRO no AJAX :"+a),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(a){if(a.length>0){var l='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+a[0].modulos.tx_titulo_modulo+"</h1><hr></div></div>";for(var s in l+='<div class="row"><div class="col-md-12"><div class="text-justify txtBloco">'+a[0].modulos.tx_descricao_modulo+"</div></div></div>",l+='<div class="col-md-12">',l+='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">',a[0].itens){var o="heading_"+s,t="collapse_"+s;l+='<div class="panel panel-default">',l+='<a role="button" data-toggle="collapse" data-parent="#accordion" href="#'+t+'" aria-expanded="true" aria-controls="#'+t+'">',l+='<div class="panel-heading" role="tab" id="'+o+'">',l+='<h4 class="panel-title"><b>'+a[0].itens[s].tx_titulo_itens+"</b>",l+='<span class="glyphicon glyphicon-plus" style="float:right" aria-hidden="true"></span></h4></div></a>',l+='<div id="'+t+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="'+o+'">',l+='<div class="panel-body">'+a[0].itens[s].tx_descricao_itens+"</div></div></div>"}l+="</div></div>",$("#historico_notas").append(l)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});