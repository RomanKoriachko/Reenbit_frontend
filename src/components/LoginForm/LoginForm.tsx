import CharacterPage from '../../pages/CharacterPage/CharacterPage'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { Routes, Route } from 'react-router-dom'
import Main from '../../container/Main/Main'
import './LoginForm.css'

type Props = {}

const LoginForm = (props: Props) => {
    const [user, setUser] = useState<Object | null>(null)

    function handleCallbackResponse(response: CredentialResponse) {
        console.log(response)
        if (response.credential !== undefined) {
            const userObject: Object = jwt_decode(response.credential)
            setUser(userObject)
        }
    }

    const onSignOutClick = () => {
        setUser(null)
    }

    return (
        <>
            {user === null ? (
                <div className="login-btn">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleCallbackResponse(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed')
                        }}
                    />
                </div>
            ) : (
                <div>
                    <button className="sign-out-btn" onClick={onSignOutClick}>
                        Sign Out
                    </button>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route
                            path="/:characterId"
                            element={<CharacterPage />}
                        />
                    </Routes>
                </div>
            )}
        </>
    )
}

export default LoginForm
