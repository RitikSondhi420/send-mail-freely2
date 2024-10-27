import { Users } from "lucide-react";
import React from "react";

export const RecipientsField = ({
  mode,
  formData,
  handleRecipientsChange,
  recipients,
}) => (
  <div className="space-y-2">
    <label className="inline-flex items-center text-sm font-semibold text-gray-700">
      <Users className="w-4 h-4 mr-2" />
      Recipients
    </label>
    <div className="relative">
      <textarea
        value={formData.recipientsText}
        onChange={handleRecipientsChange}
        placeholder={`Enter ${
          mode === "email" ? "email addresses" : "phone numbers"
        } (separated by commas or new lines)`}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors resize-y min-h-[100px]"
      />
      {recipients.length > 0 && (
        <div className="mt-2 text-sm text-gray-500">
          {recipients.length} valid{" "}
          {mode === "email" ? "email(s)" : "phone number(s)"} found
        </div>
      )}
    </div>
  </div>
);
