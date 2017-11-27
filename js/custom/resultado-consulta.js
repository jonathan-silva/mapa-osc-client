"use strict";function getParameter(a,e){e||(e=location.href);var o="[\\?&]"+(a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"))+"=([^&#]*)",t=new RegExp(o).exec(e);return null==t?null:t[1]}require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}})});var urlRota,type_http;require(["rotas","jquery-ui","datatables-responsive","leafletCluster","simplePagination"],function(a){function e(a){return a=a.replace(/[ÀÁÂÃÄÅ]/g,"A"),a=a.replace(/[àáâãäå]/g,"a"),a=a.replace(/[ÉÈÊË]/g,"E"),a=a.replace(/[éèêë]/g,"e"),a=a.replace(/[ÍÌÎÏ]/g,"I"),a=a.replace(/[íìîï]/g,"i"),a=a.replace(/[ÓÒÔÕ]/g,"O"),a=a.replace(/[óòôõ]/g,"o"),a=a.replace(/[ÚÙÛÜ]/g,"U"),a=a.replace(/[úùûü]/g,"u"),a=a.replace(/[Ç]/g,"C"),a=a.replace(/[ç]/g,"c")}function o(a,e){var o;$("#loading").removeClass("hide"),$("#resultadoconsulta_formato_dados").hide(),e?(type_http="POST",o={flag:"consultaPost",rota:a,parametros:b}):(type_http="GET",o={flag:"consulta",rota:a}),$.ajax({url:"js/controller.php",type:type_http,dataType:"json",data:o,error:function(a){console.log("Erro no ajax: "+a)},success:function(a){if("Nenhuma Organização encontrada!"!==a){var e=a.length,o=new Array(e),t=0,n="Dado não informado.";for(var r in a)if("0"!=r){o[t]=new Array(6);var i=null!==a[r][4]?a[r][4]:"img/camera.jpg";o[t][0]='<img class="img-circle media-object" src='+i+' height="64" width="64">',o[t][1]=null!==a[r][0]?a[r][0]:n,o[t][2]=null!==a[r][1]?a[r][1]:n,o[t][3]=null!==a[r][2]?a[r][2]:n,o[t][4]=null!==a[r][3]?a[r][3]:n,o[t][5]='<button type="button" onclick="location.href=\'visualizar-osc.html#'+r+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>',t++}if(void 0!==o[0]){var l=$("#resultadoconsulta_formato_dados").DataTable({responsive:!0,processing:!0,deferLoading:1e3,deferRender:!0,searching:!1,data:o,dom:"Bfrtip",bPaginate:!1,bSort:!0,aaSorting:[[1,"asc"]],columns:[{title:"",width:50},{title:"Nome da OSC",width:200},{title:"CNPJ"},{title:"Natureza Jurídica"},{title:"Endereço"},{title:"Detalhar"}],aoColumnDefs:[{bSortable:!1,aTargets:[0]},{bSortable:!1,aTargets:[5]},{bSortable:!1,aTargets:[4]}],autoWidth:!0});l.destroy(),l.draw(),$("#resultadoconsulta_formato_dados").show(),$("#loading").addClass("hide")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==P&&"municipio"!==P?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(q)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==P&&"municipio"!==P?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(q)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}}),$("#resultadoconsulta_formato_dados").on("draw.dt",function(){verificarContraste()})}function t(a){for(var e in a)if("0"!=e){var o=function(a,e,o){if(""!==e&&null!==e||null!==o&&""!==o){var t=new PruneCluster.Marker(e,o);return t.data.ID=a,w.PrepareLeafletMarker=function(a,e){a.on("click",function(){!function(a,e){e.bindPopup('<img id="loading" src="img/loading.gif" style="padding-top: 10px; padding-left: 10px;"/>').openPopup(),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"consulta",rota:B.OSCPopUpByID(a)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(o){if(void 0!==o){var t=(null!==o.tx_endereco?o.tx_endereco:"")+" - "+(null!==o.tx_bairro?o.tx_bairro:""),n='<div class="mapa_organizacao clearfix"><span id="spantitle" class="magneticTooltip"><button id="title" class="btn-link"  onclick=location.href="visualizar-osc.html#'+a+'"><h4>'+(null!==o.tx_nome_osc?o.tx_nome_osc:"Dado não informado.")+'</h4></button></span><div class="coluna1"><strong></strong><strong>Endereço: </strong>'+t+"<br><strong>Atividade Econômica: </strong>"+(null!==o.tx_nome_atividade_economica?o.tx_nome_atividade_economica:"Dado não informado.")+"<br><strong>Natureza Jurídica: </strong>"+(null!==o.tx_nome_natureza_juridica?o.tx_nome_natureza_juridica:"Dado não informado.")+'<br><br><div align="center"><button type = button class="btn btn-info" onclick=location.href="visualizar-osc.html#'+a+'"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button></div></div></div>';e.bindPopup(n).openPopup()}}})}(e.ID,a)})},w.RegisterMarker(t),w}return null}(e,a[e][0],a[e][1]);null!==o&&T.addLayer(o)}$("#loadingMapModal").hide(),w.ProcessView()}function n(a){var e=a.target;e.setStyle({weight:5,color:"#666",dashArray:"",fillOpacity:.7}),L.Browser.ie||L.Browser.opera||e.bringToFront(),"GO"==e.feature.properties.Name&&e.bringToBack(),I.update(e.feature.properties)}function r(a){u.resetStyle(a.target),I.update()}function i(a){var e=a.target;T.fitBounds(e.getBounds())}function l(a){return a>6e4?"#800026":a>45e3?"#E31A1C":a>3e4?"#FC4E2A":a>15e3?"#FEB24C":a>1e3?"#FED976":"#FFEDA0"}function s(a,e){var l;"regiao"==e||"todos"==e?l="labelClassRegiao":"estado"==e&&(l="labelClassEstado");for(var u in a){var d=L.divIcon({id:a[u].id_regiao,className:l,html:"<p>"+a[u].nr_quantidade_osc_regiao+"</p>"});p[a[u].id_regiao]=a[u].nr_quantidade_osc_regiao;var _=function(a,e,l,u,d){if(""!==l&&null!==l||null!==u&&""!==u){var p;return"regiao"==d||"todos"==d?p=L.marker([l,u],{icon:a}).on("click",function(a){var e=a.target.options.icon.options.id;$("#loadingMapModal").show(),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"consulta",rota:B.ClusterEstadoPorRegiao(e)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(t){if(o(urlRota,C),void 0!==t.length){for(var n=0,r=0;r<t.length;r++)n+=t[r].nr_quantidade_osc_regiao;c(n)}else c(Object.keys(t).length-1);void 0!==t&&(T.setView([a.target._latlng.lat,a.target._latlng.lng],5),T.removeLayer(a.target),delete f[e],s(t,"estado"))}})}):"estado"==d&&(p=L.marker([l,u],{icon:a}).on("click",function(a){var e=a.target.options.icon.options.id;$("#loadingMapModal").show(),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"consulta",rota:B.OSCByStateInMap(e)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(l){if(o(urlRota,C),void 0!==l.length){for(var s=0,u=0;u<l.length;u++)s+=l[u].nr_quantidade_osc_regiao;c(s)}else c(Object.keys(l).length-1);if(void 0!==l){T.setView([a.target._latlng.lat,a.target._latlng.lng],6),T.removeLayer(a.target);var d=g[e];d.off(),d.on({mouseover:n,mouseout:r,click:i}),t(l)}}})})),p}}(d,a[u].id_regiao,a[u].geo_lat_centroid_regiao,a[u].geo_lng_centroid_regiao,e);h.addLayer(_),"estado"==e?m[a[u].id_regiao]=_:"regiao"!=e&&"todos"!=e||(f[a[u].id_regiao]=_)}v||(h.addTo(T),v=!0),$("#loadingMapModal").hide()}function c(a){$(".pagination").pagination({items:a,itemsOnPage:10,hrefTextPrefix:"#",prevText:"Anterior",nextText:"Próximo",onPageClick:function(a){!function(a){null===a&&(a=0);var e=10*parseInt(a)-10;"avancado"==P?(urlRota=B.ConsultaAvancadaLista(e),C=!0):"municipio"==P?urlRota=B.OSCByCounty(q,e):"estado"==P?urlRota=B.OSCByState(q,e):"regiao"==P?urlRota=B.OSCByRegion(q,e):"todos"==P?urlRota=B.AllOSC(e):"organizacao"==P&&(urlRota=B.OSCByName(getParameter("organizacao"),e,getParameter("tipoBusca")));o(urlRota,C)}(a)}})}var u,d,p={},g={},m={},f={},h=L.layerGroup(),_=L.layerGroup(),v=!1,y=!0,C=!1,b={},S="js/controller.php",x="",O=18,R={center:new L.LatLng(-16.55555555,-60.55555555),zoom:4,minZoom:4},T=new L.Map("map",R),w=new PruneClusterForLeaflet,M=L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{maxZoom:O,attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'}),j=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYW9zY3MiLCJhIjoiY2owbDJpYWxwMDM3dTMzbzh6dDU2bnpzdyJ9._dh2UCWnAeNeG0ZL5sQ5gA",{id:"mapbox.dark",attribution:'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>'}),A=L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]});T.addLayer(A),T.addLayer(j),T.addLayer(M);var E=new L.Control.FullScreen;T.addControl(E);var k,P,B=new Rotas,z=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null,D=$("#buscarPerfil .tab-content");if(D.find(".btn.btn-primary").on("click",function(){var a=D.find(".tab-pane.fade.active.in"),o=a.attr("id"),t=a.find(".form-control").val();t=e(t.trim()).replace(/[ -]/g,"_").replace(/\+{2,}/g,"_"),"organizacao"==o&&""!==t?(d="./resultado-consulta.html?"+o+"="+t+"&tipoBusca=0",location.href=d):""!==(t=$(".response").val())?(d="./resultado-consulta.html?"+o+"="+t,location.href=d):$("#errorLabel").removeClass("hide")}),$("#organizacao .form-control").autocomplete({minLength:3,source:function(a,o){x=e(a.term.trim()).replace(/ /g,"_"),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:B.AutocompleteOSCByName(x,10,2)},success:function(a){o($.map(a,function(a){return{label:a.tx_nome_osc,value:a.tx_nome_osc,id:a.id_osc}}))},error:function(a){o([])}})},select:function(a,o){d="./resultado-consulta.html?organizacao="+e(x.trim()).replace(/[ -]/g,"_").replace(/\+{2,}/g,"_")+"&tipoBusca=1",location.href=d}}),$("#municipio .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:B.AutocompleteOSCByCounty(e(a.term).replace(/ /g,"_"),25)},success:function(a){o($.map(a,function(a){return{label:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,value:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,id:a.edmu_cd_municipio}}))},error:function(a){o([])}})},select:function(a,e){$(".response").val(e.item.id),d="./resultado-consulta.html?municipio="+e.item.id,location.href=d}}),$("#estado .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:B.AutocompleteOSCByState(e(a.term).replace(/ /g,"_"),10)},success:function(a){o($.map(a,function(a){return{label:a.eduf_nm_uf,value:a.eduf_nm_uf,id:a.eduf_cd_uf}}))},error:function(){o([])}})},select:function(a,e){$(".response").val(e.item.id),d="./resultado-consulta.html?estado="+e.item.id,location.href=d}}),$("#regiao .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:B.AutocompleteOSCByRegion(e(a.term).replace(/ /g,"_"),10)},success:function(a){o($.map(a,function(a){return{label:a.edre_nm_regiao,value:a.edre_nm_regiao,id:a.edre_cd_regiao}}))},error:function(){o([])}})},select:function(a,e){$(".response").val(e.item.id),d="./resultado-consulta.html?regiao="+e.item.id,location.href=d}}),$(".ui-autocomplete-input").keypress(function(a){if(13==a.which)return $(".btn-primary").click(),$(".ui-menu-item").hide(),!1}),null!==z){P=z[0];var q=z[1];q=q.replace(/\./g,""),q=q.split("&")[0],"organizacao"==P?(urlRota=B.OSCByName(getParameter("organizacao"),0,getParameter("tipoBusca")),k=B.OSCByNameInMap(getParameter("organizacao"),getParameter("tipoBusca")),y=!1):"municipio"==P?(urlRota=B.OSCByCounty(q,0),k=B.OSCByCountyInMap(q),y=!1):"estado"==P?(urlRota=B.OSCByState(q,0),k=B.ClusterEstadoPorRegiao(q)):"regiao"==P?(urlRota=B.OSCByRegion(q,0),k=B.ClusterRegiao(q)):"avancado"==P?(b.avancado=window.localStorage.getItem("params_busca_avancada"),"{}"==b.avancado?(P="todos",k=B.ClusterPais(),urlRota=B.AllOSC(0)):(urlRota=B.ConsultaAvancadaLista(0),k=B.ConsultaAvancadaMapa(),y=!1,C=!0)):console.log("ERRO de URL!")}else P="todos",k=B.ClusterPais(),urlRota=B.AllOSC(0);var I=L.control();$("#loadingMapModal").show();var N;C?(type_http="POST",N={flag:"consultaPost",rota:k,parametros:b}):(type_http="GET",N={flag:"consulta",rota:k}),$.ajax({url:S,type:type_http,dataType:"json",data:N,error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(""!==a&&void 0!==a&&"Nenhuma Organização encontrada!"!==a){o(urlRota,C);var e=0;if(y){if(void 0!==a.length)for(var n=0;n<a.length;n++)e+=a[n].nr_quantidade_osc_regiao;c(e),$("#legenda p").append(e),s(a,P)}else c(e=Object.keys(a).length-1),$("#legenda p").append(e),t(a)}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==P&&"municipio"!==P?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(q)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}}),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"consulta",rota:B.ClusterEstado()},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(void 0!==a){var e={},d={};for(var p in a)e[a[p].tx_sigla_regiao]=a[p].nr_quantidade_osc_regiao,d[a[p].tx_sigla_regiao]=a[p].id_regiao;T.addControl(new L.Control.Layers({"Satélite":A,Contraste:j,Mapa:M},{"Mapa de calor":_},{collapsed:!1})),function(a,e){var d;$.each(statesData.features,function(o){d=statesData.features[o].properties.Name,statesData.features[o].properties.density=a[d],statesData.features[o].properties.id=e[d]}),T.addLayer(_),I.onAdd=function(a){return this._div=L.DomUtil.create("div","info"),this.update(),this._div},I.update=function(a){this._div.innerHTML="<h4>OSCs por Estado</h4>"+(a?"<b>"+a.Name+"</b><br />"+a.density+" OSCs.":"Passe o mouse sobre um estado")},I.addTo(T);var p=L.control({position:"bottomright"});p.onAdd=function(a){var e=L.DomUtil.create("div","info legend"),o=[0,1e3,15e3,3e4,45e3,6e4];e.innerHTML+="<h5>Escala de OSCs por estado</h5>";for(var t=0;t<o.length;t++)e.innerHTML+='<i style="background:'+l(o[t]+1)+'"></i> '+parseInt(o[t]+1)+(o[t+1]?"&ndash;"+o[t+1]+"<br>":"+");return e},p.addTo(T),u=L.geoJson(statesData,{style:function(a){return{fillColor:l(a.properties.density),weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.6}},onEachFeature:function(a,e){e.on({mouseover:n,mouseout:r,click:function(a){var e=a.target;if(T.fitBounds(e.getBounds()),function(a){$("#loadingMapModal").show(),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"consulta",rota:B.OSCByStateInMap(a)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(o(urlRota,C),void 0!==a.length){for(var e=0,n=0;n<a.length;n++)e+=a[n].nr_quantidade_osc_regiao;c(e)}else c(Object.keys(a).length-1);void 0!==a&&t(a)}})}(e.feature.properties.id),void 0==f[e.feature.properties.Regiao]){var l=m[e.feature.properties.id];void 0!=l&&T.removeLayer(l)}else!function(a){var e=a.feature.properties.Regiao;$("#loadingMapModal").show(),$.ajax({url:S,type:"GET",dataType:"json",data:{flag:"consulta",rota:B.ClusterEstadoPorRegiao(e)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(t){if(o(urlRota,C),void 0!==t.length){for(var n=0,r=0;r<t.length;r++)n+=t[r].nr_quantidade_osc_regiao;c(n)}else c(Object.keys(t).length-1);if(void 0!==t){s(t,"estado");var i=f[e];T.removeLayer(i),delete f[e];var l=m[a.feature.properties.id];T.removeLayer(l)}}})}(e);e.off(),e.on({mouseover:n,mouseout:r,click:i})}}),_.addLayer(e),g[e.feature.properties.id]=e}}).addTo(T)}(e,d)}}}),T.on("zoomend",function(a){T.getZoom()==O&&T.removeLayer(_)})});