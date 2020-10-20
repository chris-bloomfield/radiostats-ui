import { gql } from 'graphql-request'

export const STATION = gql`
  query station($id: ObjectId!) {
    station(query: { _id: $id }) {
      _id
      currentName
      firstResult
      latestResult
      nameChanges {
        _id
        from
        to
        surveyEndDate
      }
      results {
        _id
        avgHoursPerHead
        avgHoursPerListener
        population
        reach
        reachPercent
        stationGroup
        surveyEndDate
        surveyPeriod
        totalHours
        TSAListeningSharePercent
      }
    }
  }
`

export interface StationType {
  _id: string
  currentName: string
  firstResult: string
  latestResult: string
  nameChanges: {
    _id: string
    from: string
    to: string
    surveyEndDate: string
  }[]
  results: {
    _id: string
    avgHoursPerHead: string
    avgHoursPerListener: string
    population: string
    reach: string
    reachPercent: string
    stationGroup: string
    surveyEndDate: string
    surveyPeriod: string
    totalHours: string
    TSAListeningSharePercent: string
  }[]
}
