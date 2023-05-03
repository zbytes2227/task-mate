import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [Loading, setLoading] = useState(false)
  const router = useRouter();


  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  }, [router.query])

  useEffect(() => {
    if(Loading){
      setProgress(65)
    }else if(!Loading){
      setProgress(100)
    }
  }, [Loading])
  


  return (
  <>
    <LoadingBar
      color='#FB923C'
      height={4}
      waitingTime={5000}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  <Component {...pageProps} setLoading={setLoading} Loading={Loading}/>
  </>
  )
}
