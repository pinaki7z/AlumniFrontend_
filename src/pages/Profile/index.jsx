import React from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
import picture from "../../images/d-cover.jpg";
import { BiUserPlus } from 'react-icons/bi'
import { LuMessageSquare } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Icons from '../../components/Icons'
import Icons1 from "../../components/Icons1";
import { useSelector } from "react-redux";
import { height, padding } from "@mui/system";
import Feeed from "../../components/Feeed";
import about from "../../images/about.svg";
import work from "../../images/work.svg";
import location from "../../images/location.svg";
import time from "../../images/Time.svg";
import arrowRight from "../../images/arrowRight.svg";

const Profile = () => {
  const { id } = useParams();
  console.log('member id', id);
  const members = useSelector((state) => state.member);
  const member = members.find(member => member._id === id);

  if (!member) {
    return <div>Member not found</div>;
  }


  const currentWork = member.workExperience.find(exp => exp.endMonth.toLowerCase() === 'current');
  console.log('current work', member.workExperience)

  return (
    <>
      <div style={{ width: '100%', padding: '0 5%', paddingTop: '4%' }}>
        <div className="container-div" style={{ width: '100%', borderRadius: '12px', position: 'relative' }}>
          <div className="upper-div" style={{
            backgroundImage: `url(${member.coverPicture})`,
            width: '100%',
            minHeight: '35vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '12px 12px 0px 0px'
          }}>
          </div>
          <div style={{ position: 'absolute', top: '10vh', left: '50%', transform: 'translateX(-50%) translateY(50%)' }}>
            <img src={member.profilePicture} alt="profile-picture" style={{ width: '200px', height: '200px', borderRadius: '50%', border: '5px solid white' }} />
          </div>
          <div className="lower-div" style={{
            backgroundColor: '#efeff0',
            width: '100%',
            minHeight: '25vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0px 0px 12px 12px'
          }}>
            <div className="message-follow" style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
              <button>Message</button>
              <button>Follow</button>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '40%', paddingTop: '20px' }}>
                <p style={{ fontWeight: '700', color: '#3A3A3A', fontSize: '24px', fontFamily: 'Inter' }}>{member.firstName} {member.lastName}</p>
                <p style={{ fontWeight: '300', color: '#000000', fontSize: '14px', fontFamily: 'Inter' }}>{member.profileLevel === 1 ? 'ADMIN' : member.profileLevel === 2 ? 'ALUMNI' : member.profileLevel === 3 ? 'STUDENT' : 'SUPERADMIN'}</p>
                <p style={{ fontWeight: '400', color: '#3A3A3A', fontSize: '16px', fontFamily: 'Inter' }}>Passionate soul, chasing dreams, inspiring others, embracing life's adventures joyfully.</p>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div>
                    <p>Groups</p>
                    <p style={{ fontWeight: '500', color: '#3A3A3A', fontSize: '18px', fontFamily: 'Inter' }}>0</p>
                  </div>
                  <div>
                    <p>Followers</p>
                    <p style={{ fontWeight: '500', color: '#3A3A3A', fontSize: '18px', fontFamily: 'Inter' }}>0</p>
                  </div>
                  <div>
                    <p>Following</p>
                    <p style={{ fontWeight: '500', color: '#3A3A3A', fontSize: '18px', fontFamily: 'Inter' }}>0</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2%' }}>
          <div style={{ width: '70%' }}><Feeed entityType='posts' showCreatePost={false} showDeleteButton={true} userId={member._id} /></div>
          <div style={{ width: '28%', paddingTop: '37px' }}>
            <div>
              <div style={{ backgroundColor: '#301C58', color: '#F8F8FF', borderRadius: '12px 12px 0px 0px', padding: '12px 16px 12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={about} alt="" />
                <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '20px', marginBottom: '0px' }}>About {member.firstName}</p>
              </div>
              <p style={{ backgroundColor: '#efeff0', borderRadius: '0px 0px 12px 12px', padding: '10px 16px 10px 16px', fontFamily: 'Inter', fontWeight: '500', fontSize: '16px', color: '#636364' }}>{member.aboutMe ? member.aboutMe : 'User has not updated his Bio'}</p>
            </div>
            <div>
              <div style={{ backgroundColor: '#301C58', color: '#F8F8FF', borderRadius: '12px 12px 0px 0px', padding: '12px 16px 12px 16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={work} alt="" />
                <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '20px', marginBottom: '0px' }}>Currently Working As</p>
              </div>
              <div style={{ backgroundColor: '#efeff0' }}>
                <p style={{ backgroundColor: '#efeff0', borderRadius: '0px 0px 12px 12px', padding: '10px 16px 10px 16px', fontFamily: 'Inter', fontWeight: '500', fontSize: '16px', color: '#636364', marginBottom: '0px' }}>{currentWork && currentWork.title ? currentWork.title : 'User has not updated his current work title'}</p>
                <div style={{ padding: '16px' }}>
                  <p style={{ color: '#301C58', fontWeight: '500', fontSize: '18px' }}>{currentWork && currentWork.companyName ? currentWork.companyName : 'User has not updated his current work place'}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {currentWork && (currentWork.startMonth && currentWork.startYear && currentWork.endMonth)
                        ? <img src={time} alt="" />: ''}
                    <p style={{ marginBottom: '0px' }}>
                      {currentWork && (currentWork.startMonth && currentWork.startYear && currentWork.endMonth)
                        ? `${currentWork.startMonth} ${currentWork.startYear} - ${currentWork.endMonth}`
                        : ''}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', paddingLeft: '3px' }}>
                    {currentWork && (currentWork.location && currentWork.locationType) ? <img src={location} alt="" />: ''}
                    <p style={{ marginBottom: '0px' }}>{currentWork && (currentWork.location && currentWork.locationType) ? `${currentWork.location} - ${currentWork.locationType}`: ''}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dotted green', padding: '13px 16px', cursor: 'pointer' }}>
                  <p style={{ marginBottom: '0px' }}>Work Experience </p>
                  <img src={arrowRight} alt="" />
                </div>



              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
