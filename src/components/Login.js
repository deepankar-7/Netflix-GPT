import { checkValidation } from "../utils/validate";
import Header from "./Header";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { BACKGROUND_IMAGE, USER_AVATAR, GOKU } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";




const Login = () => {

    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //validate email and password before creating user on firebase

        const message = checkValidation(email.current.value, password.current.value, fullName);
        setErrorMessage(message);


        //sign up form logic

        if (message) return // if there is an error message dont create user since validation failed

        if (!isSignInForm) {
            //login for sign up 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user)


                    updateProfile(auth.currentUser, {
                        displayName: fullName.current.value, photoURL: GOKU
                    }).then(() => {
                        console.log(user)
                        const { uid, email, password, photoURL, displayName } = auth.currentUser;
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                password: password,
                                photoURL: photoURL,
                                displayName: displayName
                            })
                        )
                        navigate("/browse")

                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });
                })
                .catch((error) => {

                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        }

        else {
            //sign in form logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });

        }

    }





    return (
        <div>
            <Header />

            <div className="absolute">
                <img
                    className=" h-full object-cover md:w-screen "
                    src={BACKGROUND_IMAGE}
                    alt="background-img"></img>
            </div>
            <form
                onSubmit={e => e.preventDefault()}
                on className="   w-full md:w-3/12 bg-opacity-80 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-md"
            >
                <h1 className=" font-bold text-2xl  md:text-3xl py-4"  >
                    {isSignInForm ? "Sign In" : "Sign up"}
                </h1>

                {!isSignInForm && (<input ref={fullName} type="text" placeholder="Full Name" className="md:m-4 p-3 md:my-4 my-2 w-11/12 bg-slate-800  rounded-md" />)}

                <input ref={email} type="email" placeholder="Email Address" className="md:m-4 p-3 md:my-4 my-2 w-11/12 bg-slate-800  rounded-md" />

                <input ref={password} type="password" placeholder="Password" className="md:m-4 p-3 md:my-4 my-2 w-11/12 bg-slate-800  rounded-md" />

                <p className=" py-2 mx-4 text-red-700 font-bold text-lg">{errorMessage}</p>

                <button
                    className=" m-4 p-4 bg-red-700 w-11/12 rounded-md"
                    onClick={handleButtonClick}
                >{isSignInForm ? "Sign In" : "Sign up"}</button>

                <p className="mx-4 my-5 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now" : "Already registered?Sign In"}</p>
            </form>



        </div>
    );
}

export default Login