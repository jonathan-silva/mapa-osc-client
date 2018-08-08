require(["jquery-ui","rotas"], function (React) {

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

    var $nome = $('#nome').val();
    var $email = $('#email').val();
    var $modal = $('#modalMensagem');

    if (!validaEmail($email)) {
        $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
        return false;
    } else {
        $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    var json = {"tx_nome_usuario": $nome, "tx_email_usuario": $email};
    var rotas = new Rotas();

    $('#loading').show();
    $.ajax({
         url: rotas.ReceberNoticia(),
         type: 'POST',
         dataType: 'json',
         data: json,
         error:function(data){
           if (data.status == 200){
             jQuery("#modalTitle").text("Notícias do Portal");
             jQuery("#modalConteudo").text("Cadastro realizado com sucesso.");
             $modal.modal('show');
           }else{
             jQuery("#modalTitle").text("Problema na solicitação!");
             jQuery("#modalConteudo").text(JSON.parse(data.responseText).msg);
             $modal.modal('show');
             return false;
           }
         },
         success: function(data){
           jQuery("#modalTitle").text("Notícias do Portal");
           jQuery("#modalConteudo").text("Cadastro realizado com sucesso.");
           $modal.modal('show');
         }
     }); //final envio ajax

  }); //Final btn click

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
