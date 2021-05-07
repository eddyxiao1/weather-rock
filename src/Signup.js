import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "./Firebase";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div class="box">
            <div >
                <h1 class="is-size-1"><strong>Sign Up for Random Weather Rock</strong></h1>
            </div>
            <form onSubmit={handleSignUp}>
                <div class="field">
                    <label>
                        Email
          <p><input class="input is-medium" name="email" type="email" placeholder="Email" /></p>
                    </label>
                </div>
                <div class="fied">
                    <label>
                        Password
          <p><input class="input is-medium" name="password" type="password" placeholder="Password" /></p>
                    </label>
                    <button class = "button is-link mt-2" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(SignUp);