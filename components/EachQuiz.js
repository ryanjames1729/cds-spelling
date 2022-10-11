import { useSession } from "next-auth/react"
// import PostsForm from "../components/PostsForm"

// import Meta from "../components/meta"
import { useRouter } from 'next/router'
import { deleteComment } from '../services'
import Link from 'next/link'
import { server } from '../services'

const EachQuiz = ({ quiz }) => {
    const { data: session } = useSession()
    const loggedInUser = session?.user?.email.split("@")[0] || null
    const router = useRouter()

    console.log(quiz)

    const handleSubmit = () => {
        // setError(false);
        console.log("Button clicked")
    
        
        const userName = quiz.userName;

    
        const commentObject = { body, userName }

        console.log(commentObject)
        deleteComment(commentObject)
            .then((res) => {
                // setShowSuccessMessage(true);
                router.replace(router.asPath)
                setTimeout(() => {
                    // setShowSuccessMessage(false);
                }, 3000);
        })
    }

    return (
        <div key={quiz.id} className="w-1/2 lg:flex py-6">
                <div className="pt-10 border-l border-gray-400 border-t border-b h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                    <h2 className="text-8xl">{quiz.quizName.substring(0,2).toUpperCase()}</h2>
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8 w-96">
                    
                    <div className="text-gray-900 font-bold text-xl mb-2">{quiz.quizName}</div>
                    <p className="text-gray-700 text-base">{quiz.wordList}</p>
                    </div>
                    <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                            <Link href="/[slug]" as={`${server}/${quiz.slug}`}><a className="hover:underline">{server}/{quiz.slug}</a></Link>
                        </p>
                        <div className="grid grid-cols-3 content-end">
                            <div></div>
                            <div></div>
                            {quiz.documentInStages && quiz.documentInStages.length > 0 ? (
                                <button type="button" onClick={handleSubmit} className="w-18 p-2 rounded-lg bg-red-600 hover:bg-red-800 hover:underline">Delete this quiz</button>
                            ): null}
                        </div>
                    </div>
                    </div>
                </div>
                    
                </div>    
    )
}

export default EachQuiz