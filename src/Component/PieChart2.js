import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart2 = ({ dataX, dataY }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Create data in the format expected by the PieChart function
    const data = dataX.map((name, i) => ({
      name,
      value: dataY[i],
    }));

    // Call the PieChart function to create the pie chart
    const chart = PieChart(data, {
      width: 450,
      height: 400,
      // You can set other configuration options here as needed
    });

    // Append the generated SVG to the chartRef element
    chartRef.current.appendChild(chart);

    // Cleanup function to remove the chart when unmounting
    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, [dataX, dataY]);

  return <div ref={chartRef}></div>;
};

function PieChart(data, options) {
  // Declare the svg variable
  const svg = d3.create("svg")
      .attr("width", options.width)
      .attr("height", options.height)
      .attr("viewBox", [-options.width / 2, -options.height / 2, options.width, options.height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Insert the original PieChart code here
  
  // Return the generated SVG element
  return svg.node();
}

export default PieChart2;
