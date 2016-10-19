
//Acionar o modal e trasnformar os dados do grafico em tabela

function acionarModalTabela(titulo, corpo) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
  $("#modalTabela").modal('show');
}

function createTabela_Donut(json, headerCol, titulo, fonte) {
  tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  cabecalho = '<thead><tr>';
  for(var i in headerCol)
  {
    cabecalho += '<th>' + headerCol[i] + '</th>';
  }
  cabecalho += '</tr></thead>';
  tabela += cabecalho;

  corpo = '<tbody>';
  for(var j in json){
    corpo += '<tr><td>' + json[j].label + '</td>';
    corpo += '<td>' + json[j].value + '</td></tr>';
  }
  corpo += '</tbody>';
  tabela += corpo;

  tabela += '</table>';
  tabela += '<div>' + fonte + '</div>';
  acionarModalTabela(titulo, tabela);
}

function createTabela_Bar(json, headerCol, titulo, fonte) {
  tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  cabecalho = '<thead><tr>';
  for(var i in headerCol)
  {
    cabecalho += '<th>' + headerCol[i] + '</th>';
  }
  cabecalho += '</tr></thead>';
  tabela += cabecalho;

  corpo = '<tbody>';
  for(var j in json[0].values){
    corpo += '<tr><td>' + json[0].values[j].label + '</td>';
    corpo += '<td>' + json[0].values[j].value + '</td></tr>';
  }
  corpo += '</tbody>';
  tabela += corpo;

  tabela += '</table>';
  tabela += '<div>' + fonte + '</div>';
  acionarModalTabela(titulo, tabela);
}
function createTabela_MultBar(json, headerCol, titulo, fonte) {
  tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  cabecalho = '<thead><tr>';
  for(var i in headerCol)
  {
    cabecalho += '<th>' + headerCol[i] + '</th>';
  }
  cabecalho += '</tr></thead>';
  tabela += cabecalho;

  corpo = '<tbody>';
  for(i = 0; i < json.length; i++)
  {
      for(var j in json)
      {
      corpo += '<tr><td>' + json[i].key + '</td>';
      corpo += '<td>' + json[i].values[j].label + '</td>';
      corpo += '<td>' + json[i].values[j].value + '</td></tr>';
    }
  }
  corpo += '</tbody>';
  tabela += corpo;

  tabela += '</table>';
  tabela += '<div>' + fonte + '</div>';
  acionarModalTabela(titulo, tabela);
}
