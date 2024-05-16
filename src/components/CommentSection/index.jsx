import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './commentSection.css';
import pic from "../../images/odA9sNLrE86.jpg";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CommentSection = ({ comments, entityId, entityType, onCommentSubmit, onDeleteComment }) => {
  const [content, setContent] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [reply, setReply] = useState('');
  const [cookie] = useCookies(['access_token']);
  const forumId = '64f5ce5db9cddde68ba64b75';
  const profile = useSelector((state) => state.profile);
  const [showReport, setShowReport] = useState({});

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/${entityType}/${entityId}/comments`, {
        userId: profile._id,
        content: content,
        userName: profile.firstName,
        parentCommentId: null,
      });
      const postId = response.data._id;
      setContent('');
      onCommentSubmit(postId);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/${entityType}/${entityId}/comments/${commentId}`);
      onDeleteComment(commentId);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleReportToggle = (commentId) => {
    setShowReport(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  const handleReport = async (commentId,userId) => {
    try {
      const response = await axios.put(`http://localhost:5000/${entityType}/${entityId}/report`, {
        commentId: commentId,
        userId: userId,
      });
      toast.success('reported');
      onCommentSubmit();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const renderComments = (commentsArray) => {
    if (!commentsArray || commentsArray.length === 0) {
      return null;
    }

    return (
      <ul className="comment-list" style={{ paddingTop: '20px' }}>
        {commentsArray.map((comment) => (
          <li key={comment._id}>
            <div className="comment">
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src={pic} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <p style={{ margin: '0px', fontWeight: '400', backgroundColor: '#E6E6FA', padding: '10px', borderRadius: '10px' }}>{comment.content}</p>
                <div className="comment-menu">
                  <div className="menu-container">
                    <div className="menu-trigger" style={{ cursor: 'pointer' }} onClick={() => handleReportToggle(comment._id)}>&#8286;</div>
                    {showReport[comment._id] && (
                      <div className="menu-options">
                        <button onClick={() => handleReport(comment._id,comment.userId)}>Report</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p style={{ fontStyle: 'normal', fontSize: '16px', fontWeight: '500' }}>By : {comment.userName}</p>
              <div className="comment-buttons">
                <button onClick={() => handleCommentReply(comment._id)}>Reply</button>
                <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
              </div> 
              {replyToCommentId === comment._id && (
                <div className="reply-form">
                  <textarea
                    placeholder="Reply to this comment"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)} style={{ borderRadius: '10px', padding: "5px", width: '90%', border: 'none' }}
                  />
                  <button onClick={() => handleReplySubmit(comment._id)} style={{ borderRadius: '10px', fontSize: '14px', fontStyle: 'italic', fontFamily: 'sans-serif', margin: '10px 10px', padding: '8px', backgroundColor: '#174873', color: 'white', border: '#888 solid 1px' }}>Submit Reply</button>
                </div>
              )}
              {renderComments(comment.comments)}
            </div>
          </li>
        ))}
      </ul>
    );

  };

  const handleCommentReply = (commentId) => {
    setReplyToCommentId(commentId);
    setContent('');
  };

  const handleReplySubmit = async (parentCommentId) => {
    try {
      const response = await axios.post(`http://localhost:5000/${entityType}/${entityId}/comments`, {
        content: reply,
        userName: profile.firstName,
        parentCommentId: parentCommentId,
        userId: profile._id,
      });
      const postId = response.data._id;
      setReply('');
      setReplyToCommentId(null);
      onCommentSubmit(postId); 
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div>
      <div className="comment-box">
        <div><img src={pic} style={{ width: '60px', height: '55px', borderRadius: '55%' }} /></div>
        <textarea
          placeholder="Add a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)} style={{ width: '50%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'end', textAlign: 'center' }}>
          <button onClick={handleCommentSubmit}>Comment</button>
        </div>
      </div>

      {renderComments(comments)}
    </div>
  );
};

export default CommentSection;
