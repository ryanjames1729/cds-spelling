import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import React from 'react'

import { gql, GraphQLClient } from 'graphql-request';
import { useSpeechSynthesis } from 'react-speech-kit';
import useSWR from 'swr'



export async function getStaticProps() {
  const { getQuizzes } = require("../lib/helpers")
  return {
    props: (await getQuizzes()), revalidate: 1
  }
}

export default function Quiz(props) {

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data }= useSWR('/api', fetcher, {fallbackData: props, refreshInterval: 3000})

  const wordArray = data ? data.quizzes[0].wordList.split(';') : 'Sorry, waiting for the words.';
  const [word, setWord] = React.useState(wordArray[0]);
  const { speak } = useSpeechSynthesis();
  const [index, setIndex] = React.useState(0);
  const [guessedWord, setGuessedWord] = React.useState('');
  const [score, setScore] = React.useState(0);

  console.log(wordArray);


  return (
    <div className={styles.container}>
      <Head>
        <title>Spelling with CDS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>{wordArray}</h3>
        <h1 className={styles.title}>
          Time to <span className="text-blue-600">Spell!</span>
        </h1>

        <div className={"grid-cols-1 text-center pt-6"}>
          {/* <code>{wordLists[0].words}</code> */}
          <div className="p-2">
            <button onClick={() => {
                    speak({ text: word });

                }}
                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                >
                    Speak
            </button>
          </div>
          <div>
            <textarea
              rows="1"
              className="flex-auto lg:p-6 text-center border-2 w-.5 h-8 resize-none text-3xl"
              value={guessedWord}
              onChange={(e) => {
                if (e.nativeEvent.inputType === "insertLineBreak") return;
                setGuessedWord(e.target.value)
              }}
            ></textarea>
          </div>
          <div>
            <button
              className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
              onClick={() => {
                if (guessedWord.trim() == word.trim()) {
                  setScore(score + 10);
                  alert("Correct!\n\nYour score is: " + (score+10));
                  const newIndex = index + 1 <= wordArray.length - 1 ? index + 1 : 0;
                  setIndex(newIndex);
                  setWord(wordArray[newIndex]);
                  setGuessedWord('');
                } else {
                  alert("Incorrect!\n\nYour score is: " + score);
                }
              }}
            >
              Check Answer
            </button>&nbsp;
            <button
            className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
            onClick={() => {
              const newIndex = index + 1 <= wordArray.length - 1 ? index + 1 : 0;
              setIndex(newIndex);
              setWord(wordArray[newIndex]);
            }}
            >Next Word</button>
          </div>
          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://ryan-james.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Ryan James
        </a>
      </footer>
    </div>
  )
}
