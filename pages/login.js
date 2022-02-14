import Link from 'next/link'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useRouter } from 'next/dist/client/router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  async function login(e) {
    e.preventDefault()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        router.push('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setError(true)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="rounded-1 h-[40rem] w-[30rem] rounded-xl border-2 border-gray-300">
        <div className="flex h-full w-full flex-col justify-center">
          <h1 className="mb-10 text-center text-2xl">myBlog Login</h1>

          <div className="mx-auto">
            <div className="my-4">
              <div>
                <label className=" text-gray-500">Email</label>
              </div>
              <input
                placeholder="email"
                className="h-8 w-72 border border-gray-400 px-2 focus:outline-none"
                type="text"
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
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              onClick={login}
              className="w-full rounded-xl border bg-blue-400 py-2 px-6 text-white shadow-lg hover:bg-blue-500 active:scale-90"
            >
              Login
            </button>
          </div>
          <div className="mt-10 text-center">
            {error && (
              <p className="pb-2 text-red-500">Email or password invalid</p>
            )}

            <p>
              Not a member?{' '}
              <Link href="/signup">
                <span className="cursor-pointer text-blue-500 hover:underline">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
