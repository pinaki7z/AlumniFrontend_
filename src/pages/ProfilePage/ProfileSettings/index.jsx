import React, { useState, useEffect } from 'react';
import './profileSetings.css';
import PageTitle from '../../../components/PageTitle';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CgProfile } from "react-icons/cg";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "../../../store/profileSlice";
import { IoMdAdd } from "react-icons/io";
import baseUrl from '../../../config';
import { padding } from '@mui/system';


export const ProfileSettings = () => {
  const [cookie, setCookie] = useCookies(['access_token']);
  const profile = useSelector((state) => state.profile);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isCurrentStudent, setIsCurrentStudent] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);


  const token = cookie.token;

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`${baseUrl}/alumni/${profile._id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`

  //         },
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();

  //         setFormData((prevData) => ({
  //           ...prevData,
  //           firstName: userData.firstName || '',
  //           lastName: userData.lastName || '',
  //           aboutMe: userData.aboutMe || '',
  //           workingAt: userData.workingAt || '',
  //           companyWebsite: userData.companyWebsite || '',
  //           location: userData.location || '',
  //           city: userData.city || '',
  //           country: userData.country || '',
  //         }));
  //       } else {
  //         console.error('Failed to fetch user data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [profile._id]); 

  useEffect(() => {

    setFormData((prevData) => ({
      ...prevData,
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      aboutMe: profile.aboutMe || '',
      workingAt: profile.workingAt || '',
      companyWebsite: profile.companyWebsite || '',
      location: profile.location || '',
      city: profile.city || '',
      country: profile.country || '',
    }));

  }, [profile._id]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    aboutMe: '',
    workingAt: '',
    companyWebsite: '',
    location: '',
    city: '',
    country: '',
    student: false,
    linkedIn: ''
  });

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverPicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
  const handleUploadID = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, ID: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCurrentStudentChange = () => {
    setIsCurrentStudent(!isCurrentStudent);
    if (!isCurrentStudent) {
      setFormData({ ...formData, workingAt: '', student: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('formData', formData)
    const userID = profile._id;

    try {
      const response = await fetch(`${baseUrl}/alumni/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        dispatch(updateProfile(responseData));
        toast.success('User Updated Successfully');
        setLoading(false);
        navigateTo("/profile");

      } else {
        console.error('Failed to update user');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);

    }
  };

  const handleSearch = async (e) => {
    setShowDropDown(true);
    const { value } = e.target;
    console.log('value', value);
    setFormData(prevFormData => ({
      ...prevFormData,
      workingAt: value
    }));

    if (value.length >= 3) {
      try {
        const response = await fetch(`${baseUrl}/search/search/company?q=${value}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.companies);
        } else {
          console.error('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   handleSearch(value);
  // };

  const handleSelectCompany = (company) => {

    

    setFormData(prevFormData => ({
      ...prevFormData,
      workingAt: company
    }));
    setShowDropDown(false)

  };

  const title = 'Profile Settings';
  const icon = <CgProfile style={{ color: '#174873' }} />;

  return (
    <div style={{ width: '100%', padding: '5% 5%' }}>
      <PageTitle title={title} icon={icon} />
      <div>
        <Form style={{ paddingBottom: '30px', paddingTop: '30px' }} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFname">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicLname">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicAboutMe">
            <Form.Label>About Me</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAboutMe">
            <Form.Check
              type="checkbox"
              label="Current Student"
              checked={isCurrentStudent}
              onChange={handleCurrentStudentChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFname">
                <Form.Label>LinkedIn profile link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter linkedIn profile link"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicWorking">
                <Form.Label>Working At*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Working at"
                  name="workingAt"
                  value={formData.workingAt}
                  onChange={handleSearch}
                  required
                  disabled={isCurrentStudent}
                />
              </Form.Group>
              {(searchResults.length > 0 && showDropDown) ? (
                <div style={{ backgroundColor: 'white', borderRadius: '5px', paddingTop: '1px', cursor: 'pointer' }}>
                  {searchResults.map((company) => (
                    <div key={company._id} onClick={() => handleSelectCompany(company.name)} style={{ borderBottom: 'solid 1px lightgrey', paddingLeft: '10px', paddingBottom: '10px' }}>
                      {company.name}
                    </div>
                  ))}
                </div>
              ) : (formData.workingAt!=='' &&  showDropDown) ? (
                <div style={{ backgroundColor: 'white', borderRadius: '5px', paddingTop: '1px', cursor: 'pointer',display: 'flex', alignItems: 'center' }}>
                  <IoMdAdd />
                  <p style={{marginBottom: '0px'}} onClick={() => handleSelectCompany(formData.workingAt)}>Add {formData.workingAt}</p>
                </div>
              ): null }

            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicWorking">
                <Form.Label>Company Website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Form.Group> */}
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Country*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                <label htmlFor="image" style={{ paddingBottom: '15px' }}>Change Profile Picture(Ratio: 1:1)</label>
                <label for="images" className="drop-container" id="dropcontainer">
                  <span className="drop-title">Drop files here</span>
                  or
                  <input type="file" id="profileImage" accept="image/*" onChange={handleProfileImageChange} />
                </label>
              </div>
            </Col>
            <Col>
              <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                <label htmlFor="image" style={{ paddingBottom: '15px' }}>Change Cover Picture</label>
                <label for="images" className="drop-container" id="dropcontainer">
                  <span className="drop-title">Drop files here</span>
                  or
                  <input type="file" id="coverImage" accept="image/*" onChange={handleCoverImageChange} />
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                <label htmlFor="image" style={{ paddingBottom: '15px' }}>Upload ID(College ID, Adhaar Card, PAN Card, Passport)</label>
                <label for="images" className="drop-container" id="dropcontainer">
                  <span className="drop-title">Drop files here</span>
                  or
                  <input type="file" id="profileImage" accept="image/*" onChange={handleUploadID} />
                </label>
              </div>
            </Col>
          </Row>
          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', paddingTop: '50px' }}>
            <Button type="submit" style={{ backgroundColor: '#174873' }}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            <Button type="reset" style={{ backgroundColor: '#174873' }} onClick={() => {
              navigateTo('/profile')
            }}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
