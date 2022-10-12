import React from 'react'
import Chart from "react-apexcharts";

function Series({timeSeries}){

    let options = {
        chart: {
            height: 350,
            zoom: {
              enabled: false
            }
          },
          title: {
            text: 'Posts per Month'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
        xaxis: {
            categories: timeSeries.categories,
            title: {
              text: 'Months'
            }
        },
        yaxis: {
          title: {
            text: 'Number of Posts'
          }
        },
    };

    let series = [
    {
        name: "series-1",
        data: timeSeries.data
    }
    ]
    
      return (
        <div className="app">
            <div className="mixed-chart">
                <Chart
                options={options}
                series={series}
                type='area'
                width="500"
                />
            </div>
        </div>
      );
}

export default Series;
