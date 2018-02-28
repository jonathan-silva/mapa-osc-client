"use strict";function _classCallCheck(e,s){if(!(e instanceof s))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,s){for(var r=0;r<s.length;r++){var o=s[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(s,r,o){return r&&e(s.prototype,r),o&&e(s,o),s}}(),FonteRecurso=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"montarPorAno",value:function(e,s,r,o,c,n,t,i,a,u,p,d,l,_,f,h){var b=$.grep(u,function(e){return 1==e.cd_origem_fonte_recursos_osc}),v=$.grep(u,function(e){return 2==e.cd_origem_fonte_recursos_osc}),x=$.grep(u,function(e){return 4==e.cd_origem_fonte_recursos_osc}),m=$.grep(u,function(e){return 3==e.cd_origem_fonte_recursos_osc});$("#recursos").append("<div id="+e+"></div>"),0!==t&&$("#"+e).toggleClass("hidden");R=p.items;f=l.createFactory(f),_.render(f({dados:R,ano:e}),document.getElementById(e)),R=d.recursos_geral;for(var k=[],g=0;g<R.length;g++)k.push(a.FormItens("ano-"+e,R[g].label,e,R[g].fonte,R[g].placeholder,R[g].type,R[g].options,R[g].pretext,R[g].custom_class));h=l.createFactory(h),_.render(h({header:null,dados:k}),document.getElementById("recursos_geral-"+e)),d.recursos_nao_financeiros=this.mapContentRecursos(i.recursos_nao_financeiros,m),d.recursos_privados=this.mapContentRecursos(i.recursos_privados,v),d.recursos_proprios=this.mapContentRecursos(i.recursos_proprios,x),d.recursos_publicos=this.mapContentRecursos(i.recursos_publicos,b);for(var y=[{items:d.recursos_proprios,divId:"recursos_proprios"},{items:d.recursos_publicos,divId:"recursos_publicos"},{items:d.recursos_privados,divId:"recursos_privados"},{items:d.recursos_nao_financeiros,divId:"recursos_nao_financeiros"}],C=0;C<y.length;C++){for(var k=[],R=y[C].items,I=y[C].divId,g=0;g<R.length;g++){var F=R[g].content;""!==F&&null!==F&&-1===F.indexOf(".")&&(F+="00"),k.push(a.FormItens(R[g].id,R[g].label,F,R[g].fonte,R[g].placeholder,R[g].type,R[g].options,R[g].pretext))}h=l.createFactory(h),_.render(h({header:null,dados:k}),document.getElementById(I+"-"+e))}$("#recursos_proprios-"+e).find("input").mask("000.000.000.000.000,00",{reverse:!0}),$("#recursos_proprios-"+e).find("input").addClass("with-pretext"),$("#recursos_proprios-"+e).find(".input-box").prepend('<span class="pretext">R$</span>'),$("#recursos_publicos-"+e).find("input").mask("000.000.000.000.000,00",{reverse:!0}),$("#recursos_publicos-"+e).find("input").addClass("with-pretext"),$("#recursos_publicos-"+e).find(".input-box").prepend('<span class="pretext">R$</span>'),$("#recursos_privados-"+e).find("input").mask("000.000.000.000.000,00",{reverse:!0}),$("#recursos_privados-"+e).find("input").addClass("with-pretext"),$("#recursos_privados-"+e).find(".input-box").prepend('<span class="pretext">R$</span>'),$("#recursos_nao_financeiros-"+e).find("input").mask("000.000.000.000.000,00",{reverse:!0}),$("#recursos_nao_financeiros-"+e).find("input").addClass("with-pretext"),$("#recursos_nao_financeiros-"+e).find(".input-box").prepend('<span class="pretext">R$</span>'),$("#recursos_geral-"+e).append('<div class="input-box checkbox"><label><input type="checkbox">Não possui recursos para este ano.</label></div>'),$("#recursos_proprios-"+e).prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui recursos próprios para este ano.</label></div>'),$("#recursos_publicos-"+e).prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui recursos públicos para este ano.</label></div>'),$("#recursos_privados-"+e).prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui recursos privados para este ano.</label></div>'),$("#recursos_nao_financeiros-"+e).prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui recursos não financeiros para este ano.</label></div>'),$("#recursos_geral-"+e+' input[type="checkbox"]').prop("checked",s),$("#recursos_proprios-"+e+' input[type="checkbox"]').prop("checked",r),$("#recursos_publicos-"+e+' input[type="checkbox"]').prop("checked",o),$("#recursos_privados-"+e+' input[type="checkbox"]').prop("checked",c),$("#recursos_nao_financeiros-"+e+' input[type="checkbox"]').prop("checked",n),$('#recursos input[type="checkbox"]').change(function(){$(this).is(":checked")?$(this).prop("checked",!0):$(this).prop("checked",!1)})}},{key:"carregaFontes",value:function(e){var s=null;return $.ajax({url:"js/controller.php",async:!1,type:"GET",dataType:"json",data:{flag:"consulta",rota:e.FontesRecursos()},success:function(e){s=e},error:function(e){console.log(e)}}),s}},{key:"montarFontedeRecursos",value:function(e,s,r,o,c,n,t,i){for(var a=o.itemsRecurso(),u=o.tiposRecurso(),p=this.carregaFontes(r),d=0;d<e.recursos.recursos.length;d++)this.montarPorAno(e.recursos.recursos[d].dt_ano_recursos_osc,e.recursos.recursos[d].bo_nao_possui,e.recursos.recursos[d].bo_nao_possui_recursos_proprios,e.recursos.recursos[d].bo_nao_possui_recursos_publicos,e.recursos.recursos[d].bo_nao_possui_recursos_privados,e.recursos.recursos[d].bo_nao_possui_recursos_nao_financeiros,d,e.recursos.recursos[d],s,p,a,u,c,n,t,i);$(".select-ano").find(".form-control").bind("change",function(){var e=$(this).val(),s=$(this).attr("id").slice(4);$("#"+e).hasClass("hidden")&&($("#"+e).toggleClass("hidden"),$("#"+e).siblings().addClass("hidden")),$(this).find("option[value="+s+"]").prop("selected",!0)})}},{key:"mapContentRecursos",value:function(e,s){for(var r=0;r<s.length;r++){var o=s[r];o.id=o.cd_fonte_recursos_osc,o.label=o.tx_nome_fonte_recursos_osc,o.content="",o.placeholder="Insira o valor";for(var c in e){var n=e[c];e.hasOwnProperty(c)&&n.cd_fonte_recursos_osc===o.cd_fonte_recursos_osc&&(o.content=n.nr_valor_recursos_osc,o.fonte=n.ft_valor_recursos_osc)}}return s}}]),e}();