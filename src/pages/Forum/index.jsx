import React, { useState, useEffect } from 'react';
import './forum.css';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { MdForum } from 'react-icons/md';
import { useSelector } from 'react-redux';
import DisplayForum from '../../components/DisplayForum';
import baseUrl from '../../config';

const Forum = () => {
  const [totalForums, setTotalForums] = useState('');
  const [forumData, setForumData] = useState([]);
  const [filteredForumData, setFilteredForumData] = useState([]); // For search results
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.profile);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/forums`)
      .then((response) => response.json())
      .then((data) => {
        let filteredForums = [];

        if (profile.profileLevel === 0) {
          console.log('superadmin');
          filteredForums = data.forums;
        } else {
          filteredForums = data.forums.filter(
            forum => forum.department === profile.department || forum.department === 'All'
          );
        }

        // Sort based on the selected option
        if (sortBy === 'Most popular') {
          filteredForums.sort((a, b) => b.members.length - a.members.length);
        } else if (sortBy === 'Most recent') {
          filteredForums.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setForumData(filteredForums);
        setFilteredForumData(filteredForums); // Initially show all forums
        setTotalForums(filteredForums.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching forum data:', error);
      });
  }, [profile.department, sortBy]);

  // Filter forums based on the search query
  useEffect(() => {
    const filtered = forumData.filter(forum =>
      forum.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredForumData(filtered);
  }, [searchQuery, forumData]);

  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }

  return (
    <>
      <div className='forum' style={{ width: '100%', padding: '2% 5%' }}>
        <div>
          <div style={{
            textAlign: 'left',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '10px',
            backgroundColor: '#a98de3'
          }}>
            <h2 style={{ margin: '0', color: 'white' }}>Forums</h2>
            <p style={{ marginTop: '10px', fontSize: '15px', color: 'black' }}>
              Engage in meaningful discussions and share insights with the community.
            </p>
          </div>
          <div className="search-container">
            <div className="search">
              <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search for topics"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    
                  />
                  <button
                    type="submit"
                    
                  >
                    <IoSearchSharp style={{ color: '#301C58', width: '25px', height: '25px' }} />
                  </button>
                
              </form>
            </div>
            <div className="dropdown-container">
              <select
                className='select-dropdown'
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="">Sort by</option>
                <option value="Most popular">Most popular</option>
                <option value="Most recent">Most recent</option>
              </select>
            </div>
          </div>
          <div style={{ textAlign: 'right', paddingTop: '20px', paddingBottom: '20px' }}>
            <Link to="/forums/create">
              <button style={{ width: '126px' }}>Create</button>
            </Link>
          </div>
        </div>
        <DisplayForum forumData={filteredForumData} loading={loading} admin={admin} />
      </div>
    </>
  );
};

export default Forum;
