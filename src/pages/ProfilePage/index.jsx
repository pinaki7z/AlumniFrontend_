// import React from "react";
// import "./ProfilePage.css";
// import picture from "../../images/d-cover.jpg";
// import pic from "../../images/profilepic.jpg";
// import { MdModeEditOutline } from "react-icons/md";
// import { IoIosList } from "react-icons/io";
// import { FiBriefcase } from "react-icons/fi";
// import Icons from '../../components/Icons'
// import Feeed from '../../components/Feeed'
// import { HiMiniCheckCircle } from "react-icons/hi2";
// import { HiMiniCheckBadge } from "react-icons/hi2";
// import { HiMiniPlusCircle } from "react-icons/hi2";
// import { MdInfo } from "react-icons/md";
// import { MdRemoveRedEye } from "react-icons/md";
// import { MdOutlineFeed } from "react-icons/md";
// import { MdOutlineFaceUnlock } from "react-icons/md";
// import { BiPhotoAlbum } from "react-icons/bi";
// import { HiMiniUserPlus } from "react-icons/hi2";
// import { HiUsers } from "react-icons/hi2";
// import { BiSolidLike } from "react-icons/bi";
// import { FaRegObjectGroup } from "react-icons/fa";
// import { useCookies } from "react-cookie";
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";
// import { toast } from "react-toastify";
// import profilePicture from '../../images/profilepic.jpg';
// import baseUrl from "../../config";

// const ProfilePage = () => {
//   const [cookie, setCookie] = useCookies(["token"]);
//   const [modalShow, setModalShow] = React.useState(false);
//   const [workExperiences, setWorkExperiences] = useState([]);
//   const profile = useSelector((state) => state.profile);


// function MyVerticallyCenteredModal(props) {
//   const [forms, setForms] = useState([{}]);
//   const [currentWork, setCurrentWork] = useState(false);

//   const generateYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 100; i--) {
//       years.push(i);
//     }
//     return years;
//   };

//   const handleAddExperience = () => {
//     setForms([...forms, {}]);
//   };

//   const handleCloseAdditionalForm = (index) => {
//     setForms(forms.filter((_, i) => i !== index));
//   };

//   const handleInputChange = (event, index, field) => {
//     const newForms = [...forms];
//     newForms[index][field] = event.target.value;
//     setForms(newForms);
//   };


//   const handleCurrentWorkChange = (index) => {
//     const newForms = [...forms];
//     newForms[index].currentWork = !newForms[index].currentWork;
//     setForms(newForms);
//     setCurrentWork(newForms[index].currentWork);
//   };

//   const handleSave = () => {
//     const updatedForms = forms.map(form => {
//       if (!form.endMonth && !form.endYear) {
//         return {
//           ...form,
//           endMonth: 'current'
//         };
//       }
//       return form;
//     });

//     let body = JSON.stringify(updatedForms);

//     fetch(`${baseUrl}/alumni/workExperience/${profile._id}`, {
//       method: 'PUT',
//       body,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${cookie.token}`
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         toast.success("Added successfully!");
//         window.location.reload();
//         props.onHide();
//       })
//       .catch(error => console.error('Error:', error));
//   };



