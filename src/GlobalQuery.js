import { gql } from "graphql.macro"

export const GlobalQuery = gql` 
  query GlobalQuery {
    meta {
      mtpVersion {
        version
      }
      dataVersion {
        year
        month
        iteration
      }
      apiVersion {
        x
        y
        z
      }
    }
  }
`