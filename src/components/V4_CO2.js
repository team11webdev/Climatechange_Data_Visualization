import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import {CategoryScale} from 'chart.js'

const URL = "http://localhost:3001/v4_v10"

Chart.register(CategoryScale)

export default function V4_CO2() {
  const [values, setValues] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setValues(response.data)
      })
      .catch((error) => {
        alert(error.response.data.error);
      })
  }, [])
  
  var data = {
    labels: values.map((x) => x.Time),
    datasets: [
      {
        label: "Mauna Loa CO2 annual mean data (CO2 expressed as a mole fraction in dry air, micromol/mol)",
        data: values.map((x) => x.Annual_mean),//.filter(Boolean),
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 2,
      },
      {
        label: "DE08 Ice core",
        data: values.map((x) => x.DE08),
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderWidth: 2,
      },
      {
        label: "DE08-02 Ice core",
        data: values.map((x) => x.DE08_02),
        borderColor: ['rgba(255, 206, 86, 1)'],
        borderWidth: 2,
      },
      {
        label: "DSS Ice core",
        data: values.map((x) => x.DSS),
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 2,
      },
      {
        label: "Human Evolution and Activities related to CO2 and temperature",
        data: values.map((x) => x.Event_value),
        borderColor: ['black'],
        borderWidth: 1,
        pointRadius: 4,
        fill: false,
        showLine: false
        }
    ],
  }

  var options = {
    scales: {
    },
    elements: {
      point:{
          radius: 0
      }},
    legend: {
      labels: {
        fontSize: 26,
      }
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
  }

  return (
    <div className="chart-info-container">
      <h4>V4 Mauna Loa CO2 mean data(from V3) and Antarctic Ice Core records of atmospheric CO2 ratios</h4>
      <div className="chart-container" >
        <Line data={data} options={options}/>
      </div>
    </div>
  )
}