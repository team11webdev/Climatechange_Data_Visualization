//Assigned to: Elias
//Fuctions: show v6 as required
//Requirements:

//The horizontal axis of the chart should be years
//Provide link to data sources

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v6";
const V6 = () => {
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
    labels: chart_co2.map((x) => x.gasage_yr_bp),
    datasets: [
      {
        label: "CO2 ppmv",
        data: chart_co2.map((x) => x.co2_ppmv),
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
    ],
  };

  var description = {
    title: "V6 Ice Core 800K",
    description: "V6  Ice core 800k year composite study CO2 measurements  lduhfvlisuehurghvelsuvnelsuiThe color of the grid lines. If specified as an array, the first color applies to the first grid line, the second to the second grid line, and so on.",
    descLink: "https://www.ncei.noaa.gov/access/paleo-search/study/17975",
    dataLink: "https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt"
  }

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
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
    spanGaps: true
  };

  return (
    <div className="chart-info-container">
      <h3>{description.title}</h3>
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
        <div className="chart-description">{description.description}</div>
      <a href={description.descLink}>Description</a>
      <a href={description.dataLink}>Data Source</a>
    </div>
  );
};

export default V6;