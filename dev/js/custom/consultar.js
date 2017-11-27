require(["jquery-ui", "libs/jquery-mask/jquery.mask.min"], function (React) {


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

  $(".scroll").click(function(event){
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
 });

});

require(['react'], function (React) {

  require(['jquery-ui','rotas','jquery', 'select-boxit'], function (React) {

    var controller = 'js/controller.php'
    var rotas = new Rotas();
    var limiteAutocomplete = 10;
    var limiteAutocompleteCidade = 25;

    $("#accordion .panel-heading").each(function () {
      $(this).click(function() {
        $(this).parent().parent().children().last().toggle("slow");
      });
    });

    $( function() {

        $( "#dt_data_inicio_conselho" ).datepicker(
          { defaultDate: "+1w", changeYear: true, changeMonth: true, numberOfMonths: 1,
          onClose: function( selectedDate )
        {	$( "#dt_data_fim_conselho" ).datepicker( "option", "minDate", selectedDate );	}
       });

	      $( "#dt_data_fim_conselho" ).datepicker({	defaultDate: "+1w",	changeMonth: true, changeYear: true, numberOfMonths: 1,
        onClose: function( selectedDate ) {
          $( "#dt_data_inicio_conselho" ).datepicker( "option", "maxDate", selectedDate ); } });

        $( "#dt_data_inicio_projeto" ).datepicker(
          { defaultDate: "+1w", changeYear: true, changeMonth: true, numberOfMonths: 1,
          onClose: function( selectedDate )
        {	$( "#dt_data_fim_projeto" ).datepicker( "option", "minDate", selectedDate );	}
       });

        $( "#dt_data_fim_projeto" ).datepicker({	defaultDate: "+1w",	changeMonth: true, changeYear: true, numberOfMonths: 1,
        onClose: function( selectedDate ) {
          $( "#dt_data_inicio_projeto" ).datepicker( "option", "maxDate", selectedDate ); } });

    } );

    $( function() {

      $("div[id^='slider-range-']").each(function () {
        var input_id = $( this ).parent().find("input");
        var tipo = $( this ).parent().find('label').attr('for');

        if(tipo == "valor_dinheiro"){
          $( this ).slider({
            range: true,
            animate: true,
            min: 0,
            max: 1000000,
            step: 100,
            values: [ 0, 1000000 ],
            slide: function( event, ui ) {
              $(event.target.previousElementSibling).find(".min").val(  ui.values[ 0 ].toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
              $(event.target.previousElementSibling).find(".max").val(ui.values[ 1 ].toLocaleString("pt-BR", { minimumFractionDigits: 2 }) );
            }
          });
        }
        else if(tipo == "ano")
        {
          var data = new Date();
          var ano = data.getFullYear();

          $( this ).slider({
            range: true,
            min: 1900,
            max: ano,
            values: [ 1900, ano ],
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

    // Inicio - popular select

    function loadMetas(cd_objetivo){
      $.ajax({
        url: controller,
        type: 'GET',
        async: true,
        dataType: 'json',
        data:{flag: "consulta", rota: rotas.MetaProjeto(cd_objetivo)},
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          var selectbox = $('#cd_meta_projeto');
          var html = '<option value="">Qualquer</option>';

          if (data != null) {
            $.each(data, function (key, value) {
                html +='<option value=' + value.cd_meta_projeto + '>'+ value.tx_nome_meta_projeto + '</option>';
            });
          }
          selectbox.html(html);

          $("#cd_meta_projeto").addClass('newSelectBox');
          $("#cd_meta_projeto").selectBoxIt({
             theme: "default",
             defaultText: "Qualquer",
             autoWidth: false
           });
           $("#cd_meta_projeto").selectBoxIt();
           verificarContraste();

        }

      });
    }

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.AreaAtuacao()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
          if (data != null) {
            var selectbox = $('#cd_area_atuacao');
            $.each(data, function (key, value) {
                $('<option>').val(value.cd_area_atuacao).text(value.tx_nome_area_atuacao).appendTo(selectbox);
            });
          }
      }
    });

    var sub_area_box;
    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.SubAreaAtuacao()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
          sub_area_box = data;
      }
    });

    $( "#cd_area_atuacao" ).change(function() {
      var cd_area_atuacao = $(this).val();

      if (sub_area_box != null) {
        var selectbox = $('#cd_subarea_atuacao');
        var html = '';

        $.each(sub_area_box, function (key, value) {
          if(cd_area_atuacao == value.cd_area_atuacao ){
            html += '<label><input id="cd_subarea_atuacao-'+value.cd_subarea_atuacao+'" type="checkbox">'+value.tx_nome_subarea_atuacao+'</label>';
          }
        });

        if(html == ''){
          $(".subareaAtuacao").css('visibility','hidden');
        }else{
          $(".subareaAtuacao").css('visibility','visible');
        }
        selectbox.html(html);

      }

    });



    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.Conselho()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
          if (data != null) {
            var selectbox = $('#cd_conselho');
            $.each(data, function (key, value) {
                $('<option>').val(value.cd_conselho).text(value.tx_nome_conselho).appendTo(selectbox);
            });
          }
      }
    });


    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.Titularidade()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_tipo_participacao');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_tipo_participacao).text(value.tx_nome_tipo_participacao).appendTo(selectbox);
          });
        }
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.SituacaoImovel()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_situacao_imovel_osc');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_situacao_imovel).text(value.tx_nome_situacao_imovel).appendTo(selectbox);
          });
        }
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.FontesRecursosProjeto()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_origem_fonte_recursos_projeto');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_origem_fonte_recursos_projeto).text(value.tx_nome_origem_fonte_recursos_projeto).appendTo(selectbox);
          });
        }
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.ZonaAtuacaoProjeto()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_zona_atuacao_projeto');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_zona_atuacao_projeto).text(value.tx_nome_zona_atuacao).appendTo(selectbox);
          });
        }
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.AbrangenciaProjeto()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_abrangencia_projeto');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_abrangencia_projeto).text(value.tx_nome_abrangencia_projeto).appendTo(selectbox);
          });
        }
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.SituacaoProjeto()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_status_projeto');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_status_projeto).text(value.tx_nome_status_projeto).appendTo(selectbox);
          });
        }
      }
    });


    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.FormaParticipacaoConferencia()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_forma_participacao_conferencia');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_forma_participacao_conferencia).text(value.tx_nome_forma_participacao_conferencia).appendTo(selectbox);
          });
        }

        $("#cd_forma_participacao_conferencia").addClass('newSelectBox');
        $("#cd_forma_participacao_conferencia").selectBoxIt({
           theme: "default",
           defaultText: "Qualquer",
           autoWidth: false
         });
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota:  rotas.Conferencia()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_conferencia');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_conferencia).text(value.tx_nome_conferencia).appendTo(selectbox);
          });
        }

        $("#cd_conferencia").addClass('newSelectBox');
        $("#cd_conferencia").selectBoxIt({
           theme: "default",
           defaultText: "Qualquer",
           autoWidth: false
         });
      }
    });

    $.ajax({
      url: controller,
      type: 'GET',
      async: true,
      dataType: 'json',
      data:{flag: 'consulta', rota: rotas.Objetivos()},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){
        if (data != null) {
          var selectbox = $('#cd_objetivo_projeto');
          $.each(data, function (key, value) {
              $('<option>').val(value.cd_objetivo_projeto).text(value.tx_nome_objetivo_projeto).appendTo(selectbox);
          });
        }

        $("#cd_objetivo_projeto").addClass('newSelectBox');
        $("#cd_objetivo_projeto").selectBoxIt({
           theme: "default",
           defaultText: "Qualquer",
           autoWidth: false
         });
      }
    });

    $("#cd_objetivo_projeto").change(function() {
      var cd_objetivo_projeto = $(this).val();

      if(cd_objetivo_projeto != ""){
        loadMetas(cd_objetivo_projeto);

      }else{
        var html = '<option value="">Qualquer</option>';
        $('#cd_meta_projeto').html(html);
        $("#cd_meta_projeto").selectBoxIt();
        verificarContraste();

      }
    });
    // Fim - popular select


    // Inicio autocomplete

    function replaceSpecialChars(str){
      str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
      str = str.replace(/[àáâãäå]/g,"a");
      str = str.replace(/[ÉÈÊË]/g,"E");
      str = str.replace(/[éèêë]/g,"e");
      str = str.replace(/[ÍÌÎÏ]/g,"I");
      str = str.replace(/[íìîï]/g,"i");
      str = str.replace(/[ÓÒÔÕ]/g,"O");
      str = str.replace(/[óòôõ]/g,"o");
      str = str.replace(/[ÚÙÛÜ]/g,"U");
      str = str.replace(/[úùûü]/g,"u");
      str = str.replace(/[Ç]/g,"C");
      str = str.replace(/[ç]/g,"c");
      return str;
    }

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
       },
        select: function( event, ui ) {
          $("#tx_nome_municipio").val( ui.item.value );
          $("#cd_municipio").val( ui.item.id );
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
     },
     select: function( event, ui ) {
       $("#tx_nome_uf").val( ui.item.value );
       $("#cd_uf").val( ui.item.id );
     }
   });

   //autocomplete regiao
   $("#tx_nome_regiao").autocomplete({
     minLength: 1,
     source: function (request, response) {
        $.ajax({
            url: controller,
            type: 'GET',
            async: true,
            dataType: "json",
            data: {flag: 'autocomplete', rota: rotas.AutocompleteOSCByRegion(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)},
            success: function (data) {
              response($.map( data, function( item ) {
                 return {
                     label: item.edre_nm_regiao,
                     value: item.edre_nm_regiao,
                     id: item.edre_cd_regiao
                 };
             }));
            },
            error: function () {
                response([]);
            }
        });
    },
     select: function( event, ui ) {
       $("#tx_nome_regiao").val( ui.item.value );
       $("#cd_regiao").val( ui.item.id );
     }
    });

    //autocomplete atividade economica
    $("#tx_atividade_economica").autocomplete({
        minLength: 1,
        source: function (request, response) {
           $.ajax({
               url: controller,
               type: 'GET',
               async: true,
               dataType: "json",
               data: {flag: 'autocomplete', rota: rotas.AutocompleteAtividadeEconomica(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete)},
               success: function (data) {
                 response($.map( data, function( item ) {
                    return {
                        label: item.tx_atividade_economica,
                        value: item.tx_atividade_economica,
                    };
                }));
               },
               error: function (e) {
                   response([]);
               }
           });
       },
        select: function( event, ui ) {
          $("#tx_atividade_economica").val( ui.item.value );
        }
     });

     //Fim de autocomplete

    //permite somente numeros
    $(".min, .max").keypress( function() {
      var evt = window.event;
      var tecla = evt.keyCode;
      if(!(tecla > 47 && tecla < 58)){
        evt.preventDefault();
      }
    });

    $(".min").change( function() {
      $(this).parent().parent().find("div[id^='slider-range-']").slider("values", 0, $(this).val().replace(/[.]/g,"").split(",")[0]);
    });

    $(".max").change( function() {
      $(this).parent().parent().find("div[id^='slider-range-']").slider("values", 1, $(this).val().replace(/[.]/g,"").split(",")[0]);
    });

    $("label[for='valor_dinheiro']").parent().find('.min, .max').mask('000.000.000.000.000,00', {reverse: true});

    $("#btnLimpar").on("click", function() {
      $(".consultaAvancada input").each(function () {
        $(this).val('');
      });
      $('input[type=checkbox]').each(function () {
        $(this).attr('checked', false);
        $(this).prop('checked', false);
      });

      $(".consultaAvancada select").each(function () {
        if($(this).hasClass('newSelectBox')){
          $(this).data("selectBox-selectBoxIt").selectOption("");
        }
        else{
          $(this).prop('selectedIndex',0);
        }
      });

      $("div[id^='slider-range-']").each(function () {
        $(this).slider("values", 0, "");
        $(this).slider("values", 1, 99999999999);
      });

    });

    $("#btnConsultar").on("click", function() {
      var jsonConsulta = {};

       $(".panel-default").each(function () {
          var idSecao = $(this).find(".panel-title").attr('id');

          $(this).find("input[type=text], select").each(function () {
            if( $(this).val() != "")
            {
              if(jsonConsulta[idSecao] === undefined )
              {
                jsonConsulta[idSecao] = {};
              }
              jsonConsulta[idSecao][$(this).attr('id')] = $(this).val();
            }
           });

           $(this).find("input[type=hidden]").each(function () {
             if( $(this).val() != "")
             {
               if(jsonConsulta[idSecao] === undefined )
               {
                 jsonConsulta[idSecao] = {};
               }
               jsonConsulta[idSecao][$(this).attr('id')] = $(this).val();
             }
            });


           $(this).find("input[type=checkbox]").each(function () {
             if( $(this).prop( "checked"))
             {
               if(jsonConsulta[idSecao] === undefined )
               {
                 jsonConsulta[idSecao] = {};
               }
               jsonConsulta[idSecao][$(this).attr('id')] = $(this).prop( "checked");
             }
            });

         });

         var link = "./resultado-consulta.html?avancado=";
         window.localStorage.setItem('params_busca_avancada', JSON.stringify(jsonConsulta));
         location.href=link;


      }); //Final btn click

  });

});
