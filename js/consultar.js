require(['react'], function (React) {

  require(['jquery-ui','rotas'], function (React) {

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

    $( function() {

      $("div[id^='slider-range-']").each(function () {
        input_id = $( this ).parent().find("input");
        tipo = $( this ).parent().find('label').attr('for');

        if(tipo == "valor_dinheiro"){
          $( this ).slider({
            range: true,
            animate: true,
            min: 0,
            max: 1000000,
            step: 100,
            values: [ 0, 1000000 ],
            slide: function( event, ui ) {
              $(event.target.previousElementSibling).find(".min").val( ui.values[ 0 ] );
              $(event.target.previousElementSibling).find(".max").val(ui.values[ 1 ] );
            }
          });
        }
        else if(tipo == "ano")
        {
          $( this ).slider({
            range: true,
            min: 1600,
            max: 2100,
            values: [ 1600, 2100 ],
            slide: function( event, ui ) {
              $(event.target.previousElementSibling).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
          });
          $(input_id).val( $( this ).slider( "values", 0 ) + " - " + $( this ).slider( "values", 1 ) );
        }
        else
        {
          $( this ).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [ 0, 1000 ],
            slide: function( event, ui ) {
              $(event.target.previousElementSibling).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
            }
          });
          $(input_id).val( $( this ).slider( "values", 0 ) + " - " + $( this ).slider( "values", 1 ) );

        }
      });


  } );



	 //inicio btn.btn-success.click
	 var div = $(".form-group");
    div.find(".btn.btn-success").on("click", function() {


      var $assunto = $('#assunto :selected').text();
      var $nome = $('#nome').val();
      var $email = $('#email').val();
      var $mensagem = $('#mensagem').val();
      var $modal = $('#modalMensagem');

      var $json = {"assunto": $assunto, "nome": $nome, "email": $email, "mensagem": $mensagem};
      var rotas = new Rotas();

		  $.ajax({
  			type: 'POST',
  			url: 'js/controller.php',
  			data:{flag: 'consultaPost', rota: rotas.Contato(), parametros: $json},
  			dataType: 'json',
        success: function(data) {
            console.log(data.responseText);
        },
        error: function(e) {
           console.log(e);
        }
		  });
    }); //Final btn click

  });

});
