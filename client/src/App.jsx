// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Landing from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Chat from "./pages/ChatPage";

function LandingWrapper() {
  const navigate = useNavigate();

  return (
    <Landing
      onNavigate={() => navigate("/login")}   // Only one button: "Get Started" → Login
    />
  );
}

function LoginWrapper() {
  const navigate = useNavigate();

  return (
    <Login
      onLoginSuccess={() => navigate("/chat")}   // Success → go to Chat
      onBack={() => navigate("/")}               // Optional back button
    />
  );
}

function ChatWrapper() {
  const navigate = useNavigate();

  return (
    <Chat
      onLogout={() => {
        // Clear any session/token if needed
        localStorage.clear();   // or remove specific items
        navigate("/");
      }}
    />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/chat" element={<ChatWrapper />} />
        
        {/* Optional: redirect any unknown route back to home */}
        <Route path="*" element={<LandingWrapper />} />
      </Routes>
    </Router>
  );
}