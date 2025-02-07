'use client'

import { useState } from "react"
import EmailField from "../components/contact/emailField";
import ContentField from "../components/contact/contentField";
import TitleField from "../components/contact/titleField";
import ContactModal from "../components/contact/contactModal";
import styles from "@/app/statics/styles/contact.module.css";
import { ContactBackButton } from "../components/contact/contactButtons";


export default function ContactPage () {
    const [email, setEmail] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isBlank, setIsBlank] = useState<boolean>(false);

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    return (
        <div>
            <div className={styles.contactHeader}>
                <ContactBackButton/>
                <h2>問い合わせ内容を記入してください。</h2>
                <p>{/*あえて何も書いていない*/}</p>
            </div>
            <div className={styles.isBlankWarning}>
            { isBlank && <p>メールアドレス・件名・内容を全て記入してください。</p> }
            </div>
            <div className={styles.emailField}>
                <EmailField
                    email = {email}
                    handleEmail = {handleEmail}
                />
            </div>
            <div className={styles.titleField}>
                <TitleField
                    title = {title}
                    handleTitle = {handleTitle}
                />
            </div>
            <div className={styles.contentField}>
                <ContentField
                    content = {content}
                    handleContent = {handleContent}
                />
            </div>
            <div className={styles.contactModal}>
                <ContactModal
                    email = {email}
                    setEmail = {setEmail}
                    title = {title}
                    setTitle = {setTitle}
                    content = {content}
                    setContent = {setContent}
                    setIsBlank = {setIsBlank}
                />
            </div>
        </div>
    )
}