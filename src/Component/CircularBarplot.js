import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircularBarplot = ({ dataX, dataY }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Set up dimensions and margins
    const margin = { top: 100, right: 0, bottom: 0, left: 0 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const innerRadius = 90;
    const outerRadius = Math.min(width, height) / 2;
    d3.select(chartRef.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

    // Combine dataX and dataY into an array of objects
    const data = dataX.map((country, index) => ({ Country: country, Value: dataY[index] }));

    // Scales
    const x = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(data.map(d => d.Country));

    const y = d3.scaleRadial()
      .range([innerRadius, outerRadius])
      .domain([0, d3.max(data, d => d.Value)]);

    // Add the bars
    svg.append("g")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(d => y(d.Value))
        .startAngle(d => x(d.Country))
        .endAngle(d => x(d.Country) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius));

    // Add the labels
    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("text-anchor", d => (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start")
      .attr("transform", d => `rotate(${(x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90}) translate(${y(d.Value) + 10},0)`)
      .append("text")
      .text(d => d.Country)
      .attr("transform", d => (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)")
      .style("font-size", "11px")
      .attr("alignment-baseline", "middle");
  }, [dataX, dataY]);

  return (
    <div className="mx-auto" id="my_dataviz" ref={chartRef}  style={{"width":"600px"}}></div>
  );
};

export default CircularBarplot;
