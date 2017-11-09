"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),Projeto=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getFonteDeRecursosProjeto",value:function(e){return{id:"fonte_recursos",dados:e[Object.keys(e)[0]]}}},{key:"getTipoParceria",value:function(e){var t=null;if(e.hasOwnProperty("fonte_recursos")){var a=e.fonte_recursos;if(0!=Object.keys(a).length)for(var o=0;o<a.length;o++)if(null!=a[o].tx_nome_tipo_parceria){t=a[o].tx_nome_tipo_parceria;break}}return t}},{key:"montarProjetos",value:function(e,t){var a=[],o=t.validateObject(e.projeto_abreviado,[]);a.push({id:"lista_projetos",priority:"2",text:"Projetos, atividades e programas - PAP"});for(var r=3,n=o.length,i=new Array(n),l=0;l<o.length;l++)i[l]=new Array(r),i[l][0]=t.validateObject(o[l].id_projeto,1),i[l][1]=t.validateObject(o[l].tx_nome_projeto,""),i[l][2]="<span className='input-group-btn'><button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button></span>";a.push(i);for(var r=3,n=o.length,i=new Array(n),l=0;l<o.length;l++)i[l]=new Array(r),i[l][0]=t.validateObject(o[l].id_projeto,1),i[l][1]=t.validateObject(o[l].tx_nome_projeto,""),i[l][2]="<span className='input-group-btn'><button id='rem_projeto2' className='btn-danger btn'>Remover Projeto</button></span>";return a.push(i),a}},{key:"montarProjeto",value:function(e,t,a,o){var r=a.labelsProjeto(),n=[],i=(e.id_projeto,t.validateObject(e.projeto,e));(e=t.validateObject(i[0],i)).tx_nome_tipo_parceria_projeto=this.getTipoParceria(e);var l=t.validateObject(e.ft_identificador_projeto_externo,"Representante"),c=t.validateObject(e.objetivo_meta,null);for(var s in e)if("area_atuacao"!=s&&"osc_parceira"!=s&&"area_atuacao_outra"!=s&&e.hasOwnProperty(s)&&void 0!==r[s]){var u=s,p=e[s],d=r[s].header,j=r[s].containerClass,v=r[s].removable,_=r[s].type,b=r[s].options,f=r[s].placeholder;if(null===p||p.constructor!==Array){var g=t.InputProjeto(u,p,_,b,v,null,!1,f,l,c),h=t.AgrupadorDeInputs(u,j,d,[g],null);n.push(h)}}e.hasOwnProperty("fonte_de_recursos");t.validateObject(e.area_atuacao,[]);var O=t.validateObject(e.area_atuacao_outra,[]),m=t.validateObject(e.localizacao,[]),P=t.getTipoProjeto("localizacao_projeto",m),y=this.getFonteDeRecursosProjeto(t.validateObject(e.fonte_recursos,[]));y.dados=t.validateObject(e.fonte_recursos,[]);for(var k=t.validateObject(e.publico_beneficiado,[]),w=t.getTipoProjeto("publico_beneficiado",k),x=t.validateObject(e.financiador_projeto,[]),A=t.getTipoProjeto("financiador_projeto",x),O=t.getTipoProjeto("area_atuacao_outra",O),T=t.validateObject(e.osc_parceira,[]),C=t.getTipoProjeto("osc_parceira",T),I=e.osc_parceira?e.osc_parceira.length:0,R=0;R<I;R++)t.validateObject(e.osc_parceira[R].id_osc,null);t.validateObject(e.objetivo_meta)&&e.objetivo_meta.id_objetivo_projeto;for(var D=[y,P,w,A,C],E=0;E<D.length;E++)if(t.validateObject(D[E].dados,!1)){var N=this.createAgrupadorMultipleInputs(D[E],r,t);n.push(N)}return n}},{key:"carregaProjeto",value:function(e,t,a,o,r){var n={},i=null;if(r){var l=t.getEmptyProject();n.agrupadores=this.montarProjeto(l,o,t,a)}else $.ajax({url:"js/controller.php",type:"GET",async:!1,dataType:"json",data:{flag:"consulta",rota:a.ProjectByID(e)},error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){n.projeto=e}}),i=this.montarProjeto(n.projeto,o,t,a),n.agrupadores=i;return n}},{key:"createAgrupadorMultipleInputs",value:function(e,t,a){var o={type:"remove",value:"Remover"},r={type:"add",value:"Adicionar"},n=e.id,i=t[e.id],l=[],c="",s=a.validateObject(i)?i.removable:"",u=a.validateObject(i)?i.type:"",p=a.validateObject(i)?i.options:"",d=a.validateObject(i)?i.custom_class:"",j=null,v=!1;if(s&&(j=[o],P=[r],v=!0),0===e.dados.length){b=n;c="";h=a.InputProjeto(b,c,u,p,s,j,v,null,null,null,d);l.push(h)}for(var _=0;_<e.dados.length;_++){var b=n;for(var f in e.dados[_])if(e.dados[_].hasOwnProperty(f))if("fonte_recursos"==n){if(s=!0,"tx_nome_origem_fonte_recursos_projeto"===f){c=e.dados[_][f],p=t[e.id].options;h=a.InputProjeto(b,c,u,p,s,j,v,null,null,null,d);l.push(h)}}else if("tx"===f.slice(0,2)){c=e.dados[_][f];var g=e.dados[_].cd_area_atuacao_projeto,h=a.InputProjeto(b,c,u,p,s,j,v,null,null,g,d);l.push(h)}}var O=a.validateObject(i)?i.header:"",m=a.validateObject(i)?i.containerClass:"col-md-3",P=null;s&&(j=[o],P=[r]);return a.AgrupadorDeInputs(n,m,O,l,P,p,d)}}]),e}();