import React from "react";
import LoginGate from "../components/auth/LoginGate";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  return <LoginGate onLogin={login} loading={loading} />;
}
