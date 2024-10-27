import React from "react";
import { Mail, Phone, Clock, Users, Loader2 } from 'lucide-react';


export const ToggleButtons = ({ mode, setMode }) => (
  <div className="flex gap-2">
    <button
      onClick={() => setMode("email")}
      className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
        mode === "email"
          ? "bg-black text-white border-black"
          : "border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Mail className="w-4 h-4 mr-2" />
      Email
    </button>
    <button
      onClick={() => setMode("phone")}
      className={`inline-flex items-center px-4 py-2 rounded-lg border transition-colors ${
        mode === "phone"
          ? "bg-black text-white border-black"
          : "border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Phone className="w-4 h-4 mr-2" />
      SMS
    </button>
  </div>
);
