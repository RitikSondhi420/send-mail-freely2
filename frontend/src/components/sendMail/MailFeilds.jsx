import React from "react";
import { Mail, Phone, Clock, Users, Loader2 } from 'lucide-react';



 export const MessageFields = ({ formData, setFormData }) => (
    <>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Subject
        </label>
        <input
          type="text"
          placeholder="Enter message subject"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          Message
        </label>
        <textarea
          placeholder="Type your message here..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors resize-y min-h-[120px]"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
    </>
  );
  
  // Settings Row Component
  export const SettingsRow = ({ formData, setFormData, showLimitDropdown, setShowLimitDropdown }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SendingLimit 
        formData={formData} 
        setFormData={setFormData}
        showLimitDropdown={showLimitDropdown}
        setShowLimitDropdown={setShowLimitDropdown}
      />
      <TimeInterval 
        formData={formData} 
        setFormData={setFormData} 
      />
    </div>
  );
  
  // Sending Limit Component
  export const SendingLimit = ({ formData, setFormData, showLimitDropdown, setShowLimitDropdown }) => (
    <div className="space-y-2">
      <label className="inline-flex items-center text-sm font-semibold text-gray-700">
        <Users className="w-4 h-4 mr-2" />
        Sending Limit
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Set limit"
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
          value={formData.limit}
          onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLimitDropdown(!showLimitDropdown)}
            className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
          >
            Presets
          </button>
          {showLimitDropdown && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {[100, 200, 300].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm first:rounded-t-lg last:rounded-b-lg"
                  onClick={() => {
                    setFormData({ ...formData, limit: value });
                    setShowLimitDropdown(false);
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Time Interval Component
  export const TimeInterval = ({ formData, setFormData }) => (
    <div className="space-y-2">
      <label className="inline-flex items-center text-sm font-semibold text-gray-700">
        <Clock className="w-4 h-4 mr-2" />
        Time Interval (s)
      </label>
      <input
        type="number"
        placeholder="Set interval"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-colors"
        value={formData.interval}
        onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
      />
    </div>
  );
  
  // Submit Button Component
  export const SubmitButton = ({ mode, isSubmitting, recipients, handleSubmit }) => (
    <div className="border-t p-6">
      <button 
        type="submit"
        className={`w-full px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center ${
          isSubmitting || recipients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting || recipients.length === 0}
        onClick={handleSubmit}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          `Send ${mode === 'email' ? 'Email' : 'SMS'}`
        )}
      </button>
    </div>
  );