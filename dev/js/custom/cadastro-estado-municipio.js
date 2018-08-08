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

    jQuery(document).ready(function($) {
        $(".scroll").click(function(event){
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
       });
    });


});

require(['react', 'jsx!components/Util'], function(React) {

    //carregar dependendias e outras funcoes definidas
    require(["jquery-ui", "rotas", 'jquery', 'libs/jquery-mask/jquery.mask.min'], function(React) {

        var $id_osc = '';
        var $cnpj_osc = '';
        var rotas = new Rotas();
        var $modal = $('#modalMensagem');
        var limiteAutocomplete = 10;
        var limiteAutocompleteCidade = 25;
        var localidadeAtiva = false;
        var erroLocalidade = false;

        $("#tx_nome_representante.form-control").blur(function(event, ui) {
            var nome = this.value;
            var id_attr = '';
            if (validaNome(nome)) {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id");
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_nome_representante.form-control").attr("id");
                $("#tx_nome_representante.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_email.form-control").blur(function(event, ui) {
            var email = this.value;
            var id_attr = '';
            if (validaEmail(email)) {
                id_attr = "#" + $("#tx_email.form-control").attr("id");
                $("#tx_email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_email.form-control").attr("id");
                $("#tx_email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_email_confirmacao.form-control").blur(function(event, ui) {
            var email = this.value;
            var id_attr = '';
            if (validaEmailGov(email)) {
                id_attr = "#" + $("#tx_email_confirmacao.form-control").attr("id");
                $("#tx_email_confirmacao.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_email_confirmacao.form-control").attr("id");
                $("#tx_email_confirmacao.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });


        $("#tx_cpf.form-control").blur(function(event, ui) {
            var cpf = this.value;
            var id_attr = '';
            if (validaCPF(cpf)) {
                id_attr = "#" + $("#tx_cpf.form-control").attr("id");
                $("#tx_cpf.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_cpf.form-control").attr("id");
                $("#tx_cpf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        });

        $("#tx_senha.form-control").blur(function(event, ui) {
            var senha = this.value;
            if (senha.length >= 6) {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
            } else {
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            }
        });

        $("#tx_confirmar_senha.form-control").blur(function(event, ui) {
            var confirmar_senha = this.value;
            var senha = $('#tx_senha').val();
            if (confirmar_senha == senha && confirmar_senha.length >= 6) {
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
                   url: rotas.AutocompleteOSCByCounty(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocompleteCidade),
                   type: 'GET',
                   async: true,
                   dataType: "json",
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
                     $("#tx_nome_municipio").val("");
                     $("#cd_municipio_id").val("");
                     $("#tx_nome_municipio").closest('.form-group').removeClass('has-success').addClass('has-error');
                   }
               });
           },
            select: function( event, ui ) {
              var id_attr = '';
              $("#tx_nome_municipio").val( ui.item.value );
              $("#cd_municipio_id").val( ui.item.id );

              validarLocalidade(ui.item.id);
              if (!localidadeAtiva && !erroLocalidade) {
                  id_attr = "#" + $("#tx_nome_municipio.form-control").attr("id");
                  $("#tx_nome_municipio.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                  $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
              } else {
                  id_attr = "#" + $("#tx_nome_municipio.form-control").attr("id");
                  $("#tx_nome_municipio.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                  $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
              }
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
                       $("#tx_nome_uf").val("");
                       $("#cd_uf_id").val("");
                       $("#tx_nome_uf").closest('.form-group').removeClass('has-success').addClass('has-error');
                 }
             });
         },
          select: function( event, ui ) {
            var id_attr = '';
            $("#tx_nome_uf").val( ui.item.value );
            $("#cd_uf_id").val( ui.item.id );

            validarLocalidade(ui.item.id);
            if (!localidadeAtiva && !erroLocalidade) {
                id_attr = "#" + $("#tx_nome_uf.form-control").attr("id");
                $("#tx_nome_uf.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
            } else {
                id_attr = "#" + $("#tx_nome_uf.form-control").attr("id");
                $("#tx_nome_uf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
          }
       });

       $("input:radio").change(function () {
         if($(this).val() == 0){
           $("#tx_nome_uf").parent().show();
           $("#tx_nome_municipio").parent().hide();
           $("#tx_nome_municipio").val('');
           $('#cd_municipio_id').val('');
         }
         else {
           $("#tx_nome_municipio").parent().show();
           $("#tx_nome_uf").parent().hide();
           $('#tx_nome_uf').val('');
           $('#cd_uf_id').val('');
         }
       });

       $("#tx_nome_uf.form-control").blur(function(event, ui) {
           if(this.value == ""){
            $("#cd_uf_id").val("");
           }
           var cod_estado = $("#cd_uf_id").val();
           validarLocalidade(cod_estado);
           var id_attr = '';
           if (!localidadeAtiva && !erroLocalidade) {
               id_attr = "#" + $("#tx_nome_uf.form-control").attr("id");
               $("#tx_nome_uf.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
               $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
           } else {
               id_attr = "#" + $("#tx_nome_uf.form-control").attr("id");
               $("#tx_nome_uf.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
               $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
           }
       });

       $("#tx_nome_municipio.form-control").blur(function(event, ui) {
           if(this.value == ""){
            $("#cd_municipio_id").val("");
           }
           var cod_municipio = $('#cd_municipio_id').val();
           validarLocalidade(cod_municipio);
           var id_attr = '';
           if (!localidadeAtiva && !erroLocalidade) {
               id_attr = "#" + $("#tx_nome_municipio.form-control").attr("id");
               $("#tx_nome_municipio.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
               $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
           } else {
               id_attr = "#" + $("#tx_nome_municipio.form-control").attr("id");
               $("#tx_nome_municipio.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
               $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
           }
       });

        var SPMaskBehavior = function (val) {
          return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
          onKeyPress: function(val, e, field, options) {
              field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

        $('#tx_telefone1').mask(SPMaskBehavior, spOptions);
        $('#tx_telefone2').mask(SPMaskBehavior, spOptions);

        $("#btnLimpar").on("click", function() {
          $("#conteudo input").each(function () {
            $(this).val('');
          });

          $('input[type=checkbox]').each(function () {
            $(this).attr('checked', false);
            $(this).prop('checked', false);
          });

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
            var id_attr = '';
            var nome = $('#tx_nome_representante').val();
            var email = $('#tx_email').val();
            var cpf = $('#tx_cpf').val();
            var orgao_trabalha = $('#tx_orgao_trabalha').val();
            var tel1 = $('#tx_telefone1').val();
            var tel2 = $('#tx_telefone2').val();
            var senha = $('#tx_senha').val();
            var confirmar_senha = $('#tx_confirmar_senha').val();
            var cd_municipio_id = $('#cd_municipio_id').val();
            var cd_uf_id = $('#cd_uf_id').val();
            var email_confirmacao = $('#tx_email_confirmacao').val();
            var registro_institucional = $('#tx_registro_institucional').val();

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

            var pedido_atualizacao_trimestral = false;
            if ($('#pedido_atualizacao_trimestral').is(":checked")) {
                pedido_atualizacao_trimestral = true;
            } else {
                pedido_atualizacao_trimestral = false;
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

            if ((senha == "") || (senha != confirmar_senha) || (senha.length < 6)) {
                id_attr = "#" + $("#tx_senha.form-control").attr("id") + "1";
                $("#tx_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                id_attr = "#" + $("#tx_confirmar_senha.form-control").attr("id") + "1";
                $("#tx_confirmar_senha.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');

                jQuery("#modalTitle").text("Problema no cadastro!");
                if(senha.length < 6){
                  jQuery("#modalConteudo").text("Senha deve conter mínimo 6 caracteres.");
                }
                else{
                  jQuery("#modalConteudo").text("Os valores da senha e da confirmação são diferentes.");
                }
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
                "tx_orgao_trabalha": orgao_trabalha,
                "tx_telefone_1": tel1,
                "tx_telefone_2": tel2,
                "bo_lista_email": newsletter,
                "bo_lista_pedido_atualizacao_trimestral": pedido_atualizacao_trimestral,
                "tx_registro_institucional":registro_institucional,
                "tx_email_confirmacao":email_confirmacao,
            };

            if($("input:radio:checked").val() == 0){
                json["localidade"] = cd_uf_id;
            }
            else{
              json["localidade"] = cd_municipio_id;
            }

            $.ajax({
                url: controller,
                type: 'POST',
                dataType: 'json',
                data: {flag: 'consultaPost', rota: rotas.CadastroRepresentanteEstadoMunicipio(), parametros: json},
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

        //FUNCOES DE VALIDACAO usando ajax
        function validarLocalidade(cod_localidade) {
          $.ajax({
            url: rotas.ValidarLocalidade(cod_localidade),
            type: 'GET',
            async: false,
            dataType: 'json',
            error: function(e){
              erroLocalidade = true;
            },
            success: function(data){
              erroLocalidade = false;
              localidadeAtiva = data.resultado;
            }
          });
        }

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
        (dominio.lastIndexOf(".") < dominio.length - 1)
      ) {
        return true;
    } else {
        return false;
    }
}

function validaEmailGov(email) {
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
        (dominio.lastIndexOf(".") < dominio.length - 1) &&
        (dominio.indexOf("gov") != -1)
      ) {
        return true;
    } else {
        return false;
    }
}

function validaCPF(cpf) {
    var exp = /\.|\-/g;
    cpf = cpf.toString().replace(exp, "");
    var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
    var soma1 = 0;
    var soma2 = 0;
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

var jsonModalAjuda = {
	"Email de Confirmação":'Email institucional (gov.br) da chefia imediata ou de superior mais próximo que possua email <b>".gov.br"</b>.<br>Caso o Estado ou Município não possua email institucional, informe pelo email mapaosc@ipea.com.br.',
 	"Registro Institucional":"Um registro que comprove a vinculação do representante do Estado ou Município com o ente federativo. Sugere-se utilizar o número de matrícula do servidor ou identificador similar. Não Obrigatório.",
 	"Órgão em que Trabalha":"Informar o setor que trabalha e a Secretaria Estadual ou Municipal à qual está vinculado/a.",
 	"Email":'Email institucional do/a responsável por encaminhar ao Mapa das OSCs o banco de dados com as parcerias entre OSCs e o governo estadual/municipal. Solicitamos, preferencialmente, um contato institucional terminado em <b>".gov.br"</b>.<br>Caso não seja possível, pode-se utilizar o email pessoal para efetuar o cadastro.',
  "Senha":'A senha deve conter no mínimo <b>6</b> caracteres.',
  "Unidade Administrativa":'Informe o Estado ou Município a qual representa.<br>Primeiro passo: escolha entre Estado ou município.<br>Segundo passo: Digite o nome da unidade federativa. Após digitar, selecione o nome da sua unidade federativa.'
};

function abrirModalAjuda(titulo) {

  var	corpo = jsonModalAjuda[titulo];
  var tituloCompleto = "Ajuda - "+titulo;
  var btn = "<button type='button' class='btn btn-danger' data-dismiss='modal'>Fechar</button>";

  acionarModalAjuda(tituloCompleto, corpo, btn);
}

function acionarModalAjuda(titulo, corpo, btn) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
	$("#btnFooter").html("");
	$("#btnFooter").html(btn);
  $("#modalAjuda").modal('show');
  verificarContraste();
}
