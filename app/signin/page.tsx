'use Client'

import { SignupButton } from "../components/ui_parts/Buttons";
import { LoginButton } from "../components/ui_parts/Buttons";
import { LogoutButton } from "../components/ui_parts/Buttons"
//import styles from "../../app/styles/signin.module.css"
import UserIcon from "../components/ui_parts/UserIcon";
import UserStatus from "../components/ui_parts/UserStatus";
import getCurrentUser from '@/app/actions/getCurrentUser'



export default async function SignIn() {
    const currentUser = await getCurrentUser();
    return (
        <>
            <UserStatus/>
            <div>
                <UserIcon currentUser={currentUser}/>
            </div>
            <h1>歩け！聖地巡礼♪</h1>
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
        </>
    )
}
