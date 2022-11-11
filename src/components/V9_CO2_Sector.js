import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const URL = "http://localhost:3001/"

export default function V9_CO2_SECTOR() {

  const [sectors, setSectors] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setSectors(response.data)
        console.log(response.data)
        console.log(response.data[0].Sector)
      })
      .catch((error) => {
        alert(error)
      })
  }, [])

  const sectorData = {
    labels: sectors.map((s) => s.Sector),
    datasets: [{
      label: 'CO2 emissions by sectors',
      data: sectors.map((s) => s.Percentage),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      hoverOffset: 4
    }]
  }

  return (
    <div>
      <Doughnut data={sectorData} options={{onClick: (e) => {}}}/>
    </div>
  )
}