import React, {Component} from 'react';
import { connect } from 'react-redux';
import {selection, root} from "d3-selection";
import { timeParse } from "d3-time-format";
import { rendergraph } from './brushzoom.d3'

class BrushZoom extends Component {

  constructor(props) {
     super(props);
     const margin = {top: 20, right: 20, bottom: 110, left: 40}
     const brush_margin = {top: 430, right: 20, bottom: 30, left: 40}
     const width = props.width - margin.left - margin.right,
           height = props.height - margin.top - margin.bottom,
           brush_height = props.height - brush_margin.top - brush_margin.bottom;


     this.state = {

       width,
       height,
       brush_height,
       margin,
       brush_margin
     }
     this.svgRef = React.createRef()
  }


 render () {
   const {margin, brush_margin, width, height, brush_height} = this.state // defined in consturctor
   return (
     <svg ref={this.svgRef} id="graph" height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>
      <g className="focus" transform={"translate("+ margin.left +"," + margin.top + ")"}>
        <path className="focusarea"/>
        <g className="axis axis--x"  transform={"translate(0," + height + ")"}/>
        <g className="axis axis--y"/>
      </g>
      <g className="brush" transform={"translate("+ brush_margin.left +"," + brush_margin.top + ")"}>
        <path className="brusharea"/>
        <g className="axis axis--x"  transform={"translate(0," + brush_height + ")"}/>
      </g>
      <rect className="zoom" height={height} width={width} transform={"translate(" + margin.left + "," + margin.top + ")"}/>
     </svg>
   )
 }

 componentDidMount () {
   this.setState({
     svg: new selection([self.svgRef], root)
   })
 }

 componentDidUpdate () {
   const { event_over_time } = this.props
   const { svg, width, height, brush_height} = this.state

   const data = event_over_time.buckets.map(bucket => ({date: timeParse("%Y-%m-%dT%H:%M:%S.%fZ")(bucket.key_as_string), count: bucket.doc_count}))
   rendergraph({svg, width, height, brush_height, data})
 }
}

export default connect(({Stats}) => ({event_over_time: Stats.stats.event_over_time}))(BrushZoom)
