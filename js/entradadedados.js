require(['react', 'jsx!components/Util'], function (React, BlocoTexto) {

  function BlocoDeTexto(titulo, formato){
    this.titulo = titulo;
    this.formato = formato;
  }

  var csv = "O formato CSV(Comma Separated Values) é um dos formatos mais utilizados para a troca de dados entre duas bases. Sua utilização tão abrangente se deve ao fato de poder ser lido, editado e gerado a partir tanto de bases de dados no formato SQL quanto de arquivos do Excel. A principal característica do formato é o fato de ser formado imitando uma tabela, com um cabeçalho contendo o nome das colunas, seguido de uma tripa de dados de um registro a cada linha. Como o nome já indica cada par de valores, tanto no cabeçalho quanto nas colunas, é separado por vírgulas(,) ou pontos e vírgulas(;) portanto é necessário que esses caracteres não apareçam nas variáveis do arquivo. Para utilizar esse formato é necessário que se utilize o modelo apresentado a seguir: Modelo CSV Esse formato pode ser utilizado com ambos os tipos de envio.";
  var xls = "Formato padrão do Microsoft Excel, o XLS(XmL Spreadsheet) tem uma qualidade razoável e é simples de ser gerado pela ubiquidade do microsoft office. Esse formato é exclusivo para uso com Upload de Arquivo. Para utilizar esse formato é necessário que se utilize o modelo apresentado a seguir: Modelo XLS";
  var xml = "O formato XML (eXtensible Markup Language) é popularmente utilizado para a tranferência de dados binários nos quais é necessária um maior controle do dado recebido. Foi substituído pelo JSON para boa parte das aplicações mais simples já que adicionava uma complexidade alta e por vezes desnecessária ao processo. Sua principal vantagem é a quantidade de maneiras através das quais é possível verificar a veracidade do dado disponível. Esse formato é exclusivo para uso com WebServices. Para utilizar esse formato é necessário que se utilize o modelo apresentado a seguir: Modelo XML";
  var json = "O formato JSON (JavaScript Object Notation) é um formato de transferência de dados que apresenta cada elemento como um objeto com diversos atributos. Sua utilização cresce bastante ao longo do tempo, em especial pela sua simplicidade e fácil compreensão. Uma outra vantagem é que para os formatos utilizados em WebServices ele é mais leve que o outro formato popular, o xml. Esse formato é exclusivo para uso com WebServices. Para utilizar esse formato é necessário que se utilize o modelo apresentado a seguir: Modelo JSON";
  var titulos = ["CSV", "XLS", "XML", "JSON"];
  var formatos = [csv, xls, xml, json];

  var blocosDeTexto = [];
  for (var i=0; i<titulos.length; i++){
    blocosDeTexto.push(new BlocoDeTexto(titulos[i], formatos[i]));
  }

  BlocoTexto = React.createFactory(BlocoTexto);
  ReactDOM.render(BlocoTexto({dados:blocosDeTexto}), document.getElementById("bloco_texto_formato_dados"));

});

define(['jquery'], function($){
  function toggle(condition){
      $("#arquivo").toggle();
      $("#web_service").toggle();
  }
});
