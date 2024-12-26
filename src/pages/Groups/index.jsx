import "./Groups.css";
import PageTitle from "../../components/PageTitle";
import PageSubTitle from "../../components/PageSubTitle";
import { BsGridFill } from 'react-icons/bs';
import { Route, Routes } from "react-router-dom";
import SuggestedGroups from "../../components/Groups/SuggestedGroups";
import MyGroups from "../../components/Groups/MyGroups";
import JoinedGroups from "../../components/Groups/JoinedGroups";
import DonSponRequest from "../../components/DonSponRequest";
import IndividualGroup from "../../components/Groups/IndividualGroup";
import { useSelector } from 'react-redux';
import AllGroups from "../../components/Groups/AllGroups";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { AddMembers } from "../../components/Groups/AddMembers";
import GroupMembers from "../../components/Groups/GroupMembers";

const Groups = () => {
  const profile = useSelector((state) => state.profile);
  const title = "Groups";
  const icon = <BsGridFill style={{ color: '#174873' }} />
  const buttontext1 = 'Suggested Groups';
  const buttontext2 = 'Joined Groups';
  const buttontext3 = '';
  const buttontext1Link = "/groups/suggested-groups";
  const buttontext2Link = `/groups/${profile._id}/joined-groups`;
  const buttontext3Link = ``;

  let admin;
  if (profile.profileLevel === 0 || profile.profileLevel === 1) {
    admin = true;
  }

  return (
    <div className="groups-container">
      <div className="groups-header">
        <h2>Groups</h2>
        <p>Connect with like-minded individuals in focused community groups.</p>
      </div>
      <Routes>
        <Route path="/" element={
          <>
            <div className="search-container">
              <div className="search">
                <form className="search-form">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search for groups"
                  />
                  <button type="submit">
                    <IoSearchSharp />
                  </button>
                </form>
              </div>
              <div className="dropdown-container">
                <select className='select-dropdown'>
                  <option value="">All Groups</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          </>
        } />
        <Route path="/:_id/*" element={<IndividualGroup />} />
        <Route path="/suggested-groups" element={
          <>
            <div className="search-container">
              <div className="search">
                <form className="search-form">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search for groups"
                  />
                  <button type="submit">
                    <IoSearchSharp />
                  </button>
                </form>
              </div>
              <div className="dropdown-container">
                <select className='select-dropdown'>
                  <option value="">All Groups</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          </>
        } />
        <Route path="/:id/joined-groups" element={
          <>
            <div className="search-container">
              <div className="search">
                <form className="search-form">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search for groups"
                  />
                  <button type="submit">
                    <IoSearchSharp />
                  </button>
                </form>
              </div>
              <div className="dropdown-container">
                <select className='select-dropdown'>
                  <option value="">All Groups</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          </>
        } />
        <Route path="/create" element={
          <>
            {/* <PageTitle title={title} icon={icon} /> */}
          </>
        } />
        <Route path="/edit/:_id" element={<></>} />
        <Route path="/:id/add" element={
          <>
            <GroupMembers />
          </>
        } />
      </Routes>
      <Routes>
        {admin ? (
          <Route path="/" element={<div className="create-button-container">
            <Link to={`/groups/create`} style={{ textDecoration: 'none', color: 'black' }}>
              <button className="create-button">
                Create
              </button>
            </Link>
          </div>} />
        ) : (
          <Route path="/" element={<></>} />
        )}
      </Routes>
      <Routes>
        {admin ? (
          <Route path="/" element={<PageSubTitle buttontext1='All Groups' name='groups' create={true} />} />
        ) : (
          <Route path="/" element={<PageSubTitle buttontext1={buttontext1} buttontext2={buttontext2} buttontext3={buttontext3} buttontext1Link={buttontext1Link} buttontext2Link={buttontext2Link} buttontext3Link={buttontext3Link} name='groups' create={false} />} />
        )}
        {admin ? (
          <Route path="/suggested-groups" element={<>Wrong Route.Please Go Back</>} />
        ) : (
          <Route path="/suggested-groups" element={<PageSubTitle buttontext1={buttontext1} buttontext2={buttontext2} buttontext3={buttontext3} buttontext1Link={buttontext1Link} buttontext2Link={buttontext2Link} buttontext3Link={buttontext3Link} name='groups' create={false} />} />
        )}
        {admin ? (
          <Route path="/:id/joined-groups" element={<PageSubTitle buttontext1={buttontext1} buttontext2={buttontext2} buttontext3={buttontext3} buttontext1Link={buttontext1Link} buttontext2Link={buttontext2Link} buttontext3Link={buttontext3Link} name='groups' create={true} />} />
        ) : (
          <Route path="/:id/joined-groups" element={<PageSubTitle buttontext1={buttontext1} buttontext2={buttontext2} buttontext3={buttontext3} buttontext1Link={buttontext1Link} buttontext2Link={buttontext2Link} buttontext3Link={buttontext3Link} name='groups' create={false} />} />
        )}
        <Route path="/create" element={<DonSponRequest name='group' edit={false} />} />
        <Route path="/edit/:_id" element={<DonSponRequest name='group' edit={true} />} />
      </Routes>
      <Routes>
        {admin ? (
          <Route path="/suggested-groups" element={<></>} />
        ) : (
          <Route path="/suggested-groups" element={<SuggestedGroups />} />
        )}
        <Route path="/:id/joined-groups" element={<JoinedGroups />} />
        {admin ? (
          <Route path="/" element={<AllGroups />} />
        ) : (
          <Route path="/" element={<MyGroups />} />
        )}
      </Routes>
    </div>
  );
};

export default Groups;