//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Add Experience
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Button onClick={handleAddExperience}>Add</Button>
//         <Form>
//           {forms.map((form, index) => (
//             <div key={index}>
//               <Form.Group controlId="formBasicAddDelete">
//                 {index > 0 && (
//                   <>
//                     <Button onClick={handleAddExperience}>Add</Button>
//                     <Button variant="danger" onClick={() => handleCloseAdditionalForm(index)} style={{ float: 'right' }}>
//                       <IoMdClose />
//                     </Button>
//                   </>
//                 )}
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="formBasicTitle">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter title"
//                   value={forms[index].title || ''}
//                   onChange={(event) => handleInputChange(event, index, 'title')}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicCompanyName">
//                 <Form.Label>Company Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Company Name"
//                   value={forms[index].companyName || ''}
//                   onChange={(event) => handleInputChange(event, index, 'companyName')}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicLocation">
//                 <Form.Label>Location</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Location"
//                   value={forms[index].location || ''}
//                   onChange={(event) => handleInputChange(event, index, 'location')}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicLocationType">
//                 <Form.Label>Location Type</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={forms[index].locationType || ''}
//                   onChange={(event) => handleInputChange(event, index, 'locationType')}
//                 >
//                   <option value="">Location Type</option>
//                   <option value="On-site">On-site</option>
//                   <option value="Hybrid">Hybrid</option>
//                   <option value="Remote">Remote</option>
//                 </Form.Control>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicCurrentWork">
//                 <Form.Check
//                   type="checkbox"
//                   label="I currently work here"
//                   checked={forms[index].currentWork || false}
//                   onChange={() => handleCurrentWorkChange(index)}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicStartDate">
//                 <Form.Label>Start Date</Form.Label>
//                 <div className="d-flex">
//                   <Form.Control
//                     as="select"
//                     className="me-2"
//                     value={forms[index].startMonth || ''}
//                     onChange={(event) => handleInputChange(event, index, 'startMonth')}
//                   >
//                     <option value="">Month</option>
//                     <option value="January">January</option>
//                     <option value="February">February</option>
//                     <option value="March">March</option>
//                     <option value="April">April</option>
//                     <option value="May">May</option>
//                     <option value="June">June</option>
//                     <option value="July">July</option>
//                     <option value="August">August</option>
//                     <option value="September">September</option>
//                     <option value="October">October</option>
//                     <option value="November">November</option>
//                     <option value="December">December</option>
//                   </Form.Control>
//                   <Form.Control
//                     as="select"
//                     value={forms[index].startYear || ''}
//                     onChange={(event) => handleInputChange(event, index, 'startYear')}
//                   >
//                     <option value="">Year</option>
//                     {generateYears().map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </div>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicEndDate">
//                 <Form.Label>End Date</Form.Label>
//                 <div className="d-flex">
//                   <Form.Control
//                     as="select"
//                     className="me-2"
//                     value={forms[index].endMonth || ''}
//                     onChange={(event) => handleInputChange(event, index, 'endMonth')}
//                     disabled={forms[index].currentWork}
//                   >
//                     <option value="">Month</option>
//                     <option value="January">January</option>
//                     <option value="February">February</option>
//                     <option value="March">March</option>
//                     <option value="April">April</option>
//                     <option value="May">May</option>
//                     <option value="June">June</option>
//                     <option value="July">July</option>
//                     <option value="August">August</option>
//                     <option value="September">September</option>
//                     <option value="October">October</option>
//                     <option value="November">November</option>
//                     <option value="December">December</option>
//                   </Form.Control>
//                   <Form.Control
//                     as="select"
//                     value={forms[index].endYear || ''}
//                     onChange={(event) => handleInputChange(event, index, 'endYear')}
//                     disabled={forms[index].currentWork}
//                   >
//                     <option value="">Year</option>
//                     {generateYears().map((year) => (
//                       <option key={year} value={year}>
//                         {year}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </div>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicIndustry">
//                 <Form.Label>Industry</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Industry"
//                   value={forms[index].industry || ''}
//                   onChange={(event) => handleInputChange(event, index, 'industry')}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicDescription">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={forms[index].description || ''}
//                   onChange={(event) => handleInputChange(event, index, 'description')}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicProfileHeadline">
//                 <Form.Label>Profile Headline</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Profile Headline"
//                   value={forms[index].profileHeadline || ''}
//                   onChange={(event) => handleInputChange(event, index, 'profileHeadline')}
//                 />
//               </Form.Group>
//             </div>
//           ))}
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={handleSave}>Save</Button>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
// const fetchWorkExperiences = async () => {
//   try {
//     const response = await fetch(`${baseUrl}/alumni/workExperience/${profile._id}`, {
//       headers: {
//         'Authorization': `Bearer ${cookie.token}`
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch work experiences');
//     }
//     const data = await response.json();
//     setWorkExperiences(data);
//   } catch (error) {
//     console.error('Error fetching work experiences:', error);
//   }
// };

// useEffect(() => {
//   fetchWorkExperiences();
// }, [])

// const findCurrentWorkingAt = () => {
//   const currentWorkExperience = workExperiences.find(experience => experience.endMonth === 'current');
//   if (currentWorkExperience) {
//     return currentWorkExperience.companyName;
//   } else {
//     return 'No current work experience found';
//   }
// };

// const renderExpirationDateMessage = () => {
//   if (profile.ID && profile.expirationDate) {
//     return 'Your account is being validated';
//   }

