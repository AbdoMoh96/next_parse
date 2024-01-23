import React from 'react';
import {Button} from "antd";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import Parse from 'parse';
import swal from "sweetalert";

interface PropTypes {}

const LogoutButton : React.FC<PropTypes> = () => {
    const router = useRouter();

    const logOutUser = async () => {
        try {
            await Parse.User.logOut();
            await signOut({redirect: false});
            router.push("/login");
        } catch (error){
            swal ( "Oops" ,  "Something went wrong!" ,  "error" );
        }
    }


    return <Button style={{
        position: "fixed",
        top: "1rem",
        right : "1rem"
    }} danger onClick={() => logOutUser()}>Logout</Button>
}

export default LogoutButton;