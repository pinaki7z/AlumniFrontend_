
import React from 'react';
import '../../../components/JobPost/JobPost.css';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GiMoneyStack } from 'react-icons/gi';
import { AiFillGold, AiOutlineDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { BiSolidArchiveIn } from "react-icons/bi";
import { useState } from 'react';
import { FaBriefcase } from "react-icons/fa";
import { RiHomeSmileLine } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import baseUrl from '../../../config';



export const Archive = ({ userId, id, jobTitle, title, titleS, description, salaryMin, createdAt, picture, salaryMax, locationType,duration, jobType, questions, category, currency, attachments, searchQuery,type,company}) => {
    const profile = useSelector((state) => state.profile);
    const navigateTo = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    console.log('search query archive', searchQuery);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);

    let admin;
    if (profile.profileLevel === 0) {
        admin = true;
    }
    const handleClick = () => {
       
        if (type === 'Job') {
            navigateTo(`/jobs/${id}/Jobs`);
        }

        if (type === 'Internship') {
            navigateTo(`/internships/${id}/Internships`);
        }
    }
    const [modalShow, setModalShow] = React.useState(false);
    console.log("idd", id)

    function MyVerticallyCenteredModal(props) {
        const handleArchive = async () => {
            try {
                console.log('id', id)
                const response = await fetch(`${baseUrl}/${type}s/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {

                    console.log('Job archived successfully');
                    toast.success(`success`)

                    setModalShow(false);
                    window.location.reload();
                } else {

                    console.error('Failed to delete job');
                }
            } catch (error) {
                console.error('Error:', error);
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
                        Unarchive {titleS}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to unarchive this {titleS}?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleArchive}>Yes</Button>
                    <Button onClick={props.onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    function DeleteModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Are you sure you want to delete this job ?You will lose access to all data including CVs received under this job.If you want to retain the data , Archive instead.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }


    const handleDelete = async () => {
        try {
            console.log('id', id)
            const response = await fetch(`${baseUrl}/${type+'s'}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {

                console.log('deleted successfully');
                toast.success(`success`)

                setModalShow(false);
                window.location.reload();
            } else {

                console.error('Failed to delete job');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }




    return (
        <div className="donation-card">
            <div className="donation-card-image">
                {attachments && attachments.map((attachment, index) => {
                    if (!attachment.endsWith('.pdf')) {
                        return (
                            <img
                                key={index}
                                src={`${baseUrl}/uploads/${attachment}`}
                                alt=""
                                className="src"
                            />
                        );
                    }
                    return null;
                })}
            </div>


            <div style={{ padding: '16px' }}>
                <div style={{ border: '1px', padding: '5px', backgroundColor: "white", width: '100%' }}>
                    <div className="donation-card-title" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h2 onClick={handleClick} style={{ cursor: 'pointer' }}>{jobTitle}</h2>
                        {(profile.profileLevel === 0 || userId === profile._id) && (
                            <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setMenuVisible(!menuVisible)}>
                                &#8942;
                                {menuVisible && (
                                    <ul className="menu">
                                        <li style={{ listStyleType: 'none' }} onClick={() => setDeleteModalShow(true)}>Delete</li>
                                    </ul>
                                )}
                                <DeleteModal
                                    show={deleteModalShow}
                                    onHide={() => setDeleteModalShow(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="user-details">
                    <RiHomeSmileLine />
                    <p>{company}</p>
                </div>
                <div className="user-details">
                    <GiMoneyStack />
                    {(salaryMin === null && salaryMax === null) ? <p>Unpaid</p> : (
                        <>
                            <p>{salaryMin} <span style={{ marginLeft: '5px' }}>-</span> <span style={{ marginLeft: '5px' }}>{salaryMax}</span></p>
                        </>
                    )}
                </div>
                {locationType && <div className="user-details">
                    <CiLocationArrow1 />
                    <p>{Object.keys(locationType).find(key => locationType[key])}</p>
                </div>}
                <div className="user-details">
                    <AiFillGold />
                    <p>{category}</p>

                </div>
                <div className="user-details">
                    <FaBriefcase />
                    <p>{type}</p>
                </div>
                {(userId === profile._id) && (
                    <div className="job-post-delete" >
                        <Button style={{ display: 'flex', gap: '1vw' }} onClick={() => setModalShow(true)}><BiSolidArchiveIn />Unarchive</Button>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                )}

            </div>


        </div>
    );
}
