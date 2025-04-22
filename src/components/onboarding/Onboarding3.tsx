import { OnboardingFormData } from "../../types";
import styles from "../../styles/onboarding.module.css";

interface Step2Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
}

const toolIcons: Record<string, string> = {
	Notion: "📝",
	Trello: "📋",
	Slack: "💬",
	ClickUp: "✅",
	Canva: "🎨",
	Zapier: "⚡",
	Stripe: "💳",
	Figma: "✏️",
	Calendly: "📅",
};

export default function Step3({ formData, setFormData, nextStep }: Step2Props) {
	return (
		<div className={`${styles["step"]} ${styles["active"]}`} key="step3">
			<h2>Your Tool Stack</h2>
			<p>
				Which tools are part of your workflow? We&apos;ll pre-load and organize
				them in your library{" "}
			</p>

			<div className={styles["tool-grid"]}>
				{Object.keys(toolIcons).map((tool) => (
					<div
						className={`${styles["tool-item"]} ${
							formData.tools?.includes(tool) ? styles["selected"] : ""
						}`}
						key={tool}
						onClick={() =>
							setFormData((prev: OnboardingFormData) => ({
								...prev,
								tools: prev.tools?.includes(tool)
									? prev.tools.filter((t) => t !== tool)
									: [...(prev.tools || []), tool],
							}))
						}>
						<span className={styles["icon"]}>{toolIcons[tool]}</span>
						<span>{tool}</span>
					</div>
				))}
			</div>

			<p style={{ fontSize: "0.9rem", color: "#666" }}>
				You can always add more tools later in your library settings.
			</p>

			<div className={styles["btn-group"]}>
				<button className={styles["btn"]} onClick={nextStep}>
					Continue
				</button>
				<button
					className={styles["btn-skip"]}
					style={{
						fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
					}}
					onClick={nextStep}>
					Skip – I&apos;ll add them later
				</button>
			</div>
		</div>
	);
}
