import { OnboardingFormData } from "../../types";
import styles from "../../styles/onboarding.module.css";

interface Step4Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
}

export default function Step4({ formData, setFormData, nextStep }: Step4Props) {
	return (
		<div className={`${styles["step"]} ${styles["active"]}`} key="step4">
			<h2>What Do You Want to Track or Improve?</h2>
			<p>This helps us personalize your dashboard and features.</p>

			<div className={styles["form-group"]}>
				<label>
					Select your goals{" "}
					<span className={styles["warning"]} id="goals-warning">
						Please select at least one option
					</span>
				</label>
				<div className={styles["checkbox-group"]}>
					{[
						"Subscription costs",
						"Tool usage & engagement",
						"Unused/duplicate tools",
						"Personalized tool suggestions",
					].map((goal) => (
						<label className={styles["checkbox-item"]} key={goal}>
							<input
								type="checkbox"
								value={goal}
								checked={formData.goals.includes(goal)}
								onChange={() =>
									setFormData((prev) => ({
										...prev,
										goals: prev.goals.includes(goal)
											? prev.goals.filter((t) => t !== goal)
											: [...prev.goals, goal],
									}))
								}
							/>
							{goal}
						</label>
					))}
				</div>
			</div>

			<div className={styles["btn-group"]}>
				<button className={styles["btn"]} onClick={nextStep}>
					Continue
				</button>
			</div>
		</div>
	);
}
