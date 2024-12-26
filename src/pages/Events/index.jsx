import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect, useRef } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enIN from 'date-fns/locale/en-US';
import './Events.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TimePicker from 'react-time-picker';
import { Col, Row } from 'react-bootstrap';
import { FaCalendarPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import axios from 'axios';
import pic from "../../images/profilepic.jpg";
import { Avatar, IconButton, Modal as MModal, Box, Modal as MMModal } from '@mui/material';
import { useParams } from "react-router-dom";
import { lineSpinner } from 'ldrs';
import EventDisplay from "../../components/Feeed/EventDisplay";
import baseUrl from "../../config";
import { borderTop } from "@mui/system";

lineSpinner.register()





function MyVerticallyCenteredModal(props) {
  const [isEditing, setIsEditing] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [createGroup, setCreateGroup] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setNewEvent({ ...newEvent, [field]: date });
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
        setAllEvents([...allEvents, createdEvent]);
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

  // const handleDateChange = (date, field) => {
  //   if (props.isEditing) {
  //     const updatedEvent = { ...newEvent };
  //     updatedEvent[field] = date;
  //     setNewEvent(updatedEvent);
  //     setIsEditing(true);
  //   } else {
  //     setNewEvent({ ...newEvent, [field]: date });
  //   }
  // };

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
      className="modal-dialog-scrollable"
    >
      <Modal.Header className="border-0">
        <Modal.Title id="contained-modal-title-vcenter" style={{ fontWeight: 700 }}>
          {props.isEditing ? "Edit Event" : "Add Event"}
        </Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onHide}
          style={{
            backgroundColor: "#d1d5db", // Equivalent to Tailwind's bg-gray-300
            color: "#1f2937",
            borderRadius: "50%", // Make it rounded
            border: "none",
            padding: "0.5em",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#9ca3af")} // Equivalent to Tailwind's hover:bg-gray-400
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d1d5db")}
        />
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "rgb(243, 244, 246)", // Equivalent to Tailwind's .bg-gray-100
          padding: "1rem",
          margin: "15px",
          borderRadius: 5,
          maxHeight: "400px",
          overflowY: "auto",
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "rgb(136, 136, 136) rgb(241, 241, 241)", // For Firefox
        }}
      >
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              required
              style={{ borderColor: "black" }} // Adding black border
            />
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Start Date</label><br />
              <DatePicker
                className="form-control"
                selected={newEvent.start || new Date()} // Set to current date if not provided
                onChange={(date) => handleDateChange(date, "start")}
                required
                style={{ borderColor: "black" }} // Adding black border
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">End Date</label><br />
              <DatePicker
                className="form-control"
                selected={newEvent.end || new Date()} // Set to current date if not provided
                onChange={(date) => handleDateChange(date, "end")}
                required
                style={{ borderColor: "black" }} // Adding black border
              />
            </div>
          </div>
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <input
                type="time"
                className="form-control"
                value={newEvent.startTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startTime: e.target.value })
                }
                style={{ borderColor: "black" }} // Adding black border
              />
            </div>
            <div className="col-md-6">
              <input
                type="time"
                className="form-control"
                value={newEvent.endTime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endTime: e.target.value })
                }
                style={{ borderColor: "black" }} // Adding black border
              />
            </div>
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Event Location"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              required
              style={{ borderColor: "black" }} // Adding black border
            />
          </div>
          {/* Free/Paid Radio Buttons */}
          <div className="mb-3">
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }} className="mb-3">
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Coordinator Name"
              value={newEvent.cName}
              onChange={(e) =>
                setNewEvent({ ...newEvent, cName: e.target.value })
              }
              style={{ borderColor: "black" }} // Adding black border
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Coordinator Number"
              value={newEvent.cNumber}
              onChange={(e) =>
                setNewEvent({ ...newEvent, cNumber: e.target.value })
              }
              required
              style={{ borderColor: "black" }} // Adding black border
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Coordinator Email"
              value={newEvent.cEmail}
              onChange={(e) =>
                setNewEvent({ ...newEvent, cEmail: e.target.value })
              }
              required
              style={{ borderColor: "black" }} // Adding black border
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              style={{ borderColor: "black" }} // Adding black border
            />
          </div>


        </form>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="create-group"
            checked={createGroup}
            onChange={(e) => setCreateGroup(e.target.checked)}
          />
          <label htmlFor="create-group" style={{ marginLeft: '0.5em' }}>Create a group with the same event title name</label>
        </div>
        <Button
          variant="light"
          onClick={props.onHide}
          style={{ backgroundColor: "#f1f1f1", color: "#000" }} // Custom styling for Cancel button
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={props.isEditing ? handleEditEvent : handleAddEvent}
        >
          {props.isEditing ? "Edit Event" : "Add Event"}
        </Button>
      </Modal.Footer>
    </Modal>
  );


}



