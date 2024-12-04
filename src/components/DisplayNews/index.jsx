import React from 'react';
import '../Post/Post.scss';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { Avatar, TextField, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ThumbUpRounded, ChatBubbleOutlineRounded, NearMeRounded, DeleteRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import baseUrl from "../../config";
import newsImage from "../../images/d-group.jpg";
import { FaArrowCircleRight } from 'react-icons/fa';

export const DisplayNews = ({ userId, postId, title,description, createdAt, picturePath, videoPath, department, onDeletePost }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const profile = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const isUserDepartment = profile.department === 'All' || profile.department === department || department === 'All';
    const navigate = useNavigate(); 
    let admin;
    if (profile.profileLevel === 0) {
        admin = true;
    }

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

    const handleDeletePost = async () => {
        if (userId === profile._id) {
            try {
                await axios.delete(`${baseUrl}/news/${postId}`);
                onDeletePost(postId);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        } else {
            console.log("Cannot Delete");
        }
    };

    const formatDate = (dateString) => {
        const dateParts = dateString.split(" ");
        const day = parseInt(dateParts[1], 10);
        const month = dateParts[2].substring(0, 3);
        const year = dateParts[3];

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
    };

    const handleReadMore = () => {
        navigate(`/news/${postId}`, {
            state: {
                userId,
                postId,
                description,
                createdAt,
                picturePath,
                videoPath,
                department,
                title
                //onDeletePost
            }
        }); // Pass props through state
    };

    return (
        <>
            {isUserDepartment && (
                <div className="news-card">
                    <div className="news-card-image">
                        <img src={picturePath || newsImage} alt="News" />
                    </div>
                    <div className="news-card-content">
                        <div className="news-card-header">
                            <h3 className="news-title">{title? title : 'News Headline'}</h3>
                            <span style={{ color: 'gray', fontSize: '14px', fontWeight:'600' }}>
                                Posted on {formatDate(createdAt)}
                            </span>
                            <br />
                            <span style={{ color: 'gray', fontWeight:'600' }}>By SuperAdmin</span>
                        </div>
                        <p className="news-description">{description}</p>
                        <button className="read-more" onClick={handleReadMore}>
                            Read More <FaArrowCircleRight className="arrow-icon" />
                        </button>
                    </div>
                    {(admin || userId === profile._id) && (
                        <IconButton onClick={handleDeletePost} style={{ color: 'red' }} className="delete-button">
                            <DeleteRounded />
                        </IconButton>
                    )}
                </div>
            )}
        </>
    );
};
