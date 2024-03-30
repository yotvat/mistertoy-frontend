import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { login, signup } from "../store/actions/user.actions"
import { showErrorMsg } from "../services/event-bus.service"


export function LoginSignup() {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try {
            await login(credentials)
            console.log('loggedInSuccessfully');
        } catch (err) {
            showErrorMsg('big balagan', err)
        }
    }

    async function _signup(credentials) {
        try {
            await signup(credentials)
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="login-actions">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        <span>Already a member <button>Login</button></span> :
                        <span>New user? <button>Sign up here!</button></span>
                    }
                </a >
            </div>
        </div >
    )
}