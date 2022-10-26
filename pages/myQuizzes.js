
// import PostsForm from "../components/PostsForm"
import Header from "../components/Header"
import WordsForm from "../components/WordsForm"
import Meta from "../components/Meta"
import { useRouter } from 'next/router'
import { deleteComment } from '../services'
import EachQuiz from "../components/EachQuiz"
import useSWR from 'swr'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'    


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
    const { data }= useSWR('/api', fetcher, {fallbackData: props, refreshInterval: 1000})
    let quizzes = data.quizzes
    
    // const router = useRouter()
    
    // const refreshData = () => { 
    //     router.replace(router.asPath)
    // }
    

    return (
        <>
            <Meta title={"My Quizzes"} />
            <Header />
            {session ? <>
                <WordsForm />
                <div className="container px-2">
                <div className="flex flex-col items-center justify-center">
                <h2 className="text-6xl">Welcome {quizzes[0].userName}!</h2>
                {quizzes.map(quiz => (
                    loggedInUser == quiz.userName ? (
                        <EachQuiz key={quiz.id} quiz={quiz} />
                    ) : null
                ))} 
                </div>
            </div>
            </> : <>
                <div className="container px-2">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-3xl">So sorry, but you need to login first.</h2>
                        <Link href="#"><a
                            onClick={
                                () => {
                                    if (session) {
                                        signOut()
                                    } else {
                                        signIn('google')
                                    }
                                    return false;
                                }
                            }
                        >Log Me In</a></Link>
                    </div>
                </div>        
            </>}
            
        </>
    )
}

