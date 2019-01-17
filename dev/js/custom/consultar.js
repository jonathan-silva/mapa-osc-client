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

    var rotas = new Rotas();
    var limiteAutocomplete = 10;
    var limiteAutocompleteCidade = 25;

    var box_cd_situacao_imovel_osc = true;
    var sub_area;

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

    function loadMetas(cd_objetivo, nome_div){
      var selectBox_metas = $("select#"+nome_div).data("selectBox-selectBoxIt");
      if(selectBox_metas != undefined){
        selectBox_metas.destroy();
      }

      $.ajax({
        url: rotas.MetaProjeto(cd_objetivo),
        type: 'GET',
        async: true,
        dataType: 'json',
        error:function(e){
          console.log("Erro no ajax: ");
          console.log(e);
        },
        success: function(data){
          var selectbox = $("#"+nome_div);
          var html = '<option value="">Selecione uma opção</option>';

          if (data != null) {
            $.each(data, function (key, value) {
                html +='<option value=' + value.cd_meta_projeto + '>'+ value.tx_nome_meta_projeto + '</option>';
            });
          }
          selectbox.html(html);

          $("#"+nome_div).addClass('newSelectBox');
          $("#"+nome_div).selectBoxIt({
             theme: "default",
             defaultText: "Selecione uma opção",
             autoWidth: false
           });
           $("#"+nome_div).selectBoxIt();

           var selectBox_metas = $("select#"+nome_div).data("selectBox-selectBoxIt");
           selectBox_metas.enable();

           verificarContraste();

        }

      });
    }

  $.ajax({
    url: rotas.Busca_Certificado(),
    type: 'GET',
    dataType: 'json',
    error: function(e){
        console.log("ERRO no AJAX :" + e);
    },
    success: function(data){

      var id_certificados = {1:"titulacao_entidadeAmbientalista", 2:"titulacao_cebasEducacao",
                             3:"titulacao_cebasSaude", 4:"titulacao_oscip",
                             5:"titulacao_utilidadePublicaFederal", 6:"titulacao_cebasAssistenciaSocial",
                             7:"titulacao_utilidadePublicaEstadual",
                             8:"titulacao_utilidadePublicaMunicipal", 9:"titulacao_naoPossui"
                           };

      if (data.length > 0){

          for (var i in data) {
            var html = '<label><input id="'+id_certificados[data[i].cd_certificado]+'" value="'+data[i].cd_certificado+'"  type="checkbox">'+data[i].tx_nome_certificado+'</label>';
            $('#cd_certificado').append(html);
          }
      }

    }
  });


    $.ajax({
      url: rotas.AreaAtuacao(),
      type: 'GET',
      async: true,
      dataType: 'json',
      error:function(e){
        console.log("Erro no ajax: ");
      },
      success: function(data){

        if(data != null ){
          for(var i in data){
            var html = '<label><input id="cd_area_atuacao-'+data[i].cd_area_atuacao+'" value="'+data[i].cd_area_atuacao+'"  type="checkbox">'+ data[i].tx_nome_area_atuacao+'</label>';
            $('#cd_area_atuacao').append(html);
          }
        }

        $.ajax({
          url: rotas.SubAreaAtuacao(),
          type: 'GET',
          async: true,
          dataType: 'json',
          error:function(e){
            console.log("Erro no ajax: ");
          },
          success: function(data){

            sub_area = data;
            $("#cd_area_atuacao input").change(function() {
                var cd_area_atuacao = $(this).val();
                var tx_area_atuacao = $(this).parent().text();
                if(tx_area_atuacao != "Outros"){
                  if(this.checked) {

                    if (sub_area != null) {
                      var selectbox = $('#cd_subarea_atuacao');
                      var html = '';
                      html += '<div class="form-group col-xs-6 col-sm-12 buscaSubareaAtuacao" id="item_'+cd_area_atuacao+'" ><label class="control-label itemAreaAtuacao">'+tx_area_atuacao+':</label>';

                      $.each(sub_area, function (key, value) {
                        if(cd_area_atuacao == value.cd_area_atuacao ){
                          html += '<label><input id="cd_subarea_atuacao-'+value.cd_subarea_atuacao+'" value="'+value.cd_subarea_atuacao+'" type="checkbox">'+value.tx_nome_subarea_atuacao+'</label>';
                        }
                      });
                      html += '</div>';

                      $(".subareaAtuacao").css('visibility','visible');
                      selectbox.append(html);

                    }
                  }else{
                    $("#item_"+cd_area_atuacao).remove();
                  }
              }
            });
          }
        });



      }
    });



    $("#cd_situacao_imovel_osc").selectBoxIt({
      theme: "default",
      defaultText: "Selecione uma opção",
      autoWidth: false,

      populate: function() {
          var deferred = $.Deferred(),
              arr = [],
              x = -1;
          $.ajax({
            url: rotas.SituacaoImovel(),
            type: 'GET',
            async: true,
            dataType: 'json'
          }).done(function(data) {
              while(++x < data.length) {
                  arr.push({"text": data[x].tx_nome_situacao_imovel, "value": data[x].cd_situacao_imovel,})
              }
              deferred.resolve(arr);
          });
          return deferred;
      }
    });

    $('#espacosParticipacaoSocial').mousedown(function() {

      $("#cd_tipo_participacao").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.Titularidade(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_tipo_participacao, "value": data[x].cd_tipo_participacao,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

      $("#cd_conselho").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.Conselho(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_conselho, "value": data[x].cd_conselho,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

      $("#cd_forma_participacao_conferencia").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.FormaParticipacaoConferencia(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_forma_participacao_conferencia, "value": data[x].cd_forma_participacao_conferencia,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

      $("#cd_conferencia").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.Conferencia(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_conferencia, "value": data[x].cd_conferencia,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

    });


    $('#projetos').mousedown(function() {

      $("#cd_origem_fonte_recursos_projeto").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.FontesRecursosProjeto(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_origem_fonte_recursos_projeto, "value": data[x].cd_origem_fonte_recursos_projeto,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

      $("#cd_status_projeto").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.SituacaoProjeto(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_status_projeto, "value": data[x].cd_status_projeto,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

      $("#cd_zona_atuacao_projeto").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.ZonaAtuacaoProjeto(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_zona_atuacao, "value": data[x].cd_zona_atuacao_projeto,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

      $("#cd_abrangencia_projeto").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.AbrangenciaProjeto(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_abrangencia_projeto, "value": data[x].cd_abrangencia_projeto,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

    });

    $('#cd_objetivo_projeto').mousedown(function() {

      $("#cd_objetivo_projeto").selectBoxIt({
        theme: "default",
        defaultText: "Selecione uma opção",
        autoWidth: false,

        populate: function() {
            var deferred = $.Deferred(),
                arr = [],
                x = -1;
            $.ajax({
              url: rotas.Objetivos(),
              type: 'GET',
              async: true,
              dataType: 'json'
            }).done(function(data) {
                while(++x < data.length) {
                    arr.push({"text": data[x].tx_nome_objetivo_projeto, "value": data[x].cd_objetivo_projeto,})
                }
                deferred.resolve(arr);
            });
            return deferred;
        }
      });

    });


    $("#cd_objetivo_projeto").change(function() {
      var cd_objetivo_projeto = $(this).val();

      if(cd_objetivo_projeto != ""){
        loadMetas(cd_objetivo_projeto, 'cd_meta_projeto');

      }else{
        var html = '<option value="">Selecione uma opção</option>';
        $('#cd_meta_projeto').html(html);
        var selectBox_metas = $("select#cd_meta_projeto").data("selectBox-selectBoxIt");
        if(selectBox_metas != undefined){
          selectBox_metas.disable();
        }
        verificarContraste();

      }
    });


    $("#cd_objetivo_osc").selectBoxIt({
      theme: "default",
      defaultText: "Selecione uma opção",
      autoWidth: false,

      populate: function() {
          var deferred = $.Deferred(),
              arr = [],
              x = -1;
          $.ajax({
            url: rotas.Objetivos(),
            type: 'GET',
            async: true,
            dataType: 'json'
          }).done(function(data) {
              while(++x < data.length) {
                  arr.push({"text": data[x].tx_nome_objetivo_projeto, "value": data[x].cd_objetivo_projeto,})
              }
              deferred.resolve(arr);
          });
          return deferred;
      }
    });


    $("#cd_objetivo_osc").change(function() {
      var cd_objetivo_osc = $(this).val();

      if(cd_objetivo_osc != ""){
        loadMetas(cd_objetivo_osc,'cd_meta_osc');

      }else{
        var html = '<option value="">Selecione uma opção</option>';
        $('#cd_meta_osc').html(html);
        var selectBox_metas = $("select#cd_meta_osc").data("selectBox-selectBoxIt");
        if(selectBox_metas != undefined){
          selectBox_metas.disable();
        }
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
             url: rotas.AutocompleteOSCByState(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete),
             type: 'GET',
             async: true,
             dataType: "json",
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
            url: rotas.AutocompleteOSCByRegion(replaceSpecialChars(request.term).replace(/ /g, '+'), limiteAutocomplete),
            type: 'GET',
            async: true,
            dataType: "json",
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
               url: rotas.AutocompleteAtividadeEconomica(replaceSpecialChars(request.term).replace(/ /g, '_'), limiteAutocomplete),
               type: 'GET',
               async: true,
               dataType: "json",
               success: function (data) {
                 if(data.length > 0){
                   response($.map( data, function( item ) {
                      return {
                          value: item.tx_atividade_economica,
                          cod: item.cd_classe_atividade_economica,
                      };
                  }));
                 }
                 else{
                   $("#tx_atividade_economica").val("");
                   $("#tx_atividade_economica").closest('.form-group').removeClass('has-success').addClass('has-error');
                   $("#labelError_atividade_economica").text("Nome da Atividade Econômica inválido.");

                   setTimeout(function(){
                     $("#tx_atividade_economica.form-control").closest('.form-group').removeClass('has-error');
                     $("#labelError_atividade_economica").text("");
                   },2000);
                 }
               },
               error: function (e) {
                 $("#tx_atividade_economica").val("");
                 $("#tx_atividade_economica").closest('.form-group').removeClass('has-success').addClass('has-error');
                 $("#labelError_atividade_economica").text("Nome da Atividade Econômica inválido.");

                 setTimeout(function(){
                   $("#tx_atividade_economica.form-control").closest('.form-group').removeClass('has-error');
                   $("#labelError_atividade_economica").text("");
                 },2000);
               }
           });
       },
        select: function( event, ui ) {
          $("#tx_atividade_economica").val(ui.item.value);
          $("#cd_classe_atividade_economica").val(ui.item.cod);
          $("#tx_atividade_economica.form-control").closest('.form-group').removeClass('has-error');
          $("#labelError_atividade_economica").text("");

        }
     });

     //Fim de autocomplete

     // Inicio Ipea Data
    /* http://atlasbrasil.org.br/2013/pt/ranking
     Muito Alto 	0,800 - 1,000
	   Alto 	0,700 - 0,799
	   Médio 	0,600 - 0,699
	   Baixo 	0,500 - 0,599
	   Muito Baixo 	0,000 - 0,499*/

     var id_ipeadata = {1:"IDHM", 2:"IDHM Renda", 3:"IDHM Educação",
                            4:"IDHM Longevidade", 5:"Taxa de mort. infantil",
                            6:"Taxa de mort. infantil até 5 anos",
                            7:"Bolsa Família", 8:"Benef. idosos",
                            9:"Benef. deficientes", 10:"Pop. Rural",
                            11:"Pop. Urbana", 12:"Médicos Residentes",
                            13:"Analfabetismo de pessoas com 15 anos e mais",
                            14:"Media de anos de estudo de pessoas com 25 anos e mais",
                            15:"En. Fund. Completo de pessoas com 25 anos e mais",
                            16:"En. Médio Completo de pessoas com 25 anos e mais",
                            17:"En. Superior Completo de pessoas com 25 anos e mais",
                            18:"Crianças de 4 a 5 anos fora da escola",
                            19:"Crianças de 6 a 14 anos fora da escola",
                            20:"Frequência de crianças e jovens à escola",
                          };

         for (var i in id_ipeadata) {
           var html = '<label for="'+id_ipeadata[i]+'"><input id="'+id_ipeadata[i]+
           '" type="radio" name="idh" value="'+id_ipeadata[i]+
           '">'+id_ipeadata[i]+'</label>';

           $('#ipea_data').append(html);
         }
         /*
     $.ajax({
       url: rotas.Busca_Certificado(),
       type: 'GET',
       dataType: 'json',
       error: function(e){
           console.log("ERRO no AJAX :" + e);
       },
       success: function(data){

         var id_ipeadata = {1:"IDHM", 2:"IDHM_Renda",
                                3:"IDHM_Educacao", 4:"IDHM_Longevidade",
                                5:"mort_infant", 6:"mort_infant5"
                              };

         if (data.length > 0){

             for (var i in data) {
               var html = '<label><input id="'+id_ipeadata[i]+'" type="checkbox">'+id_ipeadata[i]+'</label>';
               $('#ipea_data').append(html);
             }
         }

       }
     });*/

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

      $(".consultaAvancada input[type=text]").each(function () {
        $(this).val('');
      });

      $('input[type=checkbox]').each(function () {
        $(this).attr('checked', false);
        $(this).prop('checked', false);
      });

      $(".consultaAvancada select").each(function () {
        if($(this).hasClass('newSelectBox')){
          if($(this).data("selectBox-selectBoxIt") != undefined){
            $(this).data("selectBox-selectBoxIt").selectOption("");
          }
        }
        else{
          $(this).prop('selectedIndex',0);
        }
      });

      $("div[id^='slider-range-']").each(function () {
        $(this).slider("values", 0, "");
        $(this).slider("values", 1, 99999999999);
      });

      $(".buscaSubareaAtuacao").each(function () {
        $(this).remove();
      });

    });

    $("#btnConsultar").on("click", function() {
      var jsonConsulta = {};

       $(".panel-default").each(function () {
          var idSecao = $(this).find(".panel-title").attr('id');

          $(this).find("input[type=text], select").each(function () {
            if( $(this).val() != "")
            {
              if (idSecao === 'areasSubareasAtuacao')
              {
                idSecao = 'atividadeEconomica';
              }

              if(jsonConsulta[idSecao] === undefined )
              {
                jsonConsulta[idSecao] = {};
              }
              if($(this).attr('id') == 'cd_identificador_osc'){
                jsonConsulta[idSecao][$(this).attr('id')] = $(this).val().replace(/\D/g, "");
              }else {
                jsonConsulta[idSecao][$(this).attr('id')] = $(this).val();
              }
            }
           });

           $(this).find("input[type=hidden]").each(function () {
             if( $(this).val() != "")
             {
               if (idSecao === 'areasSubareasAtuacao')
               {
                 idSecao = 'atividadeEconomica';
               }

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
               if (idSecao == 'atividadeEconomica' || idSecao == 'areasSubareasAtuacao' )
               {
                 idSecao = 'areasSubareasAtuacao';

                 if($(this).parent().parent().parent().attr('id') == "cd_subarea_atuacao")
                 {
                   if(jsonConsulta[idSecao] === undefined )
                   {
                     jsonConsulta[idSecao] = {};
                   }
                   jsonConsulta[idSecao][$(this).attr('id')] = $(this).prop( "checked");
                 }
                 else {

                   var id_area = $(this).val();
                   if($("#item_"+id_area).find("input[type=checkbox]:checked").length == 0)
                   {
                      if(jsonConsulta[idSecao] === undefined )
                      {
                        jsonConsulta[idSecao] = {};
                      }
                      jsonConsulta[idSecao][$(this).attr('id')] = $(this).prop( "checked");
                   }
                 }
               }
               else{

                 if(jsonConsulta[idSecao] === undefined )
                 {
                   jsonConsulta[idSecao] = {};
                 }
                 jsonConsulta[idSecao][$(this).attr('id')] = $(this).prop( "checked");
               }
             }
            });

          $(this).find("input[type=radio]").each(function () {
            if( $(this).prop( "checked")) {
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
