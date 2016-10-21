require(['react', 'jsx!components/Util'], function (React) {

  require(['componenteGlossario'], function(Glossario){
    function Gloss(topico, desc){
      this.topico = topico;
      this.desc = desc;

    }
//var topico = ["Título do topico"]
//var desc = ["Descrição do topico"]
    var topico = ["OSC","CNEA","CNES-MJ","CNES-MS"];
    var desc = ["Organizações da Sociedade Civil. Elas são entidades nascidas da livre organização e da participação social da população que desenvolvem ações de interesse público sem visarem ao lucro. As OSCs tratam dos mais diversos temas e interesses, com variadas formas de atuação, financiamento e mobilização.",
    "Cadastro Nacional de Entidades Ambientalistas.",
    "Cadastro Nacional de Entidades Sociais - CNES - Ministério da Justiça.",
    "Cadastro Nacional de Estabelecimentos de Saúde - CNES - Ministério da Saúde."
  ];

    var glossario = [];
    for (var i=0; i<topico.length; i++){
      glossario.push(new Gloss(topico[i], desc[i]));
    }

    Glossario = React.createFactory(Glossario);
    ReactDOM.render(Glossario({dados:glossario}), document.getElementById("glossario_formato_dados"));
  });



});
