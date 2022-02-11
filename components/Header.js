import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../services/firebase'
import { useRouter } from 'next/dist/client/router'

function Header() {
  const router = useRouter()
  const auth = getAuth()
  const { user } = useContext(UserContext)

  const signOutClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.reload()
        router.push('/login')

        console.log('Signed out')
      })
      .catch((error) => {
        // An error happened.
      })

    router.push('/login')
  }
  return (
    <header className="min-w-screen flex items-center justify-between border border-b py-3 px-7 shadow-lg">
      <div>
        <h2 className="text-3xl font-semibold">myBlog</h2>
      </div>
      <div className="text-sm">
        <p>Logged in as {user?.email}</p>
        <p
          className="cursor-pointer text-right text-blue-500 hover:underline"
          onClick={signOutClick}
        >
          Sign out
        </p>
      </div>
    </header>
  )
}

export default Header
