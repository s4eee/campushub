import React, { useState } from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";
import Field from "../shared/Field";
import { ORGS } from "../../utils/constants";

export default function LoginGate({ onLogin, loading }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const [orgId, setOrgId] = useState(ORGS[0].id);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onLogin({ name: name.trim(), role, orgId: role === "organizer" ? orgId : null });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-bold text-stone-900">CampusHub</span>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h1 className="font-bold text-stone-900 mb-1">Sign in</h1>
          <p className="text-sm text-stone-500 mb-5">
            Use your college email to continue. (Prototype: any name works.)
          </p>

          <Field label="Your name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              className="input"
            />
          </Field>

          <div className="mt-4">
            <span className="text-xs font-medium text-stone-500">I am a</span>
            <div className="grid grid-cols-2 gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex items-center gap-2 justify-center px-3 py-2.5 rounded-lg border text-sm font-medium ${
                  role === "student"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-stone-200 text-stone-600"
                }`}
              >
                <GraduationCap size={16} /> Student
              </button>
              <button
                type="button"
                onClick={() => setRole("organizer")}
                className={`flex items-center gap-2 justify-center px-3 py-2.5 rounded-lg border text-sm font-medium ${
                  role === "organizer"
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-stone-200 text-stone-600"
                }`}
              >
                <ShieldCheck size={16} /> Organizer
              </button>
            </div>
          </div>

          {role === "organizer" && (
            <div className="mt-4">
              <Field label="Organization">
                <select value={orgId} onChange={(e) => setOrgId(e.target.value)} className="input">
                  {ORGS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name.trim() || loading}
            className="w-full mt-5 px-4 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
