class Util {
  constructor() {
  }

  FormItens(id, label, content, fonte, placeholder, type, options, pretext, custom_class, hide, defaultFormItem){
    return {
      "id" : id,
      "label" : label,
      "content" : content,
      "fonte" : fonte,
      "placeholder" : placeholder,
      "type" : type,
      "options" : options,
      "pretext" : pretext,
      "custom_class" : custom_class,
      "hide" : hide,
      "default" : defaultFormItem
    };
  }

  carregaAjax(url, type, params){
    var controller = "js/controller.php";
    var retorno = null;
    $.ajax({
      url: controller,//url,
      async: false,
      type: type,
      dataType: 'json',
      //data: params,
      data: {flag: 'consultaPost', rota: url, parametros: params},
      success: function(data) {
        retorno =  data;
      },
      error: function(e) {
        retorno = e;
      }
    });
    return retorno;
  }

  //verifica se objeto existe, se e nulo ou vazio
  validateObject(obj, returnsIfFalse){
    if(obj === null){
      return returnsIfFalse;
    }
    else if(obj===undefined){
      return returnsIfFalse;
    }
    if(Object.keys(obj).length === 0 && obj.constructor === Object){
      return returnsIfFalse;
    }
    return obj;
  }

  contains( substring, string ) {
    if (typeof string === 'string'){
      return string.indexOf(substring)>=0;
    } else {
      return false;
    }
  }

  showUnauthorizedUser(e){
    if(e.status === 401){
      $('#unauthorized').dialog('open');
      console.log(e);
    }
  }

  AgrupadorDeInputs(id, containerClass, header, inputs, buttons, select, cc){
    return{
      "id" : id,
      "containerClass" : containerClass,
      "header" : header,
      "inputs" : inputs,
      "options" : select,
      "buttons" : buttons,
      "custom_class": cc
    };
  }

  abrirModalAjuda(titulo, jsonModalAjuda) {
  	var	corpo = jsonModalAjuda[titulo];

    $("#modalTitulo").html("");
    $("#modalTitulo").html(titulo);
    $("#corpoModal").html("");
    $("#corpoModal").html(corpo);
    $("#modalAjuda").modal('show');
    verificarContraste();
  }

  InputProjeto(id, content, type, options, removable, buttons, buttonsInLine, placeholder, title, cd, cc){
    return {
      "id" : id,
      "content" : content,
      "type" : type,
      "options" : options,
      "removable" : removable,
      "buttons" : buttons,
      "buttonsInLine" : buttonsInLine,
      "placeholder" : placeholder,
      "title": title,
      "cd": cd,
      "cc": cc
    };
  }

