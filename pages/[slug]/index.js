import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

import React from 'react'

import { gql, GraphQLClient } from 'graphql-request';
import { useSpeechSynthesis } from 'react-speech-kit';

import { updatePoints } from '../../services'

import useSWR from 'swr'


export const getStaticProps = async (context) => {
  const { getQuizzes, getQuizBySlug } = require("../../lib/helpers")
  return {
    props: (await getQuizBySlug(context.params.slug)), revalidate: 1
  }

    // const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)

    // const { wordLists } = await hygraph.request(`
    // {
    //     wordLists (where: {slug: "${context.params.slug}"}) {
    //         id
    //         slug
    //         userName
    //         words
    //       }
    // }`)

    // return {
    //     props: {
    //         wordLists
    //     }
    // }
}

export const getStaticPaths = async () => {
    const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)

    const { quizzes } = await hygraph.request(`
        {
            quizzes {
                slug
            }
        }
    `)

    const paths = quizzes.map(item => ({
        params: {
            slug: item.slug,
        }
    }));

    return {
        paths,
        fallback: true,
    };
}

export default function Quiz(props) {

  const data = props

  const wordArray = data ? data.quizzes[0].wordList.split(';') : 'Sorry, waiting for the words.';
  for(let i = 0; i < wordArray.length; i++) {
    wordArray[i] = wordArray[i].trim();
    if(wordArray[i].length === 0) {
        wordArray.splice(i, 1);
        i--;
    }
  }

  for(let j = wordArray.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [wordArray[j], wordArray[k]] = [wordArray[k], wordArray[j]];
  }
  const [word, setWord] = React.useState(wordArray[0]);
  const { speak } = useSpeechSynthesis();
  const [index, setIndex] = React.useState(0);
  const [guessedWord, setGuessedWord] = React.useState('');
  const [score, setScore] = React.useState(0);

  const [pitch, setPitch] = React.useState(1);
  const [rate, setRate] = React.useState(1);

  console.log(wordArray);



  return (
    <>
      <Head>
        <title>Spelling with CDS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.quiz}>
        <div id="correctBanner" className="hidden w-1/4 rounded-xl bg-white text-black z-10 h-10 text-2xl text-center align-middle absolute banner">
          Correct!
        </div>
        <div id="incorrectBanner" className="hidden w-1/4 rounded-xl bg-white text-black z-10 h-10 text-2xl text-center align-middle absolute banner">
          Try Again!
        </div>

        <h1 className={styles.title}>
          Time to Spell!
        </h1>

        <div className={"grid-cols-1 text-center pt-6"}>
          {/* <code>{wordLists[0].words}</code> */}
          <div className="p-2">
            <button onClick={() => {
                // setWord(wordArray[index]);
                    speak({ text: word, rate, pitch });

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
                console.log(index)
                if (guessedWord.trim() == word.trim()) {
                  setScore(score + 10);
                  // alert("Correct!\n\nYour score is: " + (score+10));
                  setTimeout(() => {
                    document.getElementById("correctBanner").classList.remove("hidden");
                  }, 1000);
                  // add class hidden
                  setTimeout(() => {
                    document.getElementById("correctBanner").classList.add("hidden");
                  }, 3000);
                  
                  // incremement score in data base
                  let points = data.quizzes[0].points + score;
                  let id = data.quizzes[0].id;
                  const pointsObject = { points, id };
                  updatePoints(pointsObject)
                      .then((res) => {
                          return;
                      })


                  const newIndex = index + 1 <= wordArray.length - 1 ? index + 1 : 0;
                  setIndex(newIndex);
                  setWord(wordArray[newIndex]);
                  setGuessedWord('');
                } else {
                  // alert("Incorrect!\n\nYour score is: " + score);
                  setTimeout(() => {
                    document.getElementById("incorrectBanner").classList.remove("hidden");
                  }, 1000);
                  // add class hidden
                  setTimeout(() => {
                    document.getElementById("incorrectBanner").classList.add("hidden");
                  }, 3000);
                }
                console.log(index)
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


          <div>
              <div>
                <label htmlFor="rate">Rate: </label>
                <div>{rate}</div>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                defaultValue="1"
                step="0.1"
                id="rate"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div>
              <div>
                <label htmlFor="pitch">Pitch: </label>
                <div className="pitch-value">{pitch}</div>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                defaultValue="1"
                step="0.1"
                id="pitch"
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div>
          
        </div>
      </main>
    </>
  )
}
