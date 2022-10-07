import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts"
import '../../pages/upload.css'

const TasksChart = ({ info, xaxisField, yaxisField, height = 200 }) => {
  const [state, setState] = useState<any>()

  useEffect(() => {
    if (!!info && info.length > 0) {
      let _xaxis = [], _yaxis = []
      info.map((item) => {
        _xaxis.push(item[xaxisField])
        _yaxis.push((item[yaxisField]).toFixed(2))
        return [_xaxis, _yaxis]
      })
      setState({
        options: {
          chart: {
            id: "basic-bar",
            type: 'line'
          },
          xaxis: {
            categories: _xaxis
          },
          colors: ['#00E396']
        },
        series: [
          {
            name: "USD",
            data: _yaxis
          }
        ]
      })
    }
  }, [info])// eslint-disable-line

  return (
    <>
      {state ? <>
        {/* @ts-ignore */}
        <ReactApexChart
          //@ts-ignore
          options={state.options} series={state.series} type="line" height={height} />
      </> : <></>}
    </>
  )
}

export default TasksChart