import React from 'react';
import { useLocation } from 'react-router-dom';
import './NewsDetails.css';

const NewsDetails = () => {
    const location = useLocation();
    const { userId, postId, description, title, createdAt, picturePath, videoPath, department, onDeletePost } = location.state;

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

    // Dummy placeholders
    const dummyImage = "https://via.placeholder.com/800x400.png?text=No+Image+Available";
    const dummyDescription =
        "No description provided. This is a placeholder description for the news content.";

    return (
        <div className="news-details">
            <div className="news-card-header">
                            <h1 className="news-title">{title? title : 'News Headline'}</h1>
                            <span style={{ color: 'gray', fontSize: '14px', fontWeight:'600' }}>
                                Posted on {formatDate(createdAt)}
                            </span>
                            <br />
                            <span style={{ color: 'gray', fontWeight:'600' }}>By SuperAdmin</span>
                        </div>
            {/* <h1 className="news-title">News Headline</h1>
            <p className="news-meta">
                Posted on {createdAt}<br/><br/>
                By SuperAdmin
            </p> */}
            <div className="news-media">
            {picturePath || videoPath ? (
                    <>
                        {picturePath && <img src={picturePath} alt="News" />}
                        {videoPath && (
                            <video controls>
                                <source src={videoPath} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </>
                ) : (
                    <img src={dummyImage} alt="Dummy News" />
                )}
            </div>
            <p className="individual-news-description">{description || dummyDescription}</p>
        </div>
    );
};

export default NewsDetails;
