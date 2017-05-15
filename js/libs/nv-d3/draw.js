var width = 150,
    height = 150,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) {
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("#grafico-progress").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

dataJson = { values: [{"id": "FIS", "order": 1, "score": 39, "weight": 0.5, "color": "#1c95c5", "label":"Dados Gerais"},
{"id":"MAR", "order":1, "score":24, "weight": 0.5, "color":"#20ab6c", "label":"Projetos, atividades e/ou programas"},
{"id":"TC", "order":1, "score":18, "weight": 0.3, "color":"#6A5ACD", "label":"Titulações e Certificações"},
{"id":"AO", "order":1, "score":58, "weight": 0.8, "color":"#E1514B", "label":"Fontes de recursos anuais da OSC"},
{"id":"NP", "order":1, "score":80, "weight": 1, "color": "#F47245","label":"Espaços de Participação Social"}]
};

perfil(dataJson['values']);

function perfil(data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });

  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);


  // calculate the weighted mean score
  var score =
    data.reduce(function(a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight);
    }, 0) /
    data.reduce(function(a, b) {
      return a + b.weight;
    }, 0);

  svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".45em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

}
