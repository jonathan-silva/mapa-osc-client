"use strict";var _createClass=function(){function a(e,i){for(var t=0;t<i.length;t++){var a=i[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,i,t){return i&&a(e.prototype,i),t&&a(e,t),e}}();function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}var TitulosCertificacoes=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"carregarInteracoesTitCertif",value:function(){$("#manual").find("input:text").each(function(){if("Não constam informações nas bases de dados do Mapa."!==$(this).attr("placeholder")){var e=$(this).attr("id").replace("data_validade_","");$("#manual").find("input:checkbox").each(function(){$(this).val()===e&&$(this).prop("checked",!0)}),$(this).parents(".hidden").toggleClass("hidden")}})}},{key:"montarTitulosCertificacoes",value:function(e,i,t,a,c,o,r){var n=[],d=i.validateObject(e.certificado,0),f=[],l=i.validateObject(d.certificado,[]);if(0<l.length)for(var u=0;u<l.length;u++)l[u].dt_inicio_certificado=l[u].dt_inicio_certificado?l[u].dt_inicio_certificado:"Não informado",l[u].dt_fim_certificado=l[u].dt_fim_certificado?l[u].dt_fim_certificado:"Não informado",null!=l[u].tx_uf&&""!=l[u].tx_uf&&(l[u].tx_local_certificado=l[u].tx_uf?l[u].tx_uf:"Não informado",l[u].cd_uf_mun_certificado=l[u].cd_uf?l[u].cd_uf:"Não informado"),null!=l[u].tx_municipio&&""!=l[u].tx_municipio&&(l[u].tx_local_certificado=l[u].tx_municipio?l[u].tx_municipio:"Não informado",l[u].cd_uf_mun_certificado=l[u].cd_municipio?l[u].cd_municipio:"Não informado");else f.push(i.FormItens(null,null,"Não há registros de títulos ou certificações","base",null,"p"));n.push(l);var s=t.createElement("div",{id:"headerTitulosCertificacoes"}),_=t.createElement("div",{id:"bodyheaderTitulosCertificacoes"}),m=t.createElement("div",{id:"root"},s,_);a.render(m,document.getElementById("certificacoes")),c=t.createFactory(c),a.render(c({header:{priority:"2",text:"Títulos e Certificações"},dados:""}),document.getElementById("headerTitulosCertificacoes")),o=t.createFactory(o),a.render(o({dados:n[0]}),document.getElementById("bodyheaderTitulosCertificacoes")),n.push(f),this.carregarInteracoesTitCertif()}}]),e}();