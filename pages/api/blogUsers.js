import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphcmsToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN

export default async function blogUsers(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  })

  const query = gql`
    mutation CreateBlogUser(
      $firstName: String!
      $lastName: String!
      $email: String!
    ) {
      createBlogUser(
        data: { email: $email, firstName: $firstName, lastName: $lastName }
      ) {
        id
      }

      publishBlogUser(where: { email: $email }, to: PUBLISHED) {
        id
      }
    }
  `

  try {
    const result = await graphQLClient.request(query, req.body)

    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
