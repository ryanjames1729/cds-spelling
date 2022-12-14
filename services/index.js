import { request, gql } from 'graphql-request';

const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://cds-spelling.netlify.app';

const graphqlAPI = process.env.HYGRAPH_ENDPOINT;

export const submitWords = async (obj) => {
    const result = await fetch(`${server}/api/setWords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (!result.ok) {
      console.log('ERROR!!! ' + result.statusText);
    } else {
      console.log('result from post is ok')
    }

    return result.json();
  };

export const deleteQuiz= async (obj) => {
  const result = await fetch(`${server}/api/deleteQuiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const updatePoints = async (obj) => {
  const result = await fetch(`${server}/api/updatePoints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  if (!result.ok) {
    console.log('ERROR!!! ' + result.statusText);
  } else {
    console.log('result from post is ok')
  }

  return result.json();
};