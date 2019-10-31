import {gql} from 'apollo-boost'

export const repoTabQuery = gql`
    query repoTabQuery{
      repositoryOwner(login: "sulikoks") {
        login
        repositories(first: 10) {
          nodes {
            id
            name
            primaryLanguage {
              name
            }
            description
          }
        }
      }
    }
`