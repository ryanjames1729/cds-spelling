import { useSession } from "next-auth/react"
// import PostsForm from "../components/PostsForm"

// import Meta from "../components/meta"
import { useRouter } from 'next/router'
import { deleteQuiz } from '../services'
import Link from 'next/link'
import { server, updatePoints } from '../services'


const EachQuiz = ({ quiz }) => {
    const { data: session } = useSession()
    const loggedInUser = session?.user?.email.split("@")[0] || null
    const router = useRouter()

    console.log(quiz)

    const handleDelete = () => {
        // setError(false);
        console.log("Button clicked")
    
        
        const userName = quiz.userName;
        const slug = quiz.slug;

    
        const quizObject = { slug, userName }

        console.log(quizObject)
        deleteQuiz(quizObject)
            .then((res) => {
                // setShowSuccessMessage(true);
                router.replace(router.asPath)
                setTimeout(() => {
                    // setShowSuccessMessage(false);
                }, 3000);
        })
    }

    const handleReset = () => {
        // incremement score in data base
        let points = 0;
        let id = quiz.id;
        const pointsObject = { points, id };
        updatePoints(pointsObject)
            .then((res) => {
                return;
            })
        
    }

    return (
        <div key={quiz.id} className="w-2/3 py-6">
            <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8 w-96">
                    <div className="text-gray-900 text-xl mb-2">Quiz Name: <span className="font-bold">{quiz.quizName}</span></div>
                    <p className="text-gray-700 text-base">Word List: <span className="font-bold">{quiz.wordList}</span></p>
                </div>
                <div className="grid grid-rows-2">
                    <div className="text-sm grid grid-cols-3 content-end">
                        <p className="text-gray-900 leading-none">
                            Class XP: {quiz.points}
                        </p>
                        <div></div>
                        <Link href="/[slug]" as={`${server}/${quiz.slug}`}><a className="text-gray-900 hover:underline">{server}/{quiz.slug}</a></Link>
                    </div>
                    <div className="grid grid-cols-3 content-end">
                        <button type="button" onClick={handleReset} className="w-18 p-2 rounded-lg bg-red-600 hover:bg-red-800 hover:underline">Reset quiz points</button>
                        <div></div>
                        <button type="button" onClick={handleDelete} className="w-18 p-2 rounded-lg bg-red-600 hover:bg-red-800 hover:underline">Delete this quiz</button>  
                    </div>
                    
                    </div>
                </div>
                    
                </div>    
    )
}

export default EachQuiz