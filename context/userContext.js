import { createContext, useState, useEffect, useContext } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { app } from '../services/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const UserContext = createContext(null)

const UserProvider = (props) => {
  const [user, setUser] = useState()
  const [currentUser, setCurrentUser] = useState()
  const db = getFirestore()
  const auth = getAuth()

  useEffect(() => {
    const loggedInUser = auth.currentUser

    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setCurrentUser(loggedInUser)
      }
    })

    async function getUser() {
      const docRef = doc(db, 'users', currentUser.email)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        setUser(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }

    {
      currentUser && getUser()
    }
  }, [currentUser])

  const userContextValue = {
    user,
  }

  return <UserContext.Provider value={userContextValue} {...props} />
}

const useUser = () => userContext(UserContext)

export { UserProvider, useUser }
