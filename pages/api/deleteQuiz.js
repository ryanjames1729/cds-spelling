// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Any file inside the folder pages/api is mapped to the route /api/<filename>
// will be treated as an endpoint and not a page

import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.HYGRAPH_ENDPOINT
const graphcmsToken = process.env.HYGRAPH_TOKEN



export default async function handler(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    }
  })

 

  const query = gql`
    mutation unpublishQuiz($slug: String!, $userName: String!) {
      unpublishManyQuizzes(where: {slug: $slug, userName: $userName}) { count }
    }
  ` 
  try{
    
    
    const result = await graphQLClient.request(query, req.body)

    res.status(200).send(result);
    

  } catch (error) {
    console.log(error)
  }

  
}
