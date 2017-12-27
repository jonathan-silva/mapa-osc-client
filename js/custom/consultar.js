"use strict";require(["jquery-ui","libs/jquery-mask/jquery.mask.min"],function(e){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,t){$(this).css(e),$("<div>").addClass("arrow").addClass(t.vertical).addClass(t.horizontal).appendTo(this)}}}),$(".scroll").click(function(e){e.preventDefault(),$("html,body").animate({scrollTop:$(this.hash).offset().top},800)})}),require(["react"],function(e){require(["jquery-ui","rotas","jquery","select-boxit"],function(e){function t(e){return e=e.replace(/[ÀÁÂÃÄÅ]/g,"A"),e=e.replace(/[àáâãäå]/g,"a"),e=e.replace(/[ÉÈÊË]/g,"E"),e=e.replace(/[éèêë]/g,"e"),e=e.replace(/[ÍÌÎÏ]/g,"I"),e=e.replace(/[íìîï]/g,"i"),e=e.replace(/[ÓÒÔÕ]/g,"O"),e=e.replace(/[óòôõ]/g,"o"),e=e.replace(/[ÚÙÛÜ]/g,"U"),e=e.replace(/[úùûü]/g,"u"),e=e.replace(/[Ç]/g,"C"),e=e.replace(/[ç]/g,"c")}var a="js/controller.php",o=new Rotas;$("#accordion .panel-heading").each(function(){$(this).click(function(){$(this).parent().parent().children().last().toggle("slow")})}),$(function(){$("#dt_data_inicio_conselho").datepicker({defaultDate:"+1w",changeYear:!0,changeMonth:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_fim_conselho").datepicker("option","minDate",e)}}),$("#dt_data_fim_conselho").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_inicio_conselho").datepicker("option","maxDate",e)}}),$("#dt_data_inicio_projeto").datepicker({defaultDate:"+1w",changeYear:!0,changeMonth:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_fim_projeto").datepicker("option","minDate",e)}}),$("#dt_data_fim_projeto").datepicker({defaultDate:"+1w",changeMonth:!0,changeYear:!0,numberOfMonths:1,onClose:function(e){$("#dt_data_inicio_projeto").datepicker("option","maxDate",e)}})}),$(function(){$("div[id^='slider-range-']").each(function(){$(this).parent().find("input");var e=$(this).parent().find("label").attr("for");if("valor_dinheiro"==e)$(this).slider({range:!0,animate:!0,min:0,max:1e6,step:100,values:[0,1e6],slide:function(e,t){$(e.target.previousElementSibling).find(".min").val(t.values[0].toLocaleString("pt-BR",{minimumFractionDigits:2})),$(e.target.previousElementSibling).find(".max").val(t.values[1].toLocaleString("pt-BR",{minimumFractionDigits:2}))}});else if("ano"==e){var t=(new Date).getFullYear();$(this).slider({range:!0,min:1900,max:t,values:[1900,t],slide:function(e,t){$(e.target.previousElementSibling).find(".min").val(t.values[0]),$(e.target.previousElementSibling).find(".max").val(t.values[1])}})}else $(this).slider({range:!0,min:0,max:1e3,values:[0,1e3],slide:function(e,t){$(e.target.previousElementSibling).find(".min").val(t.values[0]),$(e.target.previousElementSibling).find(".max").val(t.values[1])}})})}),$("#areasSubareasAtuacao").mousedown(function(){$("#cd_area_atuacao").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.AreaAtuacao()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_area_atuacao,value:a[n].cd_area_atuacao});e.resolve(t)}),e}})});var n;$.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.SubAreaAtuacao()},error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){n=e}}),$("#cd_area_atuacao").change(function(){var e=$(this).val();if(null!=n){var t=$("#cd_subarea_atuacao"),a="";$.each(n,function(t,o){e==o.cd_area_atuacao&&(a+='<label><input id="cd_subarea_atuacao-'+o.cd_subarea_atuacao+'" type="checkbox">'+o.tx_nome_subarea_atuacao+"</label>")}),""==a?$(".subareaAtuacao").css("visibility","hidden"):$(".subareaAtuacao").css("visibility","visible"),t.html(a)}}),$("#cd_situacao_imovel_osc").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.SituacaoImovel()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_situacao_imovel,value:a[n].cd_situacao_imovel});e.resolve(t)}),e}}),$("#espacosParticipacaoSocial").mousedown(function(){$("#cd_tipo_participacao").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Titularidade()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_tipo_participacao,value:a[n].cd_tipo_participacao});e.resolve(t)}),e}}),$("#cd_conselho").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Conselho()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_conselho,value:a[n].cd_conselho});e.resolve(t)}),e}}),$("#cd_forma_participacao_conferencia").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.FormaParticipacaoConferencia()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_forma_participacao_conferencia,value:a[n].cd_forma_participacao_conferencia});e.resolve(t)}),e}}),$("#cd_conferencia").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Conferencia()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_conferencia,value:a[n].cd_conferencia});e.resolve(t)}),e}})}),$("#projetos").mousedown(function(){$("#cd_origem_fonte_recursos_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.FontesRecursosProjeto()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_origem_fonte_recursos_projeto,value:a[n].cd_origem_fonte_recursos_projeto});e.resolve(t)}),e}}),$("#cd_status_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.SituacaoProjeto()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_status_projeto,value:a[n].cd_status_projeto});e.resolve(t)}),e}}),$("#cd_zona_atuacao_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.ZonaAtuacaoProjeto()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_zona_atuacao,value:a[n].cd_zona_atuacao_projeto});e.resolve(t)}),e}}),$("#cd_abrangencia_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.AbrangenciaProjeto()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_abrangencia_projeto,value:a[n].cd_abrangencia_projeto});e.resolve(t)}),e}})}),$("#cd_objetivo_projeto").mousedown(function(){$("#cd_objetivo_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1,populate:function(){var e=$.Deferred(),t=[],n=-1;return $.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.Objetivos()}}).done(function(a){for(;++n<a.length;)t.push({text:a[n].tx_nome_objetivo_projeto,value:a[n].cd_objetivo_projeto});e.resolve(t)}),e}})}),$("#cd_objetivo_projeto").change(function(){var e=$(this).val();if(""!=e)!function(e){var t=$("select#cd_meta_projeto").data("selectBox-selectBoxIt");void 0!=t&&t.destroy(),$.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"consulta",rota:o.MetaProjeto(e)},error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){var t=$("#cd_meta_projeto"),a='<option value="">Selecione uma opção</option>';null!=e&&$.each(e,function(e,t){a+="<option value="+t.cd_meta_projeto+">"+t.tx_nome_meta_projeto+"</option>"}),t.html(a),$("#cd_meta_projeto").addClass("newSelectBox"),$("#cd_meta_projeto").selectBoxIt({theme:"default",defaultText:"Selecione uma opção",autoWidth:!1}),$("#cd_meta_projeto").selectBoxIt(),$("select#cd_meta_projeto").data("selectBox-selectBoxIt").enable(),verificarContraste()}})}(e);else{$("#cd_meta_projeto").html('<option value="">Selecione uma opção</option>');var t=$("select#cd_meta_projeto").data("selectBox-selectBoxIt");void 0!=t&&t.disable(),verificarContraste()}}),$("#tx_nome_municipio").autocomplete({minLength:1,source:function(e,n){$.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteOSCByCounty(t(e.term).replace(/ /g,"+"),25)},success:function(e){n($.map(e,function(e){return{label:e.edmu_nm_municipio+" - "+e.eduf_sg_uf,value:e.edmu_nm_municipio+" - "+e.eduf_sg_uf,id:e.edmu_cd_municipio}}))},error:function(e){n([])}})},select:function(e,t){$("#tx_nome_municipio").val(t.item.value),$("#cd_municipio").val(t.item.id)}}),$("#tx_nome_uf").autocomplete({minLength:1,source:function(e,n){$.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteOSCByState(t(e.term).replace(/ /g,"+"),10)},success:function(e){n($.map(e,function(e){return{label:e.eduf_nm_uf,value:e.eduf_nm_uf,id:e.eduf_cd_uf}}))},error:function(){n([])}})},select:function(e,t){$("#tx_nome_uf").val(t.item.value),$("#cd_uf").val(t.item.id)}}),$("#tx_nome_regiao").autocomplete({minLength:1,source:function(e,n){$.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteOSCByRegion(t(e.term).replace(/ /g,"+"),10)},success:function(e){n($.map(e,function(e){return{label:e.edre_nm_regiao,value:e.edre_nm_regiao,id:e.edre_cd_regiao}}))},error:function(){n([])}})},select:function(e,t){$("#tx_nome_regiao").val(t.item.value),$("#cd_regiao").val(t.item.id)}}),$("#tx_atividade_economica").autocomplete({minLength:1,source:function(e,n){$.ajax({url:a,type:"GET",async:!0,dataType:"json",data:{flag:"autocomplete",rota:o.AutocompleteAtividadeEconomica(t(e.term).replace(/ /g,"+"),10)},success:function(e){n($.map(e,function(e){return{label:e.tx_atividade_economica,value:e.tx_atividade_economica}}))},error:function(e){n([])}})},select:function(e,t){$("#tx_atividade_economica").val(t.item.value)}}),$(".min, .max").keypress(function(){var e=window.event,t=e.keyCode;t>47&&t<58||e.preventDefault()}),$(".min").change(function(){$(this).parent().parent().find("div[id^='slider-range-']").slider("values",0,$(this).val().replace(/[.]/g,"").split(",")[0])}),$(".max").change(function(){$(this).parent().parent().find("div[id^='slider-range-']").slider("values",1,$(this).val().replace(/[.]/g,"").split(",")[0])}),$("label[for='valor_dinheiro']").parent().find(".min, .max").mask("000.000.000.000.000,00",{reverse:!0}),$("#btnLimpar").on("click",function(){$(".consultaAvancada input").each(function(){$(this).val("")}),$("input[type=checkbox]").each(function(){$(this).attr("checked",!1),$(this).prop("checked",!1)}),$(".consultaAvancada select").each(function(){$(this).hasClass("newSelectBox")?$(this).data("selectBox-selectBoxIt").selectOption(""):$(this).prop("selectedIndex",0)}),$("div[id^='slider-range-']").each(function(){$(this).slider("values",0,""),$(this).slider("values",1,99999999999)})}),$("#btnConsultar").on("click",function(){var e={};$(".panel-default").each(function(){var t=$(this).find(".panel-title").attr("id");$(this).find("input[type=text], select").each(function(){""!=$(this).val()&&(void 0===e[t]&&(e[t]={}),e[t][$(this).attr("id")]=$(this).val())}),$(this).find("input[type=hidden]").each(function(){""!=$(this).val()&&(void 0===e[t]&&(e[t]={}),e[t][$(this).attr("id")]=$(this).val())}),$(this).find("input[type=checkbox]").each(function(){$(this).prop("checked")&&(void 0===e[t]&&(e[t]={}),e[t][$(this).attr("id")]=$(this).prop("checked"))})});window.localStorage.setItem("params_busca_avancada",JSON.stringify(e)),location.href="./resultado-consulta.html?avancado="})})});