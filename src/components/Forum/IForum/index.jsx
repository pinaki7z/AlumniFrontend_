import React, { useState, useEffect } from 'react';
import Picture from '../../../images/io.png';
import CommentSection from '../../CommentSection';
import axios from 'axios';
import './IForum.css';
import { useParams } from 'react-router-dom';
import { DeleteRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AddMembers } from '../../Groups/AddMembers';

const IForum = () => {
  const [forum, setForum] = useState(null);
  const [members, setMembers] = useState([]);
  const [blockedUserIds, setBlockedUserIds] = useState([]);
  const { id } = useParams();
  const navigateTo = useNavigate();
  const profile = useSelector((state) => state.profile);
  const [requestStatus, setRequestStatus] = useState('Join Forum');
  const [notificationList, setNotificationList] = useState([]);

  let admin;
  if (profile.profileLevel === 0) {
    admin = true;
  }

  const getRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/groups/requests/req`);
      setNotificationList(response.data);
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  useEffect(() => {
    const matchingNotification = notificationList.find(
      (notification) => notification.forumId === id && notification.userId === profile._id
    );

    if (matchingNotification) {
      setRequestStatus('Requested');
    } else {
      setRequestStatus('Request to Join');
    }
  }, [id, notificationList, profile._id]);

  const refreshComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/forums/${id}`);
      setForum(response.data);
    } catch (error) {
      console.error('Error fetching forum data:', error);
    }
  };

  const getForumMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/forums/${id}/members`);
      setMembers(response.data.members);
    } catch (error) {
      console.error('Error fetching forum members:', error);
    }
  };


  const getBlockedMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/forums/${id}/blockedUserIds`);
      setBlockedUserIds(response.data.blockedUserIds);
    } catch (error) {
      console.error('Error fetching forum members:', error);
    }
  };

  useEffect(() => {
    getForumMembers();
    getBlockedMembers();
  }, []);

  useEffect(() => {
    refreshComments();
  }, [id]);


  console.log('blockedUserIds', blockedUserIds)

  const handleDeletePost = async (forumId) => {
    try {
      await axios.delete(`http://localhost:5000/forums/${forumId}`);
      toast.success('Deleted successfully!');
      navigateTo('/forums');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleJoinForum = async (ownerId, forumId, userId, forumName, firstName, lastName) => {
    const requestedUserName = `${firstName} ${lastName}`
    const body = {
      ownerId,
      forumId,
      userId,
      forumName,
      requestedUserName
    };
    console.log('body', body);
    setRequestStatus('Loading...');
    try {
      const response = await axios.post(`http://localhost:5000/forums/createRequest`, body);
      console.log('body', response.data);
      if (response.data.requested === true) setRequestStatus('Requested');
      else setRequestStatus('Request');
    } catch (error) {
      console.error("Error creating request:", error);
      setRequestStatus('Join Forum');
    }
  };

  function filterReportedComments(comments) {
    const filteredComments = comments.filter(comment => !comment.reported);
    return filteredComments.map(comment => ({
      ...comment,
      comments: filterReportedComments(comment.comments)
    }));
  }

  const reportToSuperAdmin = async (commentId, comment, forumName, forumId) => {
    try {
      const body = {
        userId: profile._id,
        comment,
        commentId,
        ownerId: "64c4ed2ede6421691b5239dc",
        requestedUserName: profile.firstName + profile.lastName,
        forumName,
      };
  
      const response = await axios.post(`http://localhost:5000/forums/${forumId}/reportToSuperAdmin`, body);
      console.log('Report sent successfully:', response.data);
      getBlockedMembers();
     
  
    } catch (error) {
      console.error('Error while reporting:', error);
    }
  }
  

  return (
    <div style={{ width: '60%' }}>
      <h1 style={{ backgroundColor: '#174873', color: 'white', textAlign: 'center', padding: '30px 0px', fontWeight: '600' }}>Forums</h1>
      <div className='iforum'>
        <div className='iforum-1'>
          {forum && (
            <>
              {((forum.userId === profile._id || admin) && forum.type === 'Private') && (
                <>
                  <IconButton onClick={() => handleDeletePost(forum._id)} className='delete-button'>
                    <DeleteRounded />
                  </IconButton>
                  <Link to={`/forums/${id}/members`}>
                    <p>Manage forum members</p>
                  </Link>
                </>
              )}
              <h1 style={{ fontFamily: 'sans-serif', fontWeight: 500, fontSize: 30, marginTop: '1em' }}>{forum.title}</h1>
              <p style={{ fontWeight: '500', fontSize: '20' }} dangerouslySetInnerHTML={{ __html: forum.description }}></p>
              {forum.picture && <img src={forum.picture} alt="Forum Image" style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px', paddingBottom: '10px' }} />}
            </>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={
          forum && (
            (forum.type === 'Public' || forum.comment === true || profile.profileLevel === 0 || forum.userId === profile._id || members.includes(profile._id)) ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#F5F5F5', margin: '20px 0px' }}>
                <div style={{ width: '60%', padding: '30px' }}>
                  {forum && (
                    <>
                      {blockedUserIds.some(item => item.userId === profile._id && !item.sent) ? (
                        <>
                          <p>You have been blocked for the comment: <span style={{ fontWeight: '500' }}>{blockedUserIds.find(item => item.userId === profile._id).content}</span>.  Click <span onClick={() => reportToSuperAdmin(blockedUserIds.find(item => item.userId === profile._id).commentId, blockedUserIds.find(item => item.userId === profile._id).content,forum.title,forum._id)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>here</span> to report to Super Admin
                          </p>
                        </>
                      ) : blockedUserIds.some(item => item.userId === profile._id && item.sent===true)?(
                        <>
                          Reported to super admin.Please wait while it is being verified.
                        </>
                      ):
                      (
                        <CommentSection
                          comments={forum.comments ? filterReportedComments(forum.comments) : null}
                          entityId={id}
                          entityType="forums"
                          onCommentSubmit={refreshComments}
                          onDeleteComment={refreshComments}
                        />
                      )}
                    </>
                  )}

                </div>
              </div>
            ) : (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0px' }}>
                <button onClick={() => handleJoinForum(forum.userId, forum._id, profile._id, forum.title, profile.firstName, profile.lastName)} style={{ width: '20%', backgroundColor: 'greenyellow', padding: '10px', borderRadius: '8px', border: 'none' }}>{requestStatus}</button>
              </div>
            )
          )
        } />
        <Route path={`/members/*`} element={<AddMembers type='forums' />} />
      </Routes>
    </div>
  );
};

export default IForum;
