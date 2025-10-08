import ReactDom from "react-dom";

export default function Modal(props) {
    const { setShowModal } = props

    function handleCloseModal() {
        setShowModal(false)
    }

    return ReactDom.createPortal(
        <div className="modal-container">
            <button onClick={handleCloseModal} className="modal-underlay"></button>
            <div className="modal-content">
                {/* <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : "Login"}</h2>
                <p>{isRegistration ? 'Create an account!' : 'Sign into your account!'}</p>
                {error && (
                    <p><i class="fa fa-exclamation-circle" aria-hidden="true" style={{ color: "red" }}></i> {error}</p>
                )}
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email" />
                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="*********" />

                <button onClick={handleAuthentication}><p>{isAuthenticating ? 'Authenticating...' : 'Submit'}</p></button>
                <hr />
                <div className="register-content">
                    <p>{isRegistration ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                    <button onClick={() => { setIsRegistration(!isRegistration) }}><p>{isRegistration ? 'Sign In' : "Sign Up"}</p></button>
                </div> */}
            </div>
        </div>,
        document.getElementById('portal')
    )
}