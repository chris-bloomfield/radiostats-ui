import React, { ReactElement } from 'react'
import randomColor from 'randomcolor'
import Link from 'next/link'

const LotsOfNames = ({ stations }: Props): ReactElement => (
  <div>
    {stations.map(({ id, name }) => (
      <Link key={id} href={`/station/${id}`}>
        <a className="name" style={{ color: randomColor({ luminosity: 'dark', hue: 'orange' }) }}>
          {name}
        </a>
      </Link>
    ))}
    <style jsx>
      {`
        h1,
        .name {
          font-size: 42px;
          font-weight: bold;
        }
        h1 {
          margin: 0;
          color: white;
          padding: 8px 16px 16px 16px;
        }
        .name {
          text-decoration: none;
          line-height: 30px;
          word-break: break-all;
          opacity: 0.5;
          transition: 150ms opacity;
        }

        .name:hover {
          opacity: 1;
        }
      `}
    </style>
  </div>
)

interface Props {
  stations: {
    id: string
    name: string
  }[]
}

export default LotsOfNames
