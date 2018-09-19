function escolherGrafico(num, data){
  var inverterLabel = true;
  var grafico = "#grafico-" + num;
  var tabela = "#tabela-" + num;
  var json = {"config":[],"leg_X":"","leg_Y":"","tituloColuna":[],"legenda":"","titulo":""};

  json["config"] = data.configuracao.join().replace(/'/gi,"").split(",");
  json["leg_X"] = data.legenda_x;
  json["leg_Y"] = data.legenda_y;
  json["tituloColuna"] = data.titulo_colunas;
  json["titulo"] = data.titulo;
  json["legenda"] = "Fonte: " + data.fontes.join(', ') + ". " + data.legenda;

  var tipoGrafico = removerAcentos(data.tipo_grafico.toLowerCase());
  var series;

  if(inverterLabel){
    series = data.series;
  }
  else {
    series = data.series_2;
  }

  if(tipoGrafico == "rede" || tipoGrafico == "linhas" || tipoGrafico == "areas" || tipoGrafico == "linhasBar" || tipoGrafico == "coluna" || tipoGrafico == "linhasFocus"){

    json["series"] = series;
    var dados = [];
    dados.push(json);

    if(tipoGrafico == "rede"){
      createMultiBarChart(grafico,dados);
    }
    else if(tipoGrafico == "linhas"){
      createLineChart(grafico,dados);
    }
    else if (tipoGrafico == "linhasBar") {
      createLinePlusBarChart(grafico,dados);
    }
    else if (tipoGrafico == "areas") {
      createStackedAreaChart(grafico,dados);
    }
    else if (tipoGrafico == "coluna") {
      createMultiBarHorizontalChart(grafico,dados);
    }
    else if (tipoGrafico == "linhasFocus") {
      createLineWithFocusChart(grafico,dados);
    }

    $(tabela).click(function(){
        createTabela_MultBar_Line(dados,false);
    });

  }
  else if (tipoGrafico == "barra" || tipoGrafico == "pizza" ) {

    json["values"] = series;
    var dados = [];
    dados.push(json);

    if(tipoGrafico == "barra"){
      createBarChart(grafico,dados);
    }
    else if(tipoGrafico == "pizza"){
      createDonutChart(grafico,dados);
    }

    $(tabela).click(function(){
        createTabela_Bar_Donut(dados);
    });
  }

}

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}

//Acionar o modal e trasnformar os dados do grafico em tabela

function acionarModalTabela(titulo, corpo) {
  $("#modalTitulo").html("");
  $("#modalTitulo").html(titulo);
  $("#corpoModal").html("");
  $("#corpoModal").html(corpo);
  $("#modalTabela").modal('show');
  verificarContraste();
}

function formatarDinheiro(numero) {
  return numero.toLocaleString("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
}

function createTabela_Bar_Donut(json) {
  var tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  var cabecalho = '<thead><tr>';
  for(var i in json[0].tituloColuna)
  {
    cabecalho += '<th>' + json[0].tituloColuna[i] + '</th>';
  }
  cabecalho += '</tr></thead>';
  tabela += cabecalho;

  var corpo = '<tbody>';
  for(var j in json[0].values){
    corpo += '<tr><td>' + json[0].values[j].label + '</td>';

    var valor = json[0].values[j].value;
    if(json[0].tipo_valor == "$"){
      valor = formatarDinheiro(valor);
    }
    corpo += '<td>' + valor + '</td></tr>';
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
function createTabela_MultBar_Line(json, line) {
  var tabela = '<table class="table table-hover table-striped table-bordered table-responsive">';

  var cabecalho = '<thead><tr>';
  for(var i in json[0].tituloColuna)
  {
    cabecalho += '<th>' + json[0].tituloColuna[i] + '</th>';
  }
  cabecalho += '</tr></thead>';
  tabela += cabecalho;

  var corpo = '<tbody>';
  for(i = 0; i < json[0].series.length; i++)
  {
    for(var j in json[0].series[i].values)
    {
      corpo += '<tr><td>' + json[0].series[i].key + '</td>';
      if(!line){
        corpo += '<td>' + json[0].series[i].values[j].label + '</td>';
        var valor = json[0].series[i].values[j].value;
        if(json[0].series[i].tipo_valor == "$"){
          valor = formatarDinheiro(valor);
        }
        corpo += '<td>' + valor + '</td></tr>';
      }
      else{
        corpo += '<td>' + json[0].series[i].values[j].x + '</td>';
        var valor_line = json[0].series[i].values[j].y;
        if(json[0].series[i].tipo_valor == "$"){
          valor_line = formatarDinheiro(valor_line);
        }
        corpo += '<td>' + valor_line + '</td></tr>';
      }
    }
  }
  corpo += '</tbody>';
  tabela += corpo;

  tabela += '</table>';
  tabela += '<div>' + json[0].legenda + '</div>';
  acionarModalTabela(json[0].titulo, tabela);
}
