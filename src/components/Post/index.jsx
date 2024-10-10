import React from 'react';
import { ThumbUpRounded, ChatBubbleOutlineRounded, NearMeRounded, DeleteRounded } from '@mui/icons-material';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { Avatar, TextField, IconButton, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './Post.scss';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from "react-router-dom";
import deleteButton from "../../images/delete.svg";
import commentIcon from "../../images/comment.svg";
import share from "../../images/share.svg";
import liked from "../../images/liked.svg";
import unliked from "../../images/unliked.svg";
import postDelete from "../../images/post-delete.svg";
import baseUrl from "../../config";

function Post({ userId, postId, profilePicture, username, text, timestamp, image, video, likes, handleLikes, handleComments, className, onDeletePost, entityType, showDeleteButton, groupID }) {
  console.log('video pathh',video)


  const PrevButton = ({ onClick }) => {
    return <button className="slick-arrow slick-prev" style={{ background: 'black' }} onClick={onClick}>Previous</button>;
  };

  const NextButton = ({ onClick }) => {
    return <button className="slick-arrow slick-next" style={{ background: 'black' }} onClick={onClick}>Next</button>;
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />
  };

  const { _id } = useParams();
  const [isliked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [cookie, setCookie] = useCookies(['access_token']);



  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const profile = useSelector((state) => state.profile);
  const loggedInUserId = profile._id;
  let admin;
  if (profile.profileLevel === 0) {
    admin = true;
  }

  console.log('groupIds in feed', _id, groupID)

  const handlePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        try {
          await videoRef.current.pause();
          setIsPlaying(false);
        } catch (error) {
          console.error('Error playing video:', error);
        }
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }

  };


  useEffect(() => {
    if (loggedInUserId && postId) {
      const postLiked = likes.some((like) => like.userId === loggedInUserId);
      setLiked(postLiked);
    }
  }, [likes, loggedInUserId, postId]);



  const fetchComments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/posts/${postId}/comments`);
      const fetchedComments = response.data.comments;
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  const handleLike = async (e) => {
    setLiked(!isliked);
    try {

      const response = await axios.patch(
        `${baseUrl}/posts/${postId}/likes`,
        {
          userId: loggedInUserId,
          userName: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const id = await response.data._id;
      handleLikes(id);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };


  const handleDeletePost = async (userId) => {
    if (userId === profile._id) {
      try {
        await axios.delete(`${baseUrl}/${entityType}/${postId}`);
        onDeletePost(postId);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
    else {
      console.log("Cannot Delete")
    }
  };
  const formatCreatedAt = (timestamp) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = new Date(timestamp).toLocaleTimeString(undefined, options);
    const dateString = new Date(timestamp).toLocaleDateString();

    return `${dateString} ${timeString}`;
  };

  // if (!groupID && groupID !== _id) {
  //   console.log("SKIPPPP")
  //   return null; 
  // }

  return (
    <div className={`post ${className}`}>
      {loading ? (<div> Loading...</div>) : (<>
        <div className='top'>
          {profilePicture ? (<img src={profilePicture} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />) :
            (<Avatar src={comment} style={{ width: '50px', height: '50px' }} />)}
          <div className='info'>
            <h4>{username}</h4>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#301C58' }}>{formatCreatedAt(timestamp)}</span>
          </div>
          {(admin || userId === profile._id) && (
            <IconButton onClick={() => handleDeletePost(userId)} className='delete-button'>
              <img src={postDelete} />
            </IconButton>
          )}
        </div>
        {text && (
          <div className='texxt'>
            <p>{text}</p>
          </div>
        )}
        {image.length > 1 ? (
          <Slider {...settings}>
            {image.map((img, index) => (
              <div key={index} className='image'>
                <img src={img} alt={`Post Image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        ) : image.length === 1 ? (
          <div>
            <img src={image} alt={`image`} style={{ width: '-webkit-fill-available' }} />
          </div>
        ) : null
        }

        {video && (
          <div className='video'>
            <video
              ref={videoRef}
              autoPlay={isPlaying}
              preload="auto"
              controls={false}
              onClick={handlePlay}
            >
              <source src={video.videoPath} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <div className={`play-button ${isPlaying ? '' : ''}`} onClick={handlePlay}>
              <PlayCircleOutlineRoundedIcon fontSize='large' />
            </div>
          </div>
        )}
        {console.log('entity type1', entityType)}
        {entityType === 'posts' && (
          <div className='bottomAction'>
            <div className='action'>
              <img src={commentIcon} alt='comment-icon' className={`postAction grey`} />
              <h4>Comment</h4>
            </div>
            <div className='action' onClick={handleLike}>{
              isliked ? (
                <img src={liked} alt="" srcset="" />
              ) : (
                <img src={unliked} alt="" srcset="" />
              )
            } <h4>{isliked ? 'Liked' : 'Like'}</h4>
            </div>

            <div className='action'>
              <img src={share} alt='share-icon' className={`postAction grey`} />
              <h4>Share</h4>
            </div>
          </div>
        )}
      </>)}
    </div>
  );
}


export default Post;
