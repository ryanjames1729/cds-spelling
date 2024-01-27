import { getQuizzes } from '../../lib/helpers'

import { useSession, signIn, signOut } from 'next-auth/react'

export default async function handler(req, res) {
    console.log(req.query.user)
    
    res.status(200).json(await getQuizzes(req.query.user))
   

}