import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ dataX, dataY, X_label, Y_label, handleSubmit }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 50, left: 40 }; // Increased bottom margin to accommodate labels
    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const svg = d3.select(svgRef.current);

    // Create scales for X and Y axes
    const xScale = d3.scaleLinear().domain([Math.min(...dataX), Math.max(...dataX)]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, Math.max(...dataY)]).range([height, 0]);
    d3.select(svgRef.current).selectAll("*").remove();

    // Create a line generator function
    const line = d3.line().x((d) => xScale(d[0])).y((d) => yScale(d[1]));

    // Create a group element for the chart
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw the Y-axis
    chart
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale));

    // Draw the X-axis


    // Create and style the line
    chart
      .append("path")
      .datum(dataX.map((d, i) => [d, dataY[i]]))
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // Add dots to data points
    chart
      .selectAll(".dot")
      .data(dataX.map((d, i) => [d, dataY[i]]))
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 5)
      .attr("fill", "steelblue");

    // Add text labels for dataX values above their points
    chart
      .selectAll(".x-label")
      .data(dataX.map((d, i) => [d, dataY[i]]))
      .enter()
      .append("text")
      .attr("class", "x-label")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]) - 10) // Adjust the vertical position to be above the point
      .attr("text-anchor", "middle")
      .text((d) => d[0]);

    // Add Y-axis label
    chart
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left-10)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(Y_label);

    // Add X-axis label

  }, [dataX, dataY, X_label, Y_label]);

  return (
    <div>
      <p>Number of projects per year</p><br></br>
      <svg ref={svgRef} width={500} height={300}></svg>
    </div>
  );
};

export default LineChart;
