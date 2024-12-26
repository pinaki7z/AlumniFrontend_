import './donations.css';
import '../../components/DonSpon';
import DonSpon from '../../components/DonSpon';
import { LuHeartHandshake } from 'react-icons/lu';
import PageSubTitle from '../../components/PageSubTitle';
import { Route, Routes, useNavigate } from "react-router-dom";
import MyDonationRequests from '../../components/MyDonationRequests';
import BrowseDonations from '../../components/BrowseDonations';
import { useState, useEffect } from 'react';
import IndividualDonSpon from '../../components/IndividualDonSpon';
import DonSponRequest from '../../components/DonSponRequest';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Bconnect from '../../components/Groups/Bconnect';
import baseUrl from '../../config';

const Donations = () => {
  const navigate = useNavigate();
  const title = 'Donations';
  const icon = <LuHeartHandshake />;
  const buttontext1 = 'Browse Businesses';
  const buttontext2 = 'My Business Requests';
  const buttontext3 = 'Business Connect';
  const buttontext1Link = "/donations";
  const buttontext2Link = "/donations/my-donation-requests";
  const buttontext3Link = "/donations/businessConnect";
  const [donations, setDonations] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const profile = useSelector((state) => state.profile);
  const LIMIT = 4;
  let [page, setPage] = useState(1);
  let [previousPage, setPreviousPage] = useState(0);

  const admin = profile.profileLevel === 2 || profile.profileLevel === 3;

  const getPosts = async () => {
    setLoading(true);
    if (page === previousPage) {
      return;
    }
    try {
      const response = await axios.get(
        `${baseUrl}/donations?page=${page}&size=${LIMIT}`
      );
      const postsData = response.data.records;
      setDonations((prevItems) => [...prevItems, ...postsData]);
      setTotalDonations(response.data.total);
      setPreviousPage(page);
      setLoading(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const updateDonations = () => {
    setIsLoading(true);
    setPage(page + 1);
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  const getUserDonations = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/donations/user/${profile._id}`
      );
      setUserDonations(response.data.donations);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getUserDonations();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2% 5%' }}>
      <DonSpon title="Business Connect" icon={icon}/>

      {/* Create Button */}
      {admin && (
        <div style={{ margin: '1rem 0', textAlign: 'right' }}>
          <button
            onClick={() => navigate('/donations/create')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c63ff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Create Donation
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <PageSubTitle
              buttontext1={buttontext1}
              buttontext2={buttontext2}
              buttontext3={buttontext3}
              buttontext1Link={buttontext1Link}
              buttontext2Link={buttontext2Link}
              buttontext3Link={buttontext3Link}
              name="donations"
              create={admin}
            />
          }
        />
        <Route
          path="/my-donation-requests"
          element={
            <PageSubTitle
              buttontext1={buttontext1}
              buttontext2={buttontext2}
              buttontext3={buttontext3}
              buttontext1Link={buttontext1Link}
              buttontext2Link={buttontext2Link}
              buttontext3Link={buttontext3Link}
              name="donations"
              create={admin}
            />
          }
        />
        <Route
          path="/businessConnect"
          element={
            <PageSubTitle
              buttontext1={buttontext1}
              buttontext2={buttontext2}
              buttontext3={buttontext3}
              buttontext1Link={buttontext1Link}
              buttontext2Link={buttontext2Link}
              buttontext3Link={buttontext3Link}
              name="donations"
              create={admin}
            />
          }
        />
        <Route path="/:_id" element={<IndividualDonSpon />} />
        <Route path="/create" element={<DonSponRequest name="donation" />} />
        <Route path="/edit/:_id" element={<DonSponRequest name="donation" edit={true} />} />
      </Routes>

      <Routes>
        {admin ? (
          <>
            <Route
              path="/my-donation-requests"
              element={<BrowseDonations donSpon={donations} name="donations" />}
            />
            <Route path="/businessConnect" element={<Bconnect />} />
          </>
        ) : (
          <Route
            path="/my-donation-requests"
            element={<BrowseDonations donSpon={userDonations} name="donations" />}
          />
        )}
        <Route
          path="/"
          element={
            <BrowseDonations
              donSpon={donations}
              name="donations"
              updateDonations={updateDonations}
              totalDonations={totalDonations}
              limit={LIMIT}
              page={page}
              loading={loading}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/businessConnect" element={<Bconnect />} />
      </Routes>
    </div>
  );
};

export default Donations;