//   if (profile.expirationDate!==null) {
//     const currentDate = new Date();
//     const expirationDate = new Date(profile.expirationDate);
//     const timeDiff = expirationDate.getTime() - currentDate.getTime();
//     const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
//     if (daysDiff > 0) {
//       return (
//         <>
//           <p>Your account is not validated and will expire in {daysDiff} days.
//           <Link to='/profile/profile-settings'>
//             <span> Upload your ID</span>
//           </Link>
//           &nbsp;&nbsp;to validate your account
//           </p>
//         </>
//       );
//     } else if(daysDiff<0){
//       return 'Your account has expired';
//     }
//   }
//   return null;
// };






//   return (
//     <>
//       <div style={{ width: '100%' }}>
//         <div
//           className="ple"
//           style={{
//             backgroundImage: `url(${profile.coverPicture})`,
//             height: "35.86vh",
//             backgroundSize: "cover",
//             borderRadius: "0px 0px 10px 10",
//             display: "flex",
//             alignItems: "end",
//             paddingBottom: "60px",
//             backgroundPosition: 'center'
//           }}
//         >
//           <div>
//             <img src={profile.profilePicture || profilePicture}></img>
//           </div>
// <div style={{ paddingBottom: "1.5em" }}>
//   {renderExpirationDateMessage() && (
//     <p style={{ color: 'orangered', margin: '0', fontSize: '25px',fontWeight: '600',backgroundColor: 'cornsilk', width: '70%',padding: '10px', borderRadius: '5px',marginBottom: '10px' }}>
//       {renderExpirationDateMessage()}
//     </p>
//   )}
//   <h2 style={{ color: "#ffffff", backgroundColor: 'darkgrey', width: 'fit-content',borderRadius: '5px', padding: '0px 15px', textAlign: 'center' }}>{profile.firstName}{profile.validated === true ? <HiMiniCheckBadge style={{ color: '#51a8f5' }} /> : null}</h2>
//   <div style={{ display: "flex", gap: "0.5em" }}>
//     <Link to='/profile/profile-settings'>
//       <button >
//         <MdModeEditOutline /> Edit
//       </button>
//     </Link>
//     <button>
//       <IoIosList /> Activites
//     </button>
//     <button>
//       <FiBriefcase /> Open To
//     </button>
// <button onClick={() => setModalShow(true)}>
//   <IoIosList /> Add Work Experience
// </button>
// <MyVerticallyCenteredModal
//   show={modalShow}
//   onHide={() => setModalShow(false)}
// />
//   </div>
// </div>
//         </div>
//         <Icons />
//         <div className="create-post">
//           <div className="create">
//             <Feeed showCreatePost={true} />
//           </div>
//           <div className="profile">
//             <div style={{ boxShadow: ' 0 1px 2px rgba(0, 0, 0, 0.2)', borderRadius: ' max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px' }}>
//               <div style={{ backgroundColor: '#174873', padding: '10px', borderRadius: '5px 5px 0px 0px' }} >
//                 <p style={{ color: 'white', margin: '0px' }}> Profile Completion</p>
//               </div>
// <div style={{ backgroundColor: 'white', padding: '5px' }}>
//   <ul style={{ padding: '5px' }}>
//     <li>
//       {profile && profile.profilePicture ? (
//         <p><HiMiniCheckCircle style={{ color: 'green', width: '19px', height: '19px' }} /> Profile Picture Added</p>
//       ) : (
//         <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
//           <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your profile picture</li>
//         </Link>
//       )}
//     </li>
//     <li>
//       {profile && profile.firstName ? (
//         <p><HiMiniCheckCircle style={{ color: 'green', width: '19px', height: '19px' }} /> Name: {profile.firstName}</p>
//       ) : (
//         <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
//           <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your name</li>
//         </Link>
//       )}
//     </li>
//     <li>
//       {profile && profile.workExperience && profile.workExperience.length > 0 ? (
//         <p><HiMiniCheckCircle style={{ color: 'green', width: '19px', height: '19px' }} /> Workplace: {findCurrentWorkingAt()}</p>
//       ) : (
//         <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
//           <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your workplace</li>
//         </Link>
//       )}
//     </li>
//     <li>
//       {profile && profile.country ? (
//         <p><HiMiniCheckCircle style={{ color: 'green', width: '19px', height: '19px' }} /> Country: {profile.country}</p>
//       ) : (
//         <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
//           <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your country</li>
//         </Link>
//       )}
//     </li>
//     <li>
//       {profile && profile.location ? (
//         <p><HiMiniCheckCircle style={{ color: 'green', width: '19px', height: '19px' }} /> Address: {profile.location}</p>
//       ) : (
//         <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
//           <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your address</li>
//         </Link>
//       )}
//     </li>
//   </ul>
// </div>
//             </div>
//             <div className="info">
//               <div style={{ borderBottom: 'solid 1px grey' }}>
//                 <p ><MdInfo style={{ color: '#174873' }} />   Info</p>
//               </div>
//               <div style={{ paddingTop: '5px' }}>
//                 <p style={{ color: 'green' }}><MdRemoveRedEye />   Online</p>
//               </div>
//               <div style={{ borderBottom: 'solid 1px grey' }}>
//                 <p><MdOutlineFeed />   Posts</p>
//               </div>
//               <div style={{ paddingTop: '5px' }}>
//                 <p><MdOutlineFaceUnlock />Male</p>
//               </div>
//             </div>
//             <Link to='/profile/workExperience' style={{ textDecoration: 'none', color: 'black' }}>
//               <div className="info1">
//                 <FaRegObjectGroup style={{ color: '#174873', width: '19px', height: '19px' }} /><p style={{ margin: '5px' }}>Work Experience</p>
//               </div>
//             </Link>
//             <Link to={`/profile/${profile._id}/following`} style={{ textDecoration: 'none', color: 'black' }}>
//               <div className="info1">
//                 <HiMiniUserPlus style={{ color: '#174873', width: '19px', height: '19px' }} /><p style={{ margin: '5px' }}>Following</p>
//               </div>
//             </Link>
//             <Link to={`/profile/${profile._id}/followers`} style={{ textDecoration: 'none', color: 'black' }}>
//               <div className="info1">
//                 <HiUsers style={{ color: '#174873', width: '19px', height: '19px' }} /><p style={{ margin: '5px' }}>Followers</p>
//               </div>
//             </Link>
//             <Link to={`/groups/${profile._id}/joined-groups`} style={{ textDecoration: 'none', color: 'black' }}>
//               <div className="info1">
//                 <FaRegObjectGroup style={{ color: '#174873', width: '19px', height: '19px' }} /><p style={{ margin: '5px' }}>Groups</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;



