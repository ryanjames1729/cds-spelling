import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import React from 'react'

import { gql, GraphQLClient } from 'graphql-request';
import { useSpeechSynthesis } from 'react-speech-kit';

import Header from '../components/Header'
import Meta from '../components/Meta'
import useSWR from 'swr'

import { useSession, signIn, signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'

export async function getStaticProps() {
  const { getQuizzes } = require("../lib/helpers")
  return {
    props: (await getQuizzes()), revalidate: 1
  }
}

export default function Home(props) {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data }= useSWR('/api', fetcher, {fallbackData: props, refreshInterval: 3000})

  const { session } = useSession();
  const loggedInUser = session?.user?.email.split("@")[0] || null

  if (loggedInUser) {
    return {
      redirect: {
        destination: '/myQuizzes/', // some destination '/dashboard' Ex,
        permanent: false,
      },
    }
  } else {
  
  return (
    <>
      <Meta title={"Home"} />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className="text-pink-600">Spelling with CDS</span>
        </h1>

        <div className="flex lg:flex-row lg:gap-x-4 flex-col items-center justify-center mt-12">
        <Link href="#">
        <div class="max-w-7xl mx-auto mt-12 hover:cursor-pointer"
          onClick={
            () => {
                if (session) {
                    signOut()
                } else {
                    signIn('google', { callbackUrl: '/myQuizzes' })
                }
                return false;
            }
        }  
        >
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div class="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div class="space-y-2">
                  <p class="text-slate-800">Teachers, get started by logging in.</p>
                </div>
              </div>
             </div>
          </div>
          </Link>
        <Link href="/demo-example">
        <div class="max-w-7xl mx-auto mt-12 hover:cursor-pointer"
          onClick={
            () => { return {
              redirect: {
                destination: '/demo-example/', // some destination '/dashboard' Ex,
                permanent: false,
              },
            }
          }
        }  
        >
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div class="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div class="space-y-2">
                  <p class="text-slate-800">Want a Demo? Find out more here.</p>
                </div>
              </div>
             </div>
          </div>
          </Link>
          </div>

      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://ryan-james.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Ryan James
        </a>
      </footer> */}
    </>
  )
}
}
