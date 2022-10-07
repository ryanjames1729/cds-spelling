import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'


const Header = () => {

    const { data: session } = useSession();
    const loggedInUser = session?.user?.email.split("@")[0] || null

    return (
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-screen justify-between">
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
           
            <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
            <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                <li className="nav-item">
                <Link href="/">
                    <a 
                    className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" 
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        Home
                    </a>
                </Link>
                </li>
                <li className="nav-item">
                <Link href="#">
                    <a 
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
                    className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"  
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        { session ? loggedInUser : "Login" }
                    </a>
                </Link>
                </li>
                { session ? (
                <li className="nav-item">
                <Link href="/myPosts">
                    <a 
                    className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"  
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        My Quizzes
                    </a>
                </Link>
                </li>
                ) : null}
                
                { loggedInUser && loggedInUser.indexOf("admin") > -1 ? (
                    <li className="nav-item mb-2 lg:mb-0">
                    <Link href="/admin">
                        <a
                        className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">
                            Admin
                        </a>
                    </Link>
                    </li>
                ) : null}
            </ul>
            </div>
        </div>
        </nav>

    )}

export default Header