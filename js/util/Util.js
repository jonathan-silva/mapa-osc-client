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
        //util.showUnauthorizedUser(e);
        console.log(e);
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
    this.id = id;
    this.containerClass = containerClass;
    this.header = header;
    this.inputs = inputs;
    this.buttons = buttons;
  }

  abrirModalAjuda(titulo) {
    var dadosForm = new DataForms();
    var jsonModalAjuda = dadosForm.jsonModalAjuda();
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
    this.id = id;
    this.content = content;
    this.type = type;
    this.options = options;
    this.removable = removable;
    this.buttons = buttons;
    this.buttonsInLine = buttonsInLine;
    this.placeholder = placeholder;
  }

  getTipoProjeto(key, dados){
    return {
      "id": key,
      "dados": dados
    };
  }
}
