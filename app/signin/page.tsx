'use Client'

import { LoginButton, LogoutButton, SignupButton } from "../components/ui_parts/Buttons";
import { SigninTitle } from "../components/ui_parts/SigninTitle";
import UserIcon from "../components/ui_parts/UserIcon";
import UserStatus from "../components/ui_parts/UserStatus";
import getCurrentUser from '@/app/actions/getCurrentUser'
import styles from "@/app/statics/styles/signin.module.css";


export default async function SignIn() {
    const currentUser = await getCurrentUser();
    return (
        <>
            <div className={styles.bg}>
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
        </>
    )
}
