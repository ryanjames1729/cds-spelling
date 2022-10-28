
// import PostsForm from "../components/PostsForm"
import Header from "../components/Header"
import WordsForm from "../components/WordsForm"
import Meta from "../components/Meta"
import { useRouter } from 'next/router'
import { deleteComment } from '../services'
import EachQuiz from "../components/EachQuiz"
import useSWR from 'swr'
import { useState } from 'react'

import styles from '../styles/Home.module.css'  

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
    let displayName = null
    if (session) {
        displayName = loggedInUser[0].toUpperCase() + ". " + loggedInUser[1].toUpperCase() + loggedInUser.slice(2)
    }

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data }= useSWR('/api', fetcher, {fallbackData: props, refreshInterval: 1000})
    let quizzes = data.quizzes

    const [form, changeForm] = useState(false)
    
    // const router = useRouter()
    
    // const refreshData = () => { 
    //     router.replace(router.asPath)
    // }
    

    return (
        <>
            <Meta title={"My Quizzes"} />
            <Header />
            {session ? 
            <main className={styles.main}>
                <div className="container px-2">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-6xl">Welcome {displayName}!</h2>
                        <button onClick={() => {
                            changeForm(!form)
                        }}
                        className="w-18 p-2 rounded-lg bg-green-600 hover:bg-green-800 hover:underline"
                        >{form ? "Hide Form" : "Create a New Quiz"}</button>
                        <div className={form ? "block" : "hidden"}><WordsForm loggedInUser={loggedInUser}/></div>
                        {quizzes.map(quiz => (
                            loggedInUser == quiz.userName ? (
                            <EachQuiz key={quiz.id} quiz={quiz} />
                            ) : null
                    ))} 
                </div>
            </div>
            </main> : <>
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

