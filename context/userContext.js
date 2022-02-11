import { createContext, useState, useEffect, useContext } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from '../services/firebase'
import { getAuth } from 'firebase/auth'

export const UserContext = createContext(null)

const UserProvider = (props) => {
  const [user, setUser] = useState()
  const [currentUser, setCurrentUser] = useState()
  const auth = getAuth()
  const db = getFirestore()

  useEffect(() => {
    setCurrentUser(auth.currentUser)

    async function getUser() {
      const docRef = doc(db, 'users', currentUser?.uid)
      const docSnap = await getDoc(docRef, db)
      setUser(docSnap)
    }
    {
      currentUser && getUser()
    }
  }, [])

  const userContextValue = {
    user,
  }

  return <UserContext.Provider value={userContextValue} {...props} />
}

const useUser = () => userContext(UserContext)

export { UserProvider, useUser }
