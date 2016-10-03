require(['react', 'jsx!components/Util'], function (React) {

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
  });*/
});
