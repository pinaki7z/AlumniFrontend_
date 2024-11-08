import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import Modal from 'react-bootstrap/Modal';
import '../NotificationsP/notificationsP.css';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import baseUrl from '../../config';

export const NotificationsDeclined = () => {
  const [notificationList, setNotificationList] = useState([]);
  const profile = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isAdmin = profile.profileLevel === 0;
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user,setUser] = useState('');

  const handleAddMember = async (notificationId, groupId, memberId, type, toDelete) => {
    setLoading(true);
    try {
      let url = '';
      if (type === 'forum') {
        url = `${baseUrl}/forums/members/${groupId}`;
      } else if (type === 'group') {
        url = `${baseUrl}/groups/members/${groupId}`;
      } else if (type === 'ID') {
        url = `${baseUrl}/alumni/alumni/validateId`;
      } else {
        throw new Error('Invalid type provided');
      }

      const response = await axios.put(url, {
        userId: memberId,
        notificationId: notificationId,
        toDelete
      });

      if (response.status === 200) {
        const { isUserAdded } = response.data;
        setIsAdded(true);
        setLoading(false);
        console.log('User added/removed from the group:', isUserAdded);
      } else {
        console.error('Failed to add/remove user from the group');
      }
    } catch (error) {
      console.error('Error adding/removing user from the group:', error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    console.log('notificationId for delete:', notificationId);
    try {
      const response = await axios.delete(`${baseUrl}/alumni/alumni/deleteNotification`, {
        data: { notificationId }
      });
      console.log(response.data);
      getRequest();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  }


  const getRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/groups/requests/req`);
      const filteredData = response.data.filter(notification => notification.status === true);
      setNotificationList(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching request:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getRequest();
  }, [isAdded]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImagesModal(true);
  };

  const ImagesModal = () => (
    <Modal
      show={showImagesModal}
      onHide={() => setShowImagesModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={selectedImage}
          alt="Selected Image"
          style={{ width: '100%', height: '100%' }}
        />
      </Modal.Body>
    </Modal>
  );

  const handleAlumniSearch = async (e, userInput) => {
    e.preventDefault();

    try {
        const response = await axios.get(`${baseUrl}/search/search/notifications?keyword=${user}`);
        // Handle the response data, such as updating state with the search results
        console.log('search data',response.data);
        setNotificationList(response.data.filter(notification => notification.status === true))
    } catch (error) {
        console.error("Error searching alumni:", error);
        // Handle error, such as displaying an error message to the user
    }
};

  return (
    <div style={{paddingTop: '20px'}}>
      <form onSubmit={handleAlumniSearch} style={{display: 'flex', gap: '15px'}}>
                <input type="text" placeholder='Search for name' name='user' value={user} onChange={(e) => setUser(e.target.value)} style={{width: '40%', borderRadius: '5px'}}/>
                <button type="submit" style={{borderRadius: '5px'}}>Search</button>
            </form>
      <div style={{padding: '2% 5%'}}>
        {loading ? (
          <l-line-spinner size="20" stroke="3" speed="1" color="black"></l-line-spinner>
        ) : notificationList.length ? (
          <table style={{ width: '100%' }}>
            {/* <thead>
              <tr>
                <th></th>
                <th style={{ color: 'mediumseagreen' }}>ACCEPT</th>
                <th style={{ color: 'orangered' }}>DELETE</th>
              </tr>
            </thead> */}
            <tbody style={{display: 'table-cell', paddingBottom: '50px'}}>
              {notificationList.map((notification) => (
                <tr key={notification._id}>
                  <td className='request'>
                    {notification.ID ? (
                      <div>
                        <Link to={`/members/${notification.userId}`} style={{ textDecoration: 'underline', color: 'inherit' }}>
                          {notification.requestedUserName}
                        </Link> has requested to validate. Click <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleImageClick(notification.ID)}>here</span> to view the identity.
                      </div>
                    ) : (
                      isAdded ? (
                        <div>
                          {notification.requestedUserName} has been added to {notification.groupName ? `${notification.groupName} Group` : `${notification.forumName} forum`}
                        </div>
                      ) : (
                        `${notification.requestedUserName} has requested to join ${notification.groupName ? `${notification.groupName} Group` : `${notification.forumName} forum`}`
                      )
                    )}
                  </td>
                  <td className='accept'>
                    <FcApprove
                      style={{ width: '35px', height: '35px', cursor: 'pointer' }}
                      onClick={() => handleAddMember(notification._id, notification.forumId || notification.groupId || '', notification.userId, notification.ID ? 'ID' : (notification.forumId ? 'forum' : 'group'), false)}
                    />

                  </td>
                  <td className='reject'>
                    <MdOutlineDeleteOutline
                      style={{ width: '35px', height: '35px', cursor: 'pointer' }}
                      onClick={() => handleDeleteNotification(notification._id)}
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{paddingTop: '10px'}}>No Declined Notifications</div>
        )}
        <ImagesModal />
      </div>
    </div>
  );
};
