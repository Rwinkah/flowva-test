import styles from "../../styles/onboarding.module.css";

export default function Step0({ nextStep }: { nextStep: () => void }) {
	return (
		<div className={`${styles["step"]} ${styles["active"]}`} key="step0">
			<div className={styles["welcome-content"]}>
				<h1>Welcome to Flowva</h1>
				<p>
					Your smart library for organizing tools, tracking usage, and turning
					productivity into rewards. Let's set up your digital library in 2
					minutes.
				</p>
			</div>
			<div className={styles["btn-group"]}>
				<button className={styles["btn"]} onClick={nextStep}>
					Let's Go
				</button>
			</div>
		</div>
	);
}
