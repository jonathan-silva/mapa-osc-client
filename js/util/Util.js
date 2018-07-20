"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),Util=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"FormItens",value:function(e,t,a,r,n,o,i,s,l,c,d){return{id:e,label:t,content:a,fonte:r,placeholder:n,type:o,options:i,pretext:s,custom_class:l,hide:c,default:d}}},{key:"carregaAjax",value:function(e,t,a){var r=null;return $.ajax({url:"js/controller.php",async:!1,type:t,dataType:"json",data:{flag:"consultaPost",rota:e,parametros:a},success:function(e){r=e},error:function(e){r=e}}),r}},{key:"validateObject",value:function(e,t){return null===e?t:void 0===e?t:0===Object.keys(e).length&&e.constructor===Object?t:e}},{key:"contains",value:function(e,t){return"string"==typeof t&&t.indexOf(e)>=0}},{key:"showUnauthorizedUser",value:function(e){401===e.status&&($("#unauthorized").dialog("open"),console.log(e))}},{key:"AgrupadorDeInputs",value:function(e,t,a,r,n,o,i,s){return{id:e,containerClass:t,header:a,inputs:r,options:o,buttons:n,custom_class:i,infoTitle:s}}},{key:"abrirModalAjuda",value:function(e,t){var a=t[e];$("#modalTitulo").html(""),$("#modalTitulo").html(e),$("#corpoModal").html(""),$("#corpoModal").html(a),$("#modalAjuda").modal("show"),verificarContraste()}},{key:"InputProjeto",value:function(e,t,a,r,n,o,i,s,l,c,d,u,p){return{id:e,content:t,type:a,options:r,removable:n,buttons:o,buttonsInLine:i,placeholder:s,title:l,fonte:c,cd:d,cc:u,infoTitle:p}}},{key:"getTipoProjeto",value:function(e,t){return{id:e,dados:t}}},{key:"addOutro",value:function(e){!function(e){$("."+e).each(function(t,a){var r=$(this).children().find("select").first(),n=r.find("option:last").val();r.change(function(){var a=$(this).parent().parent().parent();$(this).val()==n?(a.find("#outro_"+e).remove(),a.append('<div id="outro_'+e+'" style="padding-top: 10px;"><label class = "control-label">Novo Item:</label><div class="input-box"><input type="text" class="form-control " placeholder="Insira o novo item aqui" id="outro_'+e+"-"+t+'" value=""><span class="fonte-de-dados dado-organizacao" title="Informação preenchida pela Organização"><img class="imgDadoEditavel" src="img/dado_representante.png"></span></div></div>')):a.find("#outro_"+e)&&a.find("#outro_"+e).remove()})})}(e)}},{key:"addItem",value:function(t){function a(t){$("#"+t+" button").on("click",function(){if($(this).hasClass("btn-primary")){var r=$(this).parent(),n=r.find("input[type=text]"),o=r.find("select"),i=new Array;if(n.parent().removeClass("has-error"),o.parent().removeClass("has-error"),$(".alert-danger").remove(),n.each(function(e){""!==$(this).val().trim()?i[e]=!0:(i[e]=!1,$(this).parent().addClass("has-error").after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>'))}),o.each(function(e){"-1"!==$(this).val()?i[e]=!0:(i[e]=!1,$(this).parent().addClass("has-error").after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>'))}),i.every(function(e){return!!e})){n.parent().removeClass("has-error"),o.parent().removeClass("has-error"),n.after().find("span").remove(),o.after().find("span").remove(),r.find("button").text("Remover").attr("class","btn-danger btn");var s=$("#"+t).children();r.clone().appendTo(s),"conselhos"!=t&&"conferencias"!=t&&"outros_part"!=t||r.parent().parent().children().first().children().last().remove(),r.parent().children().last().find("button").text("Adicionar").attr("class","btn-primary btn").click(a(t)),r.parent().children().last().find("input[type=text]").val(""),r.parent().children().last().find("select").val("-1");for(var l=r.parent().children().last().find(".date"),c=r.parent().children().last().find(".ano"),d=r.parent().children().last().prev().find(".date"),u=r.parent().children().last().prev().find(".ano"),p=0;p<l.length;p++){var f=l[p],h=d[p],v=((b=$(h).attr("id")).substr(0,b.indexOf("-")),b.substr(b.indexOf("-")+1)),m=(k=$(f).attr("id")).substr(0,b.indexOf("-")),g=Number(v),y=m;g--,$(f).removeClass("hasDatepicker"),$(f).attr("id",y+"-"+g),$(f).datepicker({dateFormat:"dd-mm-yy",changeYear:!0})}if(this.addOutros=new e,"conselhos"==t&&this.addOutros.addOutro("conselho"),"conferencias"==t){var f=c[0],h=u,b=$(h).attr("id"),v=(b.substr(0,b.indexOf("-")),b.substr(b.indexOf("-")+1)),k=$(f).attr("id"),m=k.substr(0,b.indexOf("-")),g=Number(v),y=m;g--,$(f).removeClass("hasDatepicker"),$(f).attr("id",y+"-"+g),$(f).datepicker({changeYear:!0,showButtonPanel:!0,dateFormat:"yy",yearRange:"1950:2050",onClose:function(e,t){var a=$("#ui-datepicker-div .ui-datepicker-year :selected").val();$(this).datepicker("setDate",new Date(a,1))}}),$(f).focus(function(){$(".ui-datepicker-calendar").hide(),$(".ui-datepicker-month").hide(),$(".ui-datepicker-prev").hide(),$(".ui-datepicker-next").hide()}),this.addOutros.addOutro("conferencia")}$(".date").datepicker({dateFormat:"dd-mm-yy"}),r.parent().children().last().find("#outro_conselho")&&r.parent().children().last().find("#outro_conselho").remove(),r.parent().children().last().find("#outro_conferencia")&&r.parent().children().last().find("#outro_conferencia").remove()}}else $(this).parent().remove()})}a(t)}},{key:"verificarPermissao",value:function(e){var t=window.localStorage.getItem("Osc");if("undefined"!=t){var a=JSON.parse(t);if("undefined"!=a&&null!==a)for(var r=0;r<a.length;r++)if(a[r]==e)return!0}return!1}},{key:"replaceSpecialChars",value:function(e){return e=e.replace(/[ÀÁÂÃÄÅ]/g,"A"),e=e.replace(/[àáâãäå]/g,"a"),e=e.replace(/[ÉÈÊË]/g,"E"),e=e.replace(/[éèêë]/g,"e"),e=e.replace(/[ÍÌÎÏ]/g,"I"),e=e.replace(/[íìîï]/g,"i"),e=e.replace(/[ÓÒÔÕ]/g,"O"),e=e.replace(/[óòôõ]/g,"o"),e=e.replace(/[ÚÙÛÜ]/g,"U"),e=e.replace(/[úùûü]/g,"u"),e=e.replace(/[Ç]/g,"C"),e=e.replace(/[ç]/g,"c")}}]),e}();