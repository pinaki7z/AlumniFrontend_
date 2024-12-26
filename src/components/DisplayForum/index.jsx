import React from 'react';
import { Link } from 'react-router-dom';
import './displayForum.css';

const DisplayForum = ({ forumData, loading, admin }) => {
  console.log('forumData', forumData);
  return (
    <div className='table' style={{ width: '100%',padding: '0px 0px' }}>
      <table className='styled-table' style={{ width: '100%' }}>
        <thead>
          <tr style={{borderColor: 'snow'}}>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : forumData.length ? (
            forumData.map((forum) => (
              <tr key={forum.id}>
                <td data-label="Title">
                  <Link to={`/forums/${forum._id}`} style={{ textDecoration: 'none' }}>
                    <h4 style={{ color: '#3A3A3A', fontSize: '18px', fontWeight: '600', fontFamily: 'Inter' }}>
                      {forum.title}
                    </h4>
                  </Link>
                </td>
                <td data-label="Description" style={{ textAlign: 'left' }}>
                  <p
                    style={{
                      color: '#3A3A3A',
                      fontSize: '18px',
                      fontWeight: '500',
                      fontFamily: 'Inter',
                      marginBottom: '0px',
                    }}
                    dangerouslySetInnerHTML={{ __html: forum.description.replace(/<figure.*?<\/figure>/g, '') }}
                  ></p>
                </td>
                <td data-label="Type">
                  <h4 style={{ color: '#3A3A3A', fontSize: '18px', fontWeight: '600', fontFamily: 'Inter' }}>
                    {forum.type}
                  </h4>
                </td>
                <td data-label="Members">
                  <h4 style={{ color: '#3A3A3A', fontSize: '18px', fontWeight: '600', fontFamily: 'Inter' }}>
                    {forum.members.length}
                  </h4>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No forums posted</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default DisplayForum;