  getTipoProjeto(key, dados){
    return {
      "id": key,
      "dados": dados
    };
  }
  addOutro(idClass){
    function addOutros(idClass){
      $('.'+idClass).each(function(index, el) {
        var $select = $(this).children().find('select').first();
        var $outro = $select.find('option:last').val();
        $select.change(function(){
          var $element = $(this).parent().parent().parent();
          if($(this).val() == $outro){
              $element.find('#outro_'+idClass).remove();
              $element.append('<div id="outro_'+idClass+'" style="padding-top: 10px;">'
                    +'<label class = "control-label">Novo Item:</label>'
                      +'<div class="input-box">'
                        +'<input type="text" class="form-control " placeholder="Insira o novo item aqui" id="outro-'+idClass+'_'+index+'" value="">'
                        +'<span class="fonte-de-dados dado-organizacao" title="Informação preenchida pela Organização">'
                          +'<img class="imgDadoEditavel" src="img/dado_representante.png">'
                        +'</span>'
                      +'</div>'
                    +'</div>');
          }
          else{
            if($element.find('#outro_'+idClass)){
              $element.find('#outro_'+idClass).remove();
            }
          }
        })
      });
    }
    addOutros(idClass);
  }
  addItem(idDiv){
    function addItemm(idDiv){

      function isTrue(obj){
        if(obj){
          return true;
        }
        else {
          return false;
        }
      }

      $('#'+idDiv+' button').on('click', function(){
        if($(this).hasClass('btn-primary')){
          var $cloneDiv = ($(this).parent());
          var $input = $cloneDiv.find('input[type=text]');
          var $select = $cloneDiv.find('select');
          var values = new Array();
          $input.parent().removeClass('has-error');
          $select.parent().removeClass('has-error');
          $('.alert-danger').remove();

          $input.each(function(i){
            if($(this).val().trim() !== "" ){
              values[i] = true;
            }
            else {
              values[i] = false;
              $(this).parent().addClass('has-error').after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>');
            }
          });

          $select.each(function(i){
            if($(this).val() !== '-1' ){
              values[i] = true;
            }
            else {
              values[i] = false;
              $(this).parent().addClass('has-error').after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>');
            }
          });

          if(values.every(isTrue)){
            $input.parent().removeClass('has-error');
            $select.parent().removeClass('has-error');
            $input.after().find('span').remove();
            $select.after().find('span').remove();
            var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
            var $cloneChildren = $('#'+idDiv).children();
            $cloneDiv.clone().appendTo($cloneChildren);
            $cloneDiv.parent().children().last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(addItemm(idDiv));
            $cloneDiv.parent().children().last().find('input[type=text]').val('');

            var date_inputs = $cloneDiv.parent().children().last().find(".date");
            var ano_inputs = $cloneDiv.parent().children().last().find(".ano");
            var cloneDiv_date_inputs = $cloneDiv.parent().children().last().prev().find(".date");
            var cloneDiv_ano_inputs = $cloneDiv.parent().children().last().prev().find(".ano");

            for (var i = 0; i < date_inputs.length; i++) {
              var date_input = date_inputs[i];
              var cloneDiv_date_input = cloneDiv_date_inputs[i];
              var cloneDiv_id_string = $(cloneDiv_date_input).attr("id");
              var cloneDiv_id_text = cloneDiv_id_string.substr(0,cloneDiv_id_string.indexOf('-'));
              var cloneDiv_id = cloneDiv_id_string.substr(cloneDiv_id_string.indexOf('-')+1);
              var date_input_id_string = $(date_input).attr("id");
              var date_input_text = date_input_id_string.substr(0,cloneDiv_id_string.indexOf('-'));
              var id_clone_div = Number(cloneDiv_id);
              var id_clone_div_text = date_input_text;
              id_clone_div--;
              $(date_input).removeClass('hasDatepicker');
              $(date_input).attr("id", id_clone_div_text+"-"+id_clone_div);
              $(date_input).datepicker({ dateFormat: 'dd-mm-yy', changeYear: true });
            }
            this.addOutros = new Util();
            if(idDiv == 'conselhos'){
              this.addOutros.addOutro('conselho');
            }
            if (idDiv == "conferencias") {
            var date_input = ano_inputs[0];
            var cloneDiv_date_input = cloneDiv_ano_inputs;
            var cloneDiv_id_string = $(cloneDiv_date_input).attr("id");
            var cloneDiv_id_text = cloneDiv_id_string.substr(0,cloneDiv_id_string.indexOf('-'));
            var cloneDiv_id = cloneDiv_id_string.substr(cloneDiv_id_string.indexOf('-')+1);
            var date_input_id_string = $(date_input).attr("id");
            var date_input_text = date_input_id_string.substr(0,cloneDiv_id_string.indexOf('-'));
            var id_clone_div = Number(cloneDiv_id);
            var id_clone_div_text = date_input_text;
            id_clone_div--;
            $(date_input).removeClass('hasDatepicker');
            $(date_input).attr("id", id_clone_div_text+"-"+id_clone_div);
            $(date_input).datepicker({
                changeYear: true,
                showButtonPanel: true,
                dateFormat: 'yy',
                yearRange: '1950:2050',
                onClose: function(dateText, inst) {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, 1));
                } });
                $(date_input).focus(function () {
                    $(".ui-datepicker-calendar").hide();
                    $('.ui-datepicker-month').hide();
                    $('.ui-datepicker-prev').hide();
                    $('.ui-datepicker-next').hide();
                });
            this.addOutros.addOutro('conferencia');
          }
            $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
            //$(".ano").datepicker({ dateFormat: 'yy' });
            if($cloneDiv.parent().children().last().find('#outro_conselho')){
              $cloneDiv.parent().children().last().find('#outro_conselho').remove();
            }
            if($cloneDiv.parent().children().last().find('#outro_conferencia')){
              $cloneDiv.parent().children().last().find('#outro_conferencia').remove();
            }
          }
        }
        else {
          $(this).parent().remove();
        }
      });
    }
    addItemm(idDiv);
  }

  verificarPermissao(id){
    var osc  = JSON.parse(window.localStorage.getItem('Osc'));
    if(osc != "undefined" && osc !== null){
      for (var i = 0; i < osc.length; i++) {
        if (osc[i] == id) {
          return true;
        }
      }
    }
    return false;
  }

  replaceSpecialChars(str){
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

  readURL(input) {
    if (input.files && input.files[0] && input.files[0].type.match('image.*') && input.files[0].size < 1000000) {
      var MAX_WIDTH = 300;
      var MAX_HEIGHT = 225;
      var img = document.createElement("img");
      var canvas = document.createElement("canvas")
      var reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result
        img.onload = function(){
          var width = img.width;
          var height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          //Cria imagem png base64
          var dataurl = canvas.toDataURL("image/png");
          //seta como sorce da imagem, a nova imagem base64
          $("#imagemLogo").attr('src',dataurl);
        };
      };
      reader.readAsDataURL(input.files[0]);
    }
    else {
      $('#errorLabel').removeClass('hide');
    }
  }

  selecaoAnualDatePicker(){
    $(function() {
        $('.ano').datepicker({
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'yy',
            yearRange: '1900:2017',
            onClose: function(dateText, inst) {
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(year, 1));
            }
        });
        $(".ano").focus(function () {
            $(".ui-datepicker-calendar").hide();
            $('.ui-datepicker-month').hide();
            $('.ui-datepicker-prev').hide();
            $('.ui-datepicker-next').hide();
        });

        $("#tx_telefone input.form-control").focusout(function(event){
            var target, tel, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            tel = target.value.replace(/\D/g, '');
            element = $(target);
            element.unmask();
            if(tel.length === 11) {
              if(tel[0] == 0){
                   element.mask("9999 999 9999")
              } else {
                  element.mask("(99) 99999-9999");
              }
            }
            else if(tel.length === 10) {
                  element.mask("(99) 9999-9999");
            }
            else if(tel.length === 9) {
                  element.mask("(99) 999-9999");
            }
            else if(tel.length === 8) {
                element.mask("9999-9999");
            }
            else if(tel.length === 7) {
                element.mask("999-9999");
            }
        });
        $("#tx_telefone input.form-control").focusin(function(event){
            var target, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            element = $(target);
            element.unmask();
        });
    });
  }
  
  ajaxConsulta(urlController, urlRota, returnFunction){
    $.ajax({
      url: urlController,
      type: 'GET',
      dataType: 'json',
      data:{flag: "consulta", rota: urlRota},
      error:function(e){
        console.log("Erro no ajax: ");
        console.log(e);
      },
      success: function(data){return returnFunction(data)}
    });
  }

  ajaxAutoComplete(urlController, urlRota, returnFunction){
    $.ajax({
      url: urlController,
      type: 'GET',
      dataType: "json",
      data: {
          flag: 'autocomplete',
          rota: urlRota
      },
      success: function(data) {return returnFunction(data)},
      error: function(e) {
          response([]);
      }
    });
  }

  addBotaoimagem(){
      $("#btnInserirImg").append('<label class="custom-file-upload btn btn-info" title="Clique para Inserir o Logo da OSC"><input id="inserirLogo" type="file" accept="image/x-png,image/gif,image/jpeg" /><i class="fa fa-cloud-upload"></i>Inserir Logo</label>');
      $("#btnRemoverImg").append('<a class="btn btn-danger btn-sm" id="btnRemoverLogo" type="button" title="Clique para Remover o Logo da OSC" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Remover Logo</a>');
  }

  imagemConfig(){
    addBotaoimagem();
    $('.custom-file-upload').on("change", function(){
      $('.alert').addClass('hide');
      $('input[type=file]').each(function(index){
        if ($('input[type=file]').eq(index).val() != ""){
          readURL(this);
        }
      });
    });

    $("#btnRemoverLogo").click(function(){
      $("#imagemLogo").attr('src',"img/camera.jpg");
      $('input[type=file]').eq(0).val("");
    });

    $("#loading").hide();
    $(".conteudo_loading .section").css('visibility', 'visible');
  }

  addBotaoVisualizar(id){
      $(".btnVisualizar").append('<a id="btnVisualizar" type="button" title="Clique para Visualizar"  class="btn btn-info btn-sm"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Visualizar OSC</a>');
      $("#btnVisualizar").attr("href","visualizar-osc.html#/"+id);
  }

  addLinkVoltar(id){
    $("#voltaEditar").attr("href","editar-osc.html#/"+id);
    urlPagAnterior = document.referrer;
    if(urlPagAnterior.indexOf("minhas-oscs") == -1){
      $("#voltaPagAnterior").text('Visualizar');
      $("#voltaPagAnterior").attr("href","visualizar-osc.html#/"+id);

     } else {
         $("#voltaPagAnterior").text('Lista de OSCs');
         $("#voltaPagAnterior").attr("href","minhas-oscs.html");
     }
  }

  checkbox_nao_possui(data){
    $("#novo_titulo_certificacao_botao").parent().append('<div class="input-box checkbox"><label><input type="checkbox">Não possui títulos e certificações.</label></div>');
    var certificacoes = validateObject(data.certificado, 0);
    $('#certificacoes input[type="checkbox"]').prop('checked', certificacoes.bo_nao_possui_certificacoes);

    $('#certificacoes input[type="checkbox"]').change(function() {
      if($(this).is(':checked')){
        $(this).prop('checked', true);
      }
      else{
        $(this).prop('checked', false);
      }
    });

    $("#conselhos").prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui conselhos de políticas públicas.</label></div>');
    $("#conferencias").prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui conferências de políticas públicas.</label></div>');
    $("#outros_part").prepend('<div class="input-box checkbox"><label><input type="checkbox">Não possui outros espaços de participação social.</label></div>');

    var participacao_social = validateObject(data.participacao_social, 0);
    $('#conselhos input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_conselhos);
    $('#conferencias input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_conferencias);
    $('#outros_part input[type="checkbox"]').prop('checked', participacao_social.bo_nao_possui_outros_part);

    $('#conselhos input[type="checkbox"]').change(function() {
      if($(this).is(':checked')){
        $(this).prop('checked', true);
      }
      else{
        $(this).prop('checked', false);
      }
    });

    $('#conferencias input[type="checkbox"]').change(function() {
      if($(this).is(':checked')){
        $(this).prop('checked', true);
      }
      else{
        $(this).prop('checked', false);
      }
    });

    $('#outros_part input[type="checkbox"]').change(function() {
      if($(this).is(':checked')){
        $(this).prop('checked', true);
      }
      else{
        $(this).prop('checked', false);
      }
    });
  }

  clique(dadosForm){
    var jsonModalAjuda = dadosForm.jsonModalAjuda();
    $(".ajuda").on("click", function(){
      abrirModalAjuda($(this).attr("data"), jsonModalAjuda);
    });
  }

}