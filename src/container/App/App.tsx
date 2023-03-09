import Main from '../Main/Main'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './reset.css'
import CharacterPage from '../../pages/CharacterPage/CharacterPage'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'

function App() {
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
        <div>
            {user === null ? (
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse)
                        handleCallbackResponse(credentialResponse)
                    }}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                />
            ) : (
                <div>
                    <button onClick={onSignOutClick}>Sign Out</button>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route
                            path="/:characterId"
                            element={<CharacterPage />}
                        />
                    </Routes>
                </div>
            )}
        </div>
    )
}

export default App
