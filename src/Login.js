import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "./Firebase.js";
import { AuthContext } from "./Auth.js";
import { Link } from 'react-router-dom'

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <div class="box">
            <div class="has-text-centered">
                <h1 class = "is-size-1"><strong>Welcome to Random Weather Rock</strong></h1>
                <h2 class = "is-size-7">of the US and its friendly neighbors.</h2>

            </div>
            <form onSubmit={handleLogin}>
                <div class="field">
                    <label>
                        Email
          <p>
                            <input class="input is-medium" name="email" type="email" placeholder="Email" />
                        </p>
                    </label>
                </div>
                <div class="field">
                    <label>
                        Password
          <p>
                            <input class="input is-medium" name="password" type="password" placeholder="Password" />
                        </p>
                    </label>
                </div>
                <button class="button is-link mr-2" type="submit">Log in</button>
                <Link to="/signup"><button class="button is-link">Sign Up</button></Link>
            </form>
            <div class="box mt-2">
                <img src="https://i.pinimg.com/originals/f4/86/ff/f486ffba4cdc07cc040428fc310e18a1.jpg"></img>
            </div>
        </div>
    );
};

export default withRouter(Login);