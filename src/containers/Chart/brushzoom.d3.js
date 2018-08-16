import { select, event } from "d3-selection";

import { timeParse } from "d3-time-format";
import {scaleTime, scaleLinear} from "d3-scale";
import {axisBottom, axisLeft} from "d3-axis";
import { brushX } from "d3-brush";
import {zoom, transform, zoomIdentity}  from "d3-zoom";
import { area, curveMonotoneX } from "d3-shape";
import { extent, max} from "d3-array";

export const rendergraph = ({svg, width, height, brush_height, data}) => {

  const x_focus = scaleTime().range([0, width]),
      x_brush = scaleTime().range([0, width]),
      y_focus = scaleLinear().range([height, 0]);

  x_focus.domain(extent(data, function(d) { return d.date; }));
  x_brush.domain(x_focus.domain());
  y_focus.domain([0, max(data, function(d) { return d.count; })]);
  const x_focus_axis = axisBottom(x_focus),
      y_focus_axis = axisLeft(y_focus);

  const focus_area = area()
      .curve(curveMonotoneX)
      .x(function(d) { return x_focus(d.date); })
      .y0(height)
      .y1(function(d) { return y_focus(d.count); });

  const brush_overlay = brushgraph({data, width, brush_height, x_brush, x_focus, x_focus_axis, focus_area, svg})

  zoomgraph({data, width, height, x_focus, x_brush, x_focus_axis, y_focus_axis, focus_area, svg, brush_zoom: (svg,t) => {
    const brush = svg.select('.brush')
    brush.call(brush_overlay.move, x_brush.range().map(t.invertX, t))
  }})
}


/* brush area behaviour */
const brushgraph =  ({data, width, brush_height, x_brush, x_focus, x_focus_axis, focus_area, svg}) => {


  const y = scaleLinear().range([brush_height, 0]);

  x_brush.domain(extent(data, function(d) { return d.date; }));
  y.domain([0, max(data, function(d) { return d.count; })]);


  const brush_area = area()
     .curve(curveMonotoneX)
     .x(function(d) { return x_brush(d.date); })
     .y0(brush_height)
     .y1(function(d) { return y(d.count); });


  const brush_overlay = brushX()
         .extent([[0, 0], [width, brush_height]])
         .on("brush end", () => {
         if (event.sourceEvent && event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
         var s = event.selection;
         x_focus.domain(s.map(x_brush.invert, x_brush))
         const focus = svg.select('.focus')

         const focusarea = svg.select('.focusarea')
         focusarea
             .datum(data)
             .attr("d", focus_area);
         focus.select(".axis--x").call(x_focus_axis);
         svg.select(".focusarea").call(zoom().transform, zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0));
       });

  const brush = svg.select('.brush')
  const brusharea = brush.select('.brusharea')
  const brushxaxis = brush.select('.axis--x')


  brusharea
     .datum(data)
     .attr("d", brush_area);

  brushxaxis
     .call(x_focus_axis)

  brush
   .call(brush_overlay)
   .call(brush_overlay.move, x_brush.range())



  return brush_overlay

}

/* focus area behaviour */
const zoomgraph = ({data, width, height, x_focus, x_brush, x_focus_axis, y_focus_axis, focus_area, svg, brush_zoom}) => {

  const focus = svg.select('.focus')
  const focusarea = focus.select('.focusarea')
  const focusxaxis = focus.select('.axis--x')
  const focusyaxis = focus.select('.axis--y')
  const zoomrect = svg.select('.zoom')

  focusarea
      .datum(data)
      .attr("d", focus_area);

  focusxaxis
      .call(x_focus_axis)

  focusyaxis
      .call(y_focus_axis)

  const zoomable = zoom()
   .scaleExtent([1, Infinity])
   .translateExtent([[0, 0], [width, height]])
   .extent([[0, 0], [width, height]])
   .on("zoom", () => {
     if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush

     var t = event.transform;

     x_focus.domain(t.rescaleX(x_brush).domain());
     focusarea.attr("d", focus_area);
     focusxaxis.call(x_focus_axis);
     brush_zoom(svg, t)
   });

   zoomrect.call(zoomable)

}
