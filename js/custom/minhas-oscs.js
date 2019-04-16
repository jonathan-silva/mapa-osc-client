"use strict";require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,t){$(this).css(a),$("<div>").addClass("arrow").addClass(t.vertical).addClass(t.horizontal).appendTo(this)}}}),jQuery(document).ready(function(t){t(".scroll").click(function(a){a.preventDefault(),t("html,body").animate({scrollTop:t(this.hash).offset().top},800)})})}),require(["react","jsx!components/Util","jquery-ui","rotas","datatables-responsive","simplePagination"],function(a){var t=window.localStorage.getItem("User"),e={User:t,Authorization:window.localStorage.getItem("Authorization")},o={};o.headers=e;var n=new Rotas;$.ajax({url:n.ValidarUsuario(t),type:"GET",dataType:"json",data:o,success:function(a){console.log(a);for(var t=a.representacao.length,e=new Array(t),o=0,n=0;n<a.representacao.length;n++)e[o]=new Array(3),e[o][0]=null!==a.representacao[n].tx_nome_osc?a.representacao[n].tx_nome_osc:"Dado não informado.",e[o][1]='<button title="Clique para Detalhar" type="button" onclick="location.href=\'visualizar-osc.html#/'+a.representacao[n].id_osc+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>',e[o][2]='<button title="Clique para Editar" type="button" onclick="location.href=\'editar-osc.html#/'+a.representacao[n].id_osc+'\';" class="btn btn-info"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar</button>',o++;if(void 0!==e[0]){var r=$("#lista_minhas_oscs").DataTable({responsive:!0,processing:!0,deferLoading:1e3,deferRender:!0,searching:!1,data:e,dom:"Bfrtip",bPaginate:!1,bSort:!0,aaSorting:[[1,"asc"]],columns:[{title:"Nome da OSC"},{title:"Detalhar"},{title:"Editar"}],aoColumnDefs:[{bSortable:!1,aTargets:[0]},{bSortable:!1,aTargets:[1]},{bSortable:!1,aTargets:[2]}],autoWidth:!0});r.destroy(),r.draw(),$("#loading").addClass("hide")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada"),$("#modalMensagem").modal("show")},error:function(a){$("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Erro"),$("#modalConteudo").text("É necessário estar logado no sistema para acessar essa página."),$(".modal-footer button").on("click",function(){history.go(-1)}),$("#modalMensagem").modal("show")}}),$("#lista_minhas_oscs").on("draw.dt",function(){verificarContraste()})});