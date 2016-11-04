require(['react'], function (React) {

  require(['jquery-ui'], function (React) {

    $(".captcha input").checkboxradio();

  });

});

require(["jquery-ui"], function (React) {

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


  $("#email.form-control").blur(function (event, ui) {
    var email = this.value;
    if(validaEmail(email)){
        var id_attr = "#" + $("#email.form-control").attr("id") + "1";
        $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
        $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
    }else{
      var id_attr = "#" + $("#email.form-control").attr("id") + "1";
      $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
      $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
    }
  });

  //inicio btn.btn-success.click
  var div = $(".form-group");
  div.find(".btn.btn-success").on("click", function(){

        var email =  $('#email').val();
        var $modal = $('#modalMensagem');
        //HB TODO apagar teste
        email = "heraldoborges@gmail.com";

        if (!validaEmail(email)){
          $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          return false;
        };

        var json = '{"tx_email_usuario": "'+email+'"}';
        //console.log(json);


        //HB TODO Confirmar a url de esqueci a senhaa
        $.ajax({
        url: "http://mapaosc-desenv.ipea.gov.br:8383/api/user/password/",
        type: 'POST',
        dataType: 'json',
        data: json,
        sucess: function (data, textStatus, jqXHR ) {
          console.log(data);
          console.log(textStatus);
          console.log(jqXHR);
          $modal.modal('show');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(ajaxOptions);
            console.log(xhr.status);
            console.log(thrownError);
            jQuery("#modalTitle").text("Problema na solicitação!");
            jQuery("#modalConteudo").text(thrownError);
            $modal.modal('show');
            return false
        }
     }); //final envio ajax

}); //Final btn click
}); //Final jquery-ui










function validaEmail(email){
  usuario = email.substring(0, email.indexOf("@"));
  dominio = email.substring(email.indexOf("@")+ 1, email.length);

  if ((usuario.length >=1) &&
  (dominio.length >=3) &&
  (usuario.search("@")==-1) &&
  (dominio.search("@")==-1) &&
  (usuario.search(" ")==-1) &&
  (dominio.search(" ")==-1) &&
  (dominio.search(".")!=-1) &&
  (dominio.indexOf(".") >=1)&&
  (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  }else{
    return false;
  }
}
