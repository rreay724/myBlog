import Head from 'next/head'
import { useEffect, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { useRouter } from 'next/dist/client/router'
import { Header } from '../components/index'

export default function Home() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  console.log('USER', user)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  return (
    <div className="">
      <Head>
        <title>myBlog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0">
        <Header />
      </div>
      Main page
    </div>
  )
}
