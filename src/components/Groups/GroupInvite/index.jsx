import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export const GroupInvite = () => {
  const { _id } = useParams();
  const groupId = _id;

  const groupInviteLink = `${window.location.origin}/groups/${groupId}/invite`;
  console.log('group invite link', groupInviteLink);

  const [buttonText, setButtonText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(groupInviteLink)
      .then(() => {
        setButtonText('Copied');
        setTimeout(() => {
          setButtonText('Copy');
        }, 10000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div>
      <p style={{ fontSize: '32px', fontWeight: '600' }}>Group Invite Link</p>
      <p style={{ fontSize: '18px', fontWeight: '500' }}>
        Share this invite link with others to join the group:
      </p>
      <div style={{ border: '1px solid', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px'}}>
        <a href={groupInviteLink} style={{textDecoration: 'none', color: 'black',fontWeight: '400', fontSize: '16px', fontFamily: 'Inter'}}>{groupInviteLink}</a>
        <button
          onClick={handleCopy}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
