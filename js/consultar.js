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
              $(event.target.previousElementSibling).find(".min").val( ui.values[ 0 ] );
              $(event.target.previousElementSibling).find(".max").val(ui.values[ 1 ] );
            }
          });
        }
        else
        {
          $( this ).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [ 0, 1000 ],
            slide: function( event, ui ) {
              $(event.target.previousElementSibling).find(".min").val( ui.values[ 0 ] );
              $(event.target.previousElementSibling).find(".max").val(ui.values[ 1 ] );
            }
          });
        }
      });
    } );

    //permite somente numeros
    $(".min, .max").keypress( function() {
      evt = window.event;
      var tecla = evt.keyCode;
      if(!(tecla > 47 && tecla < 58)){
         evt.preventDefault();
      }
    });

    $(".min").keyup( function() {
      $(this).parent().parent().find("div[id^='slider-range-']").slider("values", 0, $(this).val());
    });

    $(".max").keyup( function() {
      $(this).parent().parent().find("div[id^='slider-range-']").slider("values", 1, $(this).val());
    });

    $("#btnLimpar").on("click", function() {
      $(".consultaAvancada input").each(function () {
        $(this).val('');
      });

      $(".consultaAvancada select").each(function () {
        $(this).prop('selectedIndex',0);
      });

      $("div[id^='slider-range-']").each(function () {
        $(this).slider("values", 0, "");
        $(this).slider("values", 1, 99999999999);
      });

    });

    $("#btnConsultar").on("click", function() {
       var jsonConsulta = {};
       $(".panel-default").each(function () {
          var nomeSecao = $(this).find(".panel-title").text();

          if(jsonConsulta[nomeSecao] === undefined)
          {
            jsonConsulta[nomeSecao] = [];
          }

          $(this).find("input[type=text], select").each(function () {
            if( $(this).val() != "")
            {
              var obj = [];
              obj[$(this).attr('id')] = $(this).val();
              jsonConsulta[nomeSecao].push(obj);
            }
           });

           $(this).find("input[type=checkbox]").each(function () {
             if( $(this).prop( "checked"))
             {
               var obj = [];
               obj[$(this).attr('id')] = $(this).prop( "checked");
               jsonConsulta[nomeSecao].push(obj);
             }
            });

         });
  /*
        var rotas = new Rotas();

  		  $.ajax({
    			type: 'POST',
    			url: 'js/controller.php',
    			data:{flag: 'consultaAvancada', rota: rotas.consultaAvancada(), parametros: jsonConsulta},
    			dataType: 'json',
          success: function(data) {
              console.log(data.responseText);
          },
          error: function(e) {
             console.log(e);
          }
  		  });
        */
      }); //Final btn click

  });

});
