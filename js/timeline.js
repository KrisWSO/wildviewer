
// detecting window width and setting axis length accordingly

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 1196 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var svg = d3.select('#timeline').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append("g") //so this g positions all elements within to account for margins
        .attr("id", "containerG")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

//playing with summarizing data
var speciesCount = d3.rollup(imageList, x => x.length, d => d.species);


// parsing time data
var parseDate = d3.timeParse("%m/%d/%Y %H:%M");

imageList.forEach(function(dataPoint) {
	//console.log(dataPoint.timestamp + " = " + parseDate(dataPoint.timestamp))
    dataPoint.timestamp = parseDate(dataPoint.timestamp);
});

//creating scale for axis and to position points
const timeScale = d3.scaleTime()
	.range([0, width - margin.left - margin.right])
	.domain(d3.extent(imageList, d => d.timestamp))
	.nice();

// adding x axis to dom
svg.append("g")
	.attr("transform", "translate(0,"+ height + ")")      // This controls the vertical position of the Axis
	.call(
		d3.axisBottom(timeScale)
		)

// color scale
const colorScale = d3.scaleOrdinal()
	.range(d3.schemeTableau10)
	.domain(imageList.map(dataPoint => dataPoint.species));

// force simulation
let simulation = d3.forceSimulation(imageList)
	.force("x", d3.forceX(d => timeScale(d.timestamp)).strength(5))
	.force("y", d3.forceY((height-margin.bottom)/2).strength(1))
    .force("collide", d3.forceCollide(8))
	.stop()

for (let i = 0; i < imageList.length; ++i) {
	simulation.tick(10);
}

// make circles, simulation applied through imageList
var points = svg.selectAll("a")
	.data(imageList)
	.enter()
	.append("svg:a")
		.attr("xlink:href", d => "images/wildlife/" + d.location + "//" + d.image)
		.attr("data-lightbox", "timelineImages")
	.append('circle')
		.attr("r", 6)
		.attr("cx", 0)
		.attr("cy", height/2)
		.attr("fill", d => colorScale(d.species))
		.attr("stroke", d => d3.rgb(colorScale(d.species)).darker(.1).formatHex())
		.attr("stroke-width", 1);

points.transition()
		.duration(3000)
		.attr("cx", d => d.x)
		.attr("cy", d => d.y);

points
	.on("mouseover", handleMouseOver)
	.on("mouseout", handleMouseOut);

function handleMouseOver() {
	var thisCircle = d3.select(this).datum();

	console.log(thisCircle.image);

	var thisCircle = d3.select(this)

	thisCircle.transition()
		.duration(200)
		.attr("r", 7)

}

function handleMouseOut() {
	d3.select(this)
		.transition()
		.duration(200)
		.attr("r", 6)
}

function  timelineClickHandler() {
	d3.select('#hoverimage')
		.remove();

	d3.selectAll("circle")
		.attr("r", 10)
}


// Legend

var svg_legend = d3.select(".legend")
	.append("svg")
	.attr("height", colorScale.domain().length*25 +50)
	.attr("width", 300)
	.attr("transform", "translate(" + margin.left + "," + 0 + ")"); 

var legend = svg_legend.selectAll(".legend_entry")
	.data(colorScale.domain())
	.enter()
	.append("g")
		.attr("class", "legend_entry")
		.attr("transform", function(d,i) {
			let vertical_spacing = i*25
			return "translate(" + 30 + ", " + vertical_spacing + ")";
		})

legend.append("circle")
	.attr("r", 6)
	.attr("cx", 0)
	.attr("cy", 25)
	.attr("fill", d => colorScale(d))


legend.append("text")
	.attr("x", 10)
	.attr("y", 30)
	.text(d => d)
