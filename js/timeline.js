
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


//creating axis
var timeAxisScale = d3.scaleTime()
	.domain([new Date("2021-04-01"), new Date("2021-04-09")])
	.range([0, width - margin.left - margin.right])
	.nice()
	

// x axis
svg.append("g")
	.attr("transform", "translate(0,"+ height + ")")      // This controls the vertical position of the Axis
	.call(
		d3.axisBottom(timeAxisScale)
				.tickFormat(d3.timeFormat("%b-%d"))
		)

//Adding circles to timeline

// develop timeline scale
var parseDate = d3.timeParse("%m/%d/%Y %H:%M");

imageList.forEach(function(dataPoint) {
	//console.log(dataPoint.timestamp + " = " + parseDate(dataPoint.timestamp))
    dataPoint.timestamp = parseDate(dataPoint.timestamp);
});

const timeScale = d3.scaleTime().range([0, width - margin.left - margin.right]).domain(d3.extent(imageList, d => d.timestamp));


// color scale
const colorScale = d3.scaleOrdinal()
	.range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"])
	.domain(imageList.map(dataPoint => dataPoint.species));

// force simulation
let simulation = d3.forceSimulation(imageList)
	.force("x", d3.forceX(function(d) {
		return timeScale(d.timestamp);
	}).strength(1))
    .force("collide", d3.forceCollide(3))
	.on("tick",updateNetwork)

function updateNetwork(){
	d3.selectAll("circle")
		.attr("cx",d => d.x)
		.attr("cy",d => d.y + 50)
	}

	
// make circles
svg.selectAll("a")
	.data(imageList)
	.enter()
	.append("svg:a")
		.attr("xlink:href", data => "images/wildlife/" + data.location + "//" + data.image)
		.attr("data-lightbox", "timelineImages")
	.append('circle')
		.attr("r", 6)
		.attr("cx", 0)
		.attr("fill", data => colorScale(data.species))
		.attr("stroke", data => d3.rgb(colorScale(data.species)).darker(1).formatHex())
		.transition()
		.duration(2000)
		.attr("cx", data => timeScale(data.timestamp))
		.on("mouseover", handleMouseOver);


function handleMouseOver() {
	var thisCircle = d3.select(this.parentNode).datum();

	console.log(thisCircle.image);

	d3.selectAll("circle")
		.attr("r", 10)

	d3.select(this)
		.transition()
        .duration(500)
		.attr("r", 15)

	d3.select('#hoverimage')
		.remove()

	d3.select("#hovertest")
		.append("img")
		.attr("id", "hoverimage")
		.attr("width", 1196)
		.attr("src", "images/wildlife/" + thisCircle.location + "//" + thisCircle.image)
		.style("opacity", 0)
		.transition()
		.duration(250)
		.ease(d3.easeLinear)
		.style("opacity", 1)
}

function  timelineClickHandler() {
	d3.select('#hoverimage')
		.remove();

	d3.selectAll("circle")
		.attr("r", 10)
}