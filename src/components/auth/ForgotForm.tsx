import { useState, useRef } from "react";
import FlowvaLogo from "../logos/Flowva";
import { showMessage } from "../../utils";
import styles from "../../styles/auth.module.css";

type Props = {
	setActiveForm: React.Dispatch<React.SetStateAction<string>>;
};

export default function ForgotForm({ setActiveForm }: Props) {
	const messageElement = useRef<HTMLDivElement | null>(null); // Using useRef to get the element
	const [email, setEmail] = useState<string>("");

	function submitForm() {
		if (!messageElement.current) {
			alert("message element missing, error loading page");
			return;
		}
		const emailInput = document.getElementById(
			"forgot-email"
		) as HTMLInputElement | null;

		if (emailInput && emailInput.value.length < 1) {
			emailInput.reportValidity();
			return;
		}

		showMessage(messageElement.current, "Sending reset link...", "success");
		setTimeout(() => {
			showMessage(
				messageElement.current!,
				"Reset link sent to your email",
				"success"
			);
		}, 1500);
	}

	return (
		<form id="forgot-form" className={styles["animate-form"]}>
			<div className={styles["logo"]}>
				<FlowvaLogo />
				Flowva
			</div>
			<div className={styles["welcome"]}>Reset your password</div>
			<div ref={messageElement} className={styles["form-message"]}></div>
			{/* Attach the ref here */}
			<div className={styles["form-group"]}>
				<label htmlFor="forgot-email">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="forgot-email"
					placeholder="you@example.com"
					required
				/>
			</div>
			<button type="submit" onClick={submitForm} className={styles["btn"]}>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
					<polyline points="22,6 12,13 2,6"></polyline>
				</svg>
				Send reset link
			</button>
			<div className={styles["form-footer"]}>
				Remember your password?{" "}
				<button
					onClick={() => setActiveForm("signin")}
					className={styles["btn-plain"]}
					id="show-signin-from-forgot">
					Sign in
				</button>
			</div>
		</form>
	);
}
