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

    //carregar dependendias e outras funcoes definidas
    require(["jquery-ui", "rotas"], function(React) {

        var $id_osc = '';
        var $cnpj_osc = '';
        var rotas = new Rotas();
        var $modal = $('#modalMensagem');
        var limiteAutocomplete = 10;
        var limiteAutocompleteCidade = 25;
        var controller = "js/controller.php";

        $("#tx_nome_representante.form-control").blur(function(event, ui) {
            var nome = this.value;
            var id_attr = '';
            if (validaNome(nome)) {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id") + "1";
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id") + "1";
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_email.form-control").blur(function(event, ui) {
            var email = this.value;
            var id_attr = '';
            if (validaEmail(email)) {
                id_attr = "#" + $("#tx_email.form-control").attr("id") + "1";
                $("#tx_email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_email.form-control").attr("id") + "1";
                $("#tx_email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });


        $("#tx_cpf.form-control").blur(function(event, ui) {
            var cpf = this.value;
            var id_attr = '';
            if (validaCPF(cpf)) {
                id_attr = "#" + $("#tx_cpf.form-control").attr("id") + "1";
                $("#tx_cpf.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#cpf.form-control").attr("id") + "1";
                $("#tx_cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_confirmar_senha.form-control").blur(function(event, ui) {
            var confirmarSenha = this.value;
            var senha = $('#tx_senha').val();
            if (confirmarSenha == senha) {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            }
        });

        //autocomplete municipio
        $("#tx_nome_municipio").autocomplete({
            minLength: 1,
            source: function (request, response) {
               $.ajax({
                   url: controller,
                   type: 'GET',
                   async: true,
                   dataType: "json",
                   data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocompleteCidade)},
                   success: function (data) {
                     response($.map( data, function( item ) {
                        return {
                            label: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                            value: item.edmu_nm_municipio + ' - '+ item.eduf_sg_uf,
                            id: item.edmu_cd_municipio
                        };
                    }));
                   },
                   error: function (e) {
                       response([]);
                   }
               });
           }
         });

        //autocomplete estado
        $("#tx_nome_uf").autocomplete({
          minLength: 1,
          source: function (request, response) {
             $.ajax({
                 url: controller,
                 type: 'GET',
                 async: true,
                 dataType: "json",
                 data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByState(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)},
                 success: function (data) {
                   response($.map( data, function( item ) {
                      return {
                          label: item.eduf_nm_uf,
                          value: item.eduf_nm_uf,
                          id: item.eduf_cd_uf
                      };
                  }));
                 },
                 error: function () {
                     response([]);
                 }
             });
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

            var nome = $('#tx_nome_representante').val();
            var email = $('#tx_email').val();
            var cpf = $('#tx_cpf').val();
            var senha = $('#tx_senha').val();
            var confirmarSenha = $('#tx_confirmar_senha').val();
            var id_attr = '';

            var termoUso = false;
            if ($('#termoUso').is(":checked")) {
                termoUso = true;
            } else {
                termoUso = false;
            }

            var newsletter = false;
            if ($('#newsletter').is(":checked")) {
                newsletter = true;
            } else {
                newsletter = false;
            }


            if (!validaNome(nome)) {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id") + "1";
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
                return false;
            }

            if (!validaEmail(email)) {
                id_attr = "#" + $("#tx_email.form-control").attr("id") + "1";
                $("#tx_email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
                return false;
            }

            if (!validaCPF(cpf)) {
                id_attr = "#" + $("#tx_cpf.form-control").attr("id") + "1";
                $("#tx_cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
                return false;
            }

            if ((senha == "") || (senha != confirmarSenha)) {
                id_attr = "#" + $("#tx_senha.form-control").attr("id") + "1";
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                id_attr = "#" + $("#tx_confirmar_senha.form-control").attr("id") + "1";
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                jQuery("#modalTitle").text("Problema no cadastro!");
                jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes.");
                $modal.modal('show');
                return false;
            }

            if (!termoUso) {
                id_attr = "#" + $("#termoUso.form-control").attr("id") + "1";
                $("#termoUso.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
                jQuery("#modalTitle").text("Problema no cadastro!");
                jQuery("#modalConteudo").text("É necessário concordar com os termos de uso.");
                $modal.modal('show');
                return false;
            }


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


require(['jquery'], function (React) {

  $("input:radio").change(function () {
    if($(this).val() == 0){
      $("#tx_nome_uf").parent().show();
      $("#tx_nome_municipio").parent().hide();
    }
    else {
      $("#tx_nome_municipio").parent().show();
      $("#tx_nome_uf").parent().hide();
    }
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
