import React, { useState, useEffect } from 'react';
import PageTitle from '../PageTitle';
import { RiBriefcase4Line } from "react-icons/ri";
import { useCookies } from 'react-cookie';
import './workExperience.css';
import { useSelector } from "react-redux";
import baseUrl from '../../config';
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IoMdClose,IoIosList } from "react-icons/io";
import Form from 'react-bootstrap/Form';


export const WorkExperience = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const icon = <RiBriefcase4Line />;
    const [cookie] = useCookies(['token']);
    const profile = useSelector((state) => state.profile);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWorkExperiences();
    }, []);

    const fetchWorkExperiences = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
        } catch (error) {
            console.error('Error fetching work experiences:', error);
            setLoading(false);
        }
    };

    function MyVerticallyCenteredModal(props) {
        const [forms, setForms] = useState([{}]);
        const [currentWork, setCurrentWork] = useState(false);
    
        const generateYears = () => {
          const currentYear = new Date().getFullYear();
          const years = [];
          for (let i = currentYear; i >= currentYear - 100; i--) {
            years.push(i);
          }
          return years;
        };
    
        const handleAddExperience = () => {
          setForms([...forms, {}]);
        };
    
        const handleCloseAdditionalForm = (index) => {
          setForms(forms.filter((_, i) => i !== index));
        };
    
        const handleInputChange = (event, index, field) => {
          const newForms = [...forms];
          newForms[index][field] = event.target.value;
          setForms(newForms);
        };
    
    
        const handleCurrentWorkChange = (index) => {
          const newForms = [...forms];
          newForms[index].currentWork = !newForms[index].currentWork;
          setForms(newForms);
          setCurrentWork(newForms[index].currentWork);
        };
    
        const handleSave = () => {
          const updatedForms = forms.map(form => {
            if (!form.endMonth && !form.endYear) {
              return {
                ...form,
                endMonth: 'current'
              };
            }
            return form;
          });
    
          let body = JSON.stringify(updatedForms);
    
          fetch(`${baseUrl}/alumni/workExperience/${profile._id}`, {
            method: 'PUT',
            body,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookie.token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              toast.success("Added successfully!");
              window.location.reload();
              props.onHide();
            })
            .catch(error => console.error('Error:', error));
        };
    
    
    
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Experience
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button onClick={handleAddExperience}>Add</Button>
              <Form>
                {forms.map((form, index) => (
                  <div key={index}>
                    <Form.Group controlId="formBasicAddDelete">
                      {index > 0 && (
                        <>
                          <Button onClick={handleAddExperience}>Add</Button>
                          <Button variant="danger" onClick={() => handleCloseAdditionalForm(index)} style={{ float: 'right' }}>
                            <IoMdClose />
                          </Button>
                        </>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={forms[index].title || ''}
                        onChange={(event) => handleInputChange(event, index, 'title')}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicCompanyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Company Name"
                        value={forms[index].companyName || ''}
                        onChange={(event) => handleInputChange(event, index, 'companyName')}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Location"
                        value={forms[index].location || ''}
                        onChange={(event) => handleInputChange(event, index, 'location')}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicLocationType">
                      <Form.Label>Location Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={forms[index].locationType || ''}
                        onChange={(event) => handleInputChange(event, index, 'locationType')}
                      >
                        <option value="">Location Type</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </Form.Control>
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicCurrentWork">
                      <Form.Check
                        type="checkbox"
                        label="I currently work here"
                        checked={forms[index].currentWork || false}
                        onChange={() => handleCurrentWorkChange(index)}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicStartDate">
                      <Form.Label>Start Date</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          as="select"
                          className="me-2"
                          value={forms[index].startMonth || ''}
                          onChange={(event) => handleInputChange(event, index, 'startMonth')}
                        >
                          <option value="">Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </Form.Control>
                        <Form.Control
                          as="select"
                          value={forms[index].startYear || ''}
                          onChange={(event) => handleInputChange(event, index, 'startYear')}
                        >
                          <option value="">Year</option>
                          {generateYears().map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicEndDate">
                      <Form.Label>End Date</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          as="select"
                          className="me-2"
                          value={forms[index].endMonth || ''}
                          onChange={(event) => handleInputChange(event, index, 'endMonth')}
                          disabled={forms[index].currentWork}
                        >
                          <option value="">Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </Form.Control>
                        <Form.Control
                          as="select"
                          value={forms[index].endYear || ''}
                          onChange={(event) => handleInputChange(event, index, 'endYear')}
                          disabled={forms[index].currentWork}
                        >
                          <option value="">Year</option>
                          {generateYears().map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicIndustry">
                      <Form.Label>Industry</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Industry"
                        value={forms[index].industry || ''}
                        onChange={(event) => handleInputChange(event, index, 'industry')}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={forms[index].description || ''}
                        onChange={(event) => handleInputChange(event, index, 'description')}
                      />
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicProfileHeadline">
                      <Form.Label>Profile Headline</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Profile Headline"
                        value={forms[index].profileHeadline || ''}
                        onChange={(event) => handleInputChange(event, index, 'profileHeadline')}
                      />
                    </Form.Group>
                  </div>
                ))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        <div style={{ width: '100%', marginTop: '15px', padding: '5% 5%' }}>
            <PageTitle title='Work Experience' icon={icon} />
            <div style={{paddingTop: '20px'}}>
            <button
                type="button"
                style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '7px', border: '2px solid #a98de3', color: '#301C58', borderRadius: '5px',padding: '10px' }}
                onClick={() => setModalShow(true)}
              >
                <IoIosList/>
                <p style={{ marginBottom: '0px' }}>Add Work Experience</p>
              </button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {loading && 'Loading...'}
                {workExperiences.map((experience, index) => (
                    <div className="work-experience-card" key={index}>
                        <div className="work-experience-title">{experience.title}</div>
                        <div className="work-experience-company">{experience.companyName}</div>
                        <div className="work-experience-date">{`${experience.startMonth} ${experience.startYear} - ${experience.endMonth} ${experience.endYear || ''}`}</div>
                        <div className="work-experience-location">{experience.location} - {experience.locationType}</div>
                    </div>
                ))}
                {(workExperiences.length === 0 && loading === false) && 'No work experience'}
            </div>
        </div>
    );
};
