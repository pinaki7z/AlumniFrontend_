import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GiMoneyStack } from 'react-icons/gi';
import { FaCalendarAlt } from "react-icons/fa";
import { FcBriefcase } from "react-icons/fc";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { lineSpinner } from 'ldrs';
import './individualJobPost.css';
import coverImage from '../../images/cultural-1.jpg'
import { fontSize } from "@mui/system";
import { Link } from 'react-router-dom';
import { CiLocationArrow1 } from "react-icons/ci";
import { RiHomeSmileLine } from "react-icons/ri";
import baseUrl from "../../config";

lineSpinner.register()




const IndividualJobPost = () => {
    const { _id, title } = useParams();
    const [cookie] = useCookies(['access_token']);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [starLoading, setStarLoading] = useState(false);
    const [applyLoading, setApplyLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(null);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [candidateModalShow, setCandidateModalShow] = React.useState(false);
    const [appliedCandidates, setAppliedCandidates] = useState([]);
    const [appliedCandidatesDetails, setAppliedCandidatesDetails] = useState([]);
    const [showImagesModal, setShowImagesModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);



    const toggleShareOptions = () => {
        setShowShareOptions(!showShareOptions);
    };
    const profile = useSelector((state) => state.profile);
    const fetchDonationPost = async () => {
        const response = await axios.get(`${baseUrl}/${title}/${_id}`)
        const data = response.data;
        setJobs(data);
        setLoading(false)
    }

    let admin;
    if (profile.profileLevel === 0) {
        admin = true;
    }


    const fetchAppliedUserIds = async () => {
        console.log('id', _id)
        const response = await axios.get(`${baseUrl}/${title}/appliedCandidates/${_id}`)
        const data = response.data;
        setAppliedCandidates(data.userIds);
        setAppliedCandidatesDetails(data.appliedCandidates);
    }




    useEffect(() => {
        fetchDonationPost();
        if (title === 'Jobs') {
            fetchAppliedUserIds();
        }
        if (title === 'Internships') {
            fetchAppliedUserIds();
        }
    }, [_id])
    const isApplied = appliedCandidates.includes(profile._id);

    function MyVerticallyCenteredModal(props) {
        const [name, setName] = useState('');
        const [resume, setResume] = useState(null);
        const [questions, setQuestions] = useState([]);
        const [answers, setAnswers] = useState([]);
        const [applyLoading, setApplyLoading] = useState(false);

        useEffect(() => {
            setQuestions(jobs.questions);
            setAnswers(jobs.questions.map(question => ({ question: question, answer: '' })));
        }, [props.jobs]);

        const handleNameChange = (e) => {
            setName(e.target.value);
        };

        const handleResumeChange = (e) => {
            setResume(e.target.files[0]);
        };

        const handleAnswerChange = (index, e) => {
            const newAnswers = [...answers];
            newAnswers[index].answer = e.target.value;
            setAnswers(newAnswers);
        };

        const handleSubmit = () => {
            setApplyLoading(true);
            const apiUrl = `${baseUrl}/jobs/apply/${_id}`;
            const formData = new FormData();
            formData.append('userId', profile._id);
            formData.append('name', name);
            formData.append('resume', resume);


            answers.forEach((ans, index) => {
                formData.append(`answers[${index}][question]`, ans.question);
                formData.append(`answers[${index}][answer]`, ans.answer);
            });

            fetch(apiUrl, {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Application submitted successfully!');
                        toast.success("Applied");
                        window.location.reload();
                        setApplyLoading(false);
                        props.onHide();
                    } else {
                        console.error('Failed to submit application');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
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
                        Apply
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control type="file" accept=".pdf" onChange={handleResumeChange} />
                        </Form.Group>
                        {questions.map((question, index) => (
                            <Form.Group key={index} className="mb-3" controlId={`question-${index}`}>
                                <Form.Label>{question}</Form.Label>
                                <Form.Control type="text" value={answers[index].answer} onChange={(e) => handleAnswerChange(index, e)} />
                            </Form.Group>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={handleSubmit}>{applyLoading ? 'Applying...' : 'Apply'}</Button>
                </Modal.Footer>
            </Modal>
        );
    }



    const formatCreatedAt = (createdAt) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeString = new Date(createdAt).toLocaleTimeString(undefined, options);
        const dateString = new Date(createdAt).toLocaleDateString();

        return `${dateString} ${timeString} `;
    };

    const handleStatusUpdate = (status, comment, userId) => {
        console.log('job id', status, comment, userId)
        setStatusLoading(status);

        axios.put(`${baseUrl}/jobs/${_id}/updateJobStatus`, { userId, status, comment })
            .then(response => {
                console.log("Job status updated successfully:", response.data.message);
                fetchAppliedUserIds();
                setStatusLoading(false);
            })
            .catch(error => {
                console.error("Error updating job status:", error.response.data.message);
            });
    };


    const RenderCandidateDetails = () => {
        const [comments, setComments] = useState({});
        const [showCommentBox, setShowCommentBox] = useState(false);
        const [status, setStatus] = useState('')
        if (appliedCandidatesDetails.length === 0) {
            return <p>No interested Candidates</p>;
        }


        const handleApprove = (status, userId) => {
            setComments(prevComments => ({
                ...prevComments,
                [userId]: { showCommentBox: true, comment: '' }
            }));
            setStatus(status);
        };

        const handleReject = (status, userId) => {
            setComments(prevComments => ({
                ...prevComments,
                [userId]: { showCommentBox: true, comment: '' }
            }));
            setStatus(status);
        };

        const handleClose = (userId) => {
            setComments(prevComments => ({
                ...prevComments,
                [userId]: { ...prevComments[userId], showCommentBox: false, comment: '' }
            }));
        };

        const handleSend = (userId) => {
            if (comments[userId].comment.trim() !== '') {
                setShowCommentBox(false);
                handleStatusUpdate(status, comments[userId].comment, userId);
                setComments(prevComments => ({
                    ...prevComments,
                    [userId]: { ...prevComments[userId], showCommentBox: false, comment: '' }
                }));
            }
        };

        return appliedCandidatesDetails.map((candidate, index) => (
            <div key={index}>
                <div style={{ display: 'flex', gap: '1vw' }}>
                    <p style={{ fontWeight: '500' }}>Name: </p><p>
                        <Link to={`/members/${candidate.userId}`} style={{ textDecoration: 'underline', color: 'inherit' }}>{candidate.name}</Link></p>
                </div>
                <div style={{ display: 'flex', gap: '1vw' }}>
                    <p style={{ fontWeight: '500' }}>Resume: </p><a href={`${baseUrl}/uploads/${candidate.resume}`} target="_blank" rel="noopener noreferrer">{candidate.resume}</a>
                </div>
                <div style={{ display: 'flex', gap: '1vw' }}>
                    <p style={{ fontWeight: '500' }}>Applied At: </p> <p>{formatCreatedAt(candidate.appliedAt)}</p>
                </div>
                {candidate.answers.map((answer, index) => (
                    <div key={index} style={{ display: 'flex', gap: '1vw' }}>
                        <p style={{ fontWeight: '500' }}>Question: </p>
                        <p>{answer.question}</p>
                        <div style={{ display: 'flex', gap: '1vw' }}>
                            <p style={{ fontWeight: '500' }}>Answer: </p>
                            <p>{answer.answer}</p>
                        </div>
                    </div>
                ))}

                {candidate.status ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <p style={{ fontWeight: '600' }}>Status: </p>
                        <p>{candidate.status}</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button
                                onClick={() => handleApprove('Approved', candidate.userId)}
                                style={{
                                    border: 'none',
                                    padding: '5px 15px',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    borderRadius: '6px'
                                }}
                            >
                                {statusLoading === 'Approved' ? (
                                    <l-line-spinner
                                        size="20"
                                        stroke="3"
                                        speed="1"
                                        color="black"
                                    ></l-line-spinner>
                                ) : (
                                    'Approve'
                                )}
                            </button>

                            <button
                                onClick={() => handleReject('Rejected', candidate.userId)}
                                style={{
                                    border: 'none',
                                    padding: '5px 15px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '6px'
                                }}
                            >
                                {statusLoading === 'Rejected' ? (
                                    <l-line-spinner
                                        size="20"
                                        stroke="3"
                                        speed="1"
                                        color="black"
                                    ></l-line-spinner>
                                ) : (
                                    'Reject'
                                )}
                            </button>

                            <button
                                onClick={() => handleStatusUpdate('In Review', '', candidate.userId)}
                                style={{
                                    border: 'none',
                                    padding: '5px 15px',
                                    backgroundColor: '#c4c400',
                                    color: 'white',
                                    borderRadius: '6px'
                                }}
                            >
                                {statusLoading === 'In Review' ? (
                                    <l-line-spinner
                                        size="20"
                                        stroke="3"
                                        speed="1"
                                        color="black"
                                    ></l-line-spinner>
                                ) : (
                                    'In Review'
                                )}
                            </button>
                        </div>
                        <div>
                            {comments[candidate.userId]?.showCommentBox && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <textarea
                                        value={comments[candidate.userId].comment}
                                        onChange={(e) => setComments(prevComments => ({
                                            ...prevComments,
                                            [candidate.userId]: { ...prevComments[candidate.userId], comment: e.target.value }
                                        }))}
                                        placeholder="Enter your message"
                                    />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleSend(candidate.userId)}>Send</button>
                                        <button onClick={() => handleClose(candidate.userId)}>Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <hr />
            </div>
        ));
    };

    const CandidatesModal = () => (
        <Modal
            show={candidateModalShow}
            onHide={() => setCandidateModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Interested Candidates
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RenderCandidateDetails />
            </Modal.Body>
        </Modal>
    );

    const viewCandidatesButton = (
        <button onClick={() => setCandidateModalShow(true)}>View Interested Candidates (<span>{appliedCandidatesDetails.length}</span>)</button>
    );

    const renderImages = () => {
        return jobs.attachments.map((attachment, index) => {
            if (attachment.endsWith('.pdf')) {
                return null; // Skip rendering PDFs
            } else if (attachment.endsWith('.jpg') || attachment.endsWith('.jpeg') || attachment.endsWith('.png')) {
                return (
                    <div key={index} className="image-link">
                        <button style={{ border: 'none', borderBottom: 'solid 1px' }} onClick={() => handleImageClick(`${baseUrl}/uploads/${attachment}`)}>
                            {attachment}
                        </button>
                    </div>
                );
            } else {
                return null;
            }
        });
    };
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImagesModal(true);
    };

    const handleStarred = (jobId) => {
        setStarLoading(true);
        axios.put(`${baseUrl}/${title}/${jobId}`, {
            starred: true,
            userId: profile._id
        })
            .then(response => {
                console.log('Job starred successfully:', response.data);
                fetchDonationPost();
                setStarLoading(false);
            })
            .catch(error => {
                console.error('Error starring job:', error);
                // Handle error if needed
            });

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
    let starButtonText
    if (jobs.starred) {
        starButtonText = jobs.starred.includes(profile._id) ? 'Starred' : 'Star';
    }
    else starButtonText = 'Star'



    return (
        <div className="job-post-container">
      <div className="job-post-header">
        <img
          src={jobs.coverImage || coverImage}
          alt="Job Cover"
          className="job-post-cover"
        />
      </div>
      <div className="job-post-content">
        <div className="job-post-details">
          <h1 className="job-title">{jobs.title || "Job Title"}</h1>
          <p className="company-name">{jobs.company || "Company Name"}</p>
          <div className="job-description">
            <h2>Job Description</h2>
            <p>{jobs.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
          </div>
          <div className="job-responsibilities">
            <h2>Responsibilities</h2>
            <p>
              {jobs.responsibilities || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
            </p>
          </div>
          <div className="job-qualifications">
            <h2>Qualifications</h2>
            <p>{jobs.qualifications || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
          </div>
        </div>
        <div className="job-overview">
            <div style={{backgroundColor: "#f4f4f4", borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",  }}> 

            
            <h2>Job Overview</h2>
            <div style={{padding:'15px'}}>
            <ul>
                <li>
                    <div>
                    <FaCalendarAlt />
                    </div>               
                    <div>
                    <span className="key">Date Posted</span>
                    <span className="value">{jobs.datePosted || "N/A"}</span>
                    </div>
                    
                </li>
                <li>
                    <div>
                    <FaCalendarAlt />
                    </div>
                    
                    <div>
                    <span className="key">Apply By</span>
                    <span className="value">{jobs.applyBy || "N/A"}</span>
                    </div>
            
                </li>
                <li>
                    <div>
                    <FaMapMarkerAlt />
                    </div>
                    
                    <div>
                    <span className="key">Location</span>
                    <span className="value">{jobs.location || "N/A"}</span>
                    </div>
                
                </li>
                <li>
                    <div>
                    <FcBriefcase />
                    </div>
                    
                    <div>
                    <span className="key">Category</span>
                    <span className="value">{jobs.category || "N/A"}</span>
                    </div>
                
                </li>
                <li>
                    <div>
                    <GiMoneyStack />
                    </div>
                    <div>
                    <span className="key">Salary</span>
                    <span className="value">{jobs.salary || "N/A"}</span>
                    </div>
                
                </li>
            </ul>
                <Button
                    className="apply-button"
                    onClick={() => setModalShow(true)}
                >
                    Apply Now
                </Button>
            </div>
            </div>
        </div>
      </div>
      {/* <ApplyModal show={modalShow} onHide={() => setModalShow(false)} /> */}
    </div>
    )


}

export default IndividualJobPost;