import React from "react";
import { useParams } from "react-router-dom";
import "../Profile/profile.css";
import picture from "../../images/d-cover.jpg";
import { BiUserPlus } from 'react-icons/bi'
import { LuMessageSquare } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Icons from '../../components/Icons'
import Icons1 from "../../components/Icons1";
import { useSelector, useDispatch } from "react-redux";
import { height, padding, textAlign } from "@mui/system";
import Feeed from "../../components/Feeed";
import about from "../../images/about.svg";
import work from "../../images/work.svg";
import location from "../../images/location.svg";
import time from "../../images/Time.svg";
import arrowRight from "../../images/arrowRight-w.svg";
import userProfile from "../../images/userProfile.svg";
import workExperience from "../../images/workExperience.svg";
import { arrow } from "@popperjs/core";
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import baseUrl from "../../config";
import { HiMiniPlusCircle, HiMiniCheckCircle, HiMiniCheckBadge } from "react-icons/hi2";
import edit from "../../images/edit.svg";
import editProfilePicture from "../../images/edit-profile-picture.svg";
import check from "../../images/check.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "../../store/profileSlice";
import { toast } from 'react-toastify';
import { lineSpinner } from 'ldrs';
import profilePic from "../../images/profilepic.jpg"

lineSpinner.register()



