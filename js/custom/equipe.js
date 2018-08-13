"use strict";require(["rotas","jquery-ui"],function(e){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,i){$(this).css(e),$("<div>").addClass("arrow").addClass(i.vertical).addClass(i.horizontal).appendTo(this)}}}),jQuery(document).ready(function(e){e(".scroll").click(function(i){i.preventDefault(),e("html,body").animate({scrollTop:e(this.hash).offset().top},800)})});var i=new Rotas;$.ajax({url:i.ModuloEquipe(),type:"GET",dataType:"json",error:function(e){console.log("ERRO no AJAX :"+e),$(".manutencao").css("display","block"),$(".loading").addClass("hide")},success:function(e){if(e.length>0){var i="this.src='img/sem_img_user.png'",s="",o='<div class="row"><div class="col-md-12"><h1 class="text-primary">'+e[0].equipe[0].tx_titulo_equipe+"</h1><hr></div></div>";if(o+='<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+e[0].equipe[0].tx_sub_titulo_equipe+"</h3>",o+='<div class="text-justify txtBloco">'+e[0].equipe[0].tx_descricao_equipe+"</div>",o+="</div></div>",e[0].versoes.length>0){o+='<ul class="media-list">';for(var r in e[0].versoes){if(o+='<li class="media"><div class="media-left"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div>',o+='<div class="media-body"><h4 class="media-heading">'+e[0].versoes[r].tx_titulo_versao+"</h4>",o+='<h5 class="media-heading">'+e[0].versoes[r].tx_descricao_itens+"</h5>",o+='<dl class="dl-horizontal">',e[0].versoes[r].coordenadores.length>0){o+="<dt>Coordenadores</dt>";for(var a in e[0].versoes[r].coordenadores)s=null!=e[0].versoes[r].coordenadores[a].tx_imagem_equipe&&""!=e[0].versoes[r].coordenadores[a].tx_imagem_equipe?"/cms/imagens/integrantes/xs-"+e[0].versoes[r].coordenadores[a].tx_imagem_equipe:"img/sem_img_user.png",""!=e[0].versoes[r].coordenadores[a].tx_url_equipe?o+='<dd><a href="'+e[0].versoes[r].coordenadores[a].tx_url_equipe+'" title="Site externo" target="_blank"><img class="img-circle imgEquipe" src="'+s+'" height="32" width="32" onerror="'+i+';"></img>'+e[0].versoes[r].coordenadores[a].tx_nome_equipe+"</a></dd>":o+='<dd><img class="img-circle imgEquipe" src="'+s+'" height="32" width="32" onerror="'+i+';"></img>'+e[0].versoes[r].coordenadores[a].tx_nome_equipe+"</dd>"}if(o+="<dt>Equipe Técnica</dt><dd>",e[0].versoes[r].coordenadores_equipe.length>0)for(var a in e[0].versoes[r].coordenadores_equipe)s=null!=e[0].versoes[r].coordenadores_equipe[a].tx_imagem_equipe&&""!=e[0].versoes[r].coordenadores_equipe[a].tx_imagem_equipe?"/cms/imagens/integrantes/xs-"+e[0].versoes[r].coordenadores_equipe[a].tx_imagem_equipe:"img/sem_img_user.png",""!=e[0].versoes[r].coordenadores_equipe[a].tx_url_equipe?o+='<div><span><a href="'+e[0].versoes[r].coordenadores_equipe[a].tx_url_equipe+'" title="Site externo" target="_blank"><img class="img-circle imgEquipe" src="'+s+'" height="32" width="32" onerror="'+i+';"></img>'+e[0].versoes[r].coordenadores_equipe[a].tx_nome_equipe+"</a><i> (coordenador técnico)</i></span></div>":o+='<div><span><img class="img-circle imgEquipe" src="'+s+'" height="32" width="32"  onerror="'+i+';"></img>'+e[0].versoes[r].coordenadores_equipe[a].tx_nome_equipe+"</span><i> (coordenador técnico)</i></div>";if(e[0].versoes[r].equipe.length>0)for(var a in e[0].versoes[r].equipe)s=null!=e[0].versoes[r].equipe[a].tx_imagem_equipe&&""!=e[0].versoes[r].equipe[a].tx_imagem_equipe?"/cms/imagens/integrantes/xs-"+e[0].versoes[r].equipe[a].tx_imagem_equipe:"img/sem_img_user.png",""!=e[0].versoes[r].equipe[a].tx_url_equipe?o+='<div><span><a href="'+e[0].versoes[r].equipe[a].tx_url_equipe+'" title="Site externo" target="_blank"><img class="img-circle imgEquipe" src="'+s+'" height="32" width="32" onerror="'+i+';"></img>'+e[0].versoes[r].equipe[a].tx_nome_equipe+"</a></span></div>":o+='<div><span><img class="img-circle imgEquipe" src="'+s+'" height="32" width="32"  onerror="'+i+';"></img>'+e[0].versoes[r].equipe[a].tx_nome_equipe+"</span></div>";o+="</dd>",o+='</dl><a href="#header" name="header" class="scroll topo">Voltar para o topo</a></li>'}o+="</ul>"}$("#equipe").prepend(o)}else $(".manutencao").css("display","block");$(".loading").addClass("hide")}})});