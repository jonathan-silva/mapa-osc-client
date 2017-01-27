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
        //formulario 1
        var hd = 'Verifique se a organização já está cadastrada no Mapa, informando o CNPJ.';
        var id = ['nomeEntidade'];
        var label = ['CNPJ da Entidade'];
        var type = ['text'];
        var obrigatorio = [true];

        var formItens = [];

        for (var i = 0; i < id.length; i++) {
            formItens.push(new FormItens(id[i], label[i], type[i], obrigatorio[i]));
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
            header: hd,
            dados: formItens
        }), document.getElementById("form-org"));
        ReactDOM.render(FormItem({
            header: hd2,
            dados: formItens2
        }), document.getElementById("form-dados"));
    });



    //carregar dependendias e outras funcoes definidas
    require(["jquery-ui", "rotas"], function(React) {

        var $id_osc = '';
        var rotas = new Rotas();
        var $modal = $('#modalMensagem');
        var limiteAutocomplete = 10;
        var limiteAutocompleteCidade = 25;
        var controller = "js/controller.php";


        $("#nomeEntidade.form-control").autocomplete({
            minLength: 14,
            source: function(request, response) {
                $.ajax({
                    url: controller,
                    type: 'GET',
                    dataType: "json",
                    data: {
                        flag: 'autocomplete',
                        rota: rotas.AutocompleteOSCByCnpj(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)
                    },
                    success: function(data) {
                      if (data == null){
                          $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                          jQuery("#modalTitle").text("Erro");
                          jQuery("#modalConteudo").text('');
                          jQuery("#modalConteudo").text("Entidade não existe! ");
                          $modal.modal('show');
                      }else{
                        $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                      }
                      response($.map(data, function(item) {
                          return {
                              label: item.tx_nome_osc,
                              value: item.tx_nome_osc,
                              id:    item.id_osc
                          };
                      }));
                    },
                    error: function(e) {
                        response([]);
                    }
                });
            },
            select: function(event, ui) {
                $id_osc = ui.item.id;
            }
        });


        /*
        $("#nomeEntidade.form-control").blur(function(event, ui) {
            var nomeEntidade = this.value;
            if (nomeEntidade) {
                $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            }
        });
        */


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

            if (!isNaN($id_osc)) {
                $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#nomeEntidade.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
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
                "representacao": [{
                    "id_osc": $id_osc
                }]
            };


            $.ajax({
                //url: 'http://localhost:8080/api/user/',
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
                    jQuery("#modalTitle").text("Solicitação realizada com sucesso!");
                    jQuery("#modalConteudo").text('');
                    jQuery("#modalConteudo").text("Por favor, verifique o e-mail cadastrado.");
                    $modal.modal('show');
                }
            }); //final ajax
        });
        //final  btn.btn-success.click
    });
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
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@") + 1, email.length);

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

function validaCPF(cpf) {
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0,
        soma2 = 0;
    var vlr = 11;

    for (i = 0; i < 9; i++) {
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


function replaceSpecialChars(str) {
    str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[ÉÈÊË]/, "E");
    str = str.replace(/[éèêë]/, "e");
    str = str.replace(/[ÍÌÎÏ]/, "I");
    str = str.replace(/[íìîï]/, "i");
    str = str.replace(/[ÓÒÔÕ]/, "O");
    str = str.replace(/[óòôõ]/, "o");
    str = str.replace(/[ÚÙÛÜ]/, "U");
    str = str.replace(/[úùûü]/, "u");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "c");
    return str;
}
