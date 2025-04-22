import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import styles from "../styles/auth.module.css";

import SignupForm from "../components/auth/SignupForm";
import SigninForm from "../components/auth/SigninForm";
import ForgotForm from "../components/auth/ForgotForm";

export default function Flowva() {
	const [activeForm, setActiveForm] = useState("signin");
	useEffect(() => {
		const titles: Record<string, string> = {
			signin: "Sign in",
			signup: "Sign up",
			forgot: "Forgot Password",
		};

		document.title = `${titles[activeForm] || ""} | Flowva`;
	}, [activeForm]);

	return (
		<div className={styles.auth}>
			<GoogleOAuthProvider
				clientId="1234567890-abcdefghijklmnopqrstuvwxyz1234567890.apps.googleusercontent.com
">
				<div className={styles.container}>
					{activeForm === "signin" && (
						<SigninForm setActiveForm={setActiveForm} />
					)}
					{activeForm === "signup" && (
						<SignupForm setActiveForm={setActiveForm} />
					)}
					{activeForm === "forgot" && (
						<ForgotForm setActiveForm={setActiveForm} />
					)}
				</div>
			</GoogleOAuthProvider>
		</div>
	);
}
