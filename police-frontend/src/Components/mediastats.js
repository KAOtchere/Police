import React from 'react'
import Chart from "react-apexcharts";

function MediaStats({mediaData, media, colors}){
    let options = {
        chart: {
          id: "basic-bar"
        },
        title: {
          text: 'Sentiments per Medium'
        },
        xaxis: {
          categories: media,
          title: {
            text: 'Media'
          }
        },
        yaxis: {
          title: {
            text: 'Percentage %'
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: colors
        },
        colors: colors
    }

    let series = mediaData

    return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
    );
    
}

export default MediaStats