import { useState } from "react";
import ReactDom from "react-dom";
import { useAuth } from "../context/AuthContext";

export default function Modal(props) {
    const { handleCloseModal } = props
    const { login } = useAuth();
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState(null)

    async function handleAuthentication() {
        if (!email || !email.includes('@') || !password || password.length < 6 || isAuthenticating) {
            setError("Invalid Login Details")
            return;
        }
        setIsAuthenticating(true)
        setError(null)

        try {
            let data;
            if (isRegistration) {
                // Registration
                const response = await fetch('/api/auth/register', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password })
                });
                data = await response.json()
            } else {
                // Login
                const response = await fetch('/api/auth/login', {
                    method: "POST",
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({ username: email, password})
                })
                data = await response.json()
            }
            if (!data.token) {
                throw new Error("Failed to authenticate...")
            }
            login(data.token);
            handleCloseModal();

        } catch (err) {
            console.log(err.message)
            setError(err.message)
        } finally {
            setIsAuthenticating(false)
        }
    }

    return ReactDom.createPortal(
        <div className="modal-container">
            <button onClick={handleCloseModal} className="modal-underlay"></button>
            <div className="modal-content">
                <h2 className="sign-up-text">{isRegistration ? 'Register' : "Login"}</h2>
                <p>{isRegistration ? 'Create an account!' : 'Login to your account!'}</p>
                {error && (
                    <p><i className="fa fa-exclamation-circle" aria-hidden="true" style={{ color: "red" }}></i> {error}</p>
                )}
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email" />
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="*********" />

                <button onClick={handleAuthentication}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
                <hr />
                <div className="register-content">
                    <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                    <button onClick={() => { setIsRegistration(!isRegistration); setError(null) }}>
                        <p>{isRegistration ? 'Login' : "Register"}</p>
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
