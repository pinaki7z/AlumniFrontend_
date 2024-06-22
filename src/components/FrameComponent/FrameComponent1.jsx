import { useMemo } from "react";
import "./FrameComponent1.css";

const FrameComponent1 = ({
  firstName,
  emailAddressPlaceholder,
  propMinWidth,
  propWidth,
  propMinWidth1,
}) => {
  // const firstNameStyle = useMemo(() => {
  //   return {
  //     minWidth: propMinWidth,
  //   };
  // }, [propMinWidth]);

  // const emailAddressStyle = useMemo(() => {
  //   return {
  //     width: propWidth,
  //   };
  // }, [propWidth]);

  // const spacerStyle = useMemo(() => {
  //   return {
  //     minWidth: propMinWidth1,
  //   };
  // }, [propMinWidth1]);

  return (
    <div className="last-name-field">
      <div className="first-name" >
        {firstName}
      </div>
      <div className="input">
        <div className="input1">
          <div className="selected-shape" />
          <div className="message">
            <img className="exclamation-icon" alt="" src="/exclamation.svg" />
            <div className="message1">Message</div>
          </div>
          <div className="field">
            
            <input
              className="register-email-address"
              placeholder={emailAddressPlaceholder}
              type="text"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
