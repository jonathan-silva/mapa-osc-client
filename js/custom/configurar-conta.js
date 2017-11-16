"use strict";function replaceSpecialChars(e){return e=e.replace(/[ÀÁÂÃÄÅ]/g,"A"),e=e.replace(/[àáâãäå]/g,"a"),e=e.replace(/[ÉÈÊË]/g,"E"),e=e.replace(/[éèêë]/g,"e"),e=e.replace(/[ÍÌÎÏ]/g,"I"),e=e.replace(/[íìîï]/g,"i"),e=e.replace(/[ÓÒÔÕ]/g,"O"),e=e.replace(/[óòôõ]/g,"o"),e=e.replace(/[ÚÙÛÜ]/g,"U"),e=e.replace(/[úùûü]/g,"u"),e=e.replace(/[Ç]/g,"C"),e=e.replace(/[ç]/g,"c")}function validaEmail(e){var a=e.substring(0,e.indexOf("@")),o=e.substring(e.indexOf("@")+1,e.length);return a.length>=1&&o.length>=3&&-1==a.search("@")&&-1==o.search("@")&&-1==a.search(" ")&&-1==o.search(" ")&&-1!=o.search(".")&&o.indexOf(".")>=1&&o.lastIndexOf(".")<o.length-1}require(["jquery-ui"],function(e){$(document).tooltip({position:{my:"center bottom-20",at:"center top",using:function(e,a){$(this).css(e),$("<div>").addClass("arrow").addClass(a.vertical).addClass(a.horizontal).appendTo(this)}}}),jQuery(document).ready(function(e){e(".scroll").click(function(a){a.preventDefault(),e("html,body").animate({scrollTop:e(this.hash).offset().top},800)})})}),require(["react","jsx!components/Util","jquery-ui","rotas","tagsinput"],function(e){require(["componenteFormItem"],function(a){function o(e,a,o,s){this.id=e,this.label=a,this.type=o,this.obrigatorio=s,this.fonte=!1}for(var s=["nome","email","senha","confirmarSenha"],r=["Nome","Email","Senha","Confirmar Senha"],t=["text","email","password","password"],l=[!0,!0,!1,!1],n=[],c=0;c<s.length;c++)n.push(new o(s[c],r[c],t[c],l[c]));for(var i=["nomeEntidade"],d=["CNPJ da Entidade"],u=["text"],m=[!0],p=[],g=0;g<i.length;g++)p.push(new o(i[g],d[g],u[g],m[g]));a=e.createFactory(a),ReactDOM.render(a({header:"Dados de Identificação.",dados:n}),document.getElementById("form-dados")),ReactDOM.render(a({header:"Suas Organizações.",dados:p}),document.getElementById("form-org"))});var a=window.localStorage.getItem("User"),o=window.localStorage.getItem("Authorization"),s={User:a,Authorization:o},r={};r.headers=s;var t="",l=new Rotas;$("#tag").tagsinput({cancelConfirmKeysOnEmpty:!1,freeInput:!1,itemValue:"id",itemText:"text"}),$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"validaUsuario",rota:l.ValidarUsuario(a),parametros:r},success:function(e){$("#nome").val(e.tx_nome_usuario),$("#email").val(e.tx_email_usuario);for(var a=0;a<e.representacao.length;a++)0==a&&$("#tags").prepend('<label class="control-label listaOscs">Lista de OSCs: <span class="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span></label>'),$("#tags").removeClass("hide"),$("#tag").tagsinput("add",{id:e.representacao[a].id_osc,text:e.representacao[a].tx_nome_osc});$("#tags span[data-role=remove]").each(function(){$(this).addClass("tagRemove").prop("title","Clique para Remover a OSC do seu Cadastro.")})},error:function(e){console.log(e),$("#modalMensagem").modal({backdrop:"static",keyboard:!1}),$("#modalTitle").text("Erro"),$("#modalConteudo").text("É necessário estar logado no sistema para acessar essa página."),$(".modal-footer button").on("click",function(){history.go(-1)}),$("#modalMensagem").modal("show")}}),require(["jquery-ui","rotas"],function(e){$("#nomeEntidade.form-control").autocomplete({minLength:14,source:function(e,a){$.ajax({url:"js/controller.php",type:"GET",dataType:"json",data:{flag:"autocomplete",rota:l.AutocompleteOSCByCnpj(replaceSpecialChars(e.term).replace(/ /g,"+"),10)},success:function(e){null===e?$("#nomeEntidade.form-control").closest(".form-group").removeClass("has-success").addClass("has-error"):$("#nomeEntidade.form-control").closest(".form-group").removeClass("has-error").addClass("has-success"),a($.map(e,function(e){return{label:e.tx_nome_osc,value:e.tx_nome_osc,id:e.id_osc}}))},error:function(e){a([])}})},select:function(e,a){t=a.item.id,$("#tags").removeClass("hide"),$("#tag").tagsinput("add",{id:a.item.id,text:a.item.label}),$("#tags span[data-role=remove]").each(function(){$(this).addClass("tagRemove").prop("title","Clique para Remover a OSC do seu Cadastro.")})}})}),$("#send").on("click",function(){var e=$("#nome").val(),o=$("#email").val(),s=$("#senha").val(),t=$("#confirmarSenha").val(),n=$("#tag").val(),c=!0;if(""===e||null===e?($("#nome").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#nome").closest(".form-group").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Nome não pode está vazio!</span></div>')):($("#nome").closest(".form-group").removeClass("has-error").addClass("has-success"),c=!1),validaEmail(o)?($("#email").closest(".form-group").removeClass("has-error").addClass("has-success"),c=!!c):($("#email").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#email").closest(".form-group").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Email não pode está vazio!</span></div>'),c=!0),""!==s&&(s.length>5?t===s?($("#senha").closest(".form-group").removeClass("has-error").addClass("has-success"),$("#confirmarSenha").closest(".form-group").removeClass("has-error").addClass("has-success"),c=!!c):($("#senha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Confirmar senha tem que ser igual senha!</span></div>'),c=!0):(c=!0,$("#senha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#confirmarSenha").closest(".form-group").removeClass("has-success").addClass("has-error"),$("#senha").closest(".form-group").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: Senha é Menor que 6 Caracteres!</span></div>'))),""===n||null===n?($("#tag").closest("#tags").append('<div class="form-group row-centered"><span id="labelError" class="label label-danger centered">Erro: É necessário ter pelo menos uma OSC!</span></div>'),c=!0):c=!!c,!c){r.tx_nome_usuario=e,r.tx_email_usuario=o,""!==s&&null!==s&&s.length>5&&(r.tx_senha_usuario=s);for(var i=n.split(","),d=[],u=0;u<i.length;u++)d.push({id_osc:i[u]});r.representacao=d,r.id_usuario=a,$.ajax({url:"js/controller.php",type:"POST",dataType:"json",data:{flag:"login",rota:l.UpdateUsuario(a),parametros:r},success:function(e){$("#modalTitle").text("Sucesso"),$("#modalConteudo").text("Sua atualização foi realizada com sucesso."),$("#modalMensagem").modal("show"),window.localStorage.setItem("Authorization",e.access_token),window.localStorage.setItem("Osc",e.representacao),window.localStorage.setItem("Nome",e.tx_nome_usuario),$(".menuLogado .dropdown-toggle").html(""),$(".menuLogado .dropdown-toggle").append(e.tx_nome_usuario),$(".menuLogado .dropdown-toggle").append(' <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>')},error:function(e){console.log(e)}})}})});