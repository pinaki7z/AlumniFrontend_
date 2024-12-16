    import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import backgroundPicture1 from '../../images/pexels-mohamed-abdelghaffar-771742.jpg';
import picture from '../../images/pexels-lisa-fotios-1957478.jpg';
import './individualDonSpon.css';
import { RiInformationFill } from 'react-icons/ri';
import { FaFacebookSquare, FaTwitter, FaInstagram, FaLinkedin, FaPinterestSquare } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from "react-redux";
import baseUrl from "../../config"


const IndividualDonSpon = () => {
    const params = useParams();
    const { _id, name } = useParams();
    const location = useLocation();
    const [donations, setDonations] = useState([]);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const shareButtonRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const profile = useSelector((state) => state.profile);
    console.log('Individual Don Spon', donations)

    useEffect(() => {
        setIsLoading(true); // Set loading to true while fetching data
        if (location.pathname.includes('/sponsorships')) {
            fetch(`${baseUrl}/sponsorships/${_id}`)
                .then((response) => response.json())
                .then((data) => {
                    setDonations([data]);
                    setIsLoading(false); // Set loading to false when data is available
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false); // Set loading to false in case of an error
                });
        }
        if (location.pathname.includes('/donations')) {
            fetch(`${baseUrl}/donations/${_id}`)
                .then((response) => response.json())
                .then((data) => {
                    setDonations([data]);
                    setIsLoading(false); // Set loading to false when data is available
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false); // Set loading to false in case of an error
                });
        }
    }, [location.pathname, _id]);
    console.log('I-donations', donations)

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const handleShareOptionClick = (link) => {
        window.open(link, '_blank'); // Open the link in a new tab
        setShowShareOptions(false); // Close the share options
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (shareButtonRef.current && !shareButtonRef.current.contains(e.target)) {
                setShowShareOptions(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        const getOrdinal = (n) => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        };

        return `${day}${getOrdinal(day)} ${month} ${year}`;
    };

    return (
        <div className="individual-sponsorship-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                donations.map((donation) => (
                    <div key={donation._id} className="sponsorship-content">
                        <h1 className="sponsorship-title">{donation.industry || "Sponsorship Title"}</h1>
                        <p className="sponsorship-date">
                            Posted on {formatDate(donation.createdAt)}<br/> By {donation.userName || "Superadmin"}
                        </p>
                        <img
                            src={donation.picturePath || picture}
                            alt={location.pathname.includes('/sponsorships') ? 'sponsorship image' : 'donation image'} 
                            className="sponsorship-image"
                        />
                        {/* <div className="ids-amount">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${(donation.raisedAmount / donation.totalAmount) * 100}%`
                                    }}
                                ></div>
                            </div>
                            <p className="amount-text">
                                ₹ {donation.raisedAmount} raised of ₹ {donation.totalAmount}
                            </p>
                        </div> */}
                        <p className="sponsorship-description">
                            {donation.eventDescription || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                        </p>
                        <div className="ids-amount">
                                 <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Total Amount:-(₹) {donation.amount ? donation.amount : donation.sponsorshipAmount}</p>
                                 <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Name:- {donation.name ? donation.name : donation.nameOfOrganiser}</p>
                                 <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Contact Number:- {donation.phone ? donation.phone : donation.number}</p>
                                <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Email:- {donation.email ? donation.email : donation.emailOfOrganiser}</p>
                                {donation.businessPlan && <div style={{ display: 'flex', gap: '1vw', marginTop: '1rem' }}>
                                    <p style={{ fontWeight: '500', fontSize: '15px', marginBottom: '0px' }}>BusinessPlan: </p><a href={`${baseUrl}/uploads/${donation.businessPlan}`} target="_blank" rel="noopener noreferrer">{donation.businessPlan}</a>
                               </div>}
                                {donation.currentRevenue && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Current Revenue:-(₹) {donation.currentRevenue}</p>}
                                {donation.targetMarket && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Target Market:- {donation.targetMarket}</p>}
                               {donation.industry && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Industry:- {donation.industry}</p>}
                                {donation.teamExperience && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Team Experience:- {donation.teamExperience}</p>}
                                 {donation.competitiveAdvantage && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Competitive Advantage:- {donation.competitiveAdvantage}</p>}
                                 {donation.eventDescription && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Event Description:- {donation.eventDescription}</p>}
                                 {donation.location && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Event Location:- {donation.location}</p>}
                                 {donation.expectedAttendees && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Expected Attendees:- {donation.expectedAttendees}</p>}
                                 {donation.sponsorshipBenefits && <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '15px', fontWeight: '500' }}>Sponsorship Benefits:- {donation.sponsorshipBenefits}</p>}
                                 {profile._id !== donation.userId && (
                                    <button
                                        style={{ width: '30%', padding: '10px', marginTop: '10px', backgroundColor:"#eee8fa" }}
                                        onClick={() => window.open('https://razorpay.com/payment-link/plink_PA5q7Jm6wJENlt', '_blank')}
                                    >
                                       Donate
                                    </button>
                                )}


                                {/* <p>Raised of ₹{donation.totalAmount}</p>
                                <div className="ids-bar">
                                    <div
                                        className="ids-fill-bar"
                                        style={{
                                            width: `${(donation.raisedAmount / donation.totalAmount) * 100}%`,
                                            backgroundColor: 'greenyellow'
                                        }}
                                    ></div>
                                </div>
                                <p style={{ marginTop: '1rem', marginBottom: '0rem', color: '#174873', fontSize: '30px', fontWeight: '400' }}>{donation.totalContributions}</p>
                                <p>Total Contributions</p>
                                <div ref={shareButtonRef} >
                                    <button className="ids-amount-button" onClick={handleShareClick}>Share</button>
                                    {showShareOptions && (
                                        <div className="share-options">
                                            <button onClick={() => handleShareOptionClick('https://www.facebook.com')}><FaFacebookSquare /></button>
                                            <button onClick={() => handleShareOptionClick('https://www.twitter.com')}><FaTwitter /></button>
                                            <button onClick={() => handleShareOptionClick('https://www.instagram.com')}><FaInstagram /></button>
                                            <button onClick={() => handleShareOptionClick('https://www.linkedin.com')}><FaLinkedin /></button>
                                            <button onClick={() => handleShareOptionClick('https://www.pinterest.com')}><FaPinterestSquare /></button>
                                        </div>
                                    )}
                                    
                                </div>
                                {donations[0]?.userId !== profile._id && ( 
                                        <button className="ids-amount-button" style={{backgroundColor: '#f44336', marginTop: '25px'}}>Donate</button>
                                    )} */}
                            </div>
                    </div>
                ))
            )}
        </div>
       
    );


}

export default IndividualDonSpon;
