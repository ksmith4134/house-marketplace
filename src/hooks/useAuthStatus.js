import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true) // loading
  const isMounted = useRef(true)


  // only do this if isMounted = true
  useEffect(() => {
    if(isMounted){
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if(user){
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkingStatus }
}

// Protected routes in v6 react-router-dom
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning (with useRef)
// https://stackoverflow.com/questions/59780268/cleanup-memory-leans-on-an-unmounted-component-in-react-hooks
