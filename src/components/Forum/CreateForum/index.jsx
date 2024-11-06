import React, { useState } from 'react';
import CKeditor from "../../CKeditor/CKeditor.jsx";
import "./CreateForum.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import baseUrl from '../../../config.js';

const CreateForum = () => {
  const [newForum, setNewForum] = useState({ title: "", description: "", picture: "", type: "Public" });
  const [editorValue, setEditorValue] = useState('');
  const navigateTo = useNavigate();
  const profile = useSelector((state) => state.profile);

  const handleTitleChange = (e) => {
    setNewForum({ ...newForum, title: e.target.value });
  };

  const handleEditorChange = (value) => {
    setNewForum({ ...newForum, description: value });
    setEditorValue(value);
  };

  const handleTypeChange = (e) => {
    setNewForum({ ...newForum, type: e.target.value });
  };

  const handleSave = async () => {
    try {
      const body = {
        userId: profile._id,
        title: newForum.title,
        picture: newForum.picture,
        description: newForum.description,
        type: newForum.type,
        department: profile.department,
        userName: `${profile.firstName} ${profile.lastName}`,
        profilePicture: profile.profilePicture
      };

      const response = await axios.post(`${baseUrl}/forums/createForum`, body);

      console.log('Forum created:', response.data);
      toast.success("New Forum Created");
      navigateTo("/forums");
    } catch (error) {
      console.error('Error creating forum:', error);
    }
  };

  return (
    <div className="create-forum-container">
      <h1 className="create-forum-title">Create New Forum</h1>
      <div className="form-container">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input 
            type='text' 
            name='title' 
            placeholder='Enter Title' 
            className="form-input" 
            value={newForum.title} 
            onChange={handleTitleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select 
            value={newForum.type} 
            onChange={handleTypeChange} 
            className="form-input" 
            required
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <CKeditor value={editorValue} onChange={handleEditorChange} setNewForum={setNewForum} />
        </div>
        <div className="form-buttons">
          <button className="back-button" onClick={() => navigateTo("/forums")}>Back</button>
          <button className="create-button" onClick={handleSave}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateForum;
