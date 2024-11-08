import "./loginPage.css";
import "../../components/FrameComponent/FrameComponent.css";
import io from "../../images/io.png";
import bhu from "../../images/bhu.png";
import { useState } from 'react';
import './loginPage.css';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../store/userSlice';
import { updateProfile, setAdmin } from "../../store/profileSlice";
import baseUrl from "../../config";
import ReCAPTCHA from "react-google-recaptcha";
const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useCookies(["token"]);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const profile = useSelector((state) => state.profile);
  const backgroundImageUrl = `${process.env.REACT_APP_URL}/images/background.jpg`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA.");
      setLoading(false);
      return;
    }

    try {
      const currentDate = new Date();
      const response = await fetch(`${baseUrl}/alumni/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, captchaToken }),
      });

      if (response.ok) {
        const responseData = await response.json();

        handleLogin();

        const { token, alumni } = responseData;
        dispatch(updateProfile(alumni))
        setCookie("token", token, { path: "/" });
        if (alumni.profileLevel === 0) {
          console.log("level zero")
          dispatch(setAdmin(true));
        }

        if (alumni.expirationDate && new Date(alumni.expirationDate) < currentDate) {
          toast.error("Your account has expired. Contact admin to recover account");
          setLoading(false);
          return;
        }

        toast.success("Logged in successfully!");
        setLoading(false);
        const currentUrl = window.location.href;

        const loginPath = '/login';
        const baseUrl = currentUrl.endsWith(loginPath)
          ? currentUrl.slice(0, -loginPath.length)
          : currentUrl;

        if (currentUrl.endsWith(loginPath)) {
          window.location.href = baseUrl;
        } else {
          window.location.href = window.location.href;
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed', errorData);
        toast.error(errorData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoading(false);

    }
  };

  const handleReCaptcha = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="landing-page-1">
      <div className="main-container">
        <div className="content-area">
          <img src={bhu} alt="" srcset="" width='300px' height='100px' />
        </div>
      </div>
      <main className="login-panel">
        <div className="login-panel-child" />
        <div className="welcome-message">
          <div className="welcome-message-child" />
          <h1 className="rediscover-reconnect-reignite">
            REDISCOVER RECONNECT REIGNITE
          </h1>
          <h1 className="your-alumni-journey">
            Your Alumni Journey Starts Here!
          </h1>
        </div>
        <div className="login-fields">
          <form className="credentials-input" onSubmit={handleSubmit}>
            <h1 className="welcome-back" style={{ color: '#301c58' }}>Welcome Back!</h1>
            <div className="university-affiliation">
              <div className="bhu-alumni-association-container">
                <b className="bhu">
                  <span className="bhu1" style={{ color: '#301c58' }}>BHU</span>
                </b>
                <span className="alumni-association">
                  <b className="b">{` `}</b>
                  <span className="alumni-association1" style={{ color: '#301c58' }}>Alumni Association</span>
                </span>
              </div>
            </div>
            <div className="account-details-parent">
              <div className="account-details" style={{ width: '100%' }}>
                <div className="email" style={{ color: '#36454F' }}>Email</div>
                <div className="email1" style={{ width: '100%' }}>
                  <div className="field">

                    <input
                      className="email-address"
                      placeholder="Email address"
                      type="text"
                      style={{ width: '100%' }}
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>
                </div>
              </div>
              <div className="password" style={{ color: '#36454F' }}>Password</div>
              <div className="input-area">
                <div className="input">
                  <div className="input1">
                    <div className="field1" style={{ width: '100%' }}>
                      <input
                        className="email-address1"
                        placeholder="Password"
                        type="password"
                        style={{ width: '80%' }}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                      />

                    </div>
                  </div>
                  <img
                    className="password-visible-icon"
                    alt=""
                    src="/password-visible.svg"
                  />
                </div>
                <div className="remember-this-device-forgot">
                  <div className="remember-this-device">
                    <div className="controls">
                      <div className="checkmark">
                        <img className="union-icon" loading="lazy" alt="" />
                      </div>
                    </div>
                    <div className="remember-this-device1" style={{ color: '#008080' }}>Remember this device</div>
                  </div>
                  <div className="forgot-password">Forgot Password?</div>
                </div>
              </div>
            </div>
            <div>
              <ReCAPTCHA
                sitekey="6LdPzXgqAAAAACrakqqSjHvl4XIVyec6u1UimfSM"
                onChange={handleReCaptcha}
              />
            </div>
            <div className="action-buttons">
              <button className="button" type='submit' style={{
                color: '#F8F8FF',
                background: '#a98de3'
              }}>
                <div className="button1" style={{ color: '#F8F8FF' }}>{loading ? 'Logging in...' : 'Login'}</div>
              </button>
              <div className="signup-link-wrapper">
                <div className="signup-link">
                  <div className="dont-have-an" style={{ color: '#008080' }}>Don’t have an account?</div>
                  <a href='/register' style={{ textDecoration: 'none', color: '#36454F', fontSize: 'var(--font-size-sm)' }}>Register</a>

                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
