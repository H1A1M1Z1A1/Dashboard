import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BarChart = ({ dataX, dataY, handleSubmit ,X_label,Y_label}) => {
  const [datax, setDataX] = useState(dataX);
  const [datay, setDataY] = useState(dataY);
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(dataX.map((d) => d.toString()))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataY)])
      .nice()
      .range([height, 0]);

    // Create bars
    svg
      .selectAll(".bar")
      .data(dataX)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.toString()))
      .attr("y", (d, i) => yScale(dataY[i]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d, i) => height - yScale(dataY[i]))
      .attr("fill", "steelblue")
      .on("mouseenter", function (event, d) {
        // Show X-axis value on hover
        const xPos = xScale(d.toString()) + xScale.bandwidth() / 2;
        const yPos = yScale(dataY[dataX.indexOf(d)]) - 5; // Adjust position
        svg
          .append("text")
          .attr("class", "bar-label")
          .attr("x", xPos)
          .attr("y", yPos)
          .text(d)
          .attr("text-anchor", "middle");
      })
      .on("mouseleave", function () {
        // Remove the X-axis value on mouse leave
        svg.selectAll(".bar-label").remove();
      });
    svg
      .selectAll(".bar-label")
      .data(dataY)
      .enter()
      .append("text")
      .attr("class", "bar-label1")
      .attr("x", (d, i) => xScale(dataX[i].toString()) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) +15) // Adjust position
      .attr("text-anchor", "middle")
      .text((d) => d);

    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) // Adjust position
      .attr("text-anchor", "middle")
      .text(X_label);

    // Add Y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 10) // Adjust position
      .attr("text-anchor", "middle")
      .text(Y_label);
  }, [dataX, dataY]);

  const handleSelectChange = (e) => {
    handleSubmit(e);
  };

  return (
    <div>

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;