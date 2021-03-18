import Head from 'next/head'
import React, { ReactElement } from 'react'
import LotsOfNames from '../components/LotsOfNames'
import { ALL_STATIONS } from '../graphql/allStations'
import { StationType } from '../graphql/station'
import { GraphQLClient } from 'graphql-request'
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from '../lib/realmClient'
import { GetStaticProps } from 'next'
import Link from 'next/link'

const Home = ({ data }: Props): ReactElement => (
  <div className="container">
    <Head>
      <title>Radio Stats</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <div className="main-heading">
        <h1>radio stats</h1>
        <div className="about-link">
          <Link href="/about">About</Link>
        </div>
      </div>
      <LotsOfNames
        stations={
          data.stations?.map(({ currentName, _id }: StationType) => ({
            id: _id,
            name: currentName,
          })) || []
        }
      />
    </main>
    <style jsx>{`
      .main-heading {
        display: flex;
        align-items: flex-end;
        padding: 8px 16px 16px 16px;
      }

      h1 {
        margin: 0;
        color: white;
        flex-grow: 1;
      }

      .about-link {
        padding: 12px;
      }
    `}</style>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const client = new GraphQLClient(REALM_GRAPHQL_ENDPOINT, { headers: await generateAuthHeader() })

  const data = await client.request(ALL_STATIONS)

  return {
    props: { data },
    revalidate: 1,
  }
}

interface Props {
  data: {
    stations: StationType[]
  }
}

export default Home
