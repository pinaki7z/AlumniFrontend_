import './displayPost.css';
import NoGroups from '../Groups/NoGroups';
import picture from '../../images/d-group.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { lineSpinner } from 'ldrs';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react';
import baseUrl from '../../config';
import groupMembers from "../../images/Groups-c.svg";
import groupPic from "../../images/d-group.jpg"


lineSpinner.register();

const DisplayPost = ({ title, groups = [], loading, joined }) => {
  const profile = useSelector((state) => state.profile);
  const [notificationList, setNotificationList] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [selectedGroupUserId, setSelectedGroupUserId] = useState("");
  const navigateTo = useNavigate();
  console.log('groups display post', groups)
  const admin = profile.profileLevel === 0;

  const getRequest = async () => {
    try {
      const response = await axios.get(`${baseUrl}/groups/requests/req`);
      setNotificationList(response.data);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const GroupItem = ({ group }) => {
    const [requestStatus, setRequestStatus] = useState('Request to Join');
    console.log('request ', requestStatus);

    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Verify your Business
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Upload a document:-</h4>
            <input type="file" name="businessVerification" id="businessVerification" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleRequest}>Submit</Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }


    useEffect(() => {
      const matchingNotification = notificationList.find(
        (notification) => notification.groupId === group._id && notification.userId === profile._id
      );
      if (matchingNotification) {
        setRequestStatus('Requested');
      } else {
        setRequestStatus('Request to Join');
      }
    }, [group._id, notificationList, profile._id]);

    const handleRequest = async (ownerId, groupId, userId, groupName, firstName, lastName) => {
      if (document.getElementById('businessVerification')) {
        setRequestStatus('Loading...');
        const formData = new FormData();
        const requestedUserName = `${profile.firstName} ${profile.lastName}`;
        const userId = profile._id;
        const body = {
          ownerId: selectedGroupUserId,
          groupId: selectedGroupId,
          userId,
          groupName: selectedGroupName,
          requestedUserName
        };
        const pdfFile = document.getElementById('businessVerification').files[0];

        formData.append('businessVerification', pdfFile);

        for (const key in body) {
          formData.append(key, body[key]);
        }

        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
          const response = await axios.post(`${baseUrl}/groups/createRequest`, formData, config);
          setModalShow(false);
          toast.success('requested');
          if (response.data.requested === true) {

            setRequestStatus('Requested');
            console.log('requested if');
          }
          else setRequestStatus('Request to Join');
        } catch (error) {
          console.error("Error creating request:", error);
        }
      }

      setRequestStatus('Loading...');
      try {
        const requestedUserName = `${firstName} ${lastName}`;
        const body = {
          ownerId,
          groupId,
          userId,
          groupName,
          requestedUserName
        };
        const response = await axios.post(`${baseUrl}/groups/createRequest`, body);
        console.log('body', response.data);
        if (response.data.requested === true) setRequestStatus('Requested');
        else setRequestStatus('Request');
      } catch (error) {
        console.error("Error creating request:", error);
      }
    };


    const handleAddMember = async (groupId) => {
      console.log('adding member', groupId);
      try {
        const response = await axios.put(`${baseUrl}/groups/members/${groupId}`, {
          members: {
            userId: profile._id,
            profilePicture: profile.profilePicture,
            userName: `${profile.firstName} ${profile.lastName}`,
            profileLevel: profile.profileLevel
          }
        });

        if (response.status === 200) {
          const { isUserAdded } = response.data;
          if (isUserAdded === true) {
            toast.success('added')
            navigateTo(`/groups/${groupId}`)
          }
          if (isUserAdded === false) {
            toast.success('removed')
          }
          console.log('User added/removed to/from the group:', isUserAdded);
        } else {

          console.error('Failed to add/remove user to/from the group');
        }
      } catch (error) {

        console.error('Error adding/removing user to/from the group:', error);
      }
    };

    return (
      <div key={group._id} className='display-post-card'>
        {console.log('group individual post', group)}
        {profile.profileLevel === 0 ||
          (group.groupType === 'Public' && group.members.some(member => member.userId === profile._id)) ||
          (group.groupType === 'Private' && group.members.some(member => member.userId === profile._id)) ||
          group.businessConnect === true ? (
          <div style={{ width: '100%', height: '80%', border: '1px solid black',background: '#eee8fa'
          }}>
            <Link to={`/groups/${group._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <div className='display-post-image' style={{ position: 'relative' }}>
                {/* <img src={picture} alt="" width="100px" height="100px" style={{ position: 'absolute' }} /> */}
                <div style={{
                  width: '100%', height: '100%', backgroundImage: group.groupPicture ? `url(${group.groupPicture})` : `url(${groupPic})`,
                  backgroundColor: group.groupPicture ? 'transparent' : '#FFFFFF',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}></div>
                <p style={{ position: 'absolute', top: '10px', right: '20px', backgroundColor: '#FFFFFF', padding: '8px 32px', border: '1px solid', fontWeight: '500', fontSize: '12px', fontFamily: 'Inter' }}>{group.groupType}</p>
              </div>
              <div className='display-post-title'>
                <p style={{ marginBottom: '0rem', fontWeight: '600', fontSize: '20px', fontWeight: '600', fontFamily: 'Inter' }}>{group.groupName}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={groupMembers} alt="" srcSet="" style={{color: '#301C58'}}/>
                  <p style={{ marginBottom: '0rem', color: '#7b7b7b', fontWeight: '500', fontSize: '16px', fontWeight: 'Inter' }}>{group.members.length} </p>
                </div>
              </div>
              <div style={{ padding: '0px 12px', fontWeight: '500', fontSize: '12px' }}>
                22nd April 2024
              </div>
            </Link>
          </div>
        ) : (
          <div style={{ width: '100%', height: '80%', border: '1px solid black',background: '#efeff0'
          }}>
            <div className='display-post-image' style={{ position: 'relative' }}>
              {/* <img src={picture} alt="" width="100px" height="100px" style={{ position: 'absolute' }} /> */}
              <div style={{ width: '100%', height: '100%', backgroundImage: group.groupPicture ? `url(${group.groupPicture})` : `url(${groupPic})`,
                  backgroundColor: group.groupPicture ? 'transparent' : '#FFFFFF',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center', }}></div>
              <p style={{ position: 'absolute', top: '10px', right: '20px', backgroundColor: '#FFFFFF', padding: '8px 32px', border: '1px solid', fontWeight: '500', fontSize: '12px', fontFamily: 'Inter' }}>{group.groupType}</p>
            </div>
            <div className='display-post-title'>
              <p style={{ marginBottom: '0rem', fontWeight: '600', fontSize: '20px', fontWeight: '600', fontFamily: 'Inter' }}>{group.groupName}</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <img src={groupMembers} alt="" srcSet="" />
                <p style={{ marginBottom: '0rem', color: '#7b7b7b', fontWeight: '500', fontSize: '16px', fontWeight: 'Inter' }}>{group.members.length} </p>
              </div>
            </div>
            <div style={{ padding: '0px 12px', fontWeight: '500', fontSize: '12px' }}>
              22nd April 2024
            </div>
          </div>
        )}

        {console.log('groupType', group.groupType, group.members)}
        {(group.groupType === 'Public' || group.groupType === 'Private') &&
          !group.members.some(member => member.userId === profile._id) && (
            <div className='display-post-edit'>
              {group.groupType === 'Public' ? (
                <button onClick={() => handleAddMember(group._id)} style={{ padding: '8px 32px', fontWeight: '500', fontSize: '20px',backgroundColor: '#301C58',color: '#F8F8FF' }}>Join</button>
              ) : (profile.department === group.department || group.category === "Business Connect" || group.department === 'All') && (
                <button style={{ padding: '8px 32px', fontWeight: '500', fontSize: '20px',backgroundColor: '#301C58',color: '#F8F8FF' }} onClick={() => {
                  if (group.category === "Business Connect") {
                    if (requestStatus === 'Requested') {
                      handleRequest(group.userId, group._id, profile._id, group.groupName, profile.firstName, profile.lastName);
                    } else {
                      setModalShow(true);
                      setSelectedGroupId(group._id);
                      setSelectedGroupName(group.groupName);
                      setSelectedGroupUserId(group.userId);
                    }
                  } else {
                    handleRequest(group.userId, group._id, profile._id, group.groupName, profile.firstName, profile.lastName);
                  }
                }}>{requestStatus}</button>
              )}
            </div>
          )}

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  };


  let filteredGroups;
  if (profile.department === 'All') {
    filteredGroups = groups;
  } else {

    filteredGroups = groups.filter(group => group.groupType === 'Public' || (group.groupType === 'Private' && profile.department === group.department) || group.category === 'Business Connect' || group.department === 'All');
  }


  return (
    <div className="display-post-container">
      {loading ? (
        <div style={{ display: 'flex', width: '100%', height: '40vh', alignItems: 'center', justifyContent: 'center' }}>
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : filteredGroups.length > 0 ? (
        filteredGroups.map((group) => <GroupItem key={group._id} group={group} />)
      ) : (
        <div className='display-post-noGroups'>No groups</div>
      )}


    </div>
  );
};

export default DisplayPost;
