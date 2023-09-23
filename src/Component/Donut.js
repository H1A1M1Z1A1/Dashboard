import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

// import './PieChart.css'; // Create a CSS file for styling if needed

const Donut = ({ dataX,dataY }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Set up dimensions and margins
    const width = 596;
    const height = 450;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    d3.select(chartRef.current).selectAll('*').remove();

    const data = {};
    dataX.forEach((key, index) => {
      data[key] = dataY[index];
    });

    // Create a color scale
    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie
    const pie = d3.pie()
    .sort(null)
    .value(d => d.value);

    // const data_ready = pie(d3.entries(data));

    const data_ready = pie(Object.entries(data).map(([key, value]) => ({ key, value })));
    
    

    // Arc generators
    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Create the SVG and group
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create pie slices
    svg.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.key))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add polylines
    svg.selectAll('polyline')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', d => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    // Add labels
    svg.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.key)
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', d => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }, [dataX,dataY]);

  return (
    <div id="my_dataviz" ref={chartRef}></div>
  );
};

export default Donut;
