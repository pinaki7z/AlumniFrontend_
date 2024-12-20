import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/left-sidebar";
import TopBar from "../../components/topbar";
import SocialMediaPost from "../../components/Social-wall-post";
import SideWidgets from "../../components/SideWidgets";
import Groups from "../Groups";
import Donations from "../Donations";
import Sponsorships from "../Sponsorships";
import Settings from "../Settings";
import ProfilePage from "../ProfilePage";
import Members from '../Members';
import Profile from '../Profile';
import Events from "../Events";
import Jobs from "../Jobs";
import LandingPage from "../LandingPage/index.jsx";
import IndividualJobPost from "../Jobs/IndividualJobPost.jsx";
import Internships from "../Internships";
import NotificationsPage from "../NotificationsPage";
import News from "../News/index.jsx";
import Forum from "../Forum";
import CreateForum from "../../components/Forum/CreateForum";
import IForum from "../../components/Forum/IForum";
import Chatbox from "../../components/Chatbox"
import { ProfileSettings } from "../ProfilePage/ProfileSettings/index.jsx";
import { Following } from "../../components/Following/index.jsx";
import { Followers } from "../../components/Followers/index.jsx";
import IndividualGroup from "../../components/Groups/IndividualGroup/index.jsx";
import Chat from "../../pages/Chat";
import { WorkExperience } from "../../components/WorkExperience/index.jsx";
import Guidance from "../Guidance/index.jsx";
import { Archive } from "../Jobs/Archive/index.jsx";
import DonSponRequest from "../../components/DonSponRequest/index.jsx";
import { SearchedResults } from "../../components/SearchedResults";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import PhotoGallery from "../PhotoGallery/index.jsx";
import { CreateJob } from "../Jobs/CreateJob/index.jsx";
import { InterestedJobCandidates } from "../Jobs/InterestedJobCandidates/index.jsx";
import NewsDetails from "../News/NewsDetails.jsx";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import "./Dashboard.css"
const Dashboard = ({ handleLogout }) => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (profile.accountDeleted === true || (profile.expirationDate && new Date(profile.expirationDate) < new Date())) {
      navigate("/login");
    }
  }, [profile.accountDeleted, profile.expirationDate]);

  return (
    <>
      {/* <TopBar handleLogout={handleLogout} /> */}
      <div className="d-flex flex-row h-100 w-100 overflow-hidden"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="d-none d-lg-block border-end border-secondary">
          <LeftSidebar />
        </div>


        <div className="top-bar-resp">
          <TopBar handleLogout={handleLogout} />
          <Routes>

            <Route path="/groups/*" element={<Groups />} />
            {/* <Route path="/groups/:_id/*" element={<IndividualGroup />} /> */}
            {searchQuery && (
              <Route
                path="/*"
                element={<SearchedResults searchQuery={searchQuery} />}
              />
            )}
            {/* Route for displaying <SocialMedia /> when search query is not present */}
            {!searchQuery && (
              <Route
                path="/*"
                element={
                  <div className="row g-4 p-2">
                    <div className="col-md-8 feed-resp">
                      <SocialMediaPost showCreatePost={true} />
                    </div>
                    <div className="col-md-4 d-none d-lg-block">
                      <SideWidgets />
                    </div>
                  </div>
                }
              />
            )}
            <Route path="/donations/*" element={<Donations />} />
            <Route path="/guidance/*" element={<Guidance />} />
            <Route path="/photo-gallery/*" element={<PhotoGallery />} />
            <Route path="/sponsorships/*" element={<Sponsorships />} />
            <Route path="/members/*" element={<div style={{ width: '100%', padding: '0% 5%' }}><Members showHeading={true} /></div>} />
            <Route path="/members/create" element={
              <div style={{ width: '100%', padding: '5%' }}>
                <DonSponRequest name='member' />
              </div>
            } />
            <Route path="/members/:id/*" element={<Profile />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/notifications/*" element={<NotificationsPage />} />
            <Route path="/events/*" element={<Events />} />
            {/* <Route path="/chat/*" element={<Chat />} /> */}
            <Route path="/jobs/*" element={<Jobs />} />
            <Route
              path="/jobs/create"
              element={<CreateJob />}
            />
            <Route path="/jobs/candidates" element={<InterestedJobCandidates />} />
            {/* <Route path="/internships/*" element={<Internships />} /> */}
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/jobs/:_id/:title" element={<IndividualJobPost />} />
            <Route path="/internships/:_id/:title" element={<IndividualJobPost />} />
            <Route path="/forums/*" element={<Forum />} />
            <Route path="/forums/create" element={<CreateForum />} />
            <Route path="/forums/:id/*" element={<IForum />} />
            <Route path="/profile/:id/following" element={<Following />} />
            <Route path="/profile/:id/followers" element={<Followers />} />
            <Route path="/profile/workExperience" element={<WorkExperience />} />
            <Route path="/profile/profile-settings" element={<ProfileSettings />} />
            {/* <Route path="/socialWall/*" element={
              <div
                style={{
                  display: "flex",
                  gap: "2vw",
                  marginLeft: "40px",
                  paddingTop: "20px",
                  width: "55%",
                }}
              >
                <div style={{ width: "65%" }}>
                  <SocialMediaPost showCreatePost={true}/>
                </div>
              </div>
            }
          /> */}
            <Route path="/news/*" element={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  padding: '2% 5%',
                }}
              >
                <div>
                  <News />
                </div>
                {/* <SideWidgets /> */}
              </div>
            }

            />
            <Route path="/news/:id/*" element={<NewsDetails />} />
          </Routes>
          <div className="chatbox-container" style={{ position: 'fixed', right: '0', bottom: '0', width: '300px', backgroundColor: 'white' }}>
            <Chatbox />
          </div>
        </div>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <LeftSidebar />
          </div>
        </Drawer>

        {/* Hamburger Menu for Mobile */}
        <div className="d-lg-none position-fixed start-0 top-0" style={{ zIndex: 50 }}>
          <IconButton onClick={toggleDrawer(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
              className="text-[#004C8A]"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
