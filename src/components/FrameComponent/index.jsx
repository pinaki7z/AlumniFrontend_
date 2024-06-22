import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import FrameComponent1 from "./FrameComponent1";
import "./FrameComponent.css";
import Dropdown from 'react-bootstrap/Dropdown';


const FrameComponent = () => {

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 1; i >= currentYear - 100; i--) {
      years.push(`${i}-${i + 1}`);
    }
    return years;
  };
  return (
    <form className="first-name-field">
      <h1 className="create-an-account">Create an account</h1>
      <div className="last-name-field-parent">
      <div className="first-name">First Name</div>
          <div className="input2">
            <div className="input3">
              <div className="field1">
                <input
                  className="email-address1"
                  placeholder="Enter First Name"
                  type="text"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

          </div>
          <div className="first-name">Last Name</div>
          <div className="input2">
            <div className="input3">
              <div className="field1">
                <input
                  className="email-address1"
                  placeholder="Enter Last Name"
                  type="text"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

          </div>
          <div className="first-name">E-mail</div>
          <div className="input2">
            <div className="input3">
              <div className="field1">
                <input
                  className="register-email-address"
                  placeholder="Enter First Name"
                  type="text"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

          </div>
        <div className="last-name-field1">
          <div className="password">Password</div>
          <div className="input2">
            <div className="input3">
              <div className="field1">
                <input
                  className="email-address1"
                  placeholder="Enter Password"
                  type="password"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

          </div>
        </div>
        <div className="last-name-field2">
          <div className="password">Confirm Password</div>
          <div className="input2">
            <div className="input3">
              <div className="field1">
                <input
                  className="email-address1"
                  placeholder="Confirm Password"
                  type="password"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="last-name-field3">
          <div className="gender">Gender</div>
          <div className="gender1">
            <select name='department' id='department' style={{ fontSize: 'var(--input-text-title-size)', width: '100%', height: '100%', borderRadius: 'var(--br-9xs)', border: '1px solid var(--outline-box)', boxSizing: 'border-box', backgroundColor: 'var(--background-light)' }} required>
              <option value='' disabled selected >Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>

          </div>
        </div>
        <div className="last-name-field4">
          <div className="department">Department</div>
          <div className="dept">
            <select name='department' id='department' style={{ fontSize: 'var(--input-text-title-size)', width: '100%', height: '100%', borderRadius: 'var(--br-9xs)', border: '1px solid var(--outline-box)', boxSizing: 'border-box', backgroundColor: 'var(--background-light)' }} required>
              <option value='' disabled selected >Select Department</option>
              <option value='Agricultural Engineering'>Agricultural Engineering</option>
              <option value='Gastroenterology'>Gastroenterology</option>
              <option value='Indian languages'>Indian languages</option>
              <option value='Neurosurgery'>Neurosurgery</option>
              <option value='Vocal Music'>Vocal Music</option>
            </select>
          </div>
        </div>
        <div className="last-name-field5">
          <div className="batch">Batch</div>
          <div className="batch1">
            <select name='batch' id='batch' style={{ fontSize: 'var(--input-text-title-size)', width: '100%', height: '100%', borderRadius: 'var(--br-9xs)', border: '1px solid var(--outline-box)', boxSizing: 'border-box', backgroundColor: 'var(--background-light)' }} required>
              <option value='' disabled selected>Select Batch</option>
              {generateYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="privacy-policy-link">
          <div className="controls">
            <div className="union-wrapper">
              <img
                className="union-icon"
                loading="lazy"
                alt=""
                src="/union.svg"
              />
            </div>
          </div>
          <div className="by-creating-your">
            By creating your account, you agree to our
          </div>
          <div className="privacy-policy">Privacy Policy</div>
        </div>
      </div>
      <button className="register-button">
        <div className="register-button1">Register</div>
      </button>
    </form>
  );
};

export default FrameComponent;
