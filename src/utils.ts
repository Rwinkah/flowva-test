/*
SHARED FUNCTIONS ACCROSS MULTIPLE COMPONENTS
*/

export function showMessage(element: HTMLElement, text: string, type: string) {
	element.textContent = text;
	element.className = `form-message ${type}-message`;
	element.style.display = "block";

	// Hide message after 5 seconds
	setTimeout(() => {
		element.style.display = "none";
	}, 5000);
}

export const handleGoogleRedirect = (messageElement: any) => {
	if (!messageElement) {
		return;
	}
	showMessage(messageElement, "Redirecting to Google...", "success");
};

export const googleLogin = (messageElement: any, loginWithGoogle: any) => {
	handleGoogleRedirect(messageElement);
	loginWithGoogle();
};
