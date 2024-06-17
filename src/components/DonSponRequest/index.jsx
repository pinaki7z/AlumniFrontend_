import './donSponReq.css';
import PageTitle from '../PageTitle';
import { FaWallet, FaArrowLeft } from 'react-icons/fa';
import { Form, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Technology from "../../../src/images/pexels-pixabay-356056.jpg";
import Retail from "../../../src/images/pexels-pixabay-264636.jpg";
import Manufacturing from "../../../src/images/pexels-pixabay-257700.jpg";
import Healthcare from "../../../src/images/pexels-chokniti-khongchum-2280568.jpg";
import Finance from "../../../src/images/pexels-lukas-590041.jpg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import baseUrl from "../../config";
const DonSponRequest = ({ name, edit }) => {
    console.log("DON SPON");
    console.log('name', name, edit)
    const profile = useSelector((state) => state.profile);
    const icon = <FaWallet style={{ color: '#174873' }} />;
    const [modalShow, setModalShow] = React.useState(false);
    let heading;
    const { _id } = useParams();
    console.log('params', _id)
    if (edit) {
        heading = <p style={{ marginBottom: '0', fontSize: '17px', fontWeight: '500' }}>Edit new {name} request</p>
    }
    else {
        heading = <p style={{ marginBottom: '0', fontSize: '17px', fontWeight: '500' }}>Create a new {name}</p>
    }
    if (name === 'group') {
        if (!edit)
            heading = <p style={{ marginBottom: '0', fontSize: '17px', fontWeight: '500' }}>Create a new {name} </p>
        else {
            heading = <p style={{ marginBottom: '0', fontSize: '17px', fontWeight: '500' }}>Edit {name} </p>
        }
    }

    function MyVerticallyCenteredModal(props) {

        const handleCSVupload = async () => {
            try {
                const fileInput = document.getElementById('csv');
                const formData = new FormData();
                formData.append('csv', fileInput.files[0]);

                const response = await axios.post(`${baseUrl}/alumni/alumni/bulkRegister`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Registration successful!', response.data);
                toast.success("User Registered successfully!");
                setLoading(false);
                navigateTo('/members');

            } catch (error) {
                console.error('Registration failed!', error.response.data);
                toast.error(error.response.data.error);
            }
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
                        Bulk Upload
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>Upload .csv file</p>
                        <input type="file" name="csv" id="csv" />
                        <a
                            href={`${baseUrl}/uploads/Book-_1_.csv`}
                            download="Book-_1_.csv"
                        >
                            Download sample .csv file
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCSVupload}>Upload</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    const [groupName, setGroupName] = useState("");
    const [groupType, setGroupType] = useState("Public");
    const [category, setCategory] = useState("Cars and Vehicles");
    const [background, setBackground] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [industry, setIndustry] = useState("");
    const [businessDescription, setBusinessDescription] = useState("");
    const [targetMarket, setTargetMarket] = useState("");
    const [competitiveAdvantage, setCompetitiveAdvantage] = useState("");
    const [currentRevenue, setCurrentRevenue] = useState("");
    const [fundingGoal, setFundingGoal] = useState("");
    const [teamExperience, setTeamExperience] = useState("");
    const [marketingStrategy, setMarketingStrategy] = useState("");
    const [businessPlan, setBusinessPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [picturePath, setPicturePath] = useState("");
    const navigateTo = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        admin: false,
        alumni: false,
        student: false
    });

    const [sponsorshipFormData, setSponsorshipFormData] = useState({
        userId: profile._id,
        nameOfOrganiser: `${profile.firstName} ${profile.lastName}`,
        nameOfEvent: '',
        eventDescription: '',
        emailOfOrganiser: '',
        number: '',
        sponsorshipAmount: '',
        useOfFunds: '',
        eventDate: '',
        location: '',
        targetAudience: '',
        expectedAttendees: '',
        sponsorshipBenefits: '',
        additionalInfo: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'admin') {
            setIsAdmin(checked);
            setFormData(prevFormData => ({
                ...prevFormData,
                admin: checked,
                alumni: checked ? false : prevFormData.alumni,
                student: checked ? false : prevFormData.student,
                batch: checked ? null : prevFormData.batch
            }));
        } else if (name === 'alumni') {
            setFormData(prevFormData => ({
                ...prevFormData,
                alumni: checked,
                admin: checked ? false : prevFormData.admin,
                student: checked ? false : prevFormData.student
            }));
        } else if (name === 'student') {
            setFormData(prevFormData => ({
                ...prevFormData,
                student: checked,
                alumni: checked ? false : prevFormData.alumni,
                admin: checked ? false : prevFormData.admin
            }));
        }
        else {
            // Update formData with the new value for all other fields
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };


    // useEffect(() => {
    //     // Update formData after isAdmin has been updated
    //     setFormData(prevFormData => ({
    //         ...prevFormData,
    //         admin: isAdmin,
    //         // Set batch to null only if admin is checked
    //         batch: isAdmin ? null : prevFormData.batch
    //     }));
    // }, [isAdmin]);





    // const handleChange = (event) => {
    //     if (event.target.name === 'accept') {
    //         setIsAdmin(event.target.checked);
    //     }
    // };




    const handleBusinessPlanChange = (e) => {
        const file = e.target.files[0];
        setBusinessPlan(file); // Set the businessPlan state
    };
    let body;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("handling submit");
        console.log('body', body)
        if (name === 'member') {
            if (formData.admin === false && formData.batch === null) {
                console.log('formData member1', formData)
                toast.error('Please select batch again');
                return;
            }
            try {
                console.log('formData member', formData)
                const response = await axios.post(`${baseUrl}/alumni/register`, formData);
                console.log('Registration successful!', response.data);
                toast.success("User Registered successfully!");
                setLoading(false);
                navigateTo('/members');

                return;

            } catch (error) {
                console.error('Registration failed!', error.response.data);
                toast.error(error.response.data.error);

            }
        }
        if (name === 'donation') {
            try {
                console.log('donation body', body)
                const formDataToSend = new FormData();

                // const industryImages = {
                //     Technology: Technology,
                //     Finance: Finance,
                //     Manufacturing: Manufacturing,
                //     Retail: Retail,
                //     Healthcare: Healthcare,
                // };

                for (const key in body) {
                    if (key === 'businessPlan') {

                        formDataToSend.append('businessPlan', body.businessPlan);
                    } else {
                        console.log("key", key, body[key])
                        formDataToSend.append(key, body[key]);
                    }
                }

                console.log('formData to  send ', formDataToSend)

                const response = await fetch(`${baseUrl}/donations/create`, {
                    method: 'POST',
                    body: formDataToSend,
                });

                if (response.ok) {
                    console.log('Data saved successfully');
                    toast.success("Created");
                    window.location.href = '/donations';
                    return;
                } else {
                    const errorData = await response.json();
                    console.error('Failed to save data', errorData);
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
                return;
            }
        }

        if (name === 'sponsorship') {
            try {
                console.log('sponsorship body', sponsorshipFormData)
                //  const formDataToSend = new FormData();

                // // const industryImages = {
                // //     Technology: Technology,
                // //     Finance: Finance,
                // //     Manufacturing: Manufacturing,
                // //     Retail: Retail,
                // //     Healthcare: Healthcare,
                // // };

                // for (const key in sponsorshipFormData) {
                //         console.log('key', key, sponsorshipFormData[key])
                //         formDataToSend.append(key, sponsorshipFormData[key]);

                // }

                const response = await fetch(`${baseUrl}/sponsorships/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sponsorshipFormData)
                });

                if (response.ok) {
                    console.log('Data saved successfully');
                    toast.success("Created");
                    window.location.href = '/sponsorships';
                    return;
                } else {
                    const errorData = await response.json();
                    console.error('Failed to save data', errorData);
                    return;
                }
            } catch (error) {
                console.error('Error:', error);
                return;
            }
        }


        if (!edit) {
            console.log('body', body)
            try {
                const response = await axios.post(`${baseUrl}/${name}s/create`,
                    body,
                    {
                        "Content-Type": "application/json"
                    });

                console.log(response.data);

                // setTitle("");
                // setDescription("");
                // setTotalAmount("");
                toast.success(`Successfully stored ${name} details`);
                setTimeout(() => {
                    navigateTo(`/${name}s`);
                    //window.location.reload();
                }, 1000);
                return;

            } catch (error) {
                toast.error(error.response.data.message);
                console.log('error', error)
                console.error(error.response.data.message);
            }
        }
        else {
            try {
                const response = await axios.put(`${baseUrl}/${name}s/${_id}`,
                    body,
                    {
                        "Content-Type": "application/json"
                    });

                console.log(response.data);

                // setTitle("");
                // setDescription("");
                // setTotalAmount("");
                toast.success(`Successfully edited ${name} details`);
                setTimeout(() => {
                    navigateTo(`/${name}s`);
                    window.location.reload();
                }, 1000);
                return;


            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false)

    }

    const handleImageChange = (event, item) => {
        console.log('handling image change')
        const file = event.target.files[0];

        if (file) {
            console.log('file')
            const reader = new FileReader();

            reader.onloadend = () => {

                const blobString = reader.result;
                item(blobString);
            };


            reader.readAsDataURL(file);
        }
    };


    const handleSponsorshipChange = (e) => {
        const { name, value, type, checked } = e.target;

        // If the input type is checkbox, handle the checked state
        const newValue = type === 'checkbox' ? checked : value;

        // Convert specific fields to their desired types
        let updatedValue;
        if (name === 'number' || name === 'sponsorshipAmount' || name === 'expectedAttendees') {
            updatedValue = parseFloat(newValue); // Convert to number

        } else {
            updatedValue = newValue;
        }


        setSponsorshipFormData({
            ...sponsorshipFormData,
            [name]: updatedValue
        });
    };




    const handleIndustryChange = (event) => { // Remove the second parameter 'item'
        setIndustry(event.target.value);
        const industryImages = {
            Technology: Technology,
            Finance: Finance,
            Manufacturing: Manufacturing,
            Retail: Retail,
            Healthcare: Healthcare,
        };

        const imagePath = industryImages[event.target.value]; // Assuming this is a path to an image file
        fetch(imagePath)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const blobString = reader.result;
                    setPicturePath(blobString);
                }
                reader.readAsDataURL(blob);
            })
            .catch(error => console.error('Error loading image:', error));
    }

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 1; i >= currentYear - 100; i--) {
            years.push(`${i}-${i + 1}`);
        }
        return years;
    };

    let extraFields = null;
    if (name === 'group') {
        extraFields = (
            <>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="groupName">Group Name</label>
                    <input type="text" style={{ borderRadius: '6px', height: '5.5vh' }} value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="groupType">Group Type</label>
                    <select style={{ borderRadius: '6px', height: '5.5vh' }} value={groupType} onChange={(e) => setGroupType(e.target.value)}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="category">Category</label>
                    <select style={{ borderRadius: '6px', height: '5.5vh' }} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Cars and vehicles">Cars and Vehicles</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Business Connect">Business Connect</option>
                        <option value="Education">Education</option>
                        <option value="Sport">Sport</option>
                        <option value="Pets and Animals">Pets and Animals</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="image">Group Background</label>
                    <label for="images" className="drop-container" id="dropcontainer">
                        <span className="drop-title">Drop files here</span>
                        or
                        <input type="file" id="images" accept="image/*" required onChange={(e) => handleImageChange(e, setBackground)} />
                    </label>
                </div>
            </>
        );
        body = {
            userId: profile._id,
            groupName: groupName,
            groupType: groupType,
            category: category,
            groupLogo: background
        };

    } else if (name === 'member') {
        extraFields = (
            <>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <Button variant="primary" onClick={() => setModalShow(true)} style={{ width: '15%' }}>
                        Bulk Upload
                    </Button>
                </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>First Name*</label><br />
                    <input type='text' name='firstName' id='firstName' onChange={handleChange} required />
                </div>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>Last Name*</label><br />
                    <input type='text' name='lastName' id='lastName' onChange={handleChange} required />
                </div>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>E-mail address*</label><br />
                    <input type='text' name='email' id='email' onChange={handleChange} required />
                </div>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>Password*</label><br />
                    <input type='password' name='password' id='password' onChange={handleChange} required />
                </div>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>Confirm Password*</label><br />
                    <input type='password' name='confirmPassword' id='confirmPassword' onChange={handleChange} required />
                </div>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>Gender*</label><br />
                    <select name='gender' id='gender' onChange={handleChange} required>
                        <option value='0'>Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div style={{ width: '95%' }}>
                    <p>Select one of these:-</p>
                    <div className='check' style={{ flexDirection: 'row', width: '100%', display: profile.profileLevel === 0 ? 'flex' : 'none' }}>
                        <input type='checkbox' name='admin' id='admin' onChange={handleChange} disabled={formData.alumni || formData.student} required={!(formData.alumni || formData.student)} />
                        <p style={{ marginBottom: '0px' }}> Admin</p>
                    </div>
                    <div className='check' style={{ flexDirection: 'row', width: '100%', display: profile.profileLevel === 1 || profile.profileLevel === 0 ? 'flex' : 'none' }}>
                        <input type='checkbox' name='alumni' id='alumni' onChange={handleChange} disabled={formData.admin || formData.student} required={!(formData.admin || formData.student)} />
                        <p style={{ marginBottom: '0px' }}> Alumni</p>
                    </div>
                    <div className="check" style={{ flexDirection: 'row', width: '100%' }}>
                        <input type='checkbox' name='student' id='student' onChange={handleChange} disabled={formData.admin || formData.alumni} required={!(formData.admin || formData.alumni)} />
                        <p style={{ marginBottom: '0px' }}>Student</p>
                    </div>
                </div>

                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>Department*</label><br />
                    <select name='department' id='department' title='Department' onChange={handleChange} required>
                        <option value='' disabled selected>Select Department</option>
                        <option value='Agricultural Engineering'>Agricultural Engineering</option>
                        <option value='Gastroenterology'>Gastroenterology</option>
                        <option value='Indian languages'>Indian languages</option>
                        <option value='Neurosurgery'>Neurosurgery</option>
                        <option value='Vocal Music'>Vocal Music</option>
                    </select>
                </div>
                <div className='form-fields' style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label>Batch*</label><br />
                    <select name='batch' id='batch' onChange={handleChange} disabled={isAdmin} style={{ backgroundColor: isAdmin ? '#f2f2f2' : 'white' }} required>
                        <option value='' disabled selected>Select Batch</option>
                        {generateYears().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

            </>
        )
    }


    else if (name === 'donation') {
        extraFields = (
            <>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" name="name" style={{ borderRadius: '6px', height: '5.5vh' }} value={`${profile.firstName} ${profile.lastName}`} onChange={(e) => setFullName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" style={{ borderRadius: '6px', height: '5.5vh' }} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="text" id="phone" name="phone" style={{ borderRadius: '6px', height: '5.5vh' }} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="amount">Investment Amount ($):</label>
                    <input type="number" id="amount" name="amount" style={{ borderRadius: '6px', height: '5.5vh' }} value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="business_name">Business Name:</label>
                    <input type="text" id="business_name" name="business_name" style={{ borderRadius: '6px', height: '5.5vh' }} value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="industry">Industry:</label>
                    <select id="industry" name="industry" style={{ borderRadius: '6px', height: '5.5vh' }} value={industry} onChange={(e) => handleIndustryChange(e, setPicturePath)} required>
                        <option value="">Select Industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="description">Business Description:</label>
                    <textarea id="description" name="description" style={{ resize: 'none', borderRadius: '6px' }} value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)} required></textarea>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="business_plan">Business Plan (PDF):</label>
                    <input type="file" id="business_plan" name="business_plan" accept=".pdf" onChange={(e) => handleBusinessPlanChange(e)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="target_market">Target Market:</label>
                    <input type="text" id="target_market" name="target_market" style={{ borderRadius: '6px', height: '5.5vh' }} value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="competitive_advantage">Competitive Advantage:</label>
                    <textarea id="competitive_advantage" name="competitive_advantage" style={{ resize: 'none', borderRadius: '6px' }} value={competitiveAdvantage} onChange={(e) => setCompetitiveAdvantage(e.target.value)} required></textarea>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="current_revenue">Current Revenue ($):</label>
                    <input type="number" id="current_revenue" name="current_revenue" style={{ borderRadius: '6px', height: '5.5vh' }} value={currentRevenue} onChange={(e) => setCurrentRevenue(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="funding_goal">Funding Goal ($):</label>
                    <input type="number" id="funding_goal" name="funding_goal" style={{ borderRadius: '6px', height: '5.5vh' }} value={fundingGoal} onChange={(e) => setFundingGoal(e.target.value)} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="team_experience">Team Experience:</label>
                    <textarea id="team_experience" name="team_experience" style={{ resize: 'none', borderRadius: '6px' }} value={teamExperience} onChange={(e) => setTeamExperience(e.target.value)} required></textarea>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label htmlFor="marketing_strategy">Marketing Strategy:</label>
                    <textarea id="marketing_strategy" name="marketing_strategy" style={{ resize: 'none', borderRadius: '6px' }} value={marketingStrategy} onChange={(e) => setMarketingStrategy(e.target.value)} required></textarea>
                </div>
            </>
        );
        body = {
            userId: profile._id,
            name: `${profile.firstName} ${profile.lastName}`,
            email: email,
            phone: phone,
            amount: amount,
            businessName: businessName,
            industry: industry,
            businessDescription: businessDescription,
            businessPlan: businessPlan,
            targetMarket: targetMarket,
            competitiveAdvantage: competitiveAdvantage,
            currentRevenue: currentRevenue,
            fundingGoal: fundingGoal,
            teamExperience: teamExperience,
            marketingStrategy: marketingStrategy,
        };

    }

    else {
        extraFields = (
            <>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="nameOfOrganiser">Name of Organiser:</label>
                    <input type="text" id="nameOfOrganiser" name="nameOfOrganiser" value={`${profile.firstName} ${profile.lastName}`} style={{ borderRadius: '6px', height: '5.5vh' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="nameOfEvent">Name of Event:</label>
                    <input type="text" id="nameOfEvent" name="nameOfEvent" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="eventDescription">Event Description:</label>
                    <textarea id="eventDescription" name="eventDescription" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }}></textarea>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="emailOfOrganiser">Email of Organiser:</label>
                    <input type="email" id="emailOfOrganiser" name="emailOfOrganiser" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="contactNumber">Contact Number of Organiser:</label>
                    <input type="tel" id="contactNumber" name="number" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="sponsorshipAmount">Total Sponsorship Amount Required ($):</label>
                    <input type="number" id="sponsorshipAmount" name="sponsorshipAmount" onChange={handleSponsorshipChange} required style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="useOfFunds">What will you use the sponsorship money for:</label>
                    <textarea id="useOfFunds" name="useOfFunds" onChange={handleSponsorshipChange} required style={{ borderRadius: '6px', height: '5.5vh' }}></textarea>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="eventDate">Event Date:</label>
                    <input type="date" id="eventDate" onChange={handleSponsorshipChange} name="eventDate" required style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="eventLocation">Event Location:</label>
                    <input type="text" id="eventLocation" name="location" onChange={handleSponsorshipChange} required style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="targetAudience">Target Audience:</label>
                    <input type="text" id="targetAudience" name="targetAudience" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="expectedAttendees">Expected Number of Attendees:</label>
                    <input type="number" id="expectedAttendees" name="expectedAttendees" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="sponsorshipBenefits">Sponsorship Benefits Offered:</label>
                    <textarea id="sponsorshipBenefits" name="sponsorshipBenefits" required onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }}></textarea>
                </div>
                {/* <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="sponsorshipPackage">Preferred Sponsorship Package:</label>
                    <input type="text" id="sponsorshipPackage" name="sponsorshipPackage" required style={{ borderRadius: '6px', height: '5.5vh' }}/>
                </div> */}
                <div style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                    <label for="additionalInfo">Additional Information:</label>
                    <textarea id="additionalInfo" name="additionalInfo" onChange={handleSponsorshipChange} style={{ borderRadius: '6px', height: '5.5vh' }}></textarea>
                </div>

            </>
        )
    }

    return (
        <>
            <div className="dsr-container">
                <div>
                    <PageTitle icon={icon} title={heading} />
                </div>
                <div>
                    <form className='don-spon-request' onSubmit={handleSubmit} style={{ display: 'flex', paddingBottom: '20px', alignItems: 'center', backgroundColor: 'white', borderRadius: '6px', marginTop: '20px', flexDirection: 'column' }}>
                        {extraFields}
                        <div style={{ display: 'flex', flexDirection: 'row', width: '95%', justifyContent: 'center', gap: '2rem' }}>
                            <button style={{ display: 'flex', border: 'none', background: 'inherit', alignItems: 'center', color: '#666', width: '14%', gap: '0.5rem', justifyContent: 'center' }}><Link to={`/${name}s`} style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', color: 'rgb(102, 102, 102)', width: '100%', gap: '0.5rem', justifyContent: 'center' }}><FaArrowLeft /><p style={{ marginBottom: '0rem' }}>Go Back</p></Link></button>
                            <button style={{ color: '#ffffff', backgroundColor: '#174873', borderColor: '#174873', borderRadius: '6px', width: '20%', height: '5vh' }} type="submit">{loading ? 'Creating...' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default DonSponRequest;