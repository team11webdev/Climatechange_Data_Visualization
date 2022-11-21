//Assigned to: Elias
//Fuctions: show v7 + 10 as required
//Requirements:

//The horizontal axis of the chart should be years
//Provide link to data sources

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v7";
const V7 = () => {
  const [chart_co2, setChart_co2] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        setChart_co2(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data = {
    labels: chart_co2.map((x) => x.Time_yr_BP),
    datasets: [
      {
        label: "50%",
        data: chart_co2.map((x) => x.percent50),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "CO2 ppm",
        data: chart_co2.map((x) => x.carbon_dioxide_ppm),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Human Evolution and Activities related to CO2 and temperature",
        data: chart_co2.map((x) => x.notable_events),
        borderColor: ['black'],
        borderWidth: 1,
        pointRadius: 4,
        fill: false,
        showLine: false
        }
    ],
  };

  var description = {
    title: "V7",
    description: "V7 + V10 (notyet)  WRONG COLUMN. IT'S 50%, NOT 97.5% GO FIX DATABASE",
    descLink: "https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf",
    dataLink: "https://oamk-my.sharepoint.com/:w:/g/personal/lassehav_oamk_fi/EQNurDErbVxFtkHSsM1IDaUB-I948CtfTnUlEEkuFjrSRQ?e=e0IxiS"
  }

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    elements: {
        point:{
            radius: 0
        }},
    legend: {
      labels: {
        fontSize: 26,
      },
    },
    spanGaps: true,
    plugins: {
      tooltip: {
        //enabled: false
        callbacks: {
          title:  (context) => {
            return 'Human Evolution and Activities related to CO2 and temperature'
          },
          label: (context) => {
            return context.label
          },
          afterLabel: (context) => {
            return 'This is the index: ' + context.dataIndex
          }
        }
      } 
  }
  };

  return (
    <div className="chart-info-container" >
      <h3>{description.title}</h3>
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
        <div className="chart-info">{description.description}</div>
      <a href={description.descLink} className="chart-info">Description</a>
      <a href={description.dataLink} className="chart-info">Data Source</a>
    </div>
  );
};

export default V7;

