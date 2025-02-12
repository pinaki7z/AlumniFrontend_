import React, { useState } from 'react';
import eps from "../../images/excelPublicSchool.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import baseUrl from '../../config';
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle the password reset logic here
    // console.log('Password reset request sent to:', email);
    axios.post(`${baseUrl}/forgotPass`, { email })
    .then((response) => {
      setLoading(false);
      setIsEmailSent(true);
      toast.dismiss()
      // toast.success("Check Your Inbox")
      toast.success(response.data.message)

    }).catch((error) => {
      setLoading(false);
      toast.dismiss()
      toast.error(error.response.data.message)
    })
    // Simulate successful email sending
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-center mb-7">
          <img src={eps} alt="Logo" className="h-[140px]" />
        </div>
        
        {isEmailSent ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Check Your Inbox
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to {email}. Please check your inbox and follow the instructions to reset your password.
            </p>
            <button onClick={()=>setIsEmailSent(false)} className="text-blue-500 mr-5 hover:underline">
              Send Email Again
            </button>
            <a href="/login" className="text-blue-500 hover:underline">
              Back to Login
            </a>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Forgot Password
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}

                  className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                 {loading ?"loading...": "Send Reset Link"}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <a href="/login" className="text-blue-500 hover:underline">
                Back to Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
