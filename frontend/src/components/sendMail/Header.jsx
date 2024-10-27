import React from "react";
import { Mail, Phone, Clock, Users, Loader2 } from 'lucide-react';
import { ToggleButtons } from "./ToggleButtons";


export const Header = ({ mode, setMode }) => (
  <div className="border-b p-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">
        Mail Sender - Product
      </h2>
      <ToggleButtons mode={mode} setMode={setMode} />
    </div>
  </div>
);
