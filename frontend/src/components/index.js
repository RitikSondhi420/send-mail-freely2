import React, { useState } from 'react';
import axios from 'axios';
import { Header } from './sendMail/Header';
import { RecipientsField } from './sendMail/RecipientsField';
import { MessageFields, SettingsRow, SubmitButton } from './sendMail/MailFeilds';

const Alert = ({ variant = 'info', children }) => {
  const colors = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    success: 'bg-green-50 text-green-800 border-green-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[variant]}`}>
      {children}
    </div>
  );
};

const EmailSMSSender = () => {
  const [mode, setMode] = useState('email');
  const [recipients, setRecipients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    limit: '',
    interval: '',
    recipientsText: ''
  });
  
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);

  const validateEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/i.test(phone);
  };

  const handleRecipientsChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, recipientsText: value });
    
    const items = value.split(/[,\n]/).map(item => item.trim()).filter(Boolean);
    const validItems = items.filter(item => 
      mode === 'email' ? validateEmail(item) : validatePhone(item)
    );
    
    setRecipients(validItems);
  };

  const sendMessage = async (receiver) => {
    try {
      const response = await axios.post('http://localhost:5000/api/mail/sendMail', {
        receiver,
        subject: formData.subject,
        html: formData.description,
        text: formData.description,
        sendedId: new Date().getTime().toString() // Unique ID for batch
      });
      
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        `Failed to send to ${receiver}: ${error.message}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipients.length === 0) {
      setError('Please add at least one valid recipient');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const interval = parseInt(formData.interval) || 0;
      const limit = parseInt(formData.limit) || recipients.length;
      
      const recipientsToProcess = recipients.slice(0, limit);
      
      for (let i = 0; i < recipientsToProcess.length; i++) {
        await sendMessage(recipientsToProcess[i]);
        
        if (i < recipientsToProcess.length - 1 && interval > 0) {
          await new Promise(resolve => setTimeout(resolve, interval * 1000));
        }
      }
      
      setSuccess(`Successfully sent ${mode === 'email' ? 'emails' : 'SMS'} to ${recipientsToProcess.length} recipients`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
        <Header mode={mode} setMode={setMode} />
        
        <div className="p-6 space-y-6">
          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success">
              {success}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <RecipientsField
              mode={mode}
              formData={formData}
              handleRecipientsChange={handleRecipientsChange}
              recipients={recipients}
            />
            
            <MessageFields 
              formData={formData}
              setFormData={setFormData}
            />
            
            <SettingsRow
              formData={formData}
              setFormData={setFormData}
              showLimitDropdown={showLimitDropdown}
              setShowLimitDropdown={setShowLimitDropdown}
            />
          </form>
        </div>

        <SubmitButton
          mode={mode}
          isSubmitting={isSubmitting}
          recipients={recipients}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EmailSMSSender;