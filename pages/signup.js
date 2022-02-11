import React, { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { app } from '../services/firebase'
import { useRouter } from 'next/dist/client/router'
import {
  doc,
  setDoc,
  getFirestore,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

const Signup = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  //   const [user, setUser] = useState()
  const [error, setError] = useState()
  const router = useRouter()
  const db = getFirestore()
  const { user } = useContext(UserContext)

  const auth = getAuth()

  console.log('User', user)

  async function signUp(e) {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('ERROR SIGNING UP', errorCode + ' ' + errorMessage)
        setError('Email already in  use')
      })
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {})
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
          })
      })
      .then(async () => {
        await setDoc(doc(db, 'users', email), {
          email: email,
          firstName: firstName,
          lastName: lastName,
        }).then(() => {
          router.push('/')
        })
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="rounded-1 h-[40rem] w-[30rem] rounded-xl border-2 border-gray-300 shadow-lg">
        <div className="flex h-full w-full flex-col justify-center">
          <h1 className="mb-10 text-center text-2xl">myBlog Signup</h1>

          <div className="mx-auto">
            <div className="my-4">
              <div>
                <label className=" text-gray-500">First Name</label>
              </div>
              <input
                placeholder="Bobby"
                className="h-8 w-72 border border-gray-400 px-2 focus:outline-none"
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>
            <div className="my-4">
              <div>
                <label className=" text-gray-500">Last Name</label>
              </div>
              <input
                placeholder="Reay"
                className="h-8 w-72 border border-gray-400 px-2 focus:outline-none"
                name="lastName"
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>
            <div className="my-4">
              <div>
                <label className=" text-gray-500">Email</label>
              </div>
              <input
                placeholder="emailmcemail@gmail.com"
                className="h-8 w-72 border border-gray-400 px-2 focus:outline-none"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className="my-4">
              <div>
                <label className="text-gray-500">Password</label>
              </div>
              <input
                placeholder="password"
                className="h-8 w-72 border border-gray-400 px-2 focus:outline-none"
                type="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              onClick={signUp}
              className=" rounded-xl border bg-blue-400 py-2 px-6 text-white shadow-lg hover:bg-blue-500 active:scale-90"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
