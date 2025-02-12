import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode to decode the token
import baseUrl from '../../config';
const PasswordReset = () => {
  const { token } = useParams(); // Extract token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // State to hold user email
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Decode the JWT token to get the user email
      const decoded = jwtDecode(decodeURIComponent(token));
      setUserEmail(decoded.email); // Set the email in state
    } catch (err) {
      setError('Invalid or expired token');
    }
  }, [token]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send the new password to the backend API along with the token
      const response = await axios.post(`${baseUrl}/forgotPass/reset-password/${encodeURIComponent(token)}`, {
        newPassword,
        confirmNewPassword: confirmPassword,
      });

      if (response.data.success) {
        setSuccess(true);
        setError('');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
      } else {
        setError('Password reset failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success ? (
          <p className="text-green-500 text-center">Password reset successful! Redirecting...</p>
        ) : (
          <form onSubmit={handlePasswordReset}>
            {userEmail && (
              <p className="text-center mb-8 text-gray-600">{userEmail}</p>
            )}
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
