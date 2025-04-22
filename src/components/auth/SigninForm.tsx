import { useRef, useState } from "react";
import FlowvaLogo from "../logos/Flowva";
import SigninIcon from "../logos/SigninIcon";
import GoogleIcon from "../logos/GoogleIcon";
import { googleLogin, showMessage } from "../../utils";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/auth.module.css";

type Props = {
	setActiveForm: React.Dispatch<React.SetStateAction<string>>;
};

export default function SigninForm({ setActiveForm }: Props) {
	const navigate = useNavigate();

	const [hidePassword, setHidePassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const messageRef = useRef<HTMLDivElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const passwordToggle = () => {
		setHidePassword((prev) => !prev);
	};

	const loginWithGoogle = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			console.log("Google login successful:", tokenResponse);
		},
		onError: () => {
			console.error("Google login failed");
		},
	});

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (!messageRef.current) {
			console.warn("form-message element does not exist");
			return;
		}

		if (emailRef.current && emailRef.current.value.length < 1) {
			emailRef.current.reportValidity();
			return;
		}

		if (passwordRef.current && passwordRef.current.value.length < 1) {
			passwordRef.current.reportValidity();
			return;
		}

		showMessage(messageRef.current, "Signing in...", "success");

		setTimeout(() => {
			showMessage(
				messageRef.current!,
				"Welcome back! Redirecting...",
				"success"
			);
		}, 1500);
	};

	return (
		<form
			id="signin-form"
			className={styles["animate-form"]}
			onSubmit={submitForm}>
			<div className={styles["logo"]}>
				<FlowvaLogo />
				Flowva
			</div>
			<div className={styles["welcome"]}>Welcome back</div>
			<div
				ref={messageRef}
				id="signin-message"
				className={styles["form-message"]}></div>

			<div className={styles["form-group"]}>
				<label htmlFor="email">Email</label>
				<input
					ref={emailRef}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="email"
					placeholder="you@example.com"
					required
				/>
			</div>

			<div className={styles["form-group"]}>
				<label htmlFor="password">Password</label>
				<input
					ref={passwordRef}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type={hidePassword ? "password" : "text"}
					id="password"
					placeholder="••••••••"
					required
				/>
				<button
					type="button"
					onClick={passwordToggle}
					className={styles["password-toggle"]}
					id="toggle-password">
					{hidePassword ? "Show" : "Hide"}
				</button>
			</div>

			<div className={styles["forgot-password"]}>
				<button
					type="button"
					className={styles["btn-hover"]}
					style={{ backgroundColor: "transparent", border: "none" }}
					onClick={() => setActiveForm("forgot")}>
					Forgot password?
				</button>
			</div>

			<button type="submit" className={styles["btn"]}>
				<SigninIcon />
				Sign in
			</button>

			<div className={styles["divider"]}>or continue with</div>

			<button
				onClick={() => googleLogin(messageRef.current, loginWithGoogle)}
				type="button"
				className={`${styles.btn} ${styles["btn-secondary"]}`}
				id="google-signup">
				<GoogleIcon />
				Google
			</button>

			<div className={styles["form-footer"]}>
				Don't have an account?{" "}
				<button
					className={styles["btn-plain"]}
					type="button"
					onClick={() => setActiveForm("signup")}>
					Sign up
				</button>
			</div>
		</form>
	);
}
