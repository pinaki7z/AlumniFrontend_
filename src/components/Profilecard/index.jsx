import React, { useState, useEffect } from "react";
import "./profilecard.css";
import picture from "../../images/profilepic.jpg";
import { HiUsers } from "react-icons/hi";
import { IoIosReorder } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { BiUserPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { orbit } from 'ldrs';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import delButton from "../../images/deleteButton.svg";
import profileImage from "../../images/profileImage.png";
import { MdOutlineRestore } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import baseUrl from "../../config";
import { updateProfile } from '../../store/profileSlice';
import { toast } from "react-toastify";

orbit.register()

const Profilecard = ({ member, name, addButton, groupMembers, owner, deleteButton, handleDelete }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [cookie, setCookie] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);
  const { _id, id } = useParams();
  const dispatch = useDispatch();
  let [isAdded, setIsAdded] = useState();
  const profile = useSelector((state) => state.profile);
  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }
  const isFollowPresent = window.location.href.includes('follow');
  console.log('isFollowPresent', member)


  const isGroupURL = window.location.href.includes("http://localhost:3000/groups/");
  const isForumURL = window.location.href.includes("http://localhost:3000/forums/");

  useEffect(() => {
    // if (isGroupURL) {
    //   setIsAdded(groupMembers.includes(member._id));
    // }
    if (isForumURL) {
      setIsAdded(groupMembers.includes(member._id));
    }
  }, [isGroupURL, groupMembers, member._id]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/alumni/${profile._id}/following/all`
        );
        const followingDetails = response.data.followingDetails;
        const isUserFollowing = followingDetails.some(
          (detail) => detail.userId === member._id
        );
        setIsFollowing(isUserFollowing);
        setLoading(false);
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();
  }, [member._id, profile._id, isAdded]);

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      if (!isFollowing) {
        const response = await axios.patch(`${baseUrl}/alumni/${member._id}/follow`, {
          userId: profile._id,
        });
        if (response.status === 200) {
          const responseData = await response.data;
          const { alumni } = responseData;
          dispatch(updateProfile(alumni));
          toast.success('Followed');
          setIsFollowing(true);
          setLoading(false);
        }

      } else {
        const response = await axios.patch(`${baseUrl}/alumni/${member._id}/follow`, {
          userId: profile._id,
        });
        if (response.status === 200) {
          const responseData = await response.data;
          const { alumni } = responseData;
          dispatch(updateProfile(alumni));
          toast.success('Unfollowed');
          setIsFollowing(false);
          setLoading(false);
        }

      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      setLoading(false);
    }
  };

  const handleAddMember = async (groupId, memberId) => {
    console.log('handle add ', groupId, memberId)
    setLoading(true)
    try {
      const response = await axios.put(
        `${baseUrl}/${isGroupURL ? `groups/members/${groupId}` : isForumURL ? `forums/members/${groupId}` : ''}`,
        {
          userId: memberId,
        }
      );



      if (response.status === 200) {
        const { isUserAdded } = response.data;
        if (isUserAdded === true) {
          setIsAdded(true);
          setLoading(false);
        }
        if (isUserAdded === false) {
          setIsAdded(false);
          setLoading(false);
        }
        console.log('User added/removed to/from the group:', isUserAdded);
      } else {

        console.error('Failed to add/remove user to/from the group');
      }
    } catch (error) {

      console.error('Error adding/removing user to/from the group:', error);
    }
  };

  const isOwner = member._id === owner;

  return (
    <>
      <div
        className="card"
        style={{
          width: "17vw",
          backgroundPosition: "center",
          backgroundColor:"#eee8fa",
          WebkitBackgroundSize: "cover",
          position: 'relative',
          height: '45vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {addButton && (
          <button
            onClick={isOwner ? null : () => handleAddMember(_id ? _id : id, member._id)}
            disabled={isOwner}
          >
            {isOwner ? "Group Admin" : isAdded ? "Remove" : <BiUserPlus style={{ fontSize: '17px' }} />}
          </button>
        )}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <img src={member.profilePicture} alt="" style={{ width: '150px', height:'150px' }} />
          {admin && deleteButton && !(profile.profileLevel === 1 && member.profileLevel === 1) && (
            <>{member.accountDeleted === true ? <MdOutlineRestore onClick={handleDelete} style={{ width: '25px', height: '25px', position: 'absolute', right: '15px', top: '10px', cursor: 'pointer' }} /> : <img src={delButton} onClick={handleDelete} style={{ position: 'absolute', right: '15px', top: '10px', backgroundColor: 'white', cursor: 'pointer' }} />}</>
          )}
        </div>
        <Link
          to={isFollowPresent ? `/members/${member.userId}` : `/members/${member._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ paddingTop: "1em", fontWeight: "600", fontSize: '20px', fontFamily: 'Inter', color: '#000000' }}>
              {member.userName ? member.userName : `${member.firstName} ${member.lastName}`}
            </h3>
            <p style={{ fontSize: '14px', fontWeight: '300', fontFamily: 'Inter', color: '#3A3A3A' }}>{member.profileLevel === 1 ? 'ADMIN' : member.profileLevel === 2 ? 'ALUMNI' : member.profileLevel === 3 ? 'STUDENT' : 'SUPER ADMIN'}</p>
            <p style={{ fontSize: '14px', fontWeight: '300', fontFamily: 'Inter', color: '#3A3A3A' }}>{member.department}</p>
            <p style={{ fontSize: '14px', fontWeight: '300', fontFamily: 'Inter', color: '#3A3A3A' }}>
              {member.graduatingYear ? member.graduatingYear : (member.class ? member.class : null)}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <div>
                <p style={{ color: '#636364', fontWeight: '500', fontSize: '14px', fontFamily: 'Inter' }}>Followers</p>
                <p style={{ color: '#000000', fontWeight: '500', fontSize: '16px', fontFamily: 'Inter' }}>0</p>
              </div>
              <div>
                <p style={{ color: '#636364', fontWeight: '500', fontSize: '14px', fontFamily: 'Inter' }}>Following</p>
                <p style={{ color: '#000000', fontWeight: '500', fontSize: '16px', fontFamily: 'Inter' }}>0</p>
              </div>
            </div>
          </div>
        </Link>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <l-orbit
              size="35"
              speed="1.5"
              color="black"
            ></l-orbit>
          </div>
        ) : (
          name !== "follow" && (
            <button
              onClick={handleFollowToggle}
              style={{
                width: '100%',
                position: 'absolute',
                bottom: '0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px 8px 0px 0px',
                height: '6vh',
                fontSize: '20px',
                fontWeight: '500',
                fontFamily: 'Inter',
                backgroundColor: '#301C58',
              }}
            >
              {isFollowing ? "Following" : <><BiUserPlus style={{ fontSize: "17px" }} /> Follow</>}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Profilecard;
