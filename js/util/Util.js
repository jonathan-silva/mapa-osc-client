//verifica se objeto existe, se e nulo ou vazio
function validateObject(obj){
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

function showUnauthorizedUser(e){
  if(e.status === 401){
    $('#unauthorized').dialog('open');
    console.log(e);
  }
}

function AgrupadorDeInputs(id, containerClass, header, inputs, buttons){
  this.id = id;
  this.containerClass = containerClass;
  this.header = header;
  this.inputs = inputs;
  this.buttons = buttons;
}

function abrirModalAjuda(titulo) {
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

function InputProjeto(id, content, type, options, removable, buttons, buttonsInLine, placeholder){
  this.id = id;
  this.content = content;
  this.type = type;
  this.options = options;
  this.removable = removable;
  this.buttons = buttons;
  this.buttonsInLine = buttonsInLine;
  this.placeholder = placeholder;
}

function getTipoProjeto(key, dados){
  return {
    "id": key,
    "dados": dados
  };
}
