import {FC, useRef, useEffect, useState} from 'react'
import {shallowEqual, useSelector, connect, useDispatch, ConnectedProps} from 'react-redux'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import * as auth from './AuthRedux'
import {getUserByToken} from './AuthCRUD'
import {RootState} from '../../../../setup'
import {setUser,logout} from '../../../../Store/Auth/Login.js'

const mapState = (state) => ({auth: state.auth})
const connector = connect(mapState, auth.actions)
// type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit = (props) => {
  const didRequest = useRef(false)
  const dispatch = useDispatch()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const accessToken = useSelector(store => store.auth.accessToken)


  const store = useSelector(store => store )

  console.log("store",store)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const {data: user} = await getUserByToken()
          console.log("user",user)
          if(user){
            dispatch(setUser(user))
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(logout())
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (accessToken) {
      requestUser()
    } else {
      dispatch(logout())
      setShowSplashScreen(false)
    }
  }, [accessToken])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
