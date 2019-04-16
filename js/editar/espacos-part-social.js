"use strict";var _createClass=function(){function a(e,o){for(var n=0;n<o.length;n++){var a=o[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,o,n){return o&&a(e.prototype,o),n&&a(e,n),e}}();function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}var EspacosPartSocial=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ativarEspacosPart",value:function(e,o,n,a,t,r,c,l){var i=e[0];t=n.createFactory(r),a.render(t({header:null,dados:i}),document.getElementById("conselhos")),o.addItem("conselhos"),o.addOutro("conselho"),$(".date").datepicker({dateFormat:"dd-mm-yy"});i=e[1];t=n.createFactory(c),a.render(t({header:null,dados:i}),document.getElementById("conferencias")),o.addItem("conferencias"),o.addOutro("conferencia");i=e[2];l=n.createFactory(l),a.render(l({header:null,dados:i}),document.getElementById("outros_part")),o.addItem("outros_part")}},{key:"iniciarEspacosPartSoc",value:function(e,o,n,a,t,r,c,l,i,s,u){var _=n.partSocial(),d=_.items;return a=t.createFactory(a),r.render(a({dados:d}),document.getElementById(d[0].target)),this.montarEspacosParticipacaoSocial(e,o,_,c,l,i,s,u)}},{key:"montarEspacosParticipacaoSocial",value:function(e,o,n,a,t,r,c,l){$.ajax({url:a,type:"GET",async:!1,dataType:"json",error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){a=e}});for(var i=[],s=0;s<a.length;s++)i[s]=a[s].tx_nome_conselho;$.ajax({url:r,type:"GET",async:!1,dataType:"json",error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){r=e}});var u=[];for(s=0;s<r.length;s++)u[s]=r[s].tx_nome_periodicidade_reuniao_conselho;$.ajax({url:t,type:"GET",async:!1,dataType:"json",error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){t=e}});var _=[];for(s=0;s<t.length;s++)_[s]=t[s].tx_nome_conferencia;$.ajax({url:c,type:"GET",async:!1,dataType:"json",error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){c=e}});var d=[];for(s=0;s<c.length;s++)d[s]=c[s].tx_nome_tipo_participacao;var p=[],m=null,f=null,h=null,x=null,I=null,y=null,v=null,g=null,F=null;e.participacao_social&&(m="tx_nome_conselho-0",f="tx_nome_tipo_participacao-0",h="tx_nome_representante_conselho-0",x="tx_periodicidade_reuniao-0",I="dt_data_inicio_conselho-0",y="dt_data_fim_conselho-0",v="tx_nome_conferencia-0",g="tx_nome_forma_participacao_conferencia-0",F="dt_ano_realizacao-0");var C=o.validateObject(e.participacao_social,""),j=o.validateObject(C.conselho,"0"),E=o.validateObject(C.conferencia,"0"),O=o.validateObject(C.outra,"0"),S=[];if(j&&0!=j)for(var q=0;q<j.length;q++)S.push(o.FormItens("tx_nome_conselho-"+j[q].id_conselho,"Nome do Conselho",j[q].tx_nome_conselho,j[q].ft_conselho,null,"select",i)),j[q].tx_nome_conselho_outro?S.push(o.FormItens("outro_conselho-"+j[q].id_conselho,"Identificação do Conselho",j[q].tx_nome_conselho_outro?j[q].tx_nome_conselho_outro:"",j[q].ft_conselho,null,"text")):S.push(o.FormItens("outro_conselho-empty-"+j[q].id_conselho,"Identificação do Conselho",j[q].tx_nome_conselho_outro?j[q].tx_nome_conselho_outro:"",j[q].ft_conselho,null,"text",null,null,null,!0)),S.push(o.FormItens("tx_nome_tipo_participacao-"+j[q].id_conselho,"Titularidade",j[q].tx_nome_tipo_participacao,j[q].ft_tipo_participacao,null,"select",d)),S.push(o.FormItens("tx_nome_representante_conselho-"+j[q].id_conselho,"Nome de representante",j[q].representante?j[q].representante[0].tx_nome_representante_conselho:"",j[q].ft_nome_representante_conselho,null,"text")),S.push(o.FormItens("tx_periodicidade_reuniao-"+j[q].id_conselho,"Periodicidade da Reunião",j[q].tx_periodicidade_reuniao,j[q].ft_periodicidade_reuniao,null,"select",u)),S.push(o.FormItens("dt_data_inicio_conselho-"+j[q].id_conselho,"Data de início de vigência",j[q].dt_data_inicio_conselho,j[q].ft_data_inicio_conselho,null,"text",null,null,"date")),S.push(o.FormItens("dt_data_fim_conselho-"+j[q].id_conselho,"Data de fim de vigência",j[q].dt_data_fim_conselho,j[q].ft_data_fim_conselho,null,"text",null,null,"date"));S.push(o.FormItens(m,"Nome do Conselho",null,null,"","select",i,"Insira o nome do conselho de política pública")),S.push(o.FormItens(f,"Titularidade",null,null,"","select",d,"Diga se a OSCs ocupa vaga de titular ou suplente")),S.push(o.FormItens(h,"Nome de representante",null,null,"Insira o nome do representante da OSC no Conselho","text")),S.push(o.FormItens(x,"Periodicidade da Reunião",null,null,"","select",u,"Indique de quanto em quanto tempo as reuniões do Conselho ocorrem")),S.push(o.FormItens(I,"Data de início de vigência",null,null,"Insira a data em que se iniciou a atividade de representante da OSC no Conselho","text",null,null,"date")),S.push(o.FormItens(y,"Data de fim de vigência",null,null,"Insira a data em que se encerrou a atividade de representante da OSC no Conselho","text",null,null,"date")),p.push(S),$.ajax({url:l,type:"GET",async:!1,dataType:"json",error:function(e){console.log("Erro no ajax: "),console.log(e)},success:function(e){l=e}});var T=[];for(s=0;s<l.length;s++)T[s]=l[s].tx_nome_forma_participacao_conferencia;S=[];if(E.length){for(n.items,q=0;q<E.length;q++)for(var b in E[q])if(E[q].hasOwnProperty(b)&&("tx_nome_conferencia"==b&&S.push(o.FormItens(b+"-"+E[q].id_conferencia,"Nome da Conferência",E[q].tx_nome_conferencia,E[q].ft_conferencia,null,"select",_)),"tx_nome_conferencia_outra"==b&&(E[q].tx_nome_conferencia_outra?S.push(o.FormItens("outro_conferencia-"+E[q].id_conferencia,"Identificação da Confêrencia",E[q].tx_nome_conferencia_outra?E[q].tx_nome_conferencia_outra:"",E[q].ft_conferencia,null,"text")):S.push(o.FormItens("outro_conferencia-empty-"+E[q].id_conferencia,"Identificação da Confêrencia",E[q].tx_nome_conferencia_outra?E[q].tx_nome_conferencia_outra:"",E[q].ft_conferencia,null,"text",null,null,null,!0))),"tx_nome_forma_participacao_conferencia"==b&&S.push(o.FormItens(b+"-"+E[q].id_conferencia,"Forma de participação na conferência",E[q].tx_nome_forma_participacao_conferencia,E[q].ft_forma_participacao_conferencia,null,"select",T)),"dt_ano_realizacao"==b)){var P=E[q].dt_ano_realizacao;P=P?P.substring(6):P,S.push(o.FormItens(b+"-"+E[q].id_conferencia,"Ano de realização da conferência",P,E[q].ft_ano_realizacao,null,"text",null,null,"ano"))}S.push(o.FormItens(v,"Nome da Conferência",null,null,"","select",_,"Caso a OSC tenha participado, indique aqui o nome da conferência de política pública")),S.push(o.FormItens(F,"Ano de realização da conferência",null,null,"Indique o ano em que se realizou a Conferência","text",null,null,"ano")),S.push(o.FormItens(g,"Forma de participação na conferência",null,null,"","select",T,"Indique qual foi a forma de atuação da OSC nesta Conferência")),p.push(S)}S=[];if(O.length){for(n.items,q=0;q<O.length;q++)for(var b in O[q])O[q].hasOwnProperty(b)&&"tx_nome_participacao_social_outra"==b&&S.push(o.FormItens(b+"-"+O[q].id_participacao_social_outra,"Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs",O[q].tx_nome_participacao_social_outra,O[q].ft_participacao_social_outra,null,"text"));S.push(o.FormItens("tx_nome_participacao_social_outra-0","Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs",null,null,"Indique em quais outros espaços de participação a OSC atualmente tem atuação, se houver","text",null,null,null,null,!0)),p.push(S)}return $(".date").datepicker({dateFormat:"dd-mm-yy"}),p}}]),e}();