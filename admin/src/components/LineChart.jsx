import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ allUsers, interval }) => {
  const ref = useRef();

  useEffect(() => {
    // Transform the data

      // Transform the data
      console.log(allUsers);
      const usersPerDate = allUsers?.reduce((acc, user) => {
        let date;
        if (interval === "year") {
          date = new Date(user.createdAt).getFullYear().toString();
        } else if (interval === "month") {
          date = new Date(user.createdAt).toLocaleString("default", { month: "long", year: "numeric" });
        } else if (interval === "week") {
          date = new Date(user.createdAt).toISOString().split('T')[0]; // Replaced 'week' with 'day'
        } else if (interval === "day") {
          date = new Date(user.createdAt).toISOString().split('T')[0];
        } else {
          date = new Date(user.createdAt).toISOString().split('T')[0]; // Get the date part of the timestamp
        }
        acc[date] = (acc[date] || 0) + 1; // Increment the count for this date
        return acc;
      }, {});
    

    

    // Convert the object to an array of { date, users } objects
    const data = Object.entries(usersPerDate||{}).map(([date, users]) => ({ date, users }));

    // Clear the previous chart
    d3.select(ref.current).selectAll("*").remove();

    // Set up the chart dimensions
    const width = 750;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the SVG element
    const svg = d3.select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.users) + 1]) // Increment the maximum value by 1
      .range([innerHeight, 0]);

    // Set up the line generator
    const line = d3.line()
      .x(d => xScale(d.date) + xScale.bandwidth() / 2)
      .y(d => yScale(d.users));

    // Draw the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("stroke-dasharray", function () {
        const totalLength = this.getTotalLength();
        return `${totalLength} ${totalLength}`;
      })
      .attr("stroke-dashoffset", function () {
        const totalLength = this.getTotalLength();
        return totalLength;
      })
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0);
    // Draw the x-axis
    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Draw the y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(d3.max(data, d => d.users) + 1)); // Set the number of ticks to the maximum value + 1

  }, [allUsers, interval]);

  return <div ref={ref}></div>;
};

export default LineChart;
