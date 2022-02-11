import React from 'react'
import Link from 'next/link'

const Login = () => {
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
              />
            </div>
            <div className="my-4">
              <div>
                <label className="text-gray-500">Password</label>
              </div>
              <input
                placeholder="password"
                className="h-8 w-72 border border-gray-400 px-2 focus:outline-none"
              />
            </div>
            <button className="w-full rounded-xl border bg-blue-400 py-2 px-6 text-white shadow-lg hover:bg-blue-500 active:scale-90">
              Login
            </button>
          </div>
          <div className="mt-10 text-center">
            <p>
              Not a member?
              <Link href="/signup">
                <p className="cursor-pointer text-blue-500">Sign up</p>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
