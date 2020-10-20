import React, { ReactElement } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'

interface Props {
  reachData: {
    date: string
    reach: number
  }[]
}

const ReachGraph = ({ reachData }: Props): ReactElement => {
  return (
    <div className="wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={reachData}>
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(229, 166, 6)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(229, 166, 6)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#333" vertical={false} />
          <XAxis
            dataKey="date"
            interval="preserveEnd"
            tick={{ fill: '#777' }}
            tickLine={{ stroke: '#777' }}
            axisLine={{ stroke: '#777' }}
          />
          <YAxis
            dataKey="reach"
            domain={['auto', 'auto']}
            tick={{ fill: '#777' }}
            tickLine={{ stroke: '#777' }}
            tickFormatter={(tick: number) => tick.toLocaleString()}
          />
          <Area
            dataKey="reach"
            animationDuration={300}
            stroke="rgb(206, 104, 8)"
            fillOpacity={1}
            fill="url(#areaFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <style jsx>{`
        .wrapper {
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default ReachGraph
