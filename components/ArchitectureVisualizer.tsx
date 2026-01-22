import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ArchitectureGraph } from '../types';

interface Props {
  data: ArchitectureGraph;
}

const ArchitectureVisualizer: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll("*").remove();

    // Color and Icon mapping - Enterprise Palette
    const getTypeStyles = (type: string) => {
      switch (type) {
        case 'client': return { color: '#28527A', icon: '\uf109' }; // blue
        case 'loadbalancer': return { color: '#00917C', icon: '\uf233' }; // teal
        case 'webserver': return { color: '#C15050', icon: '\uf0ac' }; // red
        case 'api': return { color: '#28527A', icon: '\uf121' };
        case 'cache': return { color: '#fbbf24', icon: '\uf0e7' }; 
        case 'database': return { color: '#C15050', icon: '\uf1c0' };
        case 'messagequeue': return { color: '#00917C', icon: '\uf0c9' };
        case 'cdn': return { color: '#28527A', icon: '\uf0e8' };
        case 'storage': return { color: '#94a3b8', icon: '\uf07c' };
        default: return { color: '#333333', icon: '\uf12e' };
      }
    };

    // Deep copy data to avoid D3 mutation issues with React state
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<any>(nodes)
      .force("link", d3.forceLink<any, any>(links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(60));

    // Arrow markers
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 38)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#666666")
      .style("stroke", "none");

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#333333")
      .attr("stroke-opacity", 0.3)
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)");

    const linkLabels = svg.append("g")
      .selectAll("text")
      .data(links)
      .enter().append("text")
      .attr("fill", "#666666")
      .attr("font-size", "9px")
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text(d => d.label || "");

    const node = svg.append("g")
      .selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    node.append("circle")
      .attr("r", 30)
      .attr("fill", d => getTypeStyles(d.type).color)
      .attr("stroke", "rgba(255,255,255,0.1)")
      .attr("stroke-width", 1);

    node.append("text")
      .attr("class", "fa-icon")
      .attr("font-family", "FontAwesome")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "white")
      .attr("font-size", "22px")
      .text(d => getTypeStyles(d.type).icon);

    node.append("text")
      .attr("dy", 45)
      .attr("text-anchor", "middle")
      .attr("fill", "#999999")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("text-transform", "uppercase")
      .attr("letter-spacing", "0.05em")
      .text(d => d.label);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (d.source as any).x)
        .attr("y1", (d: any) => (d.source as any).y)
        .attr("x2", (d: any) => (d.target as any).x)
        .attr("y2", (d: any) => (d.target as any).y);

      linkLabels
        .attr("x", (d: any) => ((d.source as any).x + (d.target as any).x) / 2)
        .attr("y", (d: any) => ((d.source as any).y + (d.target as any).y) / 2 - 5);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

  }, [data]);

  return (
    <div className="w-full h-full bg-black overflow-hidden relative border-l border-gray-900">
      <svg ref={svgRef} className="w-full h-full cursor-move" />
      {data.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-800 pointer-events-none">
          <div className="text-center">
            <i className="fas fa-project-diagram text-5xl mb-6 opacity-5"></i>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Design Canvas Initializing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureVisualizer;