
//Acionar o modal e trasnformar os dados do grafico em tabela

function acionarModalTabela(titulo, corpo) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
  $("#modalTabela").modal('show');
}

function createTabela_Bar_Donut(json) {
  tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  cabecalho = '<thead><tr>';
  for(var i in json[0].tituloColuna)
  {
    cabecalho += '<th>' + json[0].tituloColuna[i] + '</th>';
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
  tabela += '<div>' + json[0].legenda + '</div>';
  acionarModalTabela(json[0].titulo, tabela);
}

// GRÁFICOS QUE PODEM SER UTILIZADOS:
// Line = false ->  createMultiBarChart - LinePlusBarChart - StackedAreaChart - MultiBarHorizontalChart
// Line = true -> lineChart
function createTabela_MultBar_Line(json, line=false) {
  tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  cabecalho = '<thead><tr>';
  for(var i in json[0].tituloColuna)
  {
    cabecalho += '<th>' + json[0].tituloColuna[i] + '</th>';
  }
  cabecalho += '</tr></thead>';
  tabela += cabecalho;

  corpo = '<tbody>';
  for(i = 0; i < json[0].series.length; i++)
  {
    for(var j in json[0].series[i].values)
    {
      corpo += '<tr><td>' + json[0].series[i].key + '</td>';
      if(!line){
        corpo += '<td>' + json[0].series[i].values[j].label + '</td>';
        corpo += '<td>' + json[0].series[i].values[j].value + '</td></tr>';
      }
      else{
        corpo += '<td>' + json[0].series[i].values[j].x + '</td>';
        corpo += '<td>' + json[0].series[i].values[j].y + '</td></tr>';
      }
    }
  }
  corpo += '</tbody>';
  tabela += corpo;

  tabela += '</table>';
  tabela += '<div>' + json[0].legenda + '</div>';
  acionarModalTabela(json[0].titulo, tabela);
}
