import { OnboardingFormData } from "../../types";
import styles from "../../styles/onboarding.module.css";

interface Step1Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
	showOtherInput: boolean;
	setShowOtherInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Step1({
	formData,
	setFormData,
	nextStep,
	showOtherInput,
	setShowOtherInput,
}: Step1Props) {
	return (
		<div className={`${styles["step"]} ${styles["active"]}`} key="step1">
			<h2>About You</h2>
			<p>Help us tailor your library by telling us a bit about yourself.</p>

			<div className={styles["form-group"]}>
				<label>
					What best describes you?{" "}
					<span className={styles["warning"]} id="role-warning">
						Please select an option
					</span>
				</label>
				<div className={styles["radio-group"]}>
					{["Freelancer", "Solo entrepreneur", "Small team", "Creator"].map(
						(role) => (
							<label className={styles["radio-item"]} key={role}>
								<input
									type="radio"
									name="role"
									value={role}
									checked={formData.role === role}
									onChange={() =>
										setFormData((prev: OnboardingFormData) => ({
											...prev,
											role,
										}))
									}
								/>{" "}
								{role}
							</label>
						)
					)}
				</div>
			</div>

			<div className={styles["form-group"]}>
				<label>
					What kind of work do you do?{" "}
					<span className={styles["warning"]} id="work-warning">
						Please select at least one option
					</span>
				</label>
				<div className={styles["checkbox-group"]}>
					{["Design", "Development", "Writing", "Marketing", "Other"].map(
						(work) => (
							<label className={styles["checkbox-item"]} key={work}>
								<input
									type="checkbox"
									value={work}
									checked={formData.work.includes(work)}
									onChange={() => {
										if (work === "Other") {
											// Toggle the "showOtherInput" state
											setShowOtherInput((prev) => !prev);

											// Trigger the default action (add/remove "Other" from the work array)
											setFormData((prev) => ({
												...prev,
												work: prev.work.includes(work)
													? prev.work.filter((workItem) => workItem !== work)
													: [...prev.work, work],
											}));
										} else {
											// Default action for other checkboxes
											setFormData((prev) => ({
												...prev,
												work: prev.work.includes(work)
													? prev.work.filter((workItem) => workItem !== work)
													: [...prev.work, work],
											}));
										}
									}}
								/>{" "}
								{work}
								{work === "Other" && showOtherInput && (
									<input
										type="text"
										style={{ display: "inline-block" }}
										placeholder="Please specify"
										value={formData.workOther}
										onChange={(e) =>
											setFormData((prev: OnboardingFormData) => ({
												...prev,
												workOther: e.target.value,
											}))
										}
									/>
								)}
							</label>
						)
					)}
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
