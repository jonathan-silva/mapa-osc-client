"use strict";require(["jquery-ui"],function(o){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(o,a){$(this).css(o),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),jQuery(document).ready(function(a){a(".scroll").click(function(o){o.preventDefault(),a("html,body").animate({scrollTop:a(this.hash).offset().top},800)})})}),require(["rotas","jquery-ui"],function(o){var a=new Rotas;$.ajax({url:a.ModuloApoio(),type:"GET",dataType:"json",error:function(o){console.log("ERRO no AJAX :"+o),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(o){if(0<o.length){var a="";for(var t in o){var i="/cms/imagens/apoios/"+o[t].tx_imagem_apoio;a+='<div class="img-apoio"><a target="_blank" href="'+o[t].tx_link_apoio+'" title="Link externo '+o[t].tx_titulo_apoio+'">',a+="<img src="+i+" alt="+o[t].tx_titulo_apoio+"></a></div>"}$("#apoio").append(a)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});