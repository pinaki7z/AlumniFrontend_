import React, { useState } from 'react';
import Chathead from '../Chathead';
import './chatbox.css';
import Chat from '../Chat';
import { HiUserGroup } from "react-icons/hi2";
import { PiUserListFill } from "react-icons/pi";
import { AiOutlineArrowUp } from "react-icons/ai";
import arrowUp from '../../images/arrowDoubleUp.svg';
import arrowDown from '../../images/arrowDoubleDown.svg';
import profileIcon from '../../images/profile.svg';
import expand from '../../images/expand.svg';
import ChatM from '../../pages/Chat';
import baseUrl from '../../config';

const Chatbox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGroupsOpen, setGroupsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openGroups = () => {
    setGroupsOpen(true);
  };
  const closeGroups = () => {
    setGroupsOpen(false);
  };

  const hoverUser = () => {
    setIsHovered(true);
  };
  const noHoverUser = () => {
    setIsHovered(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={`chatbox-container ${isExpanded ? 'expanded' : 'collapsed'}`} style={{ zIndex: '4' }}>
      <div className='chatbox-header'>
        <p style={{ marginBottom: '0px' }}>Messages</p>
        <div style={{ display: 'flex', gap: '2vw' }}>
          {/* <img src={expand} alt="" srcset="" className='arrow-up' onClick={togglePopup} /> */}
          <img src={profileIcon} alt="" srcset="" />
          {!isExpanded ? (<img src={arrowUp} alt="" srcset="" onClick={toggleExpand} className='arrow-up' />) : (<img src={arrowDown} alt="" srcset="" onClick={toggleExpand} className='arrow-up' />)}
        </div>

      </div>
      {isExpanded && (
        <div className='chatbox-content'>
          <div className='chat1'>
            {/* <div className='chat-box'>
              <Chathead />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', marginTop: '15px' }}>
              <div style={{ position: 'relative' }}>
                <button
                  onMouseEnter={openGroups}
                  onMouseLeave={closeGroups}
                  style={{ padding: '5px 15px', marginRight: '10px', borderRadius: '25%', border: 'none' }}
                >
                  <PiUserListFill style={{ fontSize: '20px', color: '#174873', borderRadius: '25%' }} />
                </button>
                {isGroupsOpen && (
                  <div style={{ position: 'absolute' }}>
                    <ul>
                      <li style={{ listStyleType: 'none' }}>
                        <p style={{ border: "1px solid black", fontSize: '14px', padding: '2px' }}>Users</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <button style={{ padding: '5px 15px', borderRadius: '25%', border: 'none' }}>
                  <HiUserGroup
                    style={{ fontSize: '20px', color: '#D3D3D3', borderRadius: '25%' }}
                    onMouseEnter={hoverUser}
                    onMouseLeave={noHoverUser}
                  />
                </button>
                {isHovered && (
                  <div style={{ position: 'absolute' }}>
                    <p style={{ border: '1px solid black', fontSize: '14px', padding: '2px' }}>Groups</p>
                  </div>
                )}
              </div>
            </div>
            <div className='search-users'>
              <input type='text' name='name' placeholder='Search for users' />
            </div> */}
            <div>
              <Chat />
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup-modal" style={{
          position: 'fixed',
          top: '10%', left: '10%', right: '10%', bottom: '10%',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0.5,0.5,0.5,0.5)',
          zIndex: 1000,
          height: '80%'
        }}>


          <div className="chat-details">
            <ChatM />
          </div>
          {/* <div>
            <img src={expand} alt="" srcset="" className='arrow-up' onClick={togglePopup}  style={{ position: 'absolute', top: '5px', right: '10px' }}/>

          </div> */}
        </div>
      )}

    </div>

  );
};

export default Chatbox;
