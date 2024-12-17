import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './members.css';
import Profilecard from '../../components/Profilecard';
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
import profileImage from "../../images/profileImage.png";

const Members = ({ addButton, groupMembers, owner, deleteButton }) => {
  const membersred = useSelector((state) => state.member.filter(member => member.profileLevel !== 0));
  const [cookie, setCookie] = useCookies('token');
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const activePageRef = useRef(1);
  const LIMIT = 6;
  const [memberRole, setMemberRole] = useState('');
  const [graduatingYear, setGraduatingYear] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const profile = useSelector((state) => state.profile);
  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }

  const totalMembers = membersred.length;

  // Generate last 100 years for graduatingYear and batch ranges
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  };

  const generateBatches = () => {
    const currentYear = new Date().getFullYear();
    const batches = [];
    for (let i = currentYear; i >= currentYear - 100; i -= 3) {
      batches.push(`${i - 2}-${i}`);
    }
    return batches;
  };

  const ListViewItem = ({ member }) => {
    return (
      <Link
        to={`/members/${member._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="list-view-item">
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div>
              <img src={member.profilePicture} alt="" style={{ width: '100px', height: '100px', borderRadius: 50 }} />
            </div>
            <div style={{ marginLeft: '20px' }}>
              <p className="list-item-username">{member.firstName}</p>
              <p className="list-item-username" style={{ fontSize: '14px', fontWeight: '300', fontFamily: 'Inter', color: '#3A3A3A' }}>{member.profileLevel === 1 ? 'ADMIN' : member.profileLevel === 2 ? 'ALUMNI' : member.profileLevel === 3 ? 'STUDENT' : 'SUPER ADMIN'}</p>
              <p className="list-item-username">{member.graduatingYear}</p>
              <p className="list-item-username">{member.class}</p>
            </div>
          </div>

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

  useEffect(() => {
    initialMembers();
  }, []);

  useEffect(() => {
    console.log('members red', membersred)
    let filteredMembers = membersred;

    // Apply search filter
    if (searchQuery) {
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply memberRole filter
    if (memberRole) {
      const roleMapping = {
        "1": 1,
        "2": 2,
        "3": 3
      };
      filteredMembers = filteredMembers.filter(
        (member) => member.profileLevel === roleMapping[memberRole]
      );
    }

    // Apply graduatingYear filter
    if (graduatingYear) {
      filteredMembers = filteredMembers.filter(
        (member) => member.graduatingYear === parseInt(graduatingYear)
      );
    }

    // Apply department filter
    if (department) {
      console.log('department', typeof department)
      filteredMembers = filteredMembers.filter(
        (member) => member.department === department
      );
    }

    // Apply batch filter
    if (batch) {
      const [startYear, endYear] = batch.split('-').map(Number);
      filteredMembers = filteredMembers.filter(
        (member) =>
          member.graduatingYear >= startYear && member.graduatingYear <= endYear
      );
    }

    // Update no users found state
    setNoUsersFound(filteredMembers.length === 0);

    // Update displayed members
    setDisplayedMembers(filteredMembers.slice(0, LIMIT));
  }, [searchQuery, memberRole, graduatingYear, department, batch]);

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

  const handleMemberRoleChange = (e) => {
    setMemberRole(e.target.value);
  };

  const handleGraduatingYearChange = (e) => {
    setGraduatingYear(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
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
        <div style={{ textAlign: 'left', padding: '20px', borderRadius: '10px', marginBottom: '10px', backgroundColor: '#a98de3' }}>
          <h2 style={{ margin: '0', color: 'white' }}>Members</h2>
          <p style={{ marginTop: '10px', fontSize: '15px', color: 'black' }}>
            Explore profiles and expand your network with fellow members.
          </p>
        </div>
        <div style={{ alignItems: 'center' }}>
          <div className="search" style={{ display: 'flex', width: '75%', marginBottom: '10px' }}>
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

          {/* New Filters */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <select className='select-dropdown' value={memberRole} onChange={handleMemberRoleChange}>
              <option value="">All Members</option>
              <option value="1">Admin</option>
              <option value="2">Alumni</option>
              <option value="3">Current Student</option>
            </select>

            <select className='select-dropdown' style={{ marginLeft: '10px' }} value={graduatingYear} onChange={handleGraduatingYearChange}>
              <option value="">All Graduating Years</option>
              {generateYears().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select className='select-dropdown' style={{ marginLeft: '10px' }} value={department} onChange={handleDepartmentChange}>
              <option value="">All Departments</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Neurosurgery">Neurosurgery</option>
              <option value="Human Languages">Human Languages</option>
            </select>

            <select className='select-dropdown' style={{ marginLeft: '10px' }} value={batch} onChange={handleBatchChange}>
              <option value="">All Batches</option>
              {generateBatches().map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>

        </div>
        {/* <div style={{ paddingTop: '20px' }}>
          <button onClick={() => setViewMode('grid')} className="toggle-button">
            Grid View
          </button>
          <button onClick={() => setViewMode('list')} className="toggle-button">
            List View
          </button>
        </div> */}
      </div>

      <Routes>
        <Route path="/" element={
          <>
            {viewMode === 'grid' ? (
              <div className="pro grid-view">
                {(profile.profileLevel === 0 || profile.profileLevel === 1) && (
                  <Link to={`/members/create`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div
                      style={{
                        border: '2px dotted #a98de3',
                        borderRadius: '8px',
                        width: '17vw',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img src={createMember} alt="" />
                    </div>
                  </Link>
                )}

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
