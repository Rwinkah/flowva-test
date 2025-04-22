import { useEffect, useRef, useState } from "react";
import FlowvaLogo from "../logos/Flowva";
import GoogleIcon from "../logos/GoogleIcon";
import SignupIcon from "../logos/SignupIcon";
import { googleLogin, showMessage } from "../../utils";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../../styles/auth.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
	setActiveForm: React.Dispatch<React.SetStateAction<string>>;
};

export default function SignupForm({ setActiveForm }: Props) {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [hidePassword, setHidePassword] = useState<boolean>(false);
	const [hidePasswordConfirm, setHidePasswordConfirm] =
		useState<boolean>(false);
	const [strength, setStrength] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const [passwordConfirm, setPasswordConfirm] = useState<string>("");

	const messageRef = useRef<HTMLDivElement>(null);

	const loginWithGoogle = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			console.log("Google login successful:", tokenResponse);
		},
		onError: () => {
			console.error("Google login failed");
		},
	});

	const passwordStrength = () => {
		if (password.length > 0) {
			let score = 0;
			if (password.length >= 8) score++;
			if (/[A-Z]/.test(password)) score++;
			if (/[0-9]/.test(password)) score++;
			if (/[a-z]/.test(password)) score++;

			if (password.length < 6) return "weak";
			if (score <= 2) return "medium";
			return "strong";
		}
		return "";
	};

	useEffect(() => {
		setStrength(passwordStrength());
	}, [password]);

	const passwordToggle = (password: boolean) => {
		if (password) {
			setHidePassword((prev) => !prev);
		} else {
			setHidePasswordConfirm((prev) => !prev);
		}
	};

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (!messageRef.current) {
			console.warn("Message div is missing, page load error");
			return;
		}

		const passwordInput = document.getElementById(
			"signup-password"
		) as HTMLInputElement | null;
		const emailInput = document.getElementById(
			"signup-email"
		) as HTMLInputElement | null;

		const confirmInput = document.getElementById(
			"confirm-password"
		) as HTMLInputElement | null;

		if (passwordInput && passwordInput.value.length < 1) {
			passwordInput.reportValidity();
			return;
		}
		if (confirmInput && confirmInput.value.length < 1) {
			confirmInput.reportValidity();
			return;
		}

		if (emailInput && emailInput.value.length < 1) {
			emailInput.reportValidity();
			return;
		}

		if (password !== passwordConfirm) {
			showMessage(messageRef.current, "Passwords do not match", "error");
			return;
		}

		if (password.length < 8) {
			showMessage(
				messageRef.current,
				"Password must be at least 8 characters",
				"error"
			);
			return;
		}

		showMessage(messageRef.current, "Creating your account...", "success");
		setTimeout(() => {
			messageRef.current &&
				showMessage(
					messageRef.current,
					"Account created successfully! Welcome to Flowva.",
					"success"
				);
		}, 1500);
		setTimeout(() => navigate("/onboard"), 2000);

		return;
	};

	return (
		<form id="signup-form" className={styles["animate-form"]}>
			<div className={styles["logo"]}>
				<FlowvaLogo />
				Flowva
			</div>

			<div className={styles["welcome"]}>Join Flowva today</div>

			<div
				ref={messageRef}
				id="signup-message"
				className={styles["form-message"]}></div>

			<div className={styles["form-group"]}>
				<label htmlFor="signup-email">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="signup-email"
					placeholder="you@example.com"
					required
				/>
			</div>

			<div className={styles["form-group"]}>
				<label htmlFor="signup-password">Password</label>
				<input
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type={hidePassword ? "password" : "text"}
					id="signup-password"
					placeholder="••••••••"
					required
				/>
				<button
					type="button"
					onClick={() => passwordToggle(true)}
					className={styles["password-toggle"]}
					id="toggle-password">
					{hidePassword ? "Show" : "Hide"}
				</button>
				<div className={styles["password-strength"]}>
					<div
						className={`${styles["strength-meter"]} ${styles[strength]}`}
						id="password-meter"></div>
				</div>
				<div
					className={` ${password.length > 0 ? "" : styles["hidden"]} ${
						styles["password-hint"]
					}`}
					id="password-hint">
					Use at least 8 characters with a mix of letters, numbers & symbols
				</div>
			</div>

			<div className={styles["form-group"]}>
				<label htmlFor="confirm-password">Confirm Password</label>
				<input
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					type={`${hidePasswordConfirm ? "password" : "text"}`}
					id="confirm-password"
					placeholder="••••••••"
					required
				/>
				<button
					type="button"
					onClick={() => passwordToggle(false)}
					className={styles["password-toggle"]}
					id="toggle-password-confirm">
					{hidePasswordConfirm ? "Show" : "Hide"}
				</button>
			</div>

			<button type="submit" onClick={submitForm} className={styles["btn"]}>
				<SignupIcon />
				Create account
			</button>

			<div className={styles["divider"]}>or continue with</div>

			<button
				onClick={() => googleLogin(messageRef.current, loginWithGoogle)}
				type="button"
				className={`${styles["btn"]} ${styles["btn-secondary"]}`}
				id="google-signup">
				<GoogleIcon />
				Google
			</button>

			<div className={styles["form-footer"]}>
				Already have an account?{" "}
				<button
					type="button"
					className={styles["btn-plain"]}
					onClick={() => setActiveForm("signin")}>
					Sign in
				</button>
			</div>
		</form>
	);
}
