import React from 'react';
import '../Post/Post.scss';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { Avatar, TextField, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ThumbUpRounded, ChatBubbleOutlineRounded, NearMeRounded, DeleteRounded } from '@mui/icons-material';
import baseUrl from "../../config";
import newsImage from "../../images/d-group.jpg"
import { FaArrowCircleRight } from 'react-icons/fa';


export const DisplayNews = ({ userId, postId, description, createdAt, picturePath, videoPath, department, onDeletePost }) => {
    console.log('video', videoPath)
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const profile = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const isUserDepartment = profile.department === 'All' || profile.department === department || department === 'All';
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

    const handleDeletePost = async (userId) => {
        if (userId === profile._id) {
            try {
                await axios.delete(`${baseUrl}/news/${postId}`);
                onDeletePost(postId);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
        else {
            console.log("Cannot Delete")
        }
    };

    const formatDate = (dateString) => {
        // Split the string to extract day, month, and year
        const dateParts = dateString.split(" ");
        
        // Extract day, month, and year based on your format
        const day = parseInt(dateParts[1], 10); // `23` as a number
        const month = dateParts[2].substring(0, 3); // `Apr` as a 3-letter month
        const year = dateParts[3]; // `2024`
    
        // Determine the appropriate suffix for the day
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
    
        // Construct and return the formatted date string
        return `${day}${daySuffix(day)} ${month} ${year}`;
    };

    console.log("Raw createdAt:", createdAt);

    return (
        <>
            {isUserDepartment && (
                <div className="news-card">
                <div className="news-card-image">
                    <img src={picturePath || newsImage} alt="News" />
                </div>
                <div className="news-card-content">
                    <div className="news-card-header">
                    <h3 className="news-title">News Headline</h3>
                        <span style={{color:'gray', fontSize:'14px'}}>Posted on {formatDate(createdAt)}</span><br/>
                        <span style={{color:'gray'}}>By SuperAdmin</span>
                        
                    </div>
                    
                    <p className="news-description">{description}</p>
                    <button className="read-more">
                        Read More <FaArrowCircleRight className="arrow-icon" />
                    </button>
                </div>
                {(admin || userId === profile._id) && (
                            <IconButton onClick={handleDeletePost} style={{color:'red'}} className="delete-button">
                                <DeleteRounded />
                            </IconButton>
                        )}
            </div>
            )}
        </>
    )
}
