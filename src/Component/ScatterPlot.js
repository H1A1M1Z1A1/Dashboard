import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ dataX, dataY }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Set up dimensions and margins
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(chartRef.current).selectAll('*').remove();
    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Convert dataX and dataY to an array of objects
    const data = dataX.map((x, i) => ({ GrLivArea: x, SalePrice: dataY[i] }));

    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.GrLivArea)])
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.SalePrice)])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", d => x(+d.GrLivArea))
        .attr("cy", d => y(+d.SalePrice))
        .attr("r", 1.5)
        .style("fill", "#69b3a2");
  }, [dataX, dataY]);

  return (
    <div id="my_dataviz" ref={chartRef}></div>
  );
};

export default ScatterPlot;
