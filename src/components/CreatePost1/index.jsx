import React, { useState } from 'react';
import '../CreatePost/socialWall.css';
import picture from '../../images/profilepic.jpg'
import { FaLocationArrow } from 'react-icons/fa';
import profilepic from '../../images/profilepic.jpg';
import { GrDocumentText } from 'react-icons/gr';
import { RiFileMusicFill } from 'react-icons/ri';
import { FcGallery, FcVideoCall } from 'react-icons/fc';
import { MdPoll, MdMic } from 'react-icons/md';
import { BiSolidBriefcase } from 'react-icons/bi';
import { IoMdBriefcase } from 'react-icons/io';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import Feeed from '../Feeed';
import axios from 'axios';
import JobsInt from '../JobsInt';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";


const CreatePost1 = ({ name, onNewPost, entityType }) => {
  const { _id} = useParams();
  const [isExpanded, setExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [picturePath,setPicturePath] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cookie, setCookie] = useCookies(["access_token"]);
  const profile = useSelector((state) => state.profile);


  console.log('group id',_id)

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
    if(_id) formData.append("groupID", _id);

    if (selectedFile) {
      console.log('selected file is present',selectedFile)
      if (selectedFile.type.startsWith("image/")) {
        console.log('picture',picturePath)
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
    } else if(selectedFiles){
      console.log('selected files are present',selectedFiles);
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
          `https://alumni-backend-chi.vercel.app/${entityType}/create`,
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
        `https://alumni-backend-chi.vercel.app/${entityType}/create?folder=${folderName}`,
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
        `https://alumni-backend-chi.vercel.app/${entityType}/create`,
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



  return (
    <div className={`social-media-post ${isExpanded ? 'expanded' : ''}`}>
      <div className={`overlay ${isExpanded ? 'expanded' : ''}`} onClick={handleInputClick}></div>
      <div className={`card ${isExpanded ? 'expanded' : ''}`}>
        <div className="card-header" style={{ backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={profile.profilePicture || picture} alt='Profile' width='40px' height='40px' style={{ borderRadius: '50%' }} />
            <p style={{ marginBottom: '0rem', fontWeight: '500' }}>{profile.firstName}</p>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Whats Going on??"
            onClick={handleInputClick}
          />
        </div>
        {isExpanded && (
          <div className="expanded-options">
            <div className='img-job-vid'>
              <label style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '5px 10px', cursor: 'pointer', textAlign: 'center', borderRadius: '3em', margin: '5px', display: 'flex', height: '6vh', fontSize: '14px', alignItems: 'center', width: '30%', justifyContent: 'center', gap: '3px' }}>
                <FcGallery style={{ color: 'yellow' }} /> Upload Image
                <input
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                  multiple
                />
              </label>
              <button style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '5px 10px', marginLeft: '0px', borderRadius: '3em', marginTop: '4px', fontSize: '14px', width: '30%', height: '6vh', gap: '3px', marginBottom: '5px' }} onClick={() => setShowModal(true)}><BiSolidBriefcase style={{ color: 'black' }} />Create Job</button>
              {showModal && <JobsInt modalShow={showModal} onHideModal={onHideModal} />}
              <label style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '5px 10px', cursor: 'pointer', textAlign: 'center', borderRadius: '3em', margin: '5px', display: 'flex', height: '6vh', fontSize: '14px', alignItems: 'center', width: '30%', justifyContent: 'center', gap: '3px' }}>
                <FcVideoCall style={{ color: 'yellow' }} /> Upload Video
                <input
                  type='file'
                  accept='video/*'
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                  multiple
                />
              </label>
            </div>
            <div className='poll-gif-voice-feel'>
              <button><div><MdPoll style={{ color: '#31a38c' }} /></div>Create Poll</button>
              <button><div><IoMdBriefcase style={{ color: '#5b5b5b' }} /></div>GIF</button>
              <button><div><MdMic style={{ color: '#ff3a55' }} /></div>Record Voice</button>
              <button ><div><BsFillEmojiSmileFill style={{ color: '#f3c038' }} /></div>Feelings</button>
            </div>
            <div className="file-loc-audio">
              <button><div><GrDocumentText style={{ color: '#6bcfef' }} /></div>Upload Files</button>
              <button><div><FaLocationArrow style={{ color: '#f37b8b' }} /></div>Location</button>
              <button><div><RiFileMusicFill style={{ color: '#4db3f6' }} /></div>Audio Upload</button>
            </div>
            <hr style={{ margin: '0rem' }} />
            <div style={{ marginTop: '4px' }}>
              <button onClick={handleSubmit} style={{
                float: 'right', color: '#ffffff',
                backgroundColor: '#174873',
                borderColor: '#174873'
              }}>Share</button>
            </div>
          </div>
        )}
        <div className={`img-job-vide ${isExpanded ? 'expanded' : ''}`}>
          <label style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', display: 'flex', alignItems: 'center', fontSize: '15px', gap: '5px' }}>
            <FcGallery style={{ color: 'yellow' }} /> Upload Image
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </label>
          <button style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '5px 10px', marginLeft: '0px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '15px', width: '30%', borderRadius: '3em' }} onClick={() => setShowModal(true)}><BiSolidBriefcase style={{ color: 'black' }} />Create Job</button>
          {console.log('showModal', showModal)}
          {showModal && <JobsInt modalShow={showModal} onHideModal={onHideModal} />}

          <label style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', fontSize: '15px' }}>
            <FcVideoCall style={{ color: 'yellow' }} /> Upload Video
            <input
              type='file'
              accept='video/*'
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>
    </div>

  );
};

export default CreatePost1;
