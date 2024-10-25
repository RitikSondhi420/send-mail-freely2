// First install react-hook-form:
// npm install react-hook-form

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const EmailSMSSender = () => {
  const [mode, setMode] = useState('email');
  const [isLimitSelectOpen, setIsLimitSelectOpen] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors },
    setValue 
  } = useForm({
    defaultValues: {
      recipients: '',
      subject: '',
      description: '',
      limit: '',
      interval: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Submitted:', { mode, ...data });
    // Here you would typically send the data to your backend
    reset(); // Reset form after submission
  };

  // Validate email addresses
  const validateEmails = (value) => {
    if (mode === 'email') {
      const emails = value.split(',').map(email => email.trim());
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const invalidEmails = emails.filter(email => !emailRegex.test(email));
      if (invalidEmails.length) {
        return `Invalid email(s): ${invalidEmails.join(', ')}`;
      }
    }
    return true;
  };

  // Validate phone numbers
  const validatePhones = (value) => {
    if (mode === 'phone') {
      const phones = value.split(',').map(phone => phone.trim());
      const phoneRegex = /^\+?[\d\s-]{10,}$/; // Basic phone validation
      const invalidPhones = phones.filter(phone => !phoneRegex.test(phone));
      if (invalidPhones.length) {
        return `Invalid phone number(s): ${invalidPhones.join(', ')}`;
      }
    }
    return true;
  };

  return (
    <div className="container mx-auto p-4">
      {/* Mode Selection Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          type="button"
          onClick={() => setMode('email')} 
          className={`px-4 py-2 rounded-md transition-colors ${
            mode === 'email' 
              ? 'bg-blue-600 text-white' 
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Send Mail
        </button>
        <button 
          type="button"
          onClick={() => setMode('phone')} 
          className={`px-4 py-2 rounded-md transition-colors ${
            mode === 'phone' 
              ? 'bg-blue-600 text-white' 
              : 'border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Send Phone Number
        </button>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {mode === 'email' ? 'Send Email' : 'Send SMS'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Recipients Field */}
            <div className="space-y-2">
              <label 
                htmlFor="recipients"
                className="block text-sm font-medium text-gray-700"
              >
                {mode === 'email' ? 'Email Addresses' : 'Phone Numbers'} (comma-separated)
              </label>
              <input
                id="recipients"
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.recipients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={mode === 'email' 
                  ? 'email1@example.com, email2@example.com' 
                  : '1234567890, 0987654321'}
                {...register('recipients', {
                  required: 'This field is required',
                  validate: (value) => validateEmails(value) && validatePhones(value)
                })}
              />
              {errors.recipients && (
                <p className="text-red-500 text-sm mt-1">{errors.recipients.message}</p>
              )}
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label 
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter subject"
                {...register('subject', { 
                  required: 'Subject is required',
                  minLength: {
                    value: 3,
                    message: 'Subject must be at least 3 characters'
                  }
                })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label 
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter description"
                {...register('description', { 
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters'
                  }
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Limit and Interval Fields */}
            <div className="flex space-x-4">
              {/* Sending Limit */}
              <div className="flex-1 space-y-2">
                <label 
                  htmlFor="limit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sending Limit
                </label>
                <div className="flex space-x-2">
                  <input
                    id="limit"
                    type="number"
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.limit ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Custom limit"
                    {...register('limit', {
                      min: {
                        value: 1,
                        message: 'Limit must be at least 1'
                      },
                      max: {
                        value: 1000,
                        message: 'Limit cannot exceed 1000'
                      }
                    })}
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsLimitSelectOpen(!isLimitSelectOpen)}
                      className="w-[120px] px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Select
                    </button>
                    {isLimitSelectOpen && (
                      <div className="absolute right-0 mt-1 w-[120px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        {[100, 200, 300].map((value) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setValue('limit', value);
                              setIsLimitSelectOpen(false);
                            }}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {errors.limit && (
                  <p className="text-red-500 text-sm mt-1">{errors.limit.message}</p>
                )}
              </div>

              {/* Time Interval */}
              <div className="flex-1 space-y-2">
                <label 
                  htmlFor="interval"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time Interval (seconds)
                </label>
                <input
                  id="interval"
                  type="number"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.interval ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Seconds between sends"
                  {...register('interval', {
                    min: {
                      value: 1,
                      message: 'Interval must be at least 1 second'
                    },
                    max: {
                      value: 3600,
                      message: 'Interval cannot exceed 3600 seconds'
                    }
                  })}
                />
                {errors.interval && (
                  <p className="text-red-500 text-sm mt-1">{errors.interval.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailSMSSender;