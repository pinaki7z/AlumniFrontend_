import React, { useState } from 'react';
import '../CreatePost/socialWall.css';
import picture from '../../images/profilepic.jpg'
import axios from 'axios';
import JobsInt from '../JobsInt';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import video from "../../../src/images/videocam.svg";
import gallery from "../../../src/images/gallery.svg";
import poll from "../../../src/images/poll.svg";
import PollModal from './PollModal';



const CreatePost1 = ({ name, onNewPost, entityType }) => {
  const { _id } = useParams();
  const [isExpanded, setExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [picturePath, setPicturePath] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cookie, setCookie] = useCookies(["access_token"]);
  const profile = useSelector((state) => state.profile);
  const [showPollModal, setShowPollModal] = useState(false); 

  const onHideModal = (modalVisibility) => {
    setShowModal(modalVisibility);
  };

  const handleInputClick = () => {
    setExpanded(!isExpanded);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 1) {
      console.log("ONLY ONE IMAGE");
      const file = files[0];
      setSelectedFile(file);


      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setPicturePath(base64String);
      };
      reader.readAsDataURL(file);

      setSelectedFiles([]);
    } else if (files.length > 1) {
      if (files.length > 5) {
        alert('Maximum limit is 5 images');
        return;
      }
      setSelectedFile(null);
      setSelectedFiles(files);
      const filePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(filePromises)
        .then(base64Strings => {
          console.log('Base64 strings:', base64Strings);
          setSelectedFiles(base64Strings);
          setPicturePath(base64Strings);
        })
        .catch(error => console.error('Error converting files to base64:', error));
    }

    console.log(selectedFiles);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userId", profile._id);
    formData.append("description", input);
    formData.append("department", profile.department);
    formData.append("profilePicture", profile.profilePicture)
    if (_id) formData.append("groupID", _id);

    if (selectedFile) {
      console.log('selected file is present', selectedFile)
      if (selectedFile.type.startsWith("image/")) {
        console.log('picture', picturePath)
        const reader = new window.FileReader();
        reader.onload = function (event) {
          const dataURL = event.target.result;

          const formDataObject = {
            picturePath: picturePath
          };


          for (let pair of formData.entries()) {
            const key = pair[0];
            const value = pair[1];


            formDataObject[key] = value;
            console.log("FORMDATAOBJECT:", formDataObject)
          }
          uploadImage(formDataObject);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        console.log('videoPath is present');
        formData.append("videoPath", selectedFile);
        const formDataObject = {};


        for (let pair of formData.entries()) {
          const key = pair[0];
          const value = pair[1];


          formDataObject[key] = value;
        }

        const currentDate = new Date();
        const folderName = currentDate.toISOString().split("T")[0];
        console.log("folder name:", folderName)

        uploadData(formDataObject, folderName);
      }
    } else if (selectedFiles) {
      console.log('selected files are present', selectedFiles);
      const formDataObject = {
        picturePath: picturePath
      };


      for (let pair of formData.entries()) {
        const key = pair[0];
        const value = pair[1];
        formDataObject[key] = value;
      }
      console.log("FORMDATAOBJECT:", formDataObject);
      uploadImage(formDataObject);
    }

    else {
      console.log('elseee')
      const formDataObject = {};


      for (let pair of formData.entries()) {
        const key = pair[0];
        const value = pair[1];


        formDataObject[key] = value;
        console.log("FORMDATAOBJECT:", formDataObject)
      }


      try {
        const response = await axios.post(
          `http://localhost:5000/${entityType}/create`,
          formDataObject,

        );
        const newPost = await response.data;
        onNewPost(newPost);
        setInput("");
        setImgUrl("");
        window.location.reload();
      } catch (error) {
        console.error("Error posting:", error);
      }
    }
  };

  const uploadData = async (formDataObject, folderName) => {
    try {
      console.log("request body", formDataObject);
      const response = await axios.post(
        `http://localhost:5000/${entityType}/create?folder=${folderName}`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newPost = await response.data;
      console.log(newPost);
      onNewPost(newPost);
      setInput("");
      setImgUrl("");
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const uploadImage = async (formDataObject) => {
    try {
      console.log("request body", formDataObject);
      const response = await axios.post(
        `http://localhost:5000/${entityType}/create`,
        formDataObject,

      );
      const newPost = await response.data;
      onNewPost(newPost);
      setInput("");
      setImgUrl("");
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const handleCreatePoll = async (question, options) => {
    const pollData = {
      userId: profile._id,
      description: input,
      department: profile.department,
      profilePicture: profile.profilePicture,
      pollQuestion: question,
      pollOptions: options,
    };
    if (_id) pollData.groupID = _id;

    try {
      const response = await axios.post(
        `http://localhost:5000/${entityType}/createPoll`,
        pollData,
      );
      const newPoll = await response.data;
      onNewPost(newPoll);
      setInput("");
      setShowPollModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };



  return (
    <div className={`social-media-post ${isExpanded ? 'expanded' : ''}`}>
      <div className={`overlay ${isExpanded ? 'expanded' : ''}`} onClick={handleInputClick}></div>
      <div className={`card ${isExpanded ? 'expanded' : ''}`} style={{ border: 'none',paddingTop: '50px' }}>
        <div className="card-header" style={{ backgroundColor: 'white',borderBottom: 'none',padding: '0px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={profile.profilePicture || picture} alt='Profile' width='75px' height='75px' style={{ borderRadius: '50%' }} />
            <div style={{borderBottom: '1px solid #ccc', width: '93%'}}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Whats Going on??"
                
              />
            </div>
          </div>
        </div>
        <div className={`img-job-vide ${isExpanded ? 'expanded' : ''}`}>
          <label style={{ border: '1px solid #6FBC94' ,color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize: '15px', gap: '5px',width: '18%' }}>
          <img src={gallery} alt="" srcset="" />Image
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              multiple
            />
          </label>
          <button style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', marginLeft: '0px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '15px', width: '18%', borderRadius: '3em',border: '1px solid #6FBC94'  }} onClick={() => setShowPollModal(true)}><img src={poll} alt="" srcset="" />Poll</button>
  

          <label style={{ border: '1px solid #6FBC94' , color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', fontSize: '15px',display: 'flex', alignItems: 'center', justifyContent: 'center',width: '18%', gap: '5px' }}>
          <img src={video} alt="" srcset="" />Video
            <input
              type='file'
              accept='video/*'
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </label>
          <div style={{ marginTop: '4px',marginLeft: 'auto' }}>
              <button onClick={handleSubmit} style={{
                float: 'right', color: '#ffffff',
                backgroundColor: '#6FBC94',
                borderColor: '#174873',
                fontSize: '16px'
              }}>Post</button>
            </div>
        </div>
      </div>
      <PollModal
        show={showPollModal}
        onHide={() => setShowPollModal(false)}
        onCreatePoll={handleCreatePoll}
      />
    </div>

  );
};

export default CreatePost1;
