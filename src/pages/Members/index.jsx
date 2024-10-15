import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './members.css';
import Profilecard from '../../components/Profilecard';
//import ListViewItem from '../../components/ListViewItem'; // Import the new component
import PageSubTitle from '../../components/PageSubTitle';
import { Route, Routes } from "react-router-dom";
import DonSponRequest from '../../components/DonSponRequest';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { toast } from "react-toastify";
import { IoSearchSharp } from "react-icons/io5";
import createMember from "../../images/create.svg";
import { Link } from 'react-router-dom';
import baseUrl from '../../config';

const Members = ({ addButton, groupMembers, owner, deleteButton }) => {
  const membersred = useSelector((state) => state.member.filter(member => member.profileLevel !== 0));
  const [cookie, setCookie] = useCookies('token');
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // New state for view mode
  const activePageRef = useRef(1);
  const LIMIT = 6;
  const profile = useSelector((state) => state.profile);
  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }

  const totalMembers = membersred.length;

  useEffect(() => {
    initialMembers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredMembers = membersred.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedMembers(filteredMembers.slice(0, LIMIT));
      setNoUsersFound(filteredMembers.length === 0);
    } else {
      const initialBatch = membersred.slice(0, LIMIT);
      setDisplayedMembers(initialBatch);
      setNoUsersFound(false);
    }
  }, [searchQuery]);

  const loadMoreMembers = () => {
    setLoading(true);
    const startIndex = activePageRef.current * LIMIT;
    const endIndex = startIndex + LIMIT;
    const nextBatch = membersred.slice(startIndex, endIndex);
    setDisplayedMembers((prevMembers) => [...prevMembers, ...nextBatch]);
    activePageRef.current++;
    setLoading(false);
  };

  const initialMembers = () => {
    setLoading(true);
    const startIndex = activePageRef.current * LIMIT;
    const endIndex = startIndex + LIMIT;
    const nextBatch = membersred.slice(startIndex, endIndex);
    setDisplayedMembers((prevMembers) => [...prevMembers, ...nextBatch]);
    setLoading(false);
  };

  const ListViewItem = ({ member }) => {
    return (
      <Link
          to={`/members/${member._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
      <div className="list-view-item">
        <p className="list-item-username">{member.firstName}</p>
        <p className="list-item-username" style={{ fontSize: '14px', fontWeight: '300', fontFamily: 'Inter', color: '#3A3A3A' }}>{member.profileLevel === 1 ? 'ADMIN' : member.profileLevel === 2 ? 'ALUMNI' : member.profileLevel === 3 ? 'STUDENT' : 'SUPER ADMIN'}</p>
        <p className="list-item-username">{member.graduatingYear}</p>
        <p className="list-item-username">{member.class}</p>
      </div>
      </Link>
    );
  };

  const handleDelete = async (memberId) => {
    try {
      const token = cookie.token;
      const response = await axios.delete(`${baseUrl}/alumni/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        toast.success("Alumni Deleted");
        window.location.reload();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="member-container">
      <div
        style={{
          paddingBottom: '2em',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '25px'
        }}
      >
        <p style={{ fontWeight: '600', paddingBottom: '0px', color: '#3A3A3A', fontSize: '32px' }}>Members</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search" style={{ display: 'flex', width: '75%' }}>
            <form style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search for members"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 40px 10px 10px', border: '1px solid #301C58', backgroundColor: 'white' }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'white',
                    border: 'none',
                    padding: '5px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <IoSearchSharp style={{ color: '#301C58', width: '25px', height: '25px' }} />
                </button>
              </div>
            </form>
          </div>
          
          <select className='select-dropdown'>
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Alumni">Alumni</option>
            <option value="Current Student">Current Student</option>
          </select>
          
        </div>
        <div style={{paddingTop: '20px'}}>
            <button onClick={() => setViewMode('grid')} className="toggle-button">
              Grid View
            </button>
            <button onClick={() => setViewMode('list')} className="toggle-button">
              List View
            </button>
          </div>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            {/* Conditionally render based on viewMode */}
            {viewMode === 'grid' ? (
              <div className="pro grid-view">
                <Link to={`/members/create`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div style={{ border: '2px dotted #a98de3', borderRadius: '8px', width: '17vw', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={createMember} alt="" />
                  </div>
                </Link>
                {displayedMembers.map((member) => (
                  <Profilecard
                    key={member._id}
                    member={member}
                    addButton={addButton}
                    groupMembers={groupMembers}
                    owner={owner}
                    deleteButton={deleteButton !== undefined ? deleteButton : true}
                    handleDelete={() => handleDelete(member._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="pro list-view">
                {displayedMembers.map((member) => (
                  <ListViewItem
                    key={member._id}
                    member={member}
                  />
                ))}
              </div>
            )}
            {loading && <div style={{ textAlign: 'center' }}> Loading...</div>}
            {activePageRef.current * LIMIT < totalMembers && (
              <div style={{ textAlign: 'center' }}>
                <button className="load-more-button" onClick={loadMoreMembers}>
                  Load More
                </button>
              </div>
            )}
          </>
        } />
        <Route path="/create" element={<DonSponRequest name='member' />} />
      </Routes>
    </div>
  );
};

export default Members;
