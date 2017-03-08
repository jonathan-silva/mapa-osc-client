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
    var retorno = null;
    $.ajax({
      url: url,
      async: false,
      type: type,
      dataType: 'json',
      data: params,
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

  AgrupadorDeInputs(id, containerClass, header, inputs, buttons){
    return{
      "id" : id,
      "containerClass" : containerClass,
      "header" : header,
      "inputs" : inputs,
      "buttons" : buttons
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

  InputProjeto(id, content, type, options, removable, buttons, buttonsInLine, placeholder, title, cd){
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
      "cd": cd
    };
  }

  getTipoProjeto(key, dados){
    return {
      "id": key,
      "dados": dados
    };
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
        var values = new Array();
        $input.parent().removeClass('has-error');
        $('.alert-danger').remove();
        $input.each(function(i){
          if($(this).val() !== "" ){
            values[i] = true;
          }
          else {
            values[i] = false;
            $(this).parent().addClass('has-error').after('<span class = "alert-danger">É necessário que os campos estejam preenchidos.</span>');
          }
        });
        if(values.every(isTrue)){
          $input.parent().removeClass('has-error');
          $input.after().find('span').remove();
          var $clone = $cloneDiv.find('button').text('Remover').attr('class', 'btn-danger btn');
          var $cloneChildren = $('#'+idDiv).children();
          $cloneDiv.clone().appendTo($cloneChildren);
          $cloneDiv.parent().children().last().find('button').text('Adicionar').attr('class', 'btn-primary btn').click(addItemm(idDiv));
          $cloneDiv.parent().children().last().find('input[type=text]').val('');
          console.log($cloneDiv);
          var date_inputs = $cloneDiv.parent().children().last().find(".date");
          var cloneDiv_date_inputs = $cloneDiv.parent().children().last().prev().find(".date");
          console.log(cloneDiv_date_inputs);
          for (var i = 0; i < date_inputs.length; i++) {
            var date_input = date_inputs[i];
            var cloneDiv_date_input = cloneDiv_date_inputs[i];
            var cloneDiv_id_string = $(cloneDiv_date_input).attr("id")
            var cloneDiv_id_text = cloneDiv_id_string.substr(0,cloneDiv_id_string.indexOf('-'));
            var cloneDiv_id = cloneDiv_id_string.substr(cloneDiv_id_string.indexOf('-')+1);
            var date_input_id_string = $(date_input).attr("id");
            var date_input_text = date_input_id_string.substr(0,cloneDiv_id_string.indexOf('-'));
            var id_clone_div = Number(cloneDiv_id);
            var id_clone_div_text = date_input_text;
            id_clone_div--;
            $(date_input).removeClass('hasDatepicker');
            $(date_input).attr("id", id_clone_div_text+"-"+id_clone_div);
            $(date_input).datepicker({ dateFormat: 'dd-mm-yy' });
          }




          $(".date").datepicker({ dateFormat: 'dd-mm-yy' });
          //$(".ano").datepicker({ dateFormat: 'yy' });
        }
      }
      else {
        $(this).parent().remove();
      }
    });
  }
  addItemm(idDiv);
}
}
