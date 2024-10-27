

import { LoginButton, LogoutButton, SignupButton } from "../components/ui_parts/Buttons";
import { SigninTitle } from "../components/ui_parts/SigninTitle";
//import styles from "../../app/styles/signin.module.css"
import UserIcon from "../components/ui_parts/UserIcon";
import UserStatus from "../components/ui_parts/UserStatus";
import getCurrentUser from '@/app/actions/getCurrentUser'
import styles from "@/app/statics/styles/signin.module.css";



export default async function SignIn() {
    const currentUser = await getCurrentUser();
    console.log("あああああああああああああああああ");
    return (
        <div className={styles.bg}>
            <div className = {styles.frame}>
                <div className={styles.body}>
                    <div className={styles.user}>
                        <UserStatus/>
                        <UserIcon currentUser={currentUser}/>
                    </div>
                    <SigninTitle/>
                    {currentUser ? (
                        <>
                            <LogoutButton/>
                        </>
                    ): (
                        <>
                            <SignupButton/>
                            <LoginButton/>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
