import React, { useState } from 'react';
import '../CreatePost/socialWall.css';
import picture from '../../images/profilepic.jpg'
import axios from 'axios';
import JobsInt from '../JobsInt';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import video from "../../images/videocam.svg";
import gallery from "../../images/gallery.svg";
import poll from "../../images/poll.svg";
import PollModal from './PollModal';
import baseUrl from '../../config';
import { toast } from "react-toastify";
import format from "date-fns/format";
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";


function MyVerticallyCenteredModal(props) {
  const [isEditing, setIsEditing] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [createGroup, setCreateGroup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();

  // New states for price type, amount, and currency
  const [priceType, setPriceType] = useState("free");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [newEvent, setNewEvent] = useState({
    title: "", start: "", end: "", startTime: "00:00",
    endTime: "00:00", picture: "", cName: "",
    cNumber: "", cEmail: "", location: ""
  });
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([props.selectedEvent]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({ ...newEvent, picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = () => {
    const { title, start, end, startTime, endTime, picture, cName, cNumber, cEmail, location } = newEvent;

    if (!title || !start || !end || !picture) {
      alert("Please provide title, start date, end date and image");
      return;
    }

    const formattedStart = format(new Date(start), "yyyy-MM-dd");
    const formattedEnd = format(new Date(end), "yyyy-MM-dd");
    setLoading(true);

    const eventData = {
      userId: profile._id,
      title,
      start: formattedStart,
      end: formattedEnd,
      startTime,
      userName: `${profile.firstName} ${profile.lastName}`,
      profilePicture: profile.profilePicture,
      endTime,
      picture,
      cName,
      cNumber,
      cEmail,
      location,
      department: profile.department,
      createGroup,
      groupEvent : _id ? true : false,
      groupId : _id ? _id : null,
      // Include price type and amount based on selection
      priceType,
      amount: priceType === "paid" ? amount : null, // Only include amount if it's paid
      currency: priceType === "paid" ? currency : ""
    };
    console.log('eventData', eventData);

    fetch(`${baseUrl}/events/createEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      .then((createdEvent) => {
        //setAllEvents([...allEvents, createdEvent]);
        setLoading(false);
        window.location.reload();

        setNewEvent({ title: "", start: "", end: "", startTime: "", endTime: "", picture: null, cEmail: "", cName: "", cNumber: "", location: "" });
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  const handleEditEvent = () => {
    const { title, start, end, startTime, endTime, picture, cName, cNumber, cEmail, location } = newEvent;
    const eventId = props.selectedEvent._id;

    if (!title || !start || !end) {
      alert("Please provide title, start date, and end date.");
      return;
    }

    try {
      const formattedStart = format(new Date(start), "yyyy-MM-dd");
      const formattedEnd = format(new Date(end), "yyyy-MM-dd");

      const updatedEvent = {
        title: title,
        start: formattedStart,
        end: formattedEnd,
        startTime,
        endTime,
        picture,
        cName,
        cNumber,
        cEmail,
        location,
        priceType,
        amount: priceType === "paid" ? amount : "0", // Only include amount if it's paid
        currency: priceType === "paid" ? currency : ""
      };

      const jsonEventData = JSON.stringify(updatedEvent);

      fetch(`${baseUrl}/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonEventData,
      })
        .then(() => {
          const updatedEvents = allEvents.map((event) =>
            event._id === eventId ? updatedEvent : event
          );

          setAllEvents(updatedEvents);
          setSelectedEvent(null);
          props.onHide();
          toast.success("Event updated successfully.");
          window.location.reload();
        })
        .catch((error) => console.error("Error updating event:", error));
    } catch (jsonError) {
      console.error("JSON serialization error:", jsonError);
      alert("Error updating event: JSON serialization error");
    }
  };

  const handleDateChange = (date, field) => {
    if (props.isEditing) {
      const updatedEvent = { ...newEvent };
      updatedEvent[field] = date;
      setNewEvent(updatedEvent);
      setIsEditing(true);
    } else {
      setNewEvent({ ...newEvent, [field]: date });
    }
  };

  const handleTimeChange = (time, field) => {
    const updatedEvent = { ...newEvent };
    updatedEvent[field] = time;
    setNewEvent(updatedEvent);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: '#f5dad2' }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.isEditing ? "Edit Event" : "Add Event"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', gap: '2em', backgroundColor: '#eaf6ff' }}>
        <Col>
          <Row style={{ padding: '0px 5px' }}>
            <input
              type="text"
              placeholder="Add/Edit Title"
              style={{ width: "100%", padding: "0.5em", borderRadius: "10px" }}
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <br />
            <br />
            <label htmlFor={newEvent.picture}>Insert a Picture:-</label>
            <br />
            <input type="file" name={newEvent.picture}
              style={{ width: '60%' }}
              onChange={handleImageChange} />

            <input
              type="text"
              placeholder="Enter Coordinator Name"
              style={{ width: "100%", padding: "0.5em", borderRadius: "10px" }}
              value={newEvent.cName}
              onChange={(e) =>
                setNewEvent({ ...newEvent, cName: e.target.value })
              }
            />
          </Row>
        </Col>

        <Col>
          <DatePicker
            placeholderText="Start Date"
            style={{ marginRight: "10px", padding: "0.5em" }}
            selected={newEvent.start}
            onChange={(date) => handleDateChange(date, "start")}
          />
          <br /><br />
          <input type="time" id="appt" name="startTime" value={newEvent.startTime} onChange={(e) =>
            setNewEvent({ ...newEvent, startTime: e.target.value })
          } />
          <br /><br />
          <input
            type="number"
            placeholder="Enter Coordinator Contact Number"
            style={{ width: "100%", padding: "0.5em", borderRadius: "10px" }}
            value={newEvent.cNumber}
            onChange={(e) =>
              setNewEvent({ ...newEvent, cNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter event location"
            style={{ width: "100%", padding: "0.5em", borderRadius: "10px" }}
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
          />
        </Col>

        <Col>
          <DatePicker
            placeholderText="End Date"
            style={{ padding: "0.5em" }}
            selected={newEvent.end}
            onChange={(date) => handleDateChange(date, "end")}
          />
          <br /><br />
          <input type="time" id="appt" name="endTime" value={newEvent.endTime} onChange={(e) =>
            setNewEvent({ ...newEvent, endTime: e.target.value })
          } />
          <input
            type="email"
            placeholder="Enter Coordinator Email"
            style={{ width: "100%", padding: "0.5em", borderRadius: "10px" }}
            value={newEvent.cEmail}
            onChange={(e) =>
              setNewEvent({ ...newEvent, cEmail: e.target.value })
            }
          />
        </Col>
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: '#f5dad2' }}>
        <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="create-group"
            checked={createGroup}
            onChange={(e) => setCreateGroup(e.target.checked)}
          />
          <label htmlFor="create-group" style={{ marginLeft: '0.5em' }}>Create a group with the same event title name</label>
        </div>

        {/* Free/Paid Radio Buttons */}
        <div>
          <label>
            <input
              type="radio"
              value="free"
              checked={priceType === "free"}
              onChange={(e) => setPriceType(e.target.value)}
            /> Free
          </label>
          <label style={{ marginLeft: '1em' }}>
            <input
              type="radio"
              value="paid"
              checked={priceType === "paid"}
              onChange={(e) => setPriceType(e.target.value)}
            /> Paid
          </label>
        </div>

        {/* Conditionally render the price and currency input */}
        {priceType === "paid" && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              style={{ width: '100px', padding: '0.5em', borderRadius: '5px' }}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ padding: '0.5em', borderRadius: '5px' }}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JYN">JYN</option>
            </select>
          </div>
        )}

        <Button onClick={props.isEditing ? handleEditEvent : handleAddEvent}>
          {loading
            ? 'Adding Event...'
            : props.isEditing
              ? 'Edit Event'
              : 'Add Event'}
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



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
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          `${baseUrl}/${entityType}/create`,
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
        `${baseUrl}/${entityType}/create?folder=${folderName}`,
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
        `${baseUrl}/${entityType}/create`,
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
    console.log('question1',question, options);
    const pollData = {
      userId: profile._id,
      userName: `${profile.firstName} ${profile.lastName}`,
      profilePicture: profile.profilePicture,
      question: question,
      options: options,
    };
    if (_id) pollData.groupID = _id;

    try {
      const response = await axios.post(
        `${baseUrl}/poll/createPoll`,
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
          <label style={{ border: '1px solid #a98de3' ,color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center',fontSize: '15px', gap: '5px',width: '18%' }}>
          <img src={gallery} alt="" srcset=""/><p className="d-none d-lg-block" style={{marginBottom: '0px'}}>Image</p>
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              multiple
            />
          </label>
          <button style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', marginLeft: '0px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '15px', width: '18%', borderRadius: '3em',border: '1px solid #a98de3'  }} onClick={() => setShowPollModal(true)}><img src={poll} alt="" srcset="" /><p className="d-none d-lg-block" style={{marginBottom: '0px'}}>Poll</p></button>
  

          <label style={{ border: '1px solid #a98de3' , color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', fontSize: '15px',display: 'flex', alignItems: 'center', justifyContent: 'center',width: '18%', gap: '5px' }}>
          <img src={video} alt="" srcset="" /><p className="d-none d-lg-block" style={{marginBottom: '0px'}}>Video</p>
            <input
              type='file'
              accept='video/*'
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </label>
          {_id && <label onClick={() => setModalShow(true)} style={{ border: '1px solid #a98de3' , color: 'black', padding: '5px 10px', cursor: 'pointer', borderRadius: '3em', fontSize: '15px',display: 'flex', alignItems: 'center', justifyContent: 'center',width: '18%', gap: '5px' }}>
          <img src={video} alt="" srcset="" />Event
          </label>}
          <div style={{ marginTop: '4px',marginLeft: 'auto' }}>
              <button onClick={handleSubmit} style={{
                float: 'right', color: '#ffffff',
                backgroundColor: '#a98de3',
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
      <MyVerticallyCenteredModal
          show={modalShow}
          isEditing={isEditing}
          selectedEvent={selectedEvent}
          onHide={() => {
            setModalShow(false);
            setSelectedEventDetails(null);
          }}
        />
    </div>

  );
};

export default CreatePost1;
