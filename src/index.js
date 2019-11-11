import React from 'react'
import { render } from 'react-dom'
import App from './App'
import firebase from 'firebase'
import firebaseConfig from './creds'

// initialize FB app
firebase.initializeApp(firebaseConfig)

// initialize the db

export const db = firebase.firestore()

render(<App />, document.getElementById('root'))
