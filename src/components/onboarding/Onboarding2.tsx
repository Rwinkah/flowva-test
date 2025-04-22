import { OnboardingFormData } from "../../types";
import styles from "../../styles/onboarding.module.css";
interface Step2Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
}

export default function Step2({ formData, setFormData, nextStep }: Step2Props) {
	const countries: string[] = [
		"United States",
		"United Kingdom",
		"Canada",
		"Australia",
		"India",
		"Germany",
		"France",
		"Japan",
		"Brazil",
		"Nigeria",
	];
	return (
		<div className={`${styles["step"]}  ${styles["active"]}`} key="step2">
			<h2>Where Are You Based?</h2>
			<p>
				This helps us personalize tool suggestions, currencies, and rewards for
				you.
			</p>

			<div className={styles["form-group"]}>
				<label htmlFor="country">Country</label>
				<select
					id="country"
					value={formData.country}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, country: e.target.value }))
					}>
					<option value="">Select your country</option>
					{countries.map((code) => (
						<option value={code} key={code}>
							{code}
						</option>
					))}
				</select>
			</div>

			<div className={styles["btn-group"]}>
				<button className={styles["btn"]} onClick={nextStep}>
					Continue
				</button>
				<button className={styles["btn-skip"]} onClick={nextStep}>
					Skip this step
				</button>
			</div>
		</div>
	);
}
