import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ dataX, dataY }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(dataX)
      .range(['#f98d29', '#e9433f', '#3fe977', '#3f7fe9']);

    const pie = d3.pie()
      .value(d => d)
      .sort(null);

    const data = pie(dataY);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('.arc')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data);
      
  }, [dataX, dataY]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default PieChart;