const locales = {
  "en-IN": enIN,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Events() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", startTime: "", endTime: "", type: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [selectedEventDetailsPopup, setSelectedEventDetailsPopup] = useState(null);
  const calendarRef = useRef(null);
  const profile = useSelector((state) => state.profile);
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);



  useEffect(() => {
    if (selectedEventDetails) {
      setEventId(selectedEventDetails._id); // Set eventId
    }
  }, [selectedEventDetails]);

  useEffect(() => {
    if (eventId) {
      checkAttendanceStatus(eventId); // Call checkAttendanceStatus only after eventId is set
    }
  }, [eventId]);






  const handleAttendance = async (attendance, eventId) => {
    console.log('handling attendance')
    setAttendanceLoading(true);
    console.log('event titlee', selectedEvent.title, attendance, eventId)
    try {
      let body = {
        userId: profile._id,
        userName: `${profile.firstName} ${profile.lastName}`,
        profilePicture: profile.profilePicture,
        attendance,
        groupName: selectedEvent.title
      };

      const response = await axios.put(
        `${baseUrl}/events/attendEvent/${eventId}`,
        body
      );

      if (response.status === 200) {
        toast.success('Vote submitted successfully.');
        setNewEvent(response.data.event);
        checkAttendanceStatus();
        setAttendanceLoading(false);
      } else {
        console.error('Unexpected response status:', response.status, response.message);
        alert('An unexpected error occurred. Please try again.');
        setAttendanceLoading(false);
      }
    } catch (error) {
      console.error('Error submitting attendance:', error);
      toast.error(error.response?.data?.message || 'An error occurred.');
      setAttendanceLoading(false);
    }
  };

  // const gapi = window.gapi;
  // const google = window.google;

  // const CLIENT_ID = '221910855256-3ra04lqbdb4elusir5clvsail6ldum53.apps.googleusercontent.com';
  // const API_KEY = 'AIzaSyCduY-X8qZOq43I8zwsHlf2WWZ1ewDjpdc';
  // const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  // const SCOPES = "https://www.googleapis.com/auth/calendar";
  // const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';



  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }

  const handleClickOutsideCalendar = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      !event.target.closest(".modal-open")
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the calendar
    window.addEventListener("click", handleClickOutsideCalendar);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutsideCalendar);
    };
  }, []);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        // Check if an event is selected
        if (selectedEvent) {
          handleDeleteEvent();
        }
      }
    };

    // Add event listener for the delete key
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEvent]);




  useEffect(() => {
    fetchEvents();
    if (_id) {
      fetchEventDetails(_id);
    }
  }, [_id]);

  const fetchEventDetails = (eventId) => {
    setLoading(true);
    fetch(`${baseUrl}/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedEventDetailsPopup(data);
        // setModalShow(true);
        setDetailsModalShow(true)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error)
        setLoading(false);
      });

  };

  const fetchEvents = () => {
    fetch(`${baseUrl}/events`)
      .then((response) => response.json())
      .then((data) => {
        // Filter events based on groupId or no groupId
        const filteredEvents = data.filter((event) => {
          // If groupId is not present, include the event
          if (!event.groupId) {
            return true;
          }
          // If groupId is present, check if it's in profile.groupNames
          return profile.groupNames.includes(event.groupId);
        });

        // Convert start and end dates to JavaScript Date objects
        const eventsWithDates = filteredEvents.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        // Add an id to each event
        const eventsWithIds = eventsWithDates.map((event, index) => ({
          ...event,
          id: index + 1,
        }));

        // Set the filtered and processed events
        setAllEvents(eventsWithIds);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };



  const checkAttendanceStatus = async () => {
    if (!eventId) {
      console.log('No eventId provided, skipping API call.');
      return; // Exit early if eventId is null or undefined
    }

    console.log('eventId check', eventId);
    try {
      const response = await axios.get(`${baseUrl}/events/attendees/${eventId}`);
      if (response.status === 200) {
        setAttendees(response.data);
        determineAttendanceStatus(response.data);
      }
    } catch (error) {
      console.error('Error :', error);
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };


  const determineAttendanceStatus = (attendees) => {
    if (attendees.willAttend.some(user => user.userId === profile._id)) {
      setAttendanceStatus(0);
    } else if (attendees.mightAttend.some(user => user.userId === profile._id)) {
      setAttendanceStatus(1);
    } else if (attendees.willNotAttend.some(user => user.userId === profile._id)) {
      setAttendanceStatus(2);
    } else {
      setAttendanceStatus(null);
    }
  };





  function handleEventClick(event) {

    setSelectedEvent(event);
    checkAttendanceStatus(event._id)
    console.log("selected event", selectedEvent)
    setIsEditing(true);
    console.log("edit", isEditing)
    setNewEvent({
      title: event.title,
      start: event.start,
      end: event.end,
      startTime: event.startTime,
      endTime: event.endTime,
      picture: event.picture,
      cName: event.cName,
      cNumber: event.cNumber,
      cEmail: event.cEmail
    });
    setSelectedEventDetails(event);
  }



  const handleDeleteEvent = (e) => {
    const eventId = selectedEvent._id;
    console.log("id", eventId);
    fetch(`${baseUrl}/events/${eventId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the event from the events array
        const updatedEvents = allEvents.filter(
          (event) => event._id !== eventId
        );

        setAllEvents(updatedEvents);
        setSelectedEvent(null);
        setIsEditing(false);

        toast.success('Event deleted successfully.');
      })
      .catch((error) => console.error('Error deleting event:', error));

  };
  const addToGoogleCalendar = () => {
    console.log('handle add to google calendar')

    // gapi.load('client:auth2', () => {
    //   console.log('loaded client')

    //   gapi.client.init({
    //     apiKey: API_KEY,
    //     clientId: CLIENT_ID,
    //     discoveryDocs: DISCOVERY_DOC,
    //     scope: SCOPES,
    //   })

    //   gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //   gapi.auth2.getAuthInstance().signIn()
    //   .then(() => {

    //     var event = {
    //       'summary': 'Awesome Event!',
    //       'location': '800 Howard St., San Francisco, CA 94103',
    //       'description': 'Really great refreshments',
    //       'start': {
    //         'dateTime': '2024-02-15T09:00:00-07:00',
    //         'timeZone': 'America/Los_Angeles'
    //       },
    //       'end': {
    //         'dateTime': '2020-06-28T17:00:00-07:00',
    //         'timeZone': 'America/Los_Angeles'
    //       },
    //       'recurrence': [
    //         'RRULE:FREQ=DAILY;COUNT=2'
    //       ],
    //       'attendees': [
    //         {'email': 'lpage@example.com'},
    //         {'email': 'sbrin@example.com'}
    //       ],
    //       'reminders': {
    //         'useDefault': false,
    //         'overrides': [
    //           {'method': 'email', 'minutes': 24 * 60},
    //           {'method': 'popup', 'minutes': 10}
    //         ]
    //       }
    //     }

    //     var request = gapi.client.calendar.events.insert({
    //       'calendarId': 'primary',
    //       'resource': event,
    //     })

    //     request.execute(event => {
    //       console.log(event)
    //       window.open(event.htmlLink)
    //     })



    //   })
    // })
  }


  const [open, setOpen] = useState(false);
  const handleOpenModal = (eventId) => {
    console.log('eventid openmodal', eventId)
    checkAttendanceStatus(eventId);
    setOpen(true)
  };
  const handleCloseModal = () => setOpen(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="Events mx-auto px-4 py-8">
      <div style={{ textAlign: 'left', padding: '20px', borderRadius: '10px', marginBottom: '10px', backgroundColor: '#a98de3' }}>
        <h2 style={{ margin: '0', color: 'white' }}>Event Calendar</h2>
        <p style={{ marginTop: '10px', fontSize: '15px', color: 'black' }}>
          Stay updated on upcoming events and opportunities to connect.
        </p>
      </div>

      <div class="bg-white rounded-lg p-4 shadow-lg" ref={calendarRef}>
        <MyVerticallyCenteredModal
          show={modalShow}
          isEditing={isEditing}
          selectedEvent={selectedEvent}
          onHide={() => {
            setModalShow(false);
            setSelectedEventDetails(null);
          }}
        />
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '60vh', fontWeight: '600' }}
          selectable
          onSelectEvent={handleEventClick}
        />

        {(profile.profileLevel === 0 || profile.profileLevel === 1) && (
          <Button
            className="add-event-button"
            variant="primary"
            onClick={() => setModalShow(true)}
            style={{
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              position: 'absolute',
              backgroundColor: '#301c5B'
            }}
          >
            <FaCalendarPlus />
          </Button>)}


        {selectedEventDetails && (
          <Modal
            show={true}
            onHide={() => setSelectedEventDetails(null)}
            size="lg"
          >
            <Modal.Header style={{ backgroundColor: '#a98de3' }} closeButton>
              <Modal.Title>Event Details</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#eaf6ff' }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <p><span style={{ fontWeight: '500' }}>Title:</span> {selectedEventDetails.title}</p>
                  <p><span style={{ fontWeight: '500' }}>Start Date:</span> {formatDate(selectedEventDetails.start)}</p>
                  <p><span style={{ fontWeight: '500' }}>End Date:</span> {formatDate(selectedEventDetails.end)}</p>
                  <p><span style={{ fontWeight: '500' }}>Start Time:</span>  {selectedEventDetails.startTime} hrs</p>
                  <p><span style={{ fontWeight: '500' }}>End Time:</span> {selectedEventDetails.endTime} hrs</p>
                  <p><span style={{ fontWeight: '500' }}>Coordinator Name:</span> {selectedEventDetails.cName}</p>
                  <p><span style={{ fontWeight: '500' }}>Coordinator Number:</span> {selectedEventDetails.cNumber}</p>
                  <p><span style={{ fontWeight: '500' }}>Coordinator Email:</span> {selectedEventDetails.cEmail}</p>
                  <p><span style={{ fontWeight: '500' }}>Location:</span> {selectedEventDetails.location}</p>
                </div>
                <img src={selectedEventDetails.picture} style={{ height: '200px', width: '300px', marginLeft: 'auto' }} />
              </div>
              <div >
                {/* <Button variant="success" onClick={addToGoogleCalendar}>
                  Add To Google Calendar
                </Button> */}
                <div>
                  {selectedEventDetails.priceType === 'paid' ? (
                    <p>This is a paid event</p>
                  ) : selectedEventDetails.priceType === 'free' ? (
                    <p>This is a free event</p>
                  ) : null}

                  <ul style={{ paddingLeft: '0px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <div className="percentage-bar-container">
                      <label style={{ display: 'flex', gap: '5px' }}>
                        <input
                          type="checkbox"
                          checked={attendanceStatus === 0}
                          onChange={() => {
                            if (selectedEventDetails.priceType === 'free') {
                              handleAttendance(0, selectedEventDetails._id);
                            } else if (selectedEventDetails.priceType === 'paid') {
                              window.open(
                                "https://razorpay.com/payment-link/plink_PA5q7Jm6wJENlt",
                                "_blank"
                              );
                            }
                          }}
                        />
                        I will attend
                      </label>
                    </div>

                    <div className="percentage-bar-container">
                      <label style={{ display: 'flex', gap: '5px' }}>
                        <input
                          type="checkbox"
                          checked={attendanceStatus === 1}
                          onChange={() => handleAttendance(1, selectedEventDetails._id)}
                        />
                        I might attend
                      </label>
                    </div>

                    <div className="percentage-bar-container">
                      <label style={{ display: 'flex', gap: '5px' }}>
                        <input
                          type="checkbox"
                          checked={attendanceStatus === 2}
                          onChange={() => handleAttendance(2, selectedEventDetails._id)}
                        />
                        I will not attend
                      </label>
                    </div>

                    {attendanceLoading && (
                      <div>
                        <l-line-spinner size="20" stroke="3" speed="1" color="black"></l-line-spinner>
                      </div>
                    )}
                  </ul>
                </div>


                {(selectedEventDetails.userId === profile._id || profile.profileLevel === 0) && <div className="event-edit-delete">

                  <Button variant="primary" onClick={() => setModalShow(true)}>

                    Edit Event
                  </Button>
                  <Button variant="danger" onClick={() => {
                    handleDeleteEvent();
                    setSelectedEventDetails(null)
                  }}>

                    Delete Event
                  </Button>
                </div>}
                {selectedEventDetails.userId === profile._id && <div className='see-event-results' style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => handleOpenModal(selectedEventDetails._id)}>See event attendees</div>}
              </div>
              <MModal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box className='poll-modal-box'>
                  <h2 id="modal-title">Event Attendees</h2>
                  <div className='voters-container'>
                    <div>
                      <h3>Will Attend</h3>
                      <h5>Total:- {attendees?.willAttend.length}</h5>
                      {attendees?.willAttend.map(user => (
                        <div key={user.userId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar src={user.profilePicture || pic} />
                          <span>{user.userName}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3>Might Attend</h3>
                      <h5>Total:- {attendees?.mightAttend.length}</h5>
                      {attendees?.mightAttend.map(user => (
                        <div key={user.userId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar src={user.profilePicture || pic} />
                          <span>{user.userName}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3>Will Not Attend</h3>
                      <h5>Total:- {attendees?.willNotAttend.length}</h5>
                      {attendees?.willNotAttend.map(user => (
                        <div key={user.userId} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Avatar src={user.profilePicture || pic} />
                          <span>{user.userName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Box>
              </MModal>
            </Modal.Body>
          </Modal>

        )}
        {selectedEventDetailsPopup && (
          <div className="event-details-popup">
            <div className="event-details-popup-content" style={{ textAlign: 'left' }}>
              <span className="close-btn-event" onClick={() => setSelectedEventDetailsPopup(null)}>&times;</span>

              <h2 align='center'>Event Details</h2>

              <EventDisplay event={selectedEventDetailsPopup} />
              {/* {(selectedEventDetailsPopup.userId === profile._id || profile.profileLevel === 0) && (
                <div className="event-edit-delete">
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Edit Event
                  </Button>
                  <Button variant="danger" onClick={() => {
                    handleDeleteEvent();
                    setSelectedEventDetails(null);
                  }}>
                    Delete Event
                  </Button>
                </div>
              )} */}
            </div>
          </div>
        )}
        {loading && <><l-line-spinner
          size="40"
          stroke="3"
          speed="1"
          color="black"
        ></l-line-spinner></>}
      </div>
    </div>
  );
}


export default Events;