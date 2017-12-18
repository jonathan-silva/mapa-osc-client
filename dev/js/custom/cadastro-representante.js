require(["jquery-ui"], function(React) {

    $(document).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });

    $(".captcha iframe").attr('title', '');

});

require(['react', 'jsx!components/Util'], function(React) {
    require(['componenteFormItem'], function(FormItem) {
        function FormItens(id, label, type, obrigatorio) {
            this.id = id;
            this.label = label;
            this.type = type;
            this.obrigatorio = obrigatorio;
            this.fonte = false;
        }

        //formulario 2
        var hd2 = 'Informe seus dados de identificação.';
        var id2 = ['nome', 'email', 'cpf', 'senha', 'confirmarSenha'];
        var label2 = ['Nome', 'E-mail', 'CPF', 'Senha', 'Confirmar Senha'];
        var type2 = ['text', 'email', 'text', 'password', 'password'];
        var obrigatorio2 = [true, true, true, true, true];
        var formItens2 = [];

        for (var j = 0; j < id2.length; j++) {
            formItens2.push(new FormItens(id2[j], label2[j], type2[j], obrigatorio2[j]));
        }

        FormItem = React.createFactory(FormItem);
        ReactDOM.render(FormItem({
            header: hd2,
            dados: formItens2
        }), document.getElementById("form-dados"));
    });



    //carregar dependendias e outras funcoes definidas
    require(["jquery-ui", "rotas"], function(React) {

        var $id_osc = '';
        var $cnpj_osc = '';
        var rotas = new Rotas();
        var $modal = $('#modalMensagem');
        var limiteAutocomplete = 10;
        var limiteAutocompleteCidade = 25;
        var controller = "js/controller.php";


        $("#cnpj.form-control").blur(function(event, ui) {
          $cnpj_osc = $('#cnpj').val();
          if (!validaCNPJ($cnpj_osc)) {
            jQuery("#modalTitle").text("Erro");
            jQuery("#modalConteudo").text('');
            jQuery("#modalConteudo").text("Valor de CNPJ inválido!");
            $("#cnpj").closest('.form-group').removeClass('has-success').addClass('has-error');
            $('#entidadeLabel').addClass('hide');
            jQuery("#entidadeLabel").text('');
            $modal.modal('show');
          }else{
              $.ajax({
                  url: controller,
                  type: 'GET',
                  dataType: "json",
                  data: {
                      flag: 'autocomplete',
                      rota: rotas.AutocompleteOSCByCnpj(replaceSpecialChars($cnpj_osc).replace(/ /g, '+'), limiteAutocomplete)
                  },
                  success: function(data) {
                    if (data[0]){
                       jQuery("#entidadeLabel").text(data[0].tx_nome_osc);
                       $('#entidadeLabel').removeClass('hide');
                       $id_osc = data[0].id_osc;
                       $("#cnpj").closest('.form-group').removeClass('has-error').addClass('has-success');
                    }else{
                        $('#entidadeLabel').addClass('hide');
                        jQuery("#entidadeLabel").text('');
                        $("#cnpj").closest('.form-group').removeClass('has-success').addClass('has-error');
                        $id_osc = '';
                        $cnpj_osc = '';
                        jQuery("#modalTitle").text("Erro");
                        jQuery("#modalConteudo").text('');
                        jQuery("#modalConteudo").text("Essa organização não se encontra em nosso mapa! ");
                        $modal.modal('show');
                    }
                  },
                  error: function (jqXHR, exception) {
                        console.log(getErrorMessage(jqXHR, exception));
                  }
              });
          }//fim else
        });

        $("#nome.form-control").blur(function(event, ui) {
            var nome = this.value;
            if (validaNome(nome)) {
                var id_attr = "#" + $("#nome.form-control").attr("id") + "1";
                $("#nome.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                var id_attr = "#" + $("#nome.form-control").attr("id") + "1";
                $("#nome.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#email.form-control").blur(function(event, ui) {
            var email = this.value;
            if (validaEmail(email)) {
                var id_attr = "#" + $("#email.form-control").attr("id") + "1";
                $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                var id_attr = "#" + $("#email.form-control").attr("id") + "1";
                $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });


        $("#cpf.form-control").blur(function(event, ui) {
            var cpf = this.value;
            if (validaCPF(cpf)) {
                var id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
                $("#cpf.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                var id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
                $("#cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#confirmarSenha.form-control").blur(function(event, ui) {
            var confirmarSenha = this.value;
            var senha = $('#senha').val();
            if (confirmarSenha == senha) {
                $("#senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $("#confirmarSenha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#confirmarSenha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            }
        });



        //inicio btn.btn-success.click
        var div = $(".form-group");
        div.find(".btn.btn-success").on("click", function() {

            //Captcha
            if (grecaptcha.getResponse().length == 0) {
                jQuery("#labelCaptcha").text("Resolver o Captcha.");
                return false;
            } else {
                jQuery("#labelCaptcha").text("");
            }

            var nome = $('#nome').val();
            var email = $('#email').val();
            var cpf = $('#cpf').val();
            var senha = $('#senha').val();
            var confirmarSenha = $('#confirmarSenha').val();
            var id_attr = '';
            if ($('#termoUso').is(":checked")) {
                var termoUso = true;
            } else {
                var termoUso = false;
            }
            if ($('#newsletter').is(":checked")) {
                var newsletter = true;
            } else {
                var newsletter = false;
            }

            if ((!validaCNPJ($cnpj_osc))||(isNaN($id_osc))) {
                $("#cnpj").closest('.form-group').removeClass('has-success').addClass('has-error');
                jQuery("#modalTitle").text("Erro");
                jQuery("#modalConteudo").text('');
                jQuery("#modalConteudo").text("Entidade não existe!");
                $modal.modal('show');
                return false;
            };

            if (!validaNome(nome)) {
                id_attr = "#" + $("#nome.form-control").attr("id") + "1";
                $("#nome.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
                return false;
            };

            if (!validaEmail(email)) {
                id_attr = "#" + $("#email.form-control").attr("id") + "1";
                $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
                return false;
            };

            if (!validaCPF(cpf)) {
                id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
                $("#cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
                return false;
            };

            if ((senha == "") || (senha != confirmarSenha)) {
                id_attr = "#" + $("#senha.form-control").attr("id") + "1";
                $("#senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                id_attr = "#" + $("#confirmarSenha.form-control").attr("id") + "1";
                $("#confirmarSenha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                jQuery("#modalTitle").text("Problema no cadastro!");
                jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes.");
                $modal.modal('show');
                return false;
            };

            if (!termoUso) {
                id_attr = "#" + $("#termoUso.form-control").attr("id") + "1";
                $("#termoUso.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
                jQuery("#modalTitle").text("Problema no cadastro!");
                jQuery("#modalConteudo").text("É necessário concordar com os termos de uso.");
                $modal.modal('show');
                return false;
            };


            var json = {
                "tx_email_usuario": email,
                "tx_senha_usuario": senha,
                "tx_nome_usuario": nome,
                "nr_cpf_usuario": cpf,
                "bo_lista_email": newsletter,
                "representacao": [$id_osc]
            };


            $.ajax({
                url: controller,
                type: 'POST',
                dataType: 'json',
                data: {flag: 'consultaPost', rota: rotas.CadastroRepresentante(), parametros: json},
                error: function(data) {
                    if (data.status == 200){
                        jQuery("#modalTitle").text("Solicitação realizada com sucesso!");
                        jQuery("#modalConteudo").text('');
                        jQuery("#modalConteudo").text("Por favor, verifique o e-mail cadastrado.");
                    }else{
                        jQuery("#modalTitle").text("Problema no cadastro!");
                        jQuery("#modalConteudo").text('');
                        jQuery("#modalConteudo").text(JSON.parse(data.responseText).msg);
                    }
                    $modal.modal('show');
                },
                success: function(data) {
                    jQuery("#modalTitle").text("Cadastro de Representante");
                    jQuery("#modalConteudo").text('');
                    jQuery("#modalConteudo").text(data.msg);
                    $modal.modal('show');
                }
            }); //final ajax
        });
        //final  btn.btn-success.click
    }); //final require
});


//FUNCOES DE VALIDACAO
function validaNome(nome) {
    if (nome.length < 5) {
        return false;
    } else {
        return true;
    }
}

function validaEmail(email) {
    var usuario = email.substring(0, email.indexOf("@"));
    var dominio = email.substring(email.indexOf("@") + 1, email.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    } else {
        return false;
    }
}

function validaCNPJ(cnpj) {
  var cnpj = cnpj.toString().replace(/[^\d]+/g,"");
  if((cnpj == '')|| (cnpj.length != 14)) return false;

  // Valida DVs
  var tamanho = cnpj.length - 2
  var numeros = cnpj.substring(0,tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;

  return true;
}

function validaCPF(cpf) {
    var exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0,
        soma2 = 0;
    var vlr = 11;

    for (var i = 0; i < 9; i++) {
        soma1 += eval(cpf.charAt(i) * (vlr - 1));
        soma2 += eval(cpf.charAt(i) * vlr);
        vlr--;
    }
    soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
    soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
    var digitoGerado = (soma1 * 10) + soma2;

    if (digitoGerado != digitoDigitado) {
        return false;
    } else {
        return true;
    }
}



function getErrorMessage(jqXHR, exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    return msg;
}


function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÉÈÊË]/g, "E");
    str = str.replace(/[éèêë]/g, "e");
    str = str.replace(/[ÍÌÎÏ]/g, "I");
    str = str.replace(/[íìîï]/g, "i");
    str = str.replace(/[ÓÒÔÕ]/g, "O");
    str = str.replace(/[óòôõ]/g, "o");
    str = str.replace(/[ÚÙÛÜ]/g, "U");
    str = str.replace(/[úùûü]/g, "u");
    str = str.replace(/[Ç]/g, "C");
    str = str.replace(/[ç]/g, "c");
    return str;
}
