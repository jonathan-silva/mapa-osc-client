"use strict";require(["jquery-ui"],function(t){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(t,o){$(this).css(t),$("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}}),jQuery(document).ready(function(t){t(".scroll").click(function(o){o.preventDefault(),t("html,body").animate({scrollTop:t(this.hash).offset().top},800)})})}),require(["react","rotas","jsx!components/Util"],function(t){require(["componenteLinksUteis"],function(o){var n=new Rotas;$.ajax({url:n.ModuloLinks(),type:"GET",dataType:"json",error:function(t){console.log("ERRO no AJAX :"+t)},success:function(n){var e=[];if(n.length>0)for(var i in n){var s="/cms/imagens/links/xs-"+n[i].tx_imagem_link;e.push(new function(t,o,n,e,i){this.titulo=t,this.desc=o,this.imagem=n,this.elo=e,this.linkExterno=i}(n[i].tx_titulo_link,n[i].tx_descricao_link,s,n[i].tx_link_link,!0))}o=t.createFactory(o),ReactDOM.render(o({dados:e}),document.getElementById("linksuteis_formato_dados")),$(".loading").addClass("hide")}})})});