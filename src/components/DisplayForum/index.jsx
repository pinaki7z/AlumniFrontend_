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
              <td>Loading...</td>
            </tr>
          ) : forumData.length ? (
            forumData.map((forum) => (
              <tr key={forum.id}>
                <td>
                  <div>
                    <Link to={`/forums/${forum._id}`} style={{ textDecoration: 'none' }}>
                      <h4 style={{ color: '#3A3A3A', fontSize: '18px',fontWeight: '600', fontFamily: 'Inter' }}>{forum.title}</h4>
                    </Link>
                  </div>
                </td>
                <td style={{textAlign: 'left'}}>
                  <div>
                    <p style={{ color: '#3A3A3A', fontSize: '18px',fontWeight: '500', fontFamily: 'Inter',marginBottom: '0px' }} dangerouslySetInnerHTML={{ __html: forum.description.replace(/<figure.*?<\/figure>/g, '') }}></p>
                  </div>
                </td>
                <td>
                  <div>
                    <h4 style={{ color: '#3A3A3A', fontSize: '18px',fontWeight: '600', fontFamily: 'Inter' }}>{forum.type}</h4>
                  </div>
                </td>
                <td>
                  <div>
                    <h4 style={{ color: '#3A3A3A', fontSize: '18px',fontWeight: '600', fontFamily: 'Inter' }}>{forum.members.length}</h4>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No forums posted</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayForum;
