"use strict";function pagInicial(){link="./index.html",location.href=link}function replaceSpecialChars(e){return e=e.replace(/[ÀÁÂÃÄÅ]/g,"A"),e=e.replace(/[àáâãäå]/g,"a"),e=e.replace(/[ÉÈÊË]/g,"E"),e=e.replace(/[éèêë]/g,"e"),e=e.replace(/[ÍÌÎÏ]/g,"I"),e=e.replace(/[íìîï]/g,"i"),e=e.replace(/[ÓÒÔÕ]/g,"O"),e=e.replace(/[óòôõ]/g,"o"),e=e.replace(/[ÚÙÛÜ]/g,"U"),e=e.replace(/[úùûü]/g,"u"),e=e.replace(/[Ç]/g,"C"),e=e.replace(/[ç]/g,"c")}require(["react","jsx!components/Util","jquery-ui","rotas","tagsinput"],function(e){var a,r,s=void 0!==window.location.href.split("?")[1]?window.location.href.split("?")[1].split("="):null;if(null!=s)if(a=s[0],r=s[1],r=r.replace(/\./g,""),(r=r.split("#")[0])&&"token"==a){require(["componenteFormItem"],function(a){for(var r=["senha","confirmarSenha"],s=["Senha","Confirmar Senha"],o=["password","password"],l=[!0,!0],n=[],t=0;t<r.length;t++)n.push(new function(e,a,r,s){this.id=e,this.label=a,this.type=r,this.obrigatorio=s,this.fonte=!1}(r[t],s[t],o[t],l[t]));a=e.createFactory(a),ReactDOM.render(a({header:"Dados de Identificação.",dados:n}),document.getElementById("form-dados"))});var o=new Rotas,l=$("#modalMensagem");$("#send").on("click",function(){var e=$("#senha").val(),a=$("#confirmarSenha").val();if(""==e||e!=a)return $("#senha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Os valores da senha e da confirmação são diferentes!</span></div>'),!1;if(e.length<=5)return $("#senha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Erro: Senha menor que 6 caracteres!</span></div>'),!1;$("#senha").closest(".form-group").removeClass("has-error").addClass("has-success"),$("#confirmarSenha").closest(".form-group").removeClass("has-error").addClass("has-success");var s={tx_senha_usuario:e,tx_token:r};$.ajax({url:rota:o.AlterarSenha(),type:"POST",dataType:"json",data:s,error:function(e){if(200!=e.status)return jQuery("#modalTitle").text("Problema na solicitação!"),jQuery("#modalConteudo").text(JSON.parse(e.responseText).msg),l.modal("show"),!1;jQuery("#modalTitle").text("Sucesso"),jQuery("#modalConteudo").text("Alteração realizada com sucesso!"),l.modal("show"),pagInicial()},success:function(e){jQuery("#modalTitle").text("Sucesso"),jQuery("#modalConteudo").text("Alteração realizada com sucesso!"),l.modal("show"),pagInicial()}})})}else pagInicial();else pagInicial()});