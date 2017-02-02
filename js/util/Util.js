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
    $.ajax({
      url: url,
      async: false,
      type: type,
      dataType: 'json',
      data: params,
      success: function(data) {
        return data;
      },
      error: function(e) {
        return e;
      }
    });
  }

  //verifica se objeto existe, se e nulo ou vazio
  validateObject(obj){
    if(obj === null){
      return false;
    }
    else if(obj===undefined){
      return false;
    }
    if(Object.keys(obj).length === 0 && obj.constructor === Object){
      return false;
    }
    return true;
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
  	var tituloCompleto = "Ajuda - "+titulo;

    $("#modalTitulo").html("");
    $("#modalTitulo").html(titulo);
    $("#corpoModal").html("");
    $("#corpoModal").html(corpo);
    $("#modalAjuda").modal('show');
    verificarContraste();
  }

  InputProjeto(id, content, type, options, removable, buttons, buttonsInLine, placeholder){
    return {
      "id" : id,
      "content" : content,
      "type" : type,
      "options" : options,
      "removable" : removable,
      "buttons" : buttons,
      "buttonsInLine" : buttonsInLine,
      "placeholder" : placeholder
    };
  }

  getTipoProjeto(key, dados){
    return {
      "id": key,
      "dados": dados
    };
  }
}
