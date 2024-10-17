import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './commentSection.css';
import pic from "../../images/odA9sNLrE86.jpg";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PiArrowBendDownLeftBold } from "react-icons/pi";
import { MdOutlineDelete } from "react-icons/md";
import replyy from "../../images/reply.svg";
import deletee from "../../images/delete.svg";
import baseUrl from "../../config";

const reactions = ['😍', '😂', '😡', '😞', '🤩'];

const CommentSection = ({ comments, entityId, entityType, onCommentSubmit, onDeleteComment }) => {
  const [content, setContent] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [reply, setReply] = useState('');
  const [cookie] = useCookies(['access_token']);
  const forumId = '64f5ce5db9cddde68ba64b75';
  const profile = useSelector((state) => state.profile);
  const [showReport, setShowReport] = useState({});
  const [likes, setLikes] = useState({});

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}/${entityType}/${entityId}/comments`, {
        userId: profile._id,
        content: content,
        userName: profile.firstName,
        parentCommentId: null,
        profilePicture: profile.profilePicture,
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
      await axios.delete(`${baseUrl}/${entityType}/${entityId}/comments/${commentId}`);
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

  const handleReport = async (commentId, userId) => {
    try {
      const response = await axios.put(`${baseUrl}/${entityType}/${entityId}/report`, {
        commentId: commentId,
        userId: userId,
      });
      toast.success('reported');
      onCommentSubmit();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleLikeToggle = (commentId, reaction = '❤️') => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [commentId]: prevLikes[commentId] === reaction ? null : reaction
    }));
  };

  const renderComments = (commentsArray) => {
    if (!commentsArray || commentsArray.length === 0) {
      return null;
    }

    return (
      <ul className="comment-list">
        {commentsArray.map((comment) => (
          <li key={comment._id}>
            <div className="comment">
              <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #eee', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex' }}>
                  <img src={comment.profilePicture} width="40px" height="40px" style={{borderRadius: '50%'}}/>
                  <p style={{ fontWeight: '500' }}>{comment.userName}</p></div>
                <div>
                  <p style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>{comment.content}
                    <div className="comment-menu">
                      <div className="menu-container">
                        <div className="menu-trigger" style={{ cursor: 'pointer' }} onClick={() => handleReportToggle(comment._id)}>&#8286;</div>
                        {showReport[comment._id] && (
                          <div className="menu-options">
                            <button onClick={() => handleReport(comment._id, comment.userId)}>Report</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </p>

                </div>

              </div>

              <div className="comment-buttons">
                {comment.userId === profile._id || profile.profileLevel === 0 ? <div style={{fontSize: '18px', display: 'flex', alignItems: 'center'}}>
                <img src={deletee} alt="" srcset="" />
                 <button onClick={() => handleCommentDelete(comment._id)}>Delete</button> 
                </div> : null}
                <div style={{fontSize: '18px'}}>
                <img src={replyy} alt="" srcset=""/>
                  <button onClick={() => handleCommentReply(comment._id)}>Reply</button>
                </div>
                <div className="like-container" onMouseLeave={() => setLikes({ ...likes, hoverComment: null })} style={{ position: 'relative', fontSize: '18px' }}>
                  <button
                    onClick={() => handleLikeToggle(comment._id)}
                    onMouseEnter={() => setLikes({ ...likes, hoverComment: comment._id })}
                    //onMouseLeave={() => setLikes({ ...likes, hoverComment: null })}
                    style={{position: 'absolute', top: '25px', left: '-40px'}}
                  >
                    {likes[comment._id] || 'Like'}
                  </button>
                  {likes.hoverComment === comment._id && (
                    <div className="reaction-emojis" style={{ position: 'absolute', top: '0px', left: '-40px', display: 'flex', gap: '5px', background: '#fff', border: '1px solid #ddd', padding: '5px', borderRadius: '5px' }}>
                      {reactions.map((reaction, index) => (
                        <span
                          key={index}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleLikeToggle(comment._id, reaction)}
                        >
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {replyToCommentId === comment._id && (
                <div className="reply-form">
                  <input
                    className="comment-input"
                    placeholder="Reply to this comment"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    style={{ width: '100%', border: 'none', borderBottom: '1px solid #a98de3', paddingTop: '25px' }}
                  />
                  <button onClick={() => handleReplySubmit(comment._id)} style={{ color: '#F8F8FF', backgroundColor: '#301C58', padding: '8px 20px 8px 20px', borderRadius: '8px', float: 'right', marginTop: '10px', marginLeft: '20px', position: 'relative', zIndex: '1' }}>Submit Reply</button>
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
    if(!replyToCommentId)  setReplyToCommentId(commentId);
    else setReplyToCommentId(null)
    setContent('');
  };

  const handleReplySubmit = async (parentCommentId) => {
    try {
      const response = await axios.post(`${baseUrl}/${entityType}/${entityId}/comments`, {
        content: reply,
        userName: profile.firstName,
        parentCommentId: parentCommentId,
        userId: profile._id,
        profilePicture: profile.profilePicture,
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
    <div style={{ backgroundColor: 'white', borderRadius: '6px' }}>
      <div className="comment-box" style={{ padding: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><img src={profile.profilePicture} style={{ width: '60px', height: '55px', borderRadius: '55%' }} />
          <p style={{ marginBottom: '0px', fontWeight: '600', fontSize: '18px' }}>{profile.firstName}</p>
        </div>
        <input
          className="comment-input"
          placeholder="Add a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)} style={{ width: '100%', border: 'none', borderBottom: '1px solid #a98de3', paddingTop: '25px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'end', textAlign: 'center', paddingTop: '15px' }}>
          <button onClick={handleCommentSubmit} style={{ color: '#F8F8FF', backgroundColor: '#301C58', padding: '8px 20px 8px 20px', borderRadius: '8px' }}>Comment</button>
        </div>
      </div>

      {renderComments(comments)}
    </div>
  );
};

export default CommentSection;
