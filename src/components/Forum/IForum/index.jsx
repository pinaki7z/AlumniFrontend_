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
import deleteButton from '../../../images/deleteButton.svg';
import reply from "../../../images/reply-forum.svg";
import baseUrl from '../../../config';

const IForum = () => {
  const [forum, setForum] = useState(null);
  const [members, setMembers] = useState([]);
  const [blockedUserIds, setBlockedUserIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const navigateTo = useNavigate();
  const profile = useSelector((state) => state.profile);
  const [requestStatus, setRequestStatus] = useState('Join Forum');
  const [notificationList, setNotificationList] = useState([]);
  const allMembers = useSelector((state) => state.member);
  const [selectedMembers, setSelectedMembers] = useState([]);

  let admin;
  if (profile.profileLevel === 0) {
    admin = true;
  }

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
      const response = await axios.get(`${baseUrl}/forums/${id}`);
      setForum(response.data);
    } catch (error) {
      console.error('Error fetching forum data:', error);
    }
  };

  const getForumMembers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/forums/${id}/members`);
      setMembers(response.data.members);
    } catch (error) {
      console.error('Error fetching forum members:', error);
    }
  };

  const getBlockedMembers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/forums/${id}/blockedUserIds`);
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

  const handleDeletePost = async (forumId) => {
    try {
      await axios.delete(`${baseUrl}/forums/${forumId}`);
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
    setRequestStatus('Loading...');
    try {
      const response = await axios.post(`${baseUrl}/forums/createRequest`, body);
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

      const response = await axios.post(`${baseUrl}/forums/${forumId}/reportToSuperAdmin`, body);
      getBlockedMembers();
    } catch (error) {
      console.error('Error while reporting:', error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  }

  const filteredMembers = allMembers.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberSelect = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleSaveMembers = async () => {
    console.log('selectedMembers', selectedMembers)
    try {
      const response = await axios.put(
        `${baseUrl}/forums/members/${id}`,
        {
          userId: selectedMembers,
        }
      );
      setShowModal(false);
      getForumMembers();
      toast.success('Members updated successfully!');
    } catch (error) {
      console.error('Error updating members:', error);
      toast.error('Failed to update members.');
    }
  };


  return (
    <div style={{ width: '100%' }}>
      <div className="forum-post-container">
        {forum && (
          <>
            {(forum.userId === profile._id || admin) && forum.type === 'Private' && (
              <div className='manage-members'>
                <p className='manage-members-btn' onClick={() => setShowModal(true)}>Manage forum members</p>
              </div>
            )}
            <div className="forum-post">
              <div className="user-info">
                <div className="avatar">
                  <img src={forum.profilePicture} alt="" style={{ borderRadius: '50%', width: '152px', height: '152px' }} />
                </div>
                <div className="user-details-forum">
                  <p className="username">{forum.userName}</p>
                </div>
              </div>
              <div className="post-info">
                <p className="post-date">Posted on {formatDate(forum.createdAt)}</p>
                <h2 className="post-title">{forum.title}</h2>
                <p className="post-description" dangerouslySetInnerHTML={{ __html: forum.description }}></p>
                {forum.picture && (
                  <img
                    src={forum.picture}
                    alt="Forum Image"
                    style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px', paddingBottom: '10px' }}
                  />
                )}
              </div>
              {(forum.userId === profile._id || admin) && forum.type === 'Private' && (
                <div className="post-actions" onClick={() => handleDeletePost(forum._id)} >
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#301C58" />
                  </svg>
                </div>
              )}
              <div className="reply-action">
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4V0L0 7L7 14V9.9C12 9.9 15.5 11.5 18 15C17 10 14 5 7 4Z" fill="#301C58" />
                </svg>
                <span>Reply</span>
              </div>
            </div>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={
          forum && (
            (forum.type === 'Public' || forum.comment === true || profile.profileLevel === 0 || forum.userId === profile._id || members.includes(profile._id)) ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0% 5%' }}>
                <div style={{ width: '100%' }}>
                  {forum && (
                    <>
                      {blockedUserIds.some(item => item.userId === profile._id && !item.sent) ? (
                        <>
                          <p>You have been blocked for the comment: <span style={{ fontWeight: '500' }}>{blockedUserIds.find(item => item.userId === profile._id).content}</span>. Click <span onClick={() => reportToSuperAdmin(blockedUserIds.find(item => item.userId === profile._id).commentId, blockedUserIds.find(item => item.userId === profile._id).content, forum.title, forum._id)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>here</span> to report to Super Admin</p>
                        </>
                      ) : blockedUserIds.some(item => item.userId === profile._id && item.sent === true) ? (
                        <>
                          Reported to super admin. Please wait while it is being verified.
                        </>
                      ) : (
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
      </Routes>

      {showModal && (
        <div className="modal-overlay-forum">
          <div className="modal-forum">
            <div className="modal-header-forum">
              <div>
                <h2>Manage Members</h2>
                <p>Add/Remove Members</p>
              </div>
              <button className="close-button" onClick={() => setShowModal(false)}>X</button>
            </div>
            <input
              type="text"
              placeholder="Search people"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <ul className="members-list">
              {filteredMembers.map((member, index) => (
                <li key={index} className="member-item">
                  <div className="member-info">

                    <img src={member.profilePicture ? member.profilePicture : Picture} alt="avatar" className="member-avatar" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{member.firstName}</span>
                      <span className="member-role">{member.profileLevel === 0 ? 'Super Admin' : member.profileLevel === 1 ? 'Admin' : member.profileLevel === 2 ? 'Alumni' : 'Student'}</span>
                    </div>
                  </div>
                  <input type="checkbox" checked={members.includes(member._id)} onChange={() => handleMemberSelect(member._id)} />
                </li>
              ))}
            </ul>
            <button className="save-button" onClick={handleSaveMembers}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IForum;
