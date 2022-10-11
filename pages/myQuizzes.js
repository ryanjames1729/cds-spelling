import { useSession } from "next-auth/react"
// import PostsForm from "../components/PostsForm"
import Header from "../components/Header"
// import Meta from "../components/meta"
import { useRouter } from 'next/router'
import { deleteComment } from '../services'
import EachQuiz from "../components/EachQuiz"
import useSWR from 'swr'



import { gql, GraphQLClient } from 'graphql-request';


export async function getStaticProps() {
    const { getQuizzes } = require("../lib/helpers")
    return {
      props: (await getQuizzes()), revalidate: 1
    }
  }


export default function Quiz(props) {
    
    const { data: session } = useSession()
    const loggedInUser = session?.user?.email.split("@")[0] || null

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data }= useSWR('/api', fetcher, {fallbackData: props, refreshInterval: 30000})
    let quizzes = data.quizzes
    
    // const router = useRouter()
    
    // const refreshData = () => { 
    //     router.replace(router.asPath)
    // }
    

    return (
        <>
            {/* <Meta /> */}
            <Header />
            
            {/* {session ? <PostsForm session={session} />  : null} */}

            <div className="container px-2">

                <div className="flex flex-col items-center justify-center">
                {quizzes.map(quiz => (
                    loggedInUser == quiz.userName ? (
                        <EachQuiz key={quiz.id} quiz={quiz} />
                    ) : null
                ))} 
                </div>


            </div>
            
            
       
        </>
    )
}

