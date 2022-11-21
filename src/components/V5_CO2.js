//Assigned to: Elias
//Fuctions: show v5 as required
//Requirements:

//The horizontal axis of the chart should be years
//Provide link to data sources

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const URL = "http://localhost:3001/v5";
const V5 = () => {
  const [chart_gasage, setChart_gasage] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response.data);
        setChart_gasage(response.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  var data = {
    labels: chart_gasage.map((x) => x.gasage_edc3_yr_bp),
    datasets: [
      {
        label: "Gasage",
        data: chart_gasage.map((x) => x.co2_ppmv),
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
    title: "V5 Vostok",
    description: "V5 Vostok desc",
    descLink: "https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html",
    dataLink: "https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2"
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
    <div className="chart-info-container" >
      <h3>{description.title}</h3>
        <div className="chart-container">
            <Line data={data} options={options}/>
        </div>
        <div className="chart-info">{description.description}</div>
      <a href={description.descLink} className="chart-info">Description</a>
      <a href={description.dataLink} className="chart-info">Data Source</a>
    </div>
  );
};

export default V5;
