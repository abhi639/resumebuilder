import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ForgetpasswordError from '../../errors/ForgetpasswordError'

const TokenValidation = ({location}) => {
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token') || ''
  const [isValid, setIsValid] = useState(null)
  const [redirectUrl, setRedirectUrl] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Send a request to the backend to check if the token is valid
        const response = await axios.post(
          `http://localhost:8082/auth/checkTokenExpiry?token=${token}`
        )

        if (response.data.statusType === 'ACCEPTED' && response.data.status) {
          setIsValid(true)
          setRedirectUrl(response.data.data)
          console.log(response.data.data)
        } else {
          setIsValid(false)
        }
      } catch (error) {
        setIsValid(false)
      }
    }

    checkTokenValidity()
  }, [token])

  // useEffect(() => {
  //   // Redirect to ResetPassword component when isValid becomes true
  //   if (isValid === true) {
  //     history.push('/auth/reset-password') // Replace with the actual path
  //   }
  // }, [isValid, history])

  useEffect(() => {
    // Redirect to ResetPassword component when isValid becomes true
    if (isValid === true) {
      history.push(`/auth/reset-password?token=${token}`) // Pass token as a query parameter
    }
  }, [isValid, history, token])

  return (
    <div>
      {isValid === null && <p>Validating token...</p>}
      {isValid === true && redirectUrl && (
        <p>Token is valid. Redirecting to reset password page...</p>
      )}
      {/* {isValid === false && <p>Token is invalid or expired. Please request a new link.</p>} */}
      {isValid === false && <ForgetpasswordError />}
    </div>
  )
}

export default TokenValidation
