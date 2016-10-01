function createDonutChart(grafico, valores){
	//Donut chart example
	nv.addGraph(function() {
	  var chart = nv.models.pieChart()
	      .x(function(d) { return d.label })
	      .y(function(d) { return d.value })
	      .showLabels(true)     //Display pie labels
	      .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
	      .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
	      .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
	      .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
	      .height(430);

	    d3.select(grafico + " svg")
	        .datum(valores)
	        .transition().duration(350)
	        .call(chart);

		nv.utils.windowResize(chart.update);

	  return chart;
	});
}

function createBarChart(grafico, valores)
{
	var chart = nv.models.discreteBarChart()
	      .x(function(d) { return d.label })
	      .y(function(d) { return d.value })
	      .staggerLabels(false)
	      .tooltips(true)
	      .showValues(true)
	      .height(430);

	  d3.select(grafico + " svg")
	      .datum(valores)
	      .transition().duration(1200)
	      .call(chart);

	var xTicks = d3.selectAll('.nv-x.nv-axis > g')
	  .selectAll('text').attr('text-anchor','end')
	  .attr('transform', function(d,i,j) { return 'translate (5, 5) rotate(0 0,0)' });

	  nv.utils.windowResize(chart.update);

	  return chart;
}
