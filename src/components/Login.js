import { useRef, useState } from "react";
import { isCorrect } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import Header from "./Header";
import { LOGO } from "../utils/constants";

const Login = () => 
{
    const [isSignInForm , setisSignInForm] = useState(true);

    const [validMessage , setvalidMessage] = useState(null);

    const dispatch = useDispatch();

    const email = useRef(null);
    const pass = useRef(null);
    const name = useRef(null);

    const toggleSignUpForm = () => { setisSignInForm(!isSignInForm); }

    const formValidator = () =>
    {
        const isValid = isCorrect(email.current.value , pass.current.value);
        setvalidMessage(isValid);
        if(isValid){ return; }

        if(!isSignInForm)
        {
            createUserWithEmailAndPassword(auth, email.current.value, pass.current.value)
            .then((userCredential) => 
            {
                const user = userCredential.user;

                updateProfile(user , 
                {
                    displayName: name.current.value, photoURL: "https://www.google.com/imgres?q=random%20photography&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Frandom-best-photo_865967-77896.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-photo%2Frandom-best-photo_49046664.htm&docid=ULBp5lkVMPlRuM&tbnid=HBDzNod7x-SuuM&vet=12ahUKEwjCm4rE982GAxV4oGMGHe7yBVsQM3oECGgQAA..i&w=626&h=417&hcb=2&ved=2ahUKEwjCm4rE982GAxV4oGMGHe7yBVsQM3oECGgQAA"
                })
                .then(() => 
                { 
                    const { uid , email , displayName } = auth.currentUser;
                    dispatch( addUser({uid : uid, email : email, displayName : displayName}) );
                })
                .catch((error) => { setvalidMessage(error); })

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setvalidMessage(errorCode + " - " + errorMessage);
            });
        }
        else
        {
            signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
            .then((userCredential) => 
            {
                const user = userCredential.user;
            })
            .catch((error) => 
            {
                const errorCode = error.code;
                const errorMessage = error.message;
                setvalidMessage(errorCode + " - " + errorMessage);
            });
        }
    }

    return (
        <div>
            <Header/>
            <div className="relative bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_small.jpg)] bg-cover bg-center h-screen">
                <div className="absolute w-[100%] px-40 py-2 bg-gradient-to-b from-black">
                    <img src={LOGO} alt="logo" 
                    className="w-44"/>
                </div>
                <div className="absolute inset-0 m-auto w-1/2 h-1/2 flex items-center justify-center">
                    <form onSubmit={(e) => e.preventDefault() } className="bg-black opacity-85 flex flex-col text-white rounded-lg h-[550px] w-[450px] mt-10">
                        <h2 className="font-bold text-3xl mx-[70px] my-6">{isSignInForm ? "Sign In" : "Sign Up"}</h2>

                        { !isSignInForm && <input ref={name} type="text" placeholder="Name" className="p-4 my-2 mx-[70px] bg-black border-2 rounded-md"/>}

                        <input type="Email" ref={email} placeholder="Email Address" className="p-4 my-2 mx-[70px] bg-black border-2 rounded-md"/>

                        <input type="Passord" ref={pass} placeholder="Passord" className="p-4 my-2 mx-[70px] bg-black border-2 rounded-md"/>
                        <p className="font-bold py-2 mx-[70px] text-orange-700">{validMessage}</p>
                        <button className="p-2.5 my-2 mx-[70px] bg-red-600 rounded-md" onClick={ formValidator }> {isSignInForm ? "Sign In" : "Sign Up"} </button>

                        <h3 className="my-2 mx-auto">OR</h3>
                        <button className="p-2.5 my-2 mx-[70px] bg-custom-rgb-opacity rounded-md">Use a sign-in code</button>
                        <p className="my-2 mx-[70px]">{!isSignInForm ? "New to Netflix?" : "Have a account?"} <span className="cursor-pointer" onClick={toggleSignUpForm}>{isSignInForm ? "Sign In Now" : "Sign Up Now"}</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;