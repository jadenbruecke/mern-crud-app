import "bootstrap/dist/css/bootstrap.min.css"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Head from 'next/head'
import { useEffect } from "react"


function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])
  return (
    <>
      <Head>
        <title>MERN CRUD APP</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App