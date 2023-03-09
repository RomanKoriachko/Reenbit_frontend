import CharacterPage from '../../pages/CharacterPage/CharacterPage'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { Routes, Route } from 'react-router-dom'
import Main from '../../container/Main/Main'
import './LoginForm.css'

type Props = {}

const LoginForm = (props: Props) => {
    const raw = localStorage.getItem('userData')
    let localUserData = {}
    if (raw) {
        localUserData = JSON.parse(raw)
    }

    const [user, setUser] = useState<Object | null>(localUserData)

    function handleCallbackResponse(response: CredentialResponse) {
        if (response.credential !== undefined) {
            const userObject: Object = jwt_decode(response.credential)
            localStorage.setItem('userData', JSON.stringify(userObject))
            setUser(userObject)
        }
    }

    console.log(user)
    console.log(localUserData)

    const onSignOutClick = () => {
        localStorage.setItem('userData', JSON.stringify(null))
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
