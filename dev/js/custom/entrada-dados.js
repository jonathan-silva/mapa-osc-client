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

    $(".captcha iframe").attr('title', '');

});

require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteDropdown'], function(Dropdown){
    var arquivosRetornados, arquivosEnviados ;
    arquivosRetornados = arquivosEnviados = ["JSON", "CSV"];
    var periodicidade = ["Dia(s)", "Semana(s)", "Mês(es)"];

    Dropdown = React.createFactory(Dropdown);

    ReactDOM.render(Dropdown({list: arquivosRetornados}), document.getElementById("arquivo_retornado_dropdown"));
    ReactDOM.render(Dropdown({list:periodicidade}), document.getElementById("periodicidade_dropdown"));
    ReactDOM.render(Dropdown({list:arquivosEnviados}), document.getElementById("tipo_arquivo_dropdown"));

   });
});

require(['react', 'jsx!components/Util','jquery-ui','rotas'], function (React) {

  var user = window.localStorage.getItem('User');
  var auth  = window.localStorage.getItem('Authorization');

  var authHeader = {
    "User": user,
    "Authorization": auth
  };
  var json = {};
  json['headers'] = authHeader;

  var rotas = new Rotas();
  var modal = $('#modalMensagem');
  var controller = "js/controller.php";

  $("input:radio").change(function () {
    if($(this).val() === "web_service"){
      $("#web_service").show();
      $("#arquivo").hide();
    }
    else {
      $("#arquivo").show();
      $("#web_service").hide();
    }
  });

  var formdata;
  $('#fileUpload').change(function (event) {
      formdata = new FormData();
      formdata.append('fileUpload', event.target.files[0]);
      $("#labelFile").text("");
  });

  var div = $(".form-group");
  div.find(".btn.btn-success").on("click", function() {
      //Captcha
      if (grecaptcha.getResponse().length == 0) {
          $("#labelCaptcha").text("Resolver o Captcha.");
          return false;
      } else {
          $("#labelCaptcha").text("");
      }

      if( $("#fileUpload").val() == ""){
        $("#labelFile").text("Nenhum arquivo selecionado.");
        return false;
      }
      else{
        $("#labelFile").text("");
      }

      json['arquivo'] = formdata.getAll('fileUpload')[0];
      json['tipo_arquivo'] = $("#tipo_arquivo_dropdown select").val();

      $.ajax({
          dataType: 'json',
          type: 'POST',
          url: controller,
          cache : false,
          processData: false,
          data: {flag: 'consultaPost', rota: rotas.EnviarArquivoEstadoMunicipio(), parametros: json},
          error: function(e) {
              if (e.status == 200){
                  $("#modalTitle").text("Solicitação realizada com sucesso!");
                  $("#modalConteudo").text('');
                  $("#modalConteudo").text("Por favor, verifique o e-mail cadastrado.");
              }else{
                  $("#modalTitle").text("Problema no cadastro!");
                  $("#modalConteudo").text('');
                  $("#modalConteudo").text(JSON.parse(e.responseText).msg);
              }
             modal.modal('show');
          },
          success: function(data) {
              $("#modalTitle").text("Cadastro de Representante");
              $("#modalConteudo").text('');
              $("#modalConteudo").text(data.msg);
              modal.modal('show');
          }
      });

  });

});

var jsonModalAjuda = {
	"Selecione o arquivo a ser enviado":'Os arquivos enviados para o Mapa das OSCs devem ser enviados em dois formatos <b>CSV</b> ou <b>JSON</b>.',
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
