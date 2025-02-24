"use client";
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface IranMapProps {
  data: Array<{
    city: string; // Assuming this matches province names in iran.json
    sales: number;
  }>;
  onCitySelect: (city: string) => void;
}

const IranMap = ({ data, onCitySelect }: IranMapProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Calculate threshold for big vs. small cities (e.g., median sales)
    const salesValues = data.map(d => d.sales).sort(d3.ascending);
    const threshold = d3.median(salesValues) || 1000000; // Fallback to 1M if median fails

    // Color scales for big and small cities
    const bigCityColor = d3.scaleSequential()
      .domain([threshold, d3.max(data, d => d.sales) || 0])
      .interpolator(t => d3.interpolateRgb("#f5f5f5", "#d32f2f")(t)); // Pale gray to deep red

    const smallCityColor = d3.scaleSequential()
      .domain([0, threshold])
      .interpolator(t => d3.interpolateRgb("#f5f5f5", "#1976d2")(t)); // Pale gray to dark blue

    const projection = d3.geoMercator()
      .center([54, 32])
      .scale(1200)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    fetch('/data/iran.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load map data');
        return response.json();
      })
      .then(mapData => {
        svg.selectAll('path')
          .data(mapData.features)
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', (d: any) => {
            const cityData = data.find(item => item.city === d.properties.name);
            if (!cityData) return '#eee'; // Unmatched provinces
            return cityData.sales >= threshold 
              ? bigCityColor(cityData.sales) 
              : smallCityColor(cityData.sales);
          })
          .attr('stroke', '#000')
          .attr('stroke-width', 0.5)
          .on('click', (event: any, d: any) => onCitySelect(d.properties.name))
          .append('title') // Tooltip
          .text((d: any) => {
            const cityData = data.find(item => item.city === d.properties.name);
            return `${d.properties.name}: ${cityData ? cityData.sales.toLocaleString() : 0} sales`;
          });

        // Add a simple legend (optional)
        const legend = svg.append('g').attr('transform', 'translate(20, 20)');
        const legendData = [
          { label: 'Small Cities (Low Sales)', color: smallCityColor(threshold) },
          { label: 'Big Cities (High Sales)', color: bigCityColor(d3.max(data, d => d.sales) || 0) }
        ];
        legend.selectAll('rect')
          .data(legendData)
          .enter()
          .append('rect')
          .attr('x', 0)
          .attr('y', (d, i) => i * 20)
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', d => d.color);
        legend.selectAll('text')
          .data(legendData)
          .enter()
          .append('text')
          .attr('x', 20)
          .attr('y', (d, i) => i * 20 + 12)
          .text(d => d.label)
          .attr('font-size', '12px');
      })
      .catch(error => console.error('Error loading map:', error));

  }, [data, onCitySelect]);

  return (
    <div className="border rounded-lg p-4 bg-white sm:p-8">
      <svg ref={svgRef} width="100%" height="600" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
};

export default IranMap;