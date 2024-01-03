import { auth } from "../utils/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR, supportedLanguages } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice"
import { useRef } from "react";
import { clearMoviesFromStore } from "../utils/movieSlice";




const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const dispatch = useDispatch();
    const lang = useRef(null)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                navigate("/browse");


            } else {
                // User is signed out
                dispatch(removeUser());
                dispatch(clearMoviesFromStore())
                navigate("/");

            }
        });
        return () => unsubscribe();
    }, [])




    const handleSignOut = () => {

        signOut(auth).then(() => {
            // Sign-out successful.

        }).catch((error) => {
            navigate("/error");
        });
    }

    const handleLanguageChange = () => {
        dispatch(changeLanguage(lang.current.value))
    }

    const handleGptClick = () => {
        dispatch(toggleGptSearchView())
    }


    return (
        <div className="flex flex-col md:flex-row  absolute px-8 py-2 bg-gradient-to-b from-black z-40 w-screen  justify-between">
            <img className=" mx-auto  md:mx-0 w-44 " src={LOGO} alt="logo" />

            {user && (
                <div className="justify-between flex p-4 ">
                    {showGptSearch && (<select className="p-2 bg-gray-900 text-white m-2" ref={lang} onChange={handleLanguageChange} >
                        {
                            supportedLanguages.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
                        }
                    </select>)}
                    <button
                        className=" text-white py-1 px-4 mx-2 font-medium bg-red-700 rounded-md hover:bg-opacity-80 "
                        onClick={handleGptClick}
                    >   {showGptSearch ? "Back to browse" : "GPT Search"}</button>
                    <img className="hidden md:block h-12 w-12 " src={USER_AVATAR} alt="user-icon" />
                    <button className=" p-2 font-bold text-white" onClick={handleSignOut}>(sign out)</button>
                </div>
            )}

        </div>
    )
}

export default Header