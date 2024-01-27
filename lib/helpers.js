import { gql, GraphQLClient } from 'graphql-request';
import { useSession, signIn, signOut } from 'next-auth/react'

export async function getQuizzes(userName){

    console.log("Graph QL Req Username: " + userName)

    let query;
    if(userName) {
        query = gql`
        query MyQuery {
            quizzes (last:100, where: {userName: "${userName}"}) {
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
    }
    else {
        query = gql`
        query MyQuery {
            quizzes (last:100) {
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
    }
    
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