const ProfilePage = () => {
  const { id } = useParams();
  console.log('member id', id);
  const members = useSelector((state) => state.member);
  console.log('members profile page', members)
  const profile = useSelector((state) => state.profile);
  const member = members.find(member => member._id === profile._id);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [cookie, setCookie] = useCookies(["token"]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const token = cookie.token;

  const totalProperties = 5;
  let completedProperties = 0;

  if (profile && profile.profilePicture) completedProperties++;
  if (profile && profile.firstName) completedProperties++;
  if (profile && profile.workExperience && profile.workExperience.length > 0) completedProperties++;
  if (profile && profile.country) completedProperties++;
  if (profile && profile.city) completedProperties++;

  const completionPercentage = (completedProperties / totalProperties) * 100;

  useEffect(() => {
    fetchWorkExperiences();
  }, [])

  const renderExpirationDateMessage = () => {
    if (profile.ID && profile.expirationDate) {
      return 'Your account is being validated';
    }

    if (profile.expirationDate !== null) {
      const currentDate = new Date();
      const expirationDate = new Date(profile.expirationDate);
      const timeDiff = expirationDate.getTime() - currentDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysDiff > 0) {
        return (
          <>
            <p>Your account is not validated and will expire in {daysDiff} days.
              <Link to='/profile/profile-settings'>
                <span> Upload your ID</span>
              </Link>
              &nbsp;&nbsp;to validate your account
            </p>
          </>
        );
      } else if (daysDiff < 0) {
        return 'Your account has expired';
      }
    }
    return null;
  };

  // if (!member) {
  //   return <div>Member not found</div>;
  // }

  const fetchWorkExperiences = async () => {
    try {
      const response = await fetch(`${baseUrl}/alumni/workExperience/${profile._id}`, {
        headers: {
          'Authorization': `Bearer ${cookie.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch work experiences');
      }
      const data = await response.json();
      setWorkExperiences(data);
    } catch (error) {
      console.error('Error fetching work experiences:', error);
    }
  };




  const currentWork = member.workExperience.find(exp => exp.endMonth.toLowerCase() === 'current');
  console.log('current work', member.workExperience)

  const findCurrentWorkingAt = () => {
    const currentWorkExperience = workExperiences.find(experience => experience.endMonth === 'current');
    if (currentWorkExperience) {
      return currentWorkExperience.companyName;
    } else {
      return 'No current work experience found';
    }
  };

  const handleFileChange = (event, fileType) => {
    console.log('file type in handleFileChange', fileType, event)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        handleSubmit(reader.result, fileType);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (fileData, fileType) => {
    setLoading(true);
    if (!fileData) {
      alert('Please select an image to upload.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`${baseUrl}/alumni/${profile._id}`, {
        [fileType]: fileData
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        const responseData = await response.data;
        console.log('response data', responseData)
        dispatch(updateProfile(responseData));
        setLoading(false);
        toast.success(`${fileType === 'profilePicture' ? 'Profile Picture' : fileType === 'coverPicture' ? 'Cover Picture' : 'Image'} updated successfully.`);
      } else {
        alert('Failed to update cover picture.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating cover picture:', error);
      alert('An error occurred while updating the cover picture.');
      setLoading(false)
    }
  };

  return (
    <>
      <div style={{ width: '100%', padding: '0 5%', paddingTop: '4%' }}>
        <div className="container-div" style={{ width: '100%', borderRadius: '12px', position: 'relative' }}>
          <div className="upper-div" style={{
            backgroundImage: `url(${profile.coverPicture})`,
            width: '100%',
            minHeight: '35vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px 12px 0px 0px'
          }}>
            <div style={{ paddingBottom: "1.5em", display: 'flex', justifyContent: 'center' }}>
              {renderExpirationDateMessage() && (
                <p style={{ color: 'orangered', margin: '0', fontSize: '25px', fontWeight: '600', backgroundColor: 'cornsilk', width: '70%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                  {renderExpirationDateMessage()}
                </p>
              )}
              {/* <h2 style={{ color: "#ffffff", backgroundColor: 'darkgrey', width: 'fit-content',borderRadius: '5px', padding: '0px 15px', textAlign: 'center' }}>{profile.firstName}{profile.validated === true ? <HiMiniCheckBadge style={{ color: '#51a8f5' }} /> : null}</h2> */}
            </div>
            <div className="message-follow" style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
              <input type="file" name="coverPicture" id="coverPicture" onChange={(event) => handleFileChange(event, 'coverPicture')} style={{ display: 'none' }} />
              <button
                type="button"
                style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '7px', border: '2px solid #a98de3', color: '#301C58' }}
                onClick={() => document.getElementById('coverPicture').click()}
              >
                <img src={edit} alt="edit" />
                <p style={{ marginBottom: '0px' }}>Edit Cover Picture </p>
              </button>
              <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
                <button style={{ backgroundColor: 'white', border: '2px solid #a98de3', color: '#301C58' }}>Edit Profile</button></Link>
            </div>
            <div style={{ textAlign: 'center' }}>
              {loading ?
                <l-line-spinner
                  size="30"
                  stroke="3"
                  speed="1"
                  color="black"
                  style={{ backgroundColor: 'whitesmoke', padding: '20px' }}
                ></l-line-spinner> : null}
            </div>
          </div>
          <div style={{ position: 'absolute', top: '10vh', left: '50%', transform: 'translateX(-50%) translateY(50%)' }}>
            <div style={{ position: 'relative' }}>
              <img src={profile.profilePicture ? profile.profilePicture : profilePic} alt="profile-picture" style={{ width: '200px', height: '200px', borderRadius: '50%', border: '5px solid white' }} />
              <input type="file" name="profilePicture" id="profilePicture" onChange={(event) => handleFileChange(event, 'profilePicture')} style={{ display: 'none' }} />
              <img src={editProfilePicture} alt="profile-picture" style={{ borderRadius: '50%', border: '5px solid white', position: 'absolute', bottom: '20px', right: '5px', cursor: 'pointer' }} onClick={() => document.getElementById('profilePicture').click()} />
            </div>

          </div>
          <div className="lower-div" style={{
            backgroundColor: '#efeff0',
            width: '100%',
            minHeight: '25vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0px 0px 12px 12px'
          }}>
            {/* <div className="message-follow" style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
              <button>Message</button>
              <button>Follow</button>
            </div> */}
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '40%', paddingTop: '100px' }}>
                <p style={{ fontWeight: '700', color: '#3A3A3A', fontSize: '24px', fontFamily: 'Inter' }}>{member.firstName} {member.lastName} {profile.validated === true ? <HiMiniCheckBadge style={{ color: '#51a8f5' }} /> : null}</p>
                <p style={{ fontWeight: '300', color: '#000000', fontSize: '14px', fontFamily: 'Inter' }}>{member.profileLevel === 1 ? 'ADMIN' : member.profileLevel === 2 ? 'ALUMNI' : member.profileLevel === 3 ? 'STUDENT' : 'SUPERADMIN'}</p>
                <p style={{ fontWeight: '400', color: '#3A3A3A', fontSize: '16px', fontFamily: 'Inter' }}>Passionate soul, chasing dreams, inspiring others, embracing life's adventures joyfully.</p>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ cursor: 'pointer' }}>
                    <Link to={`/groups/${profile._id}/joined-groups`} style={{ textDecoration: 'none', color: 'black' }}>
                      <p>Groups</p>
                      <p style={{ fontWeight: '500', color: '#3A3A3A', fontSize: '18px', fontFamily: 'Inter' }}>{profile.groupNames.length}</p>
                    </Link>
                  </div>
                  <div style={{ cursor: 'pointer' }}>
                    <Link to={`/profile/${profile._id}/followers`} style={{ textDecoration: 'none', color: 'black' }}>
                      <p>Followers</p>
                      <p style={{ fontWeight: '500', color: '#3A3A3A', fontSize: '18px', fontFamily: 'Inter' }}>{profile.followers.length}</p>
                    </Link>
                  </div>
                  <div style={{ cursor: 'pointer' }}>
                    <Link to={`/profile/${profile._id}/following`} style={{ textDecoration: 'none', color: 'black' }}>
                      <p>Following</p>
                      <p style={{ fontWeight: '500', color: '#3A3A3A', fontSize: '18px', fontFamily: 'Inter' }}>{profile.following.length}</p>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div >
        <div style={{ display: 'flex', gap: '2%' }}>
          <div style={{ width: '70%' }}><Feeed entityType='posts' showCreatePost={true} showDeleteButton={true} userId={member._id} /></div>
          <div style={{ width: '28%', paddingTop: '37px' }}>
            <div>
              <div style={{ backgroundColor: '#301C58', color: '#F8F8FF', borderRadius: '12px 12px 0px 0px', padding: '12px 16px 12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={userProfile} alt="" />
                <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '20px', marginBottom: '0px' }}>Profile Completion</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '5px' }}>
                {completionPercentage < 100 && (
                  <div style={{ width: '100%', borderRadius: '5px', marginBottom: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <p style={{ textAlign: 'center', margin: '5px 0', fontSize: '14px', color: '#000' }}>
                      {Math.round(completionPercentage)}%
                    </p>
                    <div
                      style={{
                        width: `${completionPercentage}%`,
                        height: '10px',
                        backgroundColor: '#4caf50',
                        borderRadius: '5px',
                      }}
                    ></div>
                  </div>
                )}
                <ul style={{ padding: '5px', listStyleType: 'none' }}>
                  <li>
                    {profile && profile.profilePicture ? (
                      <p><img src={check} alt="" srcset="" /> Profile Picture Added</p>
                    ) : (
                      <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
                        <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your profile picture</li>
                      </Link>
                    )}
                  </li>
                  <li>
                    {profile && profile.firstName ? (
                      <p><img src={check} alt="" srcset="" />  Name: {profile.firstName}</p>
                    ) : (
                      <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
                        <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your name</li>
                      </Link>
                    )}
                  </li>
                  <li>
                    {profile && profile.workExperience && profile.workExperience.length > 0 ? (
                      <p><img src={check} alt="" srcset="" />  Workplace: {findCurrentWorkingAt()}</p>
                    ) : (
                      <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
                        <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your workplace</li>
                      </Link>
                    )}
                  </li>
                  <li>
                    {profile && profile.country ? (
                      <p><img src={check} alt="" srcset="" /> Country: {profile.country}</p>
                    ) : (
                      <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
                        <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} /> Add your country</li>
                      </Link>
                    )}
                  </li>
                  <li>
                    {profile && profile.city ? (
                      <p><img src={check} alt="" srcset="" />  Address: {profile.city}</p>
                    ) : (
                      <Link to='/profile/profile-settings' style={{ textDecoration: 'none', color: 'black' }}>
                        <li><HiMiniPlusCircle style={{ width: '19px', height: '19px' }} />  Add your address</li>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div style={{ backgroundColor: '#301C58', color: '#F8F8FF', borderRadius: '12px 12px 0px 0px', padding: '12px 16px 12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={about} alt="" />
                <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '20px', marginBottom: '0px' }}>About Me</p>
              </div>
              <p style={{ backgroundColor: '#efeff0', borderRadius: '0px 0px 12px 12px', padding: '10px 16px', fontFamily: 'Inter', fontWeight: '500', fontSize: '16px', color: '#636364' }}>
                {member.linkedIn ? (
                  <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#0072b1', textDecoration: 'none' }}>
                    <span style={{fontWeight: '500'}}>LinkedIn:</span> {member.linkedIn}
                  </a>
                ) : (
                  'User has not updated his Bio'
                )}
              </p>


            </div>
            {/* <div>
              <div style={{ backgroundColor: '#301C58', color: '#F8F8FF', borderRadius: '12px 12px 0px 0px', padding: '12px 16px 12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={work} alt="" />
                <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '20px', marginBottom: '0px' }}>Currently Working As</p>
              </div>
              <div style={{ backgroundColor: '#efeff0' }}>
                <p style={{ backgroundColor: '#efeff0', borderRadius: '0px 0px 12px 12px', padding: '10px 16px 10px 16px', fontFamily: 'Inter', fontWeight: '500', fontSize: '16px', color: '#636364', marginBottom: '0px' }}>{currentWork && currentWork.title ? currentWork.title : 'User has not updated his current work title'}</p>
                <div style={{ padding: '16px' }}>
                  <p style={{ color: '#301C58', fontWeight: '500', fontSize: '18px' }}>{currentWork && currentWork.companyName ? currentWork.companyName : 'User has not updated his current work place'}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {currentWork && (currentWork.startMonth && currentWork.startYear && currentWork.endMonth)
                      ? <img src={time} alt="" /> : ''}
                    <p style={{ marginBottom: '0px' }}>
                      {currentWork && (currentWork.startMonth && currentWork.startYear && currentWork.endMonth)
                        ? `${currentWork.startMonth} ${currentWork.startYear} - ${currentWork.endMonth}`
                        : ''}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', paddingLeft: '3px' }}>
                    {currentWork && (currentWork.location && currentWork.locationType) ? <img src={location} alt="" /> : ''}
                    <p style={{ marginBottom: '0px' }}>{currentWork && (currentWork.location && currentWork.locationType) ? `${currentWork.location} - ${currentWork.locationType}` : ''}</p>
                  </div>
                </div>
                



              </div>

            </div> */}
            <Link to='/profile/workExperience' style={{ textDecoration: 'none', color: 'black' }}>
              <div style={{ backgroundColor: '#301C58', color: '#F8F8FF', borderRadius: '12px', padding: '12px 16px 12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={workExperience} alt="" />
                <p style={{ marginBottom: '0px' }}>Work Experience </p>
                <img src={arrowRight} alt="" style={{ marginLeft: 'auto' }} />
              </div>
            </Link>
          </div>
        </div>
      </div >
    </>
  );
};

export default ProfilePage;
