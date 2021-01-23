// @TODO: YOUR CODE HERE!
function DotChart() {

    var svgWidth = 960;
    var svgHeight = 500;
    
    var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left:100
    };
  
  // Visualization margins 
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
  
  
  // Create SVG and add attributes to it
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  var basicChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  //Import Data from data.csv file
  d3.csv("data/data.csv").then(function(peopleData){
  
  peopleData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    data.abbr = data.abbr;
    data.income = +data.income;
  });
  
  //Create scales 
  var xLinearScale = d3.scaleLinear()
  .domain([8.5, d3.max(peopleData, d => d.poverty)])
  .range([0, width]);
  
  var yLinearScale = d3.scaleLinear()
  .domain([3.5, d3.max(peopleData, d => d.healthcare)])
  .range([height, 0]);
  
  //Create x and y axis
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);
  
  //Append x and y axis basicChart
    basicChart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  
    basicChart.append("g")
    .call(yAxis);
  
        //Circles
        var circlesGroup = basicChart.selectAll("circle")
        .data(peopleData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("fill", "blue")
        .attr("opacity", ".4")
        .attr("stroke-width", "1")
        .attr("stroke", "black");
  
        basicChart.select("g")
        .selectAll("circle")
        .data(peopleData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",-395)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black");
  
        //Create labels
        basicChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 50)
        .attr("x", 0 -250)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
  
        basicChart.append("text")
        .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
  });
  }
  
  DotChart();


