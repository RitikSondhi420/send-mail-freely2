import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { X } from 'lucide-react';

const EmailSMSSender = () => {
  const [mode, setMode] = useState('email');
  const [isLimitSelectOpen, setIsLimitSelectOpen] = useState(false);
  const [recipients, setRecipients] = useState([]);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors },
    setValue,
    watch 
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
    console.log('Submitted:', { 
      ...data,
      mode, 
      recipients // Use the recipients array instead of form input
    });
    // Reset form and recipients after submission
    reset();
    setRecipients([]);
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  // Phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  // Handle input change and comma/enter key press
  const handleRecipientInputChange = (e) => {
    const value = e.target.value;
    
    // Split on commas and handle each value
    // if (value.includes(',')) {
    //   const newValues = value.split(',').map(v => v.trim()).filter(v => v);
      
    //   // Process each value
    //   newValues.forEach(val => {
    //     if (mode === 'email' && validateEmail(val)) {
    //       if (!recipients.includes(val)) {
    //         setRecipients(prev => [...prev, val]);
    //       }
    //     } else if (mode === 'phone' && validatePhone(val)) {
    //       if (!recipients.includes(val)) {
    //         setRecipients(prev => [...prev, val]);
    //       }
    //     }
    //   });
      
    //   // Clear the input
    //   e.target.value = '';
    // }
  };

  // Handle key press (for Enter key)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.target.value.trim();
      
      if (value) {
        if (mode === 'email' && validateEmail(value)) {
          if (!recipients.includes(value)) {
            setRecipients(prev => [...prev, value]);
          }
          e.target.value = '';
        } else if (mode === 'phone' && validatePhone(value)) {
          if (!recipients.includes(value)) {
            setRecipients(prev => [...prev, value]);
          }
          e.target.value = '';
        }
      }
    }else if(e.key === 'Backspace'){
      if(!e.target.value.length){
        const newRecipients = recipients.splice(recipients.length-1,1)
        setRecipients([...newRecipients])
      }
    }
  };

  // Remove recipient
  const removeRecipient = (recipient) => {
    setRecipients(recipients.filter(r => r !== recipient));
  };

  const handleBlur = (e) => {
    const value = e.target.value
    const splittedEmails = value.split(',');

    if(splittedEmails.length)
      splittedEmails.map(mail => {
        if (value) {
          if (mode === 'email' && validateEmail(value)) {
            if (!recipients.includes(value)) {
              setRecipients(prev => [...prev, value]);
            }
            e.target.value = '';
          } else if (mode === 'phone' && validatePhone(value)) {
            if (!recipients.includes(value)) {
              setRecipients(prev => [...prev, value]);
            }
            e.target.value = '';
          }
        }
      })
  }

  return (
    <div className="container mx-auto p-4">
      {/* Mode Selection Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          type="button"
          onClick={() => {
            setMode('email');
            setRecipients([]);
          }} 
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
          onClick={() => {
            setMode('phone');
            setRecipients([]);
          }} 
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
                {mode === 'email' ? 'Email Addresses' : 'Phone Numbers'}
              </label>
              <div className="flex min-h-[38px] w-full px-3 py-2 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 border-gray-300">
                <div className="flex gap-2 max-w-[50%] overflow-auto">
                  {recipients.map((recipient, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
                    >
                      <span className="text-sm">{recipient}</span>
                      <button
                        type="button"
                        onClick={() => removeRecipient(recipient)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {/* <X size={14} /> */}
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full focus:outline-none bg-transparent"
                  placeholder={mode === 'email' 
                    ? 'Type or paste emails (comma-separated)' 
                    : 'Type or paste phone numbers (comma-separated)'}
                  onChange={handleRecipientInputChange}
                  onKeyDown={handleKeyPress}
                  onBlur={handleBlur}
                />
              </div>
              {recipients.length === 0 && (
                <p className="text-red-500 text-sm mt-1">At least one recipient is required</p>
              )}
            </div>

            {/* Rest of the form fields remain the same */}
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

            <div className="flex space-x-4">
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

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={recipients.length === 0}
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