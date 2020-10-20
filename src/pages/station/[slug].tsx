import React, { ReactElement, SyntheticEvent, useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import { generateAuthHeader, REALM_GRAPHQL_ENDPOINT } from '../../lib/realmClient'
import { ALL_STATIONS } from '../../graphql/allStations'
import { STATION, StationType } from '../../graphql/station'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import dayjs from 'dayjs'
import ReachGraph from '../../components/ReachGraph'

const StationPage = ({ data: { station } }: { data: { station: StationType } }): ReactElement => {
  const fromDate = dayjs(station.firstResult)
  const toDate = dayjs(station.latestResult)
  const years = toDate.diff(fromDate, 'year')
  const months = toDate.diff(fromDate, 'month')
  const sortedResults = station.results.sort((a, b) =>
    dayjs(a.surveyEndDate).diff(dayjs(b.surveyEndDate))
  )

  const latestReach = Number(sortedResults[sortedResults.length - 1].reach)
  const latestSurveyPeriod = sortedResults[sortedResults.length - 1].surveyPeriod

  const allTimeReachChange = latestReach - Number(sortedResults[0].reach)

  const lastYearReachChange =
    latestReach -
    Number(sortedResults[sortedResults.length - 1 - (latestSurveyPeriod === 'Q' ? 4 : 2)].reach)

  const [tableIsVisible, setTableIsVisible] = useState(false)

  const handleTableToggle = (e: SyntheticEvent) => {
    e.preventDefault()
    setTableIsVisible((tableIsVisible) => !tableIsVisible)
  }

  return (
    <div className="outer">
      <nav>
        <Link href="/">radio stats</Link> <span className="triangle breadcrumb" />{' '}
        <span>station info</span>
      </nav>
      <h1>{station.currentName}</h1>
      <hr />
      <div className="top-info">
        <div className="data-available">
          <span className="interval">{years ? `${years} years` : `${months} months`}</span> RAJAR
          data available ({fromDate.format('YYYY')} to {toDate.format('YYYY')})
        </div>
        {station.nameChanges.length > 0 && (
          <div className="previously-known-as">
            <div className="previously-title">Previously known as:</div>
            {station.nameChanges.map((nameChange) => (
              <div key={nameChange._id}>
                {nameChange.from} (until {dayjs(nameChange.surveyEndDate).format('MMM YYYY')})
              </div>
            ))}
          </div>
        )}
        <div className="comparisons">
          <div className="since-beginning">
            <span className="timescale">Since {fromDate.format('YYYY')}: </span>
            <span>
              Weekly reach {allTimeReachChange > 0 ? 'increased' : 'decreased'} by{' '}
              {allTimeReachChange.toLocaleString()} to{' '}
              <span className="current-reach">
                {sortedResults[sortedResults.length - 1].reach.toLocaleString()}
              </span>
            </span>
            <span className={`triangle ${allTimeReachChange >= 0 ? 'up' : 'down'}`} />
          </div>
          <div className="last-year">
            <span className="timescale">Latest 12 months: </span>
            <span>
              Weekly reach{' '}
              {lastYearReachChange >= 0
                ? `increased by ${lastYearReachChange.toLocaleString()}`
                : `decreased by ${(lastYearReachChange * -1).toLocaleString()}`}
            </span>
            <span className={`triangle ${lastYearReachChange >= 0 ? 'up' : 'down'}`} />
          </div>
        </div>
      </div>
      <ReachGraph
        reachData={sortedResults.map(({ surveyEndDate, reach }) => ({
          date: dayjs(surveyEndDate).format('MM/YYYY'),
          reach: Number(reach),
        }))}
      />
      <a className="toggle-link" href="#">
        <div className="table-toggle" onClick={handleTableToggle}>
          {tableIsVisible ? 'hide' : 'show'} raw data
          <span className={`triangle ${tableIsVisible ? 'collapse' : 'expand'}`} />
        </div>
      </a>
      {tableIsVisible && (
        <table>
          <thead>
            <tr>
              <td>Survey date</td>
              <td>Survey period</td>
              <td>Population</td>
              <td>Reach</td>
              <td>Reach (%)</td>
              <td>Average hours per head</td>
              <td>Average hours per listener</td>
              <td>Total hours</td>
              <td>Listening share in TSA (%)</td>
            </tr>
          </thead>
          <tbody>
            {station.results
              .sort((a, b) => dayjs(b.surveyEndDate).diff(dayjs(a.surveyEndDate)))
              .map((result) => (
                <tr key={result._id}>
                  <td>{dayjs(result.surveyEndDate).format('MMM YY')}</td>
                  <td>{result.surveyPeriod}</td>
                  <td>{result.population.toLocaleString()}</td>
                  <td>{result.reach.toLocaleString()}</td>
                  <td>{result.reachPercent}</td>
                  <td>{result.avgHoursPerHead}</td>
                  <td>{result.avgHoursPerListener}</td>
                  <td>{result.totalHours.toLocaleString()}</td>
                  <td>{result.TSAListeningSharePercent}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <hr />
      <div className="info">
        Source: <a href="https://www.rajar.co.uk/">RAJAR</a> | <Link href="/">About this site</Link>
      </div>
      <style jsx>{`
        .outer {
          margin: 32px;
        }

        nav span {
          color: rgb(229, 166, 6);
        }

        .triangle {
          display: inline-block;
          width: 0;
          height: 0;
          position: relative;
        }

        .breadcrumb {
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 10px solid #333;
          top: 4px;
          margin: 0 8px;
        }

        .up {
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-bottom: 16px solid #00b306;
          margin: 0 8px;
        }

        .down {
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-top: 16px solid #bf0000;
          margin: 0 8px;
        }

        .collapse {
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid white;
          margin: 0 8px;
        }

        .expand {
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid white;
          margin: 0 8px;
        }

        nav :global(a) {
          text-decoration: none;
          font-weight: bold;
        }

        h1 {
          margin: 0;
          display: inline-block;
          border-bottom: 8px solid #333;
          max-width: 75%;
          line-height: 64px;
          padding: 12px 0;
        }

        hr {
          border: none;
          margin: 0;
          border-top: 1px solid #333;
          padding-bottom: 8px;
        }

        .top-info {
          padding-bottom: 32px;
        }

        .data-available {
          font-weight: normal;
          padding-bottom: 16px;
        }

        .data-available .interval {
          font-weight: bold;
        }

        .previously-known-as {
          padding-bottom: 16px;
        }

        .previously-title,
        .current-reach {
          font-weight: bold;
        }

        .comparisons {
          font-size: 24px;
        }

        .timescale {
          font-weight: bold;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 32px;
        }

        td,
        .table-toggle {
          border: 1px solid #333;
          color: #999;
        }

        td {
          padding: 8px;
        }

        .table-toggle {
          padding: 16px 16px 20px 16px;
          border-bottom: ${tableIsVisible ? 'none' : '1px solid #333'};
          margin-bottom: ${tableIsVisible ? '0' : '32px'};
          color: white;
        }

        .toggle-link {
          text-decoration: none;
        }

        .toggle-link:hover .table-toggle {
          color: rgb(229, 166, 6);
        }

        .toggle-link:hover .table-toggle .collapse {
          border-bottom: 8px solid rgb(229, 166, 6);
        }

        .toggle-link:hover .table-toggle .expand {
          border-top: 8px solid rgb(229, 166, 6);
        }

        thead td {
          color: white;
        }
      `}</style>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = new GraphQLClient(REALM_GRAPHQL_ENDPOINT, { headers: await generateAuthHeader() })

  const data = await client.request(ALL_STATIONS)

  return {
    paths: data?.stations.map((station: StationType) => ({
      params: { slug: station._id },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.slug || ''

  const client = new GraphQLClient(REALM_GRAPHQL_ENDPOINT, { headers: await generateAuthHeader() })

  const data = await client.request(STATION, { id })

  return {
    props: {
      data,
    },
    revalidate: 1,
  }
}

export default StationPage
