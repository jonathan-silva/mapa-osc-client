"use strict";function validaNome(e){return!(e.length<5)}function validaEmail(e){var o=e.substring(0,e.indexOf("@")),r=e.substring(e.indexOf("@")+1,e.length);return o.length>=1&&r.length>=3&&-1==o.search("@")&&-1==r.search("@")&&-1==o.search(" ")&&-1==r.search(" ")&&-1!=r.search(".")&&r.indexOf(".")>=1&&r.lastIndexOf(".")<r.length-1}function validaCNPJ(e){if(""==(e=e.toString().replace(/[^\d]+/g,""))||14!=e.length)return!1;for(var o=e.length-2,r=e.substring(0,o),s=e.substring(o),a=0,t=o-7,l=o;l>=1;l--)a+=r.charAt(o-l)*t--,t<2&&(t=9);var n=a%11<2?0:11-a%11;if(n!=s.charAt(0))return!1;o+=1,r=e.substring(0,o),a=0,t=o-7;for(l=o;l>=1;l--)a+=r.charAt(o-l)*t--,t<2&&(t=9);return(n=a%11<2?0:11-a%11)==s.charAt(1)}function validaCPF(e){var o,r;o=0;if("00000000000"==(e=e.toString().replace(/\.|\-/g,"")))return!1;for(s=1;s<=9;s++)o+=parseInt(e.substring(s-1,s))*(11-s);if(10!=(r=10*o%11)&&11!=r||(r=0),r!=parseInt(e.substring(9,10)))return!1;o=0;for(var s=1;s<=10;s++)o+=parseInt(e.substring(s-1,s))*(12-s);return 10!=(r=10*o%11)&&11!=r||(r=0),r==parseInt(e.substring(10,11))}function getErrorMessage(e,o){return 0===e.status?"Not connect.\n Verify Network.":404==e.status?"Requested page not found. [404]":500==e.status?"Internal Server Error [500].":"parsererror"===o?"Requested JSON parse failed.":"timeout"===o?"Time out error.":"abort"===o?"Ajax request aborted.":"Uncaught Error.\n"+e.responseText}function replaceSpecialChars(e){return e=e.replace(/[ÀÁÂÃÄÅ]/g,"A"),e=e.replace(/[àáâãäå]/g,"a"),e=e.replace(/[ÉÈÊË]/g,"E"),e=e.replace(/[éèêë]/g,"e"),e=e.replace(/[ÍÌÎÏ]/g,"I"),e=e.replace(/[íìîï]/g,"i"),e=e.replace(/[ÓÒÔÕ]/g,"O"),e=e.replace(/[óòôõ]/g,"o"),e=e.replace(/[ÚÙÛÜ]/g,"U"),e=e.replace(/[úùûü]/g,"u"),e=e.replace(/[Ç]/g,"C"),e=e.replace(/[ç]/g,"c")}require(["jquery-ui"],function(e){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,o){$(this).css(e),$("<div>").addClass("arrow").addClass(o.vertical).addClass(o.horizontal).appendTo(this)}}}),$(".captcha iframe").attr("title","")}),require(["react","jsx!components/Util"],function(e){require(["componenteFormItem"],function(o){for(var r=["nome","email","cpf","senha","confirmarSenha"],s=["Nome","E-mail","CPF","Senha","Confirmar Senha"],a=["text","email","text","password","password"],t=[!0,!0,!0,!0,!0],l=[],n=0;n<r.length;n++)l.push(new function(e,o,r,s){this.id=e,this.label=o,this.type=r,this.obrigatorio=s,this.fonte=!1}(r[n],s[n],a[n],t[n]));o=e.createFactory(o),ReactDOM.render(o({header:"Informe seus dados de identificação.",dados:l}),document.getElementById("form-dados"))}),require(["jquery-ui","rotas"],function(e){var o="",r="",s=new Rotas,a=$("#modalMensagem");$("#cnpj.form-control").blur(function(e,t){validaCNPJ(r=$("#cnpj").val())?$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"autocomplete",rota:s.AutocompleteOSCByCnpj(replaceSpecialChars(r).replace(/ /g,"+"),10)},success:function(e){null!=e&&0!=e.length?(jQuery("#entidadeLabel").text(e[0].tx_nome_osc),$("#entidadeLabel").removeClass("hide"),o=e[0].id_osc,$("#cnpj").closest(".form-group").removeClass("has-error").addClass("has-success")):($("#entidadeLabel").addClass("hide"),jQuery("#entidadeLabel").text(""),$("#cnpj").closest(".form-group").removeClass("has-success").addClass("has-error"),o="",r="",jQuery("#modalTitle").text("Erro"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text("Essa organização não se encontra em nosso mapa! "),a.modal("show"))},error:function(e,s){console.log(getErrorMessage(e,s)),$("#entidadeLabel").addClass("hide"),jQuery("#entidadeLabel").text(""),$("#cnpj").closest(".form-group").removeClass("has-success").addClass("has-error"),o="",r="",jQuery("#modalTitle").text("Erro"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text("Essa organização não se encontra em nosso mapa! "),a.modal("show")}}):(jQuery("#modalTitle").text("Erro"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text("Valor de CNPJ inválido!"),$("#cnpj").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#entidadeLabel").addClass("hide"),jQuery("#entidadeLabel").text(""),a.modal("show"))}),$("#nome.form-control").blur(function(e,o){if(validaNome(this.value)){r="#"+$("#nome.form-control").attr("id")+"1";$("#nome.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok")}else{var r="#"+$("#nome.form-control").attr("id")+"1";$("#nome.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")}}),$("#email.form-control").blur(function(e,o){if(validaEmail(this.value)){r="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok")}else{var r="#"+$("#email.form-control").attr("id")+"1";$("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")}}),$("#cpf.form-control").blur(function(e,o){if(validaCPF(this.value)){r="#"+$("#cpf.form-control").attr("id")+"1";$("#cpf.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(r).removeClass("glyphicon-remove").addClass("glyphicon-ok")}else{var r="#"+$("#cpf.form-control").attr("id")+"1";$("#cpf.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(r).removeClass("glyphicon-ok").addClass("glyphicon-remove")}}),$("#confirmarSenha.form-control").blur(function(e,o){var r=this.value,s=$("#senha").val();r==s&&s.length>5?($("#senha.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$("#confirmarSenha.form-control").closest(".form-group").removeClass("has-error").addClass("has-success")):($("#senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"))});$(".form-group").find(".btn.btn-success").on("click",function(){if(0==grecaptcha.getResponse().length)return jQuery("#labelCaptcha").text("Resolver o Captcha."),!1;jQuery("#labelCaptcha").text("");var e=$("#nome").val(),t=$("#email").val(),l=$("#cpf").val(),n=$("#senha").val(),c=$("#confirmarSenha").val(),d="";if($("#termoUso").is(":checked"))i=!0;else var i=!1;if($("#newsletter").is(":checked"))m=!0;else var m=!1;if(!validaCNPJ(r)||isNaN(o))return $("#cnpj").closest(".form-group").removeClass("has-success").addClass("has-error"),jQuery("#modalTitle").text("Erro"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text("Entidade não existe!"),a.modal("show"),!1;if(!validaNome(e))return d="#"+$("#nome.form-control").attr("id")+"1",$("#nome.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(d).removeClass("glyphicon-remove").addClass("glyphicon-ok"),!1;if(!validaEmail(t))return d="#"+$("#email.form-control").attr("id")+"1",$("#email.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(d).removeClass("glyphicon-ok").addClass("glyphicon-remove"),!1;if(!validaCPF(l))return d="#"+$("#cpf.form-control").attr("id")+"1",$("#cpf.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(d).removeClass("glyphicon-ok").addClass("glyphicon-remove"),!1;if(""==n||n!=c||n.length<6)return d="#"+$("#senha.form-control").attr("id")+"1",$("#senha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(d).removeClass("glyphicon-ok").addClass("glyphicon-remove"),d="#"+$("#confirmarSenha.form-control").attr("id")+"1",$("#confirmarSenha.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"),$(d).removeClass("glyphicon-ok").addClass("glyphicon-remove"),jQuery("#modalTitle").text("Problema no cadastro!"),jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes ou senha menor que 5 caracteres."),a.modal("show"),!1;if(!i)return d="#"+$("#termoUso.form-control").attr("id")+"1",$("#termoUso.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),$(d).removeClass("glyphicon-remove").addClass("glyphicon-ok"),jQuery("#modalTitle").text("Problema no cadastro!"),jQuery("#modalConteudo").text("É necessário concordar com os termos de uso."),a.modal("show"),!1;var u={tx_email_usuario:t,tx_senha_usuario:n,tx_nome_usuario:e,nr_cpf_usuario:l,bo_lista_email:m,representacao:o};$.ajax({url:"js/controller.php",type:"POST",dataType:"json",data:{flag:"consultaPost",rota:s.CadastroRepresentante(),parametros:u},error:function(e){jQuery("#modalTitle").text("Problema no cadastro!"),jQuery("#modalConteudo").text("Não foi possível cadastrar o representante."),a.modal("show")},success:function(e){jQuery("#modalTitle").text("Cadastro de Representante"),jQuery("#modalConteudo").text(""),jQuery("#modalConteudo").text(e.msg),a.modal("show")}})})})});