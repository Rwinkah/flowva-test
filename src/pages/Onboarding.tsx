import { useState, useEffect } from "react";
import styles from "../styles/onboarding.module.css";
import Step0 from "../components/onboarding/Onboarding0";
import { OnboardingFormData } from "../types";
import Step1 from "../components/onboarding/Onboarding1";
import Step2 from "../components/onboarding/Onboarding2";
import Step3 from "../components/onboarding/Onboarding3";
import Step4 from "../components/onboarding/Onboarding4";
import Step5 from "../components/onboarding/Onboarding5";

export default function FlowvaOnboarding() {
	useEffect(() => {
		document.title = `Onboarding | Flowva`;
	}, []);
	const totalSteps = 5;
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<OnboardingFormData>({
		role: "",
		work: [],
		workOther: "",
		country: "",
		goals: [],
	});
	const [showOtherInput, setShowOtherInput] = useState(false);
	const [popupVisible, setPopupVisible] = useState(false);

	useEffect(() => {
		const progress = document.getElementById("progress");
		if (progress) progress.style.width = `${(currentStep / totalSteps) * 100}%`;
	}, [currentStep]);

	const nextStep = () => {
		const roleWarning = document.getElementById("role-warning");
		const workWarning = document.getElementById("work-warning");
		const goalWarning = document.getElementById("goals-warning");

		const warningsObj = {
			role: roleWarning,
			work: workWarning,
			goals: goalWarning,
		};

		if (currentStep === 1) {
			let isValid = true;

			if (!formData.role) {
				if (warningsObj.role) warningsObj.role.style.display = "block";
				isValid = false;
			} else if (warningsObj.role) {
				warningsObj.role.style.display = "none";
			}

			if (formData.work.length === 0) {
				if (warningsObj.work) warningsObj.work.style.display = "block";
				isValid = false;
			} else if (warningsObj.work) {
				warningsObj.work.style.display = "none";
			}

			if (!isValid) return;
		}

		if (currentStep === 4) {
			if (formData.goals.length === 0) {
				if (warningsObj.goals) warningsObj.goals.style.display = "block";
				return; // Exit if validation fails
			} else if (warningsObj.goals) {
				warningsObj.goals.style.display = "none";
			}
		}

		setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
	};

	const finishOnboarding = () => {
		setPopupVisible(true);
		console.log("Form submission:", {
			...formData,
		});
	};

	const steps = [
		// Step 0
		<Step0 nextStep={nextStep} />,
		<Step1
			formData={formData}
			setFormData={setFormData}
			showOtherInput={showOtherInput}
			nextStep={nextStep}
			setShowOtherInput={setShowOtherInput}
		/>,

		// Step 2
		<Step2 nextStep={nextStep} formData={formData} setFormData={setFormData} />,

		// Step 3
		<Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} />,
		<Step4 formData={formData} setFormData={setFormData} nextStep={nextStep} />,
		// Step 4
		// Step 5
		<Step5 finishOnboarding={finishOnboarding} />,
	];

	return (
		<div className={styles["onboarding"]}>
			{" "}
			<div className={styles["container"]}>
				<div className={styles["progress-bar"]}>
					<div className={styles["progress"]} id="progress"></div>
				</div>

				{steps[currentStep]}

				{popupVisible && (
					<>
						<div className={`${styles["overlay"]} ${styles["active"]}`}></div>
						<div
							className={`${styles["completion-popup"]} ${styles["active"]}`}>
							<h2>Onboarding Complete!</h2>
							<p>Taking you to your dashboard now.</p>
							<button
								className={styles["btn"]}
								onClick={() => setPopupVisible(false)}>
								OK
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
