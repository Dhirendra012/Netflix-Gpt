import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";

const Header = () =>
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => 
    {
        const unsubscribe =  onAuthStateChanged(auth , (user) => 
        {
            if(user)
            {
                const { uid , email , displayName } = user;
                dispatch(addUser({uid : uid, email : email, displayName : displayName}));
                navigate("/Browse");
            }
            else
            {
                dispatch(removeUser());
                navigate("/");
            }
        })

        return () => unsubscribe();
    }, [] )

    return (<div></div>);
} 

export default Header;