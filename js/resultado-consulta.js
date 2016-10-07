/*require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteResultadoDaConsulta'], function(ResultadoConsulta){
    function ResultadoDaConsulta(imagem,nome,cnpj,natjur,end){
      this.imagem = imagem;
      this.nome = nome;
      this.cnpj = cnpj;
      this.natjur = natjur;
      this.end = end;
    }

    var imagem = ["img/camera.png"];
    var nome = ["ASS DE MORADORES DA VILA MENDONCA"];
    var cnpj = ["05.451.822/0001-02"];
    var natjur = ["Associação Privada"];
    var end = ["AVE MARANHAO 0, VILA MENDONCA, Floresta do Araguaia, PA, 68543000"];

    var resultadoconsulta = [];
    for (var i=0; i<nome.length; i++){
      resultadoconsulta.push(new ResultadoDaConsulta(imagem[i],nome[i],cnpj[i],natjur[i],end[i]));//, formatos[i]));
    }

    ResultadoConsulta = React.createFactory(ResultadoConsulta);
    ReactDOM.render(ResultadoConsulta({dados:resultadoconsulta}), document.getElementById("resultadoconsulta_formato_dados"));
  });


  /*require(['componenteDropdown'], function(Dropdown){
    var arquivosRetornados, arquivosEnviados;
    arquivosRetornados = arquivosEnviados = ["XML", "JSON", "CSV"];
    var periodicidade = ["Dia(s)", "Semana(s)", "Mês(es)"];

    Dropdown = React.createFactory(Dropdown);

    ReactDOM.render(Dropdown({list: arquivosRetornados}), document.getElementById("arquivo_retornado_dropdown"));
    ReactDOM.render(Dropdown({list:periodicidade}), document.getElementById("periodicidade_dropdown"));
    ReactDOM.render(Dropdown({list:arquivosEnviados}), document.getElementById("tipo_arquivo_dropdown"));
   });
});

require(['jquery'], function (React) {

  $("input:radio").change(function () {
    if($(this).val() === "web_service"){
      $("#web_service").show();
      $("#arquivo").hide();
    }
    else {
      $("#arquivo").show();
      $("#web_service").hide();
    }
  });*//*
});*/
function tabela (newData){
  $('#resultadoconsulta_formato_dados').DataTable({
    responsive: true,
     processing: true,
     data: newData,
     columns: [
             {title: ""},
             {title: "Nome da OSC" },
             {title: "CNPJ" },
             {title: "Natureza Jurídica" },
             {title: "Endereço" },
             {title: "Detalhar" }
         ],
     order: [],
     aoColumnDefs: [
       {bSortable :false, aTargets: [0]},
       {bSortable :false, aTargets: [5]},
       {bSortable :false, aTargets: [4]}
     ]
   });
}

var dado = 'Terra';
var newData;
$.ajax({
  url: 'http://mapaosc-desenv.ipea.gov.br:8383/api/search/osc/'+dado,
  type: 'GET',
  dataType: 'json',
  error: function(){
    console.log("Error");
  },
  success: function(data){
    newData = new Array(data.length);
      for (var i=0; i < data.length; i++){
        newData[i] = new Array(6);
        newData[i][0] = "<img class='img-circle media-object' src='img/camera.png' height='64' width='64'>";
        newData[i][1] = data[i].tx_nome_osc;
        newData[i][2] = data[i].cd_identificador_osc;
        newData[i][3] = data[i].tx_natureza_juridica_osc;
        newData[i][4] = data[i].tx_endereco_osc;
        newData[i][5] = "<button type='button' class='btn btn-info' href='#'>Detalhar<span class='glyphicon glyphicon-search' aria-hidden='true'></span></button>";
        /*("<img class='img-circle media-object' src='img/camera.png' height='64' width='64'>",
      data[i].cd_identificador_osc, data[i].tx_nome_osc, data[i].tx_natureza_juridica_osc, data[i].tx_endereco_osc,
      "<button type='button' class='btn btn-info' href='#'>Detalhar<span class='glyphicon glyphicon-search' aria-hidden='true'></span></button>");*/
      }
      tabela(newData);
  }
});
