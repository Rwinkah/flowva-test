import styles from "../../styles/onboarding.module.css";

export default function Step5({
	finishOnboarding,
}: {
	finishOnboarding: () => void;
}) {
	return (
		<div className={`${styles["step"]} ${styles["active"]}`} key="step5">
			<h2>Setup Complete!</h2>
			<p>
				Your Flowva library is ready to use. We&apos;ll take you to your
				dashboard now where you can start organizing your tools and tracking
				your productivity.
			</p>
			<div className={styles["btn-group"]}>
				<button className={styles["btn"]} onClick={finishOnboarding}>
					Go to Dashboard
				</button>
			</div>
		</div>
	);
}
