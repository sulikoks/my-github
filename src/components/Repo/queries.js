import {gql} from 'apollo-boost'

export const repoQuery = gql`
    query repoQuery($name: String!) {
      repositoryOwner(login: "sulikoks") {
        repository(name: $name) {
          id
          nameWithOwner
          primaryLanguage {
            name
          }
          projectsResourcePath
          homepageUrl
          description
          updatedAt
        }
      }
    }
`