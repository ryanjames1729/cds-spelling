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
                            points: {quiz.points} <br/>
                            <Link href="/[slug]" as={`${server}/${quiz.slug}`}><a className="hover:underline">{server}/{quiz.slug}</a></Link>
                        </p>
                        <div className="grid grid-cols-3 content-end">
                            <button type="button" onClick={handleDelete} className="w-18 p-2 rounded-lg bg-red-600 hover:bg-red-800 hover:underline">Delete this quiz</button>
                            <div></div>
                            <button type="button" onClick={handleReset} className="w-18 p-2 rounded-lg bg-red-600 hover:bg-red-800 hover:underline">Reset quiz points</button>
                        </div>
                    </div>
                    </div>
                </div>
                    
                </div>    
    )
}

export default EachQuiz