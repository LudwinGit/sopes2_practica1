import React from 'react';
// import { Chart } from "react-chartjs-2";
import { Chart } from "chart.js";
export default class LineChart extends React.Component   {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.title);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',
        data: {
          labels: this.props.data.map(d => d.title),
          datasets: [{
            label: this.props.title,
            data: this.props.data.map(d => d.value),
            fill: 'none',
            backgroundColor: this.props.color,
            pointRadius: 2,
            borderColor: this.props.color,
            borderWidth: 1,
            lineTension: 0,
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.chartRef} />;
    }
  };