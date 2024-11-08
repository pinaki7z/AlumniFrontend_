import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import baseUrl from '../../../config.js';
import { toast } from 'react-toastify';
import axios from "axios";
import { lineSpinner } from 'ldrs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import './CreateJob.css';

lineSpinner.register();

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );
    return (
        <button
            type="button"
            style={{ backgroundColor: 'pink' }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

export const CreateJob = () => {
    const profile = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const [isMyCompany, setIsMyCompany] = useState(true);
    const [verified, setVerified] = useState(true);
    const [isUnpaid, setIsUnpaid] = useState(false);
    const [isJobChecked, setIsJobChecked] = useState(false);
    const [isInternshipChecked, setIsInternshipChecked] = useState(false);
    const [formError, setFormError] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [internshipFormData, setInternshipFormData] = useState({
        userId: profile._id,
        title: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        currency: 'INR',
        duration: 'per hour',
        company: profile.workingAt,
        coverImage: null,
        category: 'Other',
        type: 'Internship',
        description: '',
        attachments: [],
        locationType: 'onSite'
    });
    const [paidStatus, setPaidStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInternshipFormData(prev => ({ ...prev, [name]: value }));
    };

    // const handlePaidUnpaid = (status) => {
    //     setPaidStatus(status);
    //     setInternshipFormData(prev => ({
    //         ...prev,
    //         salaryMin: status === "Unpaid" ? '' : prev.salaryMin,
    //         salaryMax: status === "Unpaid" ? '' : prev.salaryMax
    //     }));
    // };

    const handlePaidUnpaid = (e) => {
        const { name, checked } = e.target;
        if (name === 'isPaid') {
            setIsPaid(checked);
            setIsUnpaid(false);
        } else if (name === 'isUnpaid') {
            setIsUnpaid(checked);
            setIsPaid(false);
            setInternshipFormData(prevFormData => ({
                ...prevFormData,
                salaryMin: '',
                salaryMax: ''
            }));
        }
    };

    const handleLocationTypeChange = (type) => {
        setInternshipFormData(prev => ({ ...prev, locationType: type }));
    };

    const handleFileUpload = (file, endpoint, callback) => {
        const formData = new FormData();
        formData.append(endpoint === 'singleImage' ? 'image' : 'images', file);
        setPicLoading(true);

        axios.post(`${baseUrl}/uploadImage/${endpoint}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((res) => {
                callback(res.data);
                setPicLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        handleFileUpload(file, 'singleImage', (url) => {
            setInternshipFormData(prev => ({ ...prev, coverImage: url }));
        });
    };

    const handleAttachmentsChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            handleFileUpload(file, 'image', (urls) => {
                setInternshipFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...urls] }));
            });
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'isJob' && checked) {
            setIsUnpaid(false);
            setIsJobChecked(true);
            setIsInternshipChecked(false);
            setInternshipFormData(prevFormData => ({
                ...prevFormData,
                type: 'Job',
            }));
        } else if (name === 'isInternship' && checked) {
            setIsInternshipChecked(true);
            setIsJobChecked(false);
            setInternshipFormData(prevFormData => ({
                ...prevFormData,
                type: 'Internship',
                employmentType: 'Internship'
            }));
        }
        setFormError('');
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            ...internshipFormData,
            "locationType[onSite]": internshipFormData.locationType === 'onSite',
            "locationType[remote]": internshipFormData.locationType === 'remote',
            "locationType[hybrid]": internshipFormData.locationType === 'hybrid'
        };

        try {
            const response = await fetch(`${baseUrl}/jobs/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(internshipFormData.type === 'Internship' ? 'Internship post is being validated' : 'Job post is being validated');
            } else {
                const errorData = await response.json();
                console.error('Failed to save data', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    const removeMedia = () => setInternshipFormData({ ...internshipFormData, coverImage: null });



    const handleCompanySelection = (e) => {
        const { value } = e.target;
        if (value === 'myCompany') {
            setIsMyCompany(true);
            setVerified(true); // My company is verified
            setInternshipFormData(prevFormData => ({
                ...prevFormData,
                company: profile.workingAt,
                verified: true // Set profile working at by default
            }));
        } else if (value === 'otherCompany') {
            setIsMyCompany(false);
            setVerified(false); // Other company is not verified
            setInternshipFormData(prevFormData => ({
                ...prevFormData,
                company: '',
                verified: false // Allow user to type the company name
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {

            const data = new FormData();

            // Append each file to the FormData object with the key 'images[]'
            Array.from(files).forEach((file) => {
                data.append('images', file);  // Use 'images' as the key for all files
            });

            // Send the FormData to the API
            axios.post(`${baseUrl}/uploadImage/image`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    // Assuming res.data contains the uploaded files' data (like URLs or IDs)
                    setInternshipFormData(prevState => ({
                        ...prevState,
                        attachments: res.data  // Update the attachments array in formData
                    }));
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="create-job-container">
            <h2 style={{marginBottom:'30px'}}>Create A Job</h2>
            <Form encType="multipart/form-data">
                <Row>
                    <Col>
                        <Form.Group as={Col} className="form-group-custom">
                            <Form.Label htmlFor="job">Title*</Form.Label>
                            <Form.Control
                                id="job"
                                type="text"
                                placeholder="Enter job/internship title"
                                name='title'
                                value={internshipFormData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="location" className="form-group-custom">
                            <Form.Label>Location*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                name="location"
                                value={internshipFormData.location}
                                onChange={handleInputChange}
                                disabled={internshipFormData.locationType.remote}
                                required
                            />
                        </Form.Group>

                    </Col>
                </Row>

                <Form.Group controlId="companyType" className="form-group-custom">
                    <Form.Label>I am hiring for :-*</Form.Label>
                    <div>
                        <Form.Check
                            type='radio'
                            id='myCompany-radio'
                            label='My company'
                            value='myCompany'
                            checked={isMyCompany}
                            onChange={handleCompanySelection}
                        />
                        <Form.Check
                            type='radio'
                            id='otherCompany-radio'
                            label='Other Company'
                            value='otherCompany'
                            checked={!isMyCompany}
                            onChange={handleCompanySelection}
                        />
                    </div>
                </Form.Group>

                {/* Company name input */}
                <Form.Group as={Col} className="form-group-custom">
                    <Form.Label htmlFor="company">Company Name</Form.Label>
                    <Form.Control
                        id="company"
                        type="text"
                        placeholder="Enter company name"
                        name="company"
                        value={internshipFormData.company}
                        onChange={handleInputChange}
                        disabled={isMyCompany} // Disable if "My company" is selected
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="salaryRange" className="form-group-custom">
                            <Form.Label>Salary Range</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Minimum"
                                name="salaryMin"
                                className='mb-2'
                                value={internshipFormData.salaryMin}
                                onChange={handleInputChange}
                                disabled={isUnpaid}
                            />
                            To
                            <Form.Control
                                type="text"
                                placeholder="Maximum"
                                name="salaryMax"
                                className='mt-2'
                                value={internshipFormData.salaryMax}
                                onChange={handleInputChange}
                                disabled={isUnpaid}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="currency" className="form-group-custom">
                            <Form.Label>Currency</Form.Label>
                            <DropdownButton
                                id="createJob-currency-dropdown"
                                title={internshipFormData.currency}
                                style={{ marginTop: '0px', }}
                                onSelect={(eventKey) => {
                                    setInternshipFormData(prevFormData => ({
                                        ...prevFormData,
                                        currency: eventKey,
                                    }));
                                }}
                                className="custom-dropdown1"
                            >
                                <div className="scrollable-dropdown">
                                    <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                                    <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                                    <Dropdown.Item eventKey="JPY">JPY</Dropdown.Item>
                                    <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                                    <Dropdown.Item eventKey="GBP">GBP</Dropdown.Item>
                                </div>
                            </DropdownButton>
                        </Form.Group>
                        <Form.Group controlId="wages" className="form-group-custom">
                            <Form.Label style={{ marginBottom: '0px' }}>Wages</Form.Label>
                            <DropdownButton
                                id="createJob-timings-dropdown"
                                title={internshipFormData.duration}
                                style={{ marginTop: '0px' }}
                                onSelect={(eventKey) => {
                                    setInternshipFormData(prevFormData => ({
                                        ...prevFormData,
                                        duration: eventKey,
                                    }));
                                }}
                                className="custom-dropdown1"
                            >
                                <div className="scrollable-dropdown">
                                    <Dropdown.Item eventKey="per hour">per hour</Dropdown.Item>
                                    <Dropdown.Item eventKey="per week">per week</Dropdown.Item>
                                    <Dropdown.Item eventKey="per month">per month</Dropdown.Item>
                                    <Dropdown.Item eventKey="per year">per year</Dropdown.Item>
                                </div>
                            </DropdownButton>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="job-internship" className="form-group-custom">
                    <Form.Check
                        type='checkbox'
                        id='job-checkbox'
                        label='Job'
                        name='isJob'
                        checked={internshipFormData.type === 'Job'}
                        onChange={handleCheckboxChange}
                    />
                    <Form.Check
                        type='checkbox'
                        id='internship-checkbox'
                        label='Internship'
                        name='isInternship'
                        checked={internshipFormData.type === 'Internship'}
                        onChange={handleCheckboxChange}
                    />
                    {formError && <div className="text-danger">{formError}</div>}
                </Form.Group>
                <Form.Group controlId="employmentType" className="form-group-custom">
                    <Form.Label>Employment Type</Form.Label>
                    <DropdownButton
                        id="createEmployment-type-dropdown"
                        title={internshipFormData.employmentType}
                        disabled={!isJobChecked}
                        onSelect={(eventKey) => {
                            if (eventKey !== "Volunteer") {
                                setIsUnpaid(false);
                            }
                            setInternshipFormData((prevFormData) => ({
                                ...prevFormData,
                                employmentType: eventKey,
                            }));
                        }}
                        className="custom-dropdown1"
                    >
                        <div className="scrollable-dropdown">
                            <Dropdown.Item eventKey="Full-time">Full-time</Dropdown.Item>
                            <Dropdown.Item eventKey="Part-time">Part-time</Dropdown.Item>
                            <Dropdown.Item eventKey="Volunteer">Volunteer</Dropdown.Item>
                            <Dropdown.Item eventKey="Contract">Contract</Dropdown.Item>
                        </div>
                    </DropdownButton>
                </Form.Group>
                {(internshipFormData.type === 'Internship' || internshipFormData.employmentType === 'Volunteer') && (
                    <Form.Group controlId="internship-type" className="form-group-custom">
                        <Form.Check
                            type='checkbox'
                            id='paid-checkbox'
                            label='Paid'
                            name='isPaid'
                            checked={isPaid}
                            onChange={handlePaidUnpaid}
                        />
                        <Form.Check
                            type='checkbox'
                            id='unpaid-checkbox'
                            label='Unpaid'
                            name='isUnpaid'
                            checked={isUnpaid}
                            onChange={handlePaidUnpaid}
                        />
                    </Form.Group>
                )}
                <Form.Group controlId="category" className="form-group-custom">
                    <Form.Label>Category</Form.Label>
                    <DropdownButton
                        id="createJob-categories-dropdown"
                        title={internshipFormData.category}
                        onSelect={(eventKey) => {
                            setInternshipFormData(prevFormData => ({
                                ...prevFormData,
                                category: eventKey,
                            }));
                        }}
                        className="custom-dropdown1"
                    >
                        <div className="scrollable-dropdown">
                            <Dropdown.Item eventKey="Other" >Other</Dropdown.Item>
                            <Dropdown.Item eventKey="Admin & Office" >Admin & Office</Dropdown.Item>
                            <Dropdown.Item eventKey="Art & Design" >Art & Design</Dropdown.Item>
                            {/* Other category items */}
                        </div>
                    </DropdownButton>
                </Form.Group>
                <Form.Group controlId="locationType" className="form-group-custom">
                    <Form.Label>Location Type</Form.Label>
                    <div>
                        <Form.Check
                            type='checkbox'
                            id='onSite-checkbox'
                            label='On-site'
                            checked={internshipFormData.locationType.onSite}
                            onChange={() => handleLocationTypeChange('onSite')}
                        />
                        <Form.Check
                            type='checkbox'
                            id='remote-checkbox'
                            label='Remote'
                            checked={internshipFormData.locationType.remote}
                            onChange={() => handleLocationTypeChange('remote')}
                        />
                        <Form.Check
                            type='checkbox'
                            id='hybrid-checkbox'
                            label='Hybrid'
                            checked={internshipFormData.locationType.hybrid}
                            onChange={() => handleLocationTypeChange('hybrid')}
                        />
                    </div>
                </Form.Group>
                <Accordion defaultActiveKey="0" className="form-group-custom">
                    <Card>
                        <Card.Header>
                            <CustomToggle eventKey="1" style={{ padding: '10px' }}>Add a question</CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body><Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter question"
                                name="questions"
                                value={internshipFormData.questions}
                                onChange={handleInputChange}
                            /></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Form.Group controlId="description" className="form-group-custom">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder={`Enter ${internshipFormData.type.toLowerCase()} description`}
                        name="description"
                        value={internshipFormData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="coverImage" className="form-group-custom">
                    <Form.Label>Add cover image*</Form.Label>
                    <input className='form-control' type="file" onChange={handleCoverImageChange} accept=".jpg, .jpeg, .png, .pdf" required />
                </Form.Group>
                <Form.Group controlId="attachments" className="form-group-custom">
                    <Form.Label>Add attachments*</Form.Label>
                    <input className='form-control' type="file" onChange={handleImageChange} multiple accept=".jpg, .jpeg, .png, .pdf" required />
                </Form.Group>
            </Form>
            <div className="button-group">
                <Button>Back</Button>
                <Button onClick={handlePublish}>{loading ? 'Publishing...' : 'Publish'}</Button>
            </div>

        </div>
    );
};
