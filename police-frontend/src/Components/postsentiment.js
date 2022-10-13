import React from 'react'
import Chart from "react-apexcharts";

function PostSentiment({sentiment, colors}){
    let options = {
        chart: {
          type: 'donut',
        },
        title: {
            text: 'Post Sentiments'
        },
        fill: {
            colors: colors
        },
        colors: colors,
        labels: ['positive', 'negative', 'neutral'],
        dataLabels: {
          enabled: false
        },

      }
    let series = [sentiment.positive, sentiment.negative, sentiment.neutral]

    let labels = ['positive', 'negative', 'neutral']

    return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type='donut'
                labels={labels}
                width="250"
                
              />
            </div>
          </div>
        </div>
    );
    
}

export default PostSentiment