import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const request = {
	method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a7cd626787msh76b7b48b65a7187p18a97fjsn3ee454a25544',
    'X-RapidAPI-Host': 'covid-19-tracking.p.rapidapi.com'
  }
};
export function SmallChart() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June',"June", 'July'];
  const fetchData=async()=>{
    const data = await fetch('https://covid-19-tracking.p.rapidapi.com/v1/usa', request)
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
