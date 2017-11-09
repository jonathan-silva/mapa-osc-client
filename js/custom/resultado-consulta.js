"use strict";function getParameter(a,e){e||(e=location.href);var o="[\\?&]"+(a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"))+"=([^&#]*)",t=new RegExp(o).exec(e);return null==t?null:t[1]}require(["jquery-ui"],function(a){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(a,e){$(this).css(a),$("<div>").addClass("arrow").addClass(e.vertical).addClass(e.horizontal).appendTo(this)}}})});var urlRota;require(["rotas","jquery-ui","datatables-responsive","leafletCluster","simplePagination"],function(a){function e(a){return a=a.replace(/[ÀÁÂÃÄÅ]/g,"A"),a=a.replace(/[àáâãäå]/g,"a"),a=a.replace(/[ÉÈÊË]/g,"E"),a=a.replace(/[éèêë]/g,"e"),a=a.replace(/[ÍÌÎÏ]/g,"I"),a=a.replace(/[íìîï]/g,"i"),a=a.replace(/[ÓÒÔÕ]/g,"O"),a=a.replace(/[óòôõ]/g,"o"),a=a.replace(/[ÚÙÛÜ]/g,"U"),a=a.replace(/[úùûü]/g,"u"),a=a.replace(/[Ç]/g,"C"),a=a.replace(/[ç]/g,"c")}function o(a,e){$("#loading").removeClass("hide"),$("#resultadoconsulta_formato_dados").hide(),e?(type_http="POST",data_tipo={flag:"consultaPost",rota:a,parametros:h}):(type_http="GET",data_tipo={flag:"consulta",rota:a}),$.ajax({url:"js/controller.php",type:type_http,dataType:"json",data:data_tipo,error:function(a){console.log("Erro no ajax: "+a)},success:function(a){if("Nenhuma Organização encontrada!"!==a){var e=a.length;T=new Array(e);var o=0,t="Dado não informado.";for(var r in a)"0"!=r&&(T[o]=new Array(6),srcImg=null!==a[r][4]?a[r][4]:"img/camera.jpg",T[o][0]='<img class="img-circle media-object" src='+srcImg+' height="64" width="64">',T[o][1]=null!==a[r][0]?a[r][0]:t,T[o][2]=null!==a[r][1]?a[r][1]:t,T[o][3]=null!==a[r][2]?a[r][2]:t,T[o][4]=null!==a[r][3]?a[r][3]:t,T[o][5]='<button type="button" onclick="location.href=\'visualizar-osc.html#'+r+'\';" class="btn btn-info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button>',o++);if(void 0!==T[0]){var n=$("#resultadoconsulta_formato_dados").DataTable({responsive:!0,processing:!0,deferLoading:1e3,deferRender:!0,searching:!1,data:T,dom:"Bfrtip",bPaginate:!1,bSort:!0,aaSorting:[[1,"asc"]],columns:[{title:"",width:50},{title:"Nome da OSC",width:200},{title:"CNPJ"},{title:"Natureza Jurídica"},{title:"Endereço"},{title:"Detalhar"}],aoColumnDefs:[{bSortable:!1,aTargets:[0]},{bSortable:!1,aTargets:[5]},{bSortable:!1,aTargets:[4]}],autoWidth:!0});n.destroy(),n.draw(),$("#resultadoconsulta_formato_dados").show(),$("#loading").addClass("hide")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==w&&"municipio"!==w?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(A)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==w&&"municipio"!==w?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(A)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}}),$("#resultadoconsulta_formato_dados").on("draw.dt",function(){verificarContraste()})}function t(a){for(var e in a)if("0"!=e){var o=function(a,e,o){if(""!==e&&null!==e||null!==o&&""!==o){var t=new PruneCluster.Marker(e,o);return t.data.ID=a,b.PrepareLeafletMarker=function(a,e){a.on("click",function(){!function(a,e){e.bindPopup('<img id="loading" src="img/loading.gif" style="padding-top: 10px; padding-left: 10px;"/>').openPopup(),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"consulta",rota:E.OSCPopUpByID(a)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(o){if(void 0!==o){var t=(null!==o.tx_endereco?o.tx_endereco:"")+" - "+(null!==o.tx_bairro?o.tx_bairro:""),r='<div class="mapa_organizacao clearfix"><span id="spantitle" class="magneticTooltip"><button id="title" class="btn-link"  onclick=location.href="visualizar-osc.html#'+a+'"><h4>'+(null!==o.tx_nome_osc?o.tx_nome_osc:"Dado não informado.")+'</h4></button></span><div class="coluna1"><strong></strong><strong>Endereço: </strong>'+t+"<br><strong>Atividade Econômica: </strong>"+(null!==o.tx_nome_atividade_economica?o.tx_nome_atividade_economica:"Dado não informado.")+"<br><strong>Natureza Jurídica: </strong>"+(null!==o.tx_nome_natureza_juridica?o.tx_nome_natureza_juridica:"Dado não informado.")+'<br><br><div align="center"><button type = button class="btn btn-info" onclick=location.href="visualizar-osc.html#'+a+'"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Detalhar</button></div></div></div>';e.bindPopup(r).openPopup()}}})}(e.ID,a)})},b.RegisterMarker(t),b}return null}(e,a[e][0],a[e][1]);null!==o&&map.addLayer(o)}$("#loadingMapModal").hide(),b.ProcessView()}function r(a){var e=a.target;e.setStyle({weight:5,color:"#666",dashArray:"",fillOpacity:.7}),L.Browser.ie||L.Browser.opera||e.bringToFront(),"GO"==e.feature.properties.Name&&e.bringToBack(),P.update(e.feature.properties)}function n(a){u.resetStyle(a.target),P.update()}function i(a){var e=a.target;map.fitBounds(e.getBounds())}function l(a){return a>6e4?"#800026":a>45e3?"#E31A1C":a>3e4?"#FC4E2A":a>15e3?"#FEB24C":a>1e3?"#FED976":"#FFEDA0"}function s(a,e){var l;"regiao"==e||"todos"==e?l="labelClassRegiao":"estado"==e&&(l="labelClassEstado");for(var u in a){var p=L.divIcon({id:a[u].id_regiao,className:l,html:"<p>"+a[u].nr_quantidade_osc_regiao+"</p>"});d[a[u].id_regiao]=a[u].nr_quantidade_osc_regiao;var g=function(a,e,l,u,d){if(""!==l&&null!==l||null!==u&&""!==u){var p;return"regiao"==d||"todos"==d?p=L.marker([l,u],{icon:a}).on("click",function(a){var e=a.target.options.icon.options.id;$("#loadingMapModal").show(),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"consulta",rota:E.ClusterEstadoPorRegiao(e)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(t){if(o(urlRota,f),void 0!==t.length){for(var r=0,n=0;n<t.length;n++)r+=t[n].nr_quantidade_osc_regiao;c(r)}else c(Object.keys(t).length-1);void 0!==t&&(map.setView([a.target._latlng.lat,a.target._latlng.lng],5),map.removeLayer(a.target),delete rlayers[e],s(t,"estado"))}})}):"estado"==d&&(p=L.marker([l,u],{icon:a}).on("click",function(a){var e=a.target.options.icon.options.id;$("#loadingMapModal").show(),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"consulta",rota:E.OSCByStateInMap(e)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(l){if(o(urlRota,f),void 0!==l.length){for(var s=0,u=0;u<l.length;u++)s+=l[u].nr_quantidade_osc_regiao;c(s)}else c(Object.keys(l).length-1);if(void 0!==l){map.setView([a.target._latlng.lat,a.target._latlng.lng],6),map.removeLayer(a.target);var d=llayers[e];d.off(),d.on({mouseover:r,mouseout:n,click:i}),t(l)}}})})),p}}(p,a[u].id_regiao,a[u].geo_lat_centroid_regiao,a[u].geo_lng_centroid_regiao,e);clustersLayer.addLayer(g),"estado"==e?clayers[a[u].id_regiao]=g:"regiao"!=e&&"todos"!=e||(rlayers[a[u].id_regiao]=g)}m||(clustersLayer.addTo(map),m=!0),$("#loadingMapModal").hide()}function c(a){$(".pagination").pagination({items:a,itemsOnPage:10,hrefTextPrefix:"#",prevText:"Anterior",nextText:"Próximo",onPageClick:function(a){!function(a){null===a&&(a=0);var e=10*parseInt(a)-10;"avancado"==w?(urlRota=E.ConsultaAvancadaLista(e),f=!0):"municipio"==w?urlRota=E.OSCByCounty(A,e):"estado"==w?urlRota=E.OSCByState(A,e):"regiao"==w?urlRota=E.OSCByRegion(A,e):"todos"==w?urlRota=E.AllOSC(e):"organizacao"==w&&(urlRota=E.OSCByName(getParameter("organizacao"),e,getParameter("tipoBusca")));o(urlRota,f)}(a)}})}var u,d={};llayers={},clayers={},rlayers={},clustersLayer=L.layerGroup();var p=L.layerGroup(),m=!1,g=!0,f=!1,h={},y="js/controller.php",_="",v=18,C={center:new L.LatLng(-16.55555555,-60.55555555),zoom:4,minZoom:4};map=new L.Map("map",C);var b=new PruneClusterForLeaflet,S=L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{maxZoom:v,attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'}),x=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYW9zY3MiLCJhIjoiY2owbDJpYWxwMDM3dTMzbzh6dDU2bnpzdyJ9._dh2UCWnAeNeG0ZL5sQ5gA",{id:"mapbox.dark",attribution:'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>'}),O=L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]});map.addLayer(O),map.addLayer(x),map.addLayer(S);var R=new L.Control.FullScreen;map.addControl(R);var T,k,w,E=new Rotas,M=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null,j=$("#buscarPerfil .tab-content");if(j.find(".btn.btn-primary").on("click",function(){var a=j.find(".tab-pane.fade.active.in"),o=a.attr("id"),t=a.find(".form-control").val();t=e(t.trim()).replace(/[ -]/g,"_").replace(/\+{2,}/g,"_");var r;"organizacao"==o&&""!==t?(r="./resultado-consulta.html?"+o+"="+t+"&tipoBusca=0",location.href=r):""!==(t=$(".response").val())?(r="./resultado-consulta.html?"+o+"="+t,location.href=r):$("#errorLabel").removeClass("hide")}),$("#organizacao .form-control").autocomplete({minLength:3,source:function(a,o){_=e(a.term.trim()).replace(/ /g,"_"),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:E.AutocompleteOSCByName(_,10,2)},success:function(a){o($.map(a,function(a){return{label:a.tx_nome_osc,value:a.tx_nome_osc,id:a.id_osc}}))},error:function(a){o([])}})},select:function(a,o){link="./resultado-consulta.html?organizacao="+e(_.trim()).replace(/[ -]/g,"_").replace(/\+{2,}/g,"_")+"&tipoBusca=1",location.href=link}}),$("#municipio .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:E.AutocompleteOSCByCounty(e(a.term).replace(/ /g,"_"),25)},success:function(a){o($.map(a,function(a){return{label:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,value:a.edmu_nm_municipio+" - "+a.eduf_sg_uf,id:a.edmu_cd_municipio}}))},error:function(a){o([])}})},select:function(a,e){$(".response").val(e.item.id),link="./resultado-consulta.html?municipio="+e.item.id,location.href=link}}),$("#estado .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:E.AutocompleteOSCByState(e(a.term).replace(/ /g,"_"),10)},success:function(a){o($.map(a,function(a){return{label:a.eduf_nm_uf,value:a.eduf_nm_uf,id:a.eduf_cd_uf}}))},error:function(){o([])}})},select:function(a,e){$(".response").val(e.item.id),link="./resultado-consulta.html?estado="+e.item.id,location.href=link}}),$("#regiao .form-control").autocomplete({minLength:3,source:function(a,o){$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"autocomplete",rota:E.AutocompleteOSCByRegion(e(a.term).replace(/ /g,"_"),10)},success:function(a){o($.map(a,function(a){return{label:a.edre_nm_regiao,value:a.edre_nm_regiao,id:a.edre_cd_regiao}}))},error:function(){o([])}})},select:function(a,e){$(".response").val(e.item.id),link="./resultado-consulta.html?regiao="+e.item.id,location.href=link}}),$(".ui-autocomplete-input").keypress(function(a){if(13==a.which)return $(".btn-primary").click(),$(".ui-menu-item").hide(),!1}),null!==M){w=M[0];var A=M[1];A=A.replace(/\./g,""),A=A.split("&")[0],"organizacao"==w?(urlRota=E.OSCByName(getParameter("organizacao"),0,getParameter("tipoBusca")),k=E.OSCByNameInMap(getParameter("organizacao"),getParameter("tipoBusca")),g=!1):"municipio"==w?(urlRota=E.OSCByCounty(A,0),k=E.OSCByCountyInMap(A),g=!1):"estado"==w?(urlRota=E.OSCByState(A,0),k=E.ClusterEstadoPorRegiao(A)):"regiao"==w?(urlRota=E.OSCByRegion(A,0),k=E.ClusterRegiao(A)):"avancado"==w?(h.avancado=window.localStorage.getItem("params_busca_avancada"),"{}"==h.avancado?(w="todos",k=E.ClusterPais(),urlRota=E.AllOSC(0)):(urlRota=E.ConsultaAvancadaLista(0),k=E.ConsultaAvancadaMapa(),g=!1,f=!0)):console.log("ERRO de URL!")}else w="todos",k=E.ClusterPais(),urlRota=E.AllOSC(0);var P=L.control();$("#loadingMapModal").show(),f?(type_http="POST",data_tipo_mapa={flag:"consultaPost",rota:k,parametros:h}):(type_http="GET",data_tipo_mapa={flag:"consulta",rota:k}),$.ajax({url:y,type:type_http,dataType:"json",data:data_tipo_mapa,error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(""!==a&&void 0!==a&&"Nenhuma Organização encontrada!"!==a){o(urlRota,f);var e=0;if(g){if(void 0!==a.length)for(var r=0;r<a.length;r++)e+=a[r].nr_quantidade_osc_regiao;c(e),$("#legenda p").append(e),s(a,w)}else c(e=Object.keys(a).length-1),$("#legenda p").append(e),t(a)}else $("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Nenhuma OSC encontrada!"),"avancado"!==w&&"municipio"!==w?$("#modalConteudo").text('Sua pesquisa "'+decodeURIComponent(A)+'" não retornou nenhuma OSC.'):$("#modalConteudo").text("Sua pesquisa não retornou nenhuma OSC."),$("#modalMensagem").modal("show")}}),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"consulta",rota:E.ClusterEstado()},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(void 0!==a){var e={},d={};for(var m in a)e[a[m].tx_sigla_regiao]=a[m].nr_quantidade_osc_regiao,d[a[m].tx_sigla_regiao]=a[m].id_regiao;map.addControl(new L.Control.Layers({"Satélite":O,Contraste:x,Mapa:S},{"Mapa de calor":p},{collapsed:!1})),function(a,e){$.each(statesData.features,function(o){nomeEstado=statesData.features[o].properties.Name,statesData.features[o].properties.density=a[nomeEstado],statesData.features[o].properties.id=e[nomeEstado]}),map.addLayer(p),P.onAdd=function(a){return this._div=L.DomUtil.create("div","info"),this.update(),this._div},P.update=function(a){this._div.innerHTML="<h4>OSCs por Estado</h4>"+(a?"<b>"+a.Name+"</b><br />"+a.density+" OSCs.":"Passe o mouse sobre um estado")},P.addTo(map);var d=L.control({position:"bottomright"});d.onAdd=function(a){var e=L.DomUtil.create("div","info legend"),o=[0,1e3,15e3,3e4,45e3,6e4];e.innerHTML+="<h5>Escala de OSCs por estado</h5>";for(var t=0;t<o.length;t++)e.innerHTML+='<i style="background:'+l(o[t]+1)+'"></i> '+parseInt(o[t]+1)+(o[t+1]?"&ndash;"+o[t+1]+"<br>":"+");return e},d.addTo(map),u=L.geoJson(statesData,{style:function(a){return{fillColor:l(a.properties.density),weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.6}},onEachFeature:function(a,e){e.on({mouseover:r,mouseout:n,click:function(a){var e=a.target;if(map.fitBounds(e.getBounds()),function(a){$("#loadingMapModal").show(),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"consulta",rota:E.OSCByStateInMap(a)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(a){if(o(urlRota,f),void 0!==a.length){for(var e=0,r=0;r<a.length;r++)e+=a[r].nr_quantidade_osc_regiao;c(e)}else c(Object.keys(a).length-1);void 0!==a&&t(a)}})}(e.feature.properties.id),void 0==rlayers[e.feature.properties.Regiao]){var l=clayers[e.feature.properties.id];void 0!=l&&map.removeLayer(l)}else!function(a){var e=a.feature.properties.Regiao;$("#loadingMapModal").show(),$.ajax({url:y,type:"GET",dataType:"json",data:{flag:"consulta",rota:E.ClusterEstadoPorRegiao(e)},error:function(a){console.log("ERRO no AJAX :"+a)},success:function(t){if(o(urlRota,f),void 0!==t.length){for(var r=0,n=0;n<t.length;n++)r+=t[n].nr_quantidade_osc_regiao;c(r)}else c(Object.keys(t).length-1);if(void 0!==t){s(t,"estado");var i=rlayers[e];map.removeLayer(i),delete rlayers[e];var l=clayers[a.feature.properties.id];map.removeLayer(l)}}})}(e);e.off(),e.on({mouseover:r,mouseout:n,click:i})}}),p.addLayer(e),llayers[e.feature.properties.id]=e}}).addTo(map)}(e,d)}}}),map.on("zoomend",function(a){map.getZoom()==v&&map.removeLayer(p)})});