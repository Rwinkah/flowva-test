import Auth from "./pages/auth";
import FlowvaOnboarding from "./pages/Onboarding";
import "./styles/index.css";
import { Routes, Route } from "react-router-dom";
function App() {
	return (
		<Routes>
			<Route path="/" element={<Auth />} />
			<Route path="/onboard" element={<FlowvaOnboarding />} />
			<Route path="*" element={<Auth />} />
		</Routes>
	);
}

export default App;
