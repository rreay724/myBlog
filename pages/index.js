import Head from 'next/head'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

export default function Home() {
  const { user } = useContext(UserContext)
  console.log('USER', user)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Main page
    </div>
  )
}
