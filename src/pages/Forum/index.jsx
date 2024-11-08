import React, { useState, useEffect } from 'react';
import './forum.css';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { MdForum } from 'react-icons/md';
import { useSelector } from 'react-redux';
import DisplayForum from '../../components/DisplayForum';
import { IoSearchSharp } from "react-icons/io5";
import baseUrl from '../../config';

const Forum = () => {
  const [totalForums, setTotalForums] = useState('');
  const [forumData, setForumData] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.profile);
  const icon = <MdForum style={{ color: 'rgb(233, 172, 138)' }} />;
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/forums`)
      .then((response) => response.json())
      .then((data) => {

        if (profile.profileLevel === 0) {
          console.log('superadmin')
          console.log('forumss', data.forums)
          setForumData(data.forums);
          setLoading(false);
          return;
        }
        const filteredForums = data.forums.filter(forum => forum.department === profile.department || forum.department === 'All');

        // Sort based on the selected option
        if (sortBy === 'Most popular') {
          filteredForums.sort((a, b) => b.members.length - a.members.length);
        } else if (sortBy === 'Most recent') {
          filteredForums.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setForumData(filteredForums);
        setTotalForums(filteredForums.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching forum data:', error);
      });
  }, [profile.department, sortBy]);

  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }

  return (
    <>
      <div className='forum' style={{ width: '100%', padding: '2% 5%' }}>
        <div>
          {/* <PageTitle title='Forums' icon={icon} /> */}
          <div style={{ textAlign: 'left', padding: '20px', borderRadius: '10px', marginBottom: '10px', backgroundColor: '#a98de3' }}>
              <h2 style={{ margin: '0' }}>Forums</h2>
              <p style={{ marginTop: '10px', fontSize: '15px', color: 'black' }}>
              Engage in meaningful discussions and share insights with the community.
              </p>
          </div>
          <div style={{ display: 'flex', paddingTop: '25px', justifyContent: 'space-between', width:'100%' }}>
            {/* <p style={{ margin: '0px', fontSize: '18px', fontWeight: '600', color: '#9c9b95' }}>Total Forums:  {loading ? 0 : totalForums}</p> */}
            <div className="search" style={{ display: 'flex', width: '75%' }}>
              <form style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search for topics"
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
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
            <div style={{ width: '20%' }}>
              <select className='select-dropdown' onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%' }}>
                <option value="">Sort by</option>
                <option value="Most popular">Most popular</option>
                <option value="Most recent">Most recent</option>
              </select>
            </div>

          </div>
          <div style={{ textAlign: 'right', paddingTop:'20px', paddingBottom: '20px' }}>

            <Link to="/forums/create">
              <button style={{ width: '126px' }}>Create</button>
            </Link>


          </div>
        </div>
        <DisplayForum forumData={forumData} loading={loading} admin={admin} />
      </div>
    </>
  )
}

export default Forum;
