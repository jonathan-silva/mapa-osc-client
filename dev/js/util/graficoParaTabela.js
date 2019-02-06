function escolherGrafico(num, data){
  var grafico = "#grafico-" + num;
  var tabela = "#tabela-" + num;
  var json = {"config":["f","1","","f"],"leg_X":"","leg_Y":"","tituloColuna":[],"legenda":"","titulo":""};
  var fontes = ". ";
  var line = false;

  if(data != null && data.configuracao != null ){
    var config = [];
    for (const parte of data.configuracao) {
      config.push(parte.replace(/'/gi,""));
    }
    json["config"] = config;
  }

  json["leg_X"] = data.legenda_x;
  json["leg_Y"] = data.legenda_y;
  json["tituloColuna"] = data.titulo_colunas;
  json["titulo"] = data.titulo;

  if(data.fontes != null){
    fontes = data.fontes.join(", ").replace(/'/gi,"");
    fontes += ". ";
  }

  json["legenda"] = "Fonte: " + fontes + data.legenda;

  var tipoGrafico;

  if(data.tipo_grafico != null){
    tipoGrafico = removerAcentos(data.tipo_grafico.toLowerCase());
  }

  var series;

  if(data.inverter_label){
    series = data.series_2;
  }
  else {
    series = data.series_1;
  }

  if(series != null){

    if(tipoGrafico == "lineplusbarchart" || tipoGrafico == "linechart" || tipoGrafico == "multibarchart" || tipoGrafico == "multibarhorizontalchart" || tipoGrafico == "linewithfocuschart" || tipoGrafico == "stackedareachart"){

      json["series"] = series;
      var dados = [];
      dados.push(json);

      if(tipoGrafico == "multibarchart"){
        createMultiBarChart(grafico,dados);
      }
      else if(tipoGrafico == "linechart"){
        createLineChart(grafico,dados);
        line = true;
      }
      else if (tipoGrafico == "lineplusbarchart") {
        createLinePlusBarChart(grafico,dados);
      }
      else if (tipoGrafico == "multibarhorizontalchart") {
        createMultiBarHorizontalChart(grafico,dados);
      }
      else if (tipoGrafico == "linewithfocuschart") {
        createLineWithFocusChart(grafico,dados);
      }
      else if (tipoGrafico == "stackedareachart") {
          createStackedAreaChart(grafico,dados);
     }

      $(tabela).click(function(){
          createTabela_MultBar_Line(dados,line);
      });

    }
    else if ( tipoGrafico == "donutchart"  || tipoGrafico == "barchart") {

      json["values"] = series;
      var dados = [];
      dados.push(json);

      if( tipoGrafico == "barchart"){
        createBarChart(grafico,dados);
      }
      else if(tipoGrafico == "donutchart"){
        createDonutChart(grafico,dados);
      }

      $(tabela).click(function(){
          createTabela_Bar_Donut(dados);
      });
    }
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
    cabecalho += '<th>' + json[0].tituloColuna[i].replace(/'/gi,"") + '</th>';
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
    else{
      valor = valor.toLocaleString('pt-BR');
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
    cabecalho += '<th>' + json[0].tituloColuna[i].replace(/'/gi,"") + '</th>';
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
        else{
          valor = valor.toLocaleString('pt-BR');
        }

        corpo += '<td>' + valor + '</td></tr>';
      }
      else{
        corpo += '<td>' + json[0].series[i].values[j].x + '</td>';
        var valor_line = json[0].series[i].values[j].y;
        if(json[0].series[i].tipo_valor == "$"){
          valor_line = formatarDinheiro(valor_line);
        }
        else{
          valor_line = valor_line.toLocaleString('pt-BR');
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
