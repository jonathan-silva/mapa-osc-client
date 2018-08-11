require(['react'], function (React) {

  require(['jquery-ui','rotas'], function (React) {

    $(".captcha input").checkboxradio();

    $(document).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    });

    var rotas = new Rotas();
    var modulo = "contato";

    $.ajax({
      url: rotas.ModuloBySlug(modulo),
      type: 'GET',
      dataType: 'json',
      error: function(e){
          console.log("ERRO no AJAX :" + e);
      },
      success: function(data){
        var html = "";
        if (data.length > 0){

          html = '<div class="row"><div class="col-md-12"><h1 class="text-primary">'+data[0].modulos.tx_titulo_modulo+'</h1><hr></div></div>';
          html += '<div class="row"><div class="col-md-12">'+data[0].modulos.tx_descricao_modulo+'</div></div>';

          if(data[0].itens.length > 0){
            for (var i in data[0].itens) {
              html += '<div class="row"><div class="col-md-12"><h3 class="subTitulo">'+data[0].itens[i].tx_titulo_itens+'</h3>';
              html += '<div class="text-justify txtBloco">'+data[0].itens[i].tx_descricao_itens+'</div>';
              html += '<a href="#header" name="header" class="scroll topo">Voltar para o topo</a></div></div>';
            }
          }
        }
        $('#contato').prepend(html);
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

	 //inicio btn.btn-success.click
	 var div = $(".form-group");
    div.find(".btn.btn-success").on("click", function() {

      //Captcha
      if(grecaptcha.getResponse().length == 0) {
        jQuery("#labelCaptcha").text("Resolver o Captcha.");
        return false;
      }else{
        jQuery("#labelCaptcha").text("");
      }

      var $assunto = $('#assunto :selected').text();
      var $nome = $('#nome').val();
      var $email = $('#email').val();
      var $mensagem = $('#mensagem').val();
      var $modal = $('#modalMensagem');

      if (!validaEmail($email)) {
          $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          return false;
      } else {
          $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
      }

      var $json = {"assunto": $assunto, "nome": $nome, "email": $email, "mensagem": $mensagem};
      var rotas = new Rotas();

      $('#loading').show();

		  $.ajax({
  			type: 'POST',
  			url: rotas.Contato(),
  			data: $json,
  			dataType: 'json',
        success: function(data) {
            console.log(data.responseText);
            $modal.modal('show');
        },
        error: function(e) {
           console.log(e);
            if (e.status==500){
              jQuery("#modalTitle").text("Problema na solicitação!");
              jQuery("#modalConteudo").text("Sistema indisponível no momento. Por favor, tente mais tarde.");
            }/*else{
              try{
                  $msg = e.responseText.msg;
               }catch(e){
                  $msg = "Sistema indisponível no momento.";
               }
              jQuery("#modalConteudo").text($msg);
            }*/
            $modal.modal('show');
            return false
        },
        complete: function(){
          $('#loading').hide();
        }
		  });
    }); //Final btn click

  });

});



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
