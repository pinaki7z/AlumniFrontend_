import Profilecard from "../../Profilecard";
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { IoSearchSharp } from "react-icons/io5";


const GroupMembers = ({ members }) => {
  const [loading, setLoading] = useState(false);
  const activePageRef = useRef(1);
  
  const LIMIT = 6;
  const totalMembers = members.length;
  
  console.log('group membersz', members)
  return (
    <>
      <p style={{ fontWeight: '600', paddingBottom: '0px', color: '#3A3A3A', fontSize: '32px' }}>Group Members</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="search" style={{ display: 'flex', width: '75%' }}>
          <form style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for members"
                //value={searchQuery}
                //onChange={(e) => setSearchQuery(e.target.value)}
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
      <div
              className="pro"
              style={{
                marginTop: '1em',
                display: 'flex',
                flexWrap: 'wrap',
                paddingBottom: '20px',
              }}
            >
              {members.map((member) => (
                <Profilecard
                  key={member._id}
                  member={member}
                  //addButton={addButton}
                  //groupMembers={member}
                  //owner={owner}
                  //deleteButton={deleteButton !== undefined ? deleteButton : true}
                  //handleDelete={() => handleDelete(member._id)}
                />
              ))}
            </div>
            {loading && <div style={{ textAlign: 'center' }}> Loading...</div>}
            {console.log('act', activePageRef.current, LIMIT, totalMembers)}
            {activePageRef.current * LIMIT < totalMembers && (
              <div style={{ textAlign: 'center' }}>
                <button className="load-more-button" >
                  Load More
                </button>
              </div>
            )}
    </>
  )
}

export default GroupMembers;