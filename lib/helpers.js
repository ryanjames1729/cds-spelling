import { gql, GraphQLClient } from 'graphql-request';

export async function getQuizzes(){

    const query = gql`
        query MyQuery {
            quizzes (first:100) {
                id
                points
                slug
                updatedAt
                userName
                wordList
                quizName
            }
        }
    `

    const graphQLClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)
    let data = await graphQLClient.request(query)
    return {quizzes: data.quizzes}
}

export async function getQuizBySlug(slug) {

    const query = gql`
        query MyQuery {
            quizzes(where: {slug: "${slug}"}) {
                id
                slug
                userName
                wordList
                quizName
                points
            }
        }
    `

    const graphQLClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)
    let data = await graphQLClient.request(query)
    return {quizzes: data.quizzes}
}
