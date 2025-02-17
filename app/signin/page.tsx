'use Client'



import { LoginButton, LogoutButton, SignupButton } from "../components/signIn/signInButtons";
import SigninFooter from "../components/ui_parts/SigninFooter";
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
                        <div className={styles.userIcon}>
                            <UserIcon currentUser={currentUser}/>
                        </div>
                    </div>
                    <SigninTitle/>
                    {currentUser ? (
                        <div className={styles.signinButtons}>
                            <LogoutButton/>
                        </div>
                    ): (
                        <div className={styles.signinButtons}>
                            <SignupButton/>
                            <LoginButton/>
                        </div>
                    )}
                    {/* <div className={styles.footer}>
                        <SigninFooter/>
                    </div>  */}
                </div>
                <div className={styles.hooter}>
                    <SigninFooter/>
                </div>
            </div>
        </>
    )
}
