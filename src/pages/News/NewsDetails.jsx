import React from 'react';
import { useLocation } from 'react-router-dom';

const NewsDetails = () => {
    const location = useLocation();
    const { userId, postId, description, createdAt, picturePath, videoPath, department, onDeletePost } = location.state;

    return (
        <div>
            <h1>News Details</h1>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Posted On:</strong> {createdAt}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default NewsDetails;
