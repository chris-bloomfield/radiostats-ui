import { gql } from 'graphql-request'

export const ALL_STATIONS = gql`
  query allStations {
    stations(limit: 1000) {
      _id
      currentName
    }
  }
`
