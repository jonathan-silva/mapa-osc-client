require(['react'], function(React) {

    require(['jquery-ui'], function(React) {
        $(".captcha input").checkboxradio();
    });

});

require(["jquery-ui", "rotas"], function(React) {

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


    $("#email.form-control").blur(function(event, ui) {
        var email = this.value.toLowerCase();
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


        var $email = $('#email').val().toLowerCase();
        var $modal = $('#modalMensagem');
        var rotas = new Rotas();

        if (!validaEmail($email)) {
            $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            return false;
        } else {
            $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
        }

        var json = {"tx_email_usuario":$email};


        $.ajax({
             url: rotas.RecuperSenha(),
             type: 'POST',
             dataType: 'json',
             data: json,
             error:function(data){
                 jQuery("#modalTitle").text("Problema na solicitação!");
                 jQuery("#modalConteudo").text(data.responseJSON.msg);
                 $modal.modal('show');
                 return false;
             },
             success: function(data){
               jQuery("#modalTitle").text("Recuperar Senha");
               jQuery("#modalConteudo").text(data.msg);
               $modal.modal('show');
             }
         }); //final envio ajax
    }); //Final btn click
}); //Final jquery-ui




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
