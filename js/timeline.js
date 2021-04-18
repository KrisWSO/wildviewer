
// detecting window width and setting axis length accordingly
var linewidth = $("#timeline").width() - 100;

//playing with summarizing data
var speciesCount = d3.rollup(imageList, x => x.length, d => d.species);


//creating axis
var timeAxisScale = d3.scaleTime()
	.domain([new Date("2021-04-01"), new Date("2021-04-09")])
	.range([0, linewidth])
	.nice()


var svg = d3.select("#timeline")
	.append("svg")
	.attr("width", linewidth)
	.attr("height", 200)
	.on("click", timelineClickHandler)

// x axis
svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0,100)")      // This controls the vertical position of the Axis
	.call(
		d3.axisBottom(timeAxisScale)
				.tickFormat(d3.timeFormat("%Y-%m-%d"))
		)
	.selectAll("text")
		.attr("transform", "rotate(45)")

//Adding circles to timeline

// develop timeline scale
var parseDate = d3.timeParse("%m/%d/%Y %H:%M");

imageList.forEach(function(dataPoint) {
	//console.log(dataPoint.timestamp + " = " + parseDate(dataPoint.timestamp))
    dataPoint.timestamp = parseDate(dataPoint.timestamp);
});

const timeScale = d3.scaleTime().range([0,linewidth]).domain(d3.extent(imageList, function(d) {return d.timestamp}));


// color scale
const colorScale = d3.scaleOrdinal().range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"]).domain(imageList.map(dataPoint => dataPoint.species));


// make circles
svg.selectAll("a")
	.data(imageList)
	.enter()
	.append("svg:a")
		.attr("xlink:href", data => "images/wildlife/" + data.location + "//" + data.image)
		.attr("data-lightbox", "timelineImages")
	.append('circle')
	.attr("r", 10)
	.attr("cy", 50)
	.attr("fill", data => colorScale(data.species))
	.attr("stroke", "black")
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
		.attr("width", linewidth)
		.attr("src", "images/wildlife/" + thisCircle.location + "//" + thisCircle.image)
		.style("opacity", 0)
		.transition()
		.duration(250)
		.ease(d3.easeLinear)
		.style("opacity", 1)
}


function  timelineClickHandler() {
	d3.select('#hoverimage')
		.remove()

	d3.selectAll("circle")
		.attr("r", 10)
}