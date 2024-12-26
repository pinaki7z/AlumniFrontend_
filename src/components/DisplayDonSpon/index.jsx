import './displayDonSpon.css';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { lineSpinner } from 'ldrs';
import picture from '../../images/pexels-lisa-fotios-1957478.jpg';
import baseUrl from "../../config";

lineSpinner.register();

const DisplayDonSpon = ({
  donations,
  name,
  updateDonations,
  totalDonations,
  page,
  limit,
  loading,
  isLoading,
}) => {
  const location = useLocation();
  const profile = useSelector((state) => state.profile);
  const [edit, setEdit] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (
      location.pathname === '/donations/my-donation-requests' ||
      location.pathname === '/sponsorships/my-sponsorship-requests'
    ) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [location.pathname]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${baseUrl}/${name}/${_id}`);
      toast.success(`Successfully deleted ${name} details`);
      if (name === 'donations') {
        setTimeout(() => {
          navigateTo('/donations');
          window.location.reload();
        }, 1000);
      }

      if (name === 'sponsorships') {
        setTimeout(() => {
          navigateTo('/sponsorships');
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    updateDonations();
  };

  return (
    <>
      <div className="donSpon-container">
        {donations && donations.length > 0 ? (
          donations.map((donation) => (
            <Link
              to={`/${name}/${donation._id}`}
              className="donSpon-card-link"
              key={donation._id}
            >
              <div className="donSpon-card">
                <div className="donation-card-image">
                  <img
                    src={donation.picturePath ? donation.picturePath : picture}
                    alt=""
                    className="src"
                  />
                </div>
                <div className="donation-card-content">
                  <button className="donation-card-button">
                    <div className="donation-card-title">
                      <h2>
                        {donation.name
                          ? donation.name
                          : donation.nameOfOrganiser}
                      </h2>
                    </div>
                  </button>

                  <div className="user-details">
                    <p>{formatDate(donation.createdAt)}</p>
                  </div>
                </div>
                {edit ? (
                  <div className="edit-delete-buttons">
                    <Link to={`/${name}/edit/${donation._id}`}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(donation._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="donation-card-bar">
                    <div className="donation-amount">
                      <span>Total amount:</span>
                      <span id="raised-amount">
                        {donation.amount
                          ? donation.amount
                          : donation.sponsorshipAmount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : loading ? (
          <div className="spinner-container">
            <l-line-spinner size="40" stroke="3" speed="1" color="black"></l-line-spinner>
          </div>
        ) : (
          <div>No {name}</div>
        )}
      </div>
      {isLoading && (
        <div className="spinner-container">
          <l-line-spinner size="25" stroke="3" speed="1" color="black"></l-line-spinner>
        </div>
      )}
      {page < totalDonations / limit && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default DisplayDonSpon;
