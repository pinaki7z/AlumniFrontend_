import { useState, useEffect } from "react";
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
import Members from "../Members";
import Profile from "../Profile";
import Events from "../Events";
import Jobs from "../Jobs";
import LandingPage from "../LandingPage/index.jsx";
import IndividualJobPost from "../Jobs/IndividualJobPost.jsx";
import NotificationsPage from "../NotificationsPage";
import News from "../News/index.jsx";
import Forum from "../Forum";
import CreateForum from "../../components/Forum/CreateForum";
import IForum from "../../components/Forum/IForum";
import Chatbox from "../../components/Chatbox";
import { ProfileSettings } from "../ProfilePage/ProfileSettings/index.jsx";
import { Following } from "../../components/Following/index.jsx";
import { Followers } from "../../components/Followers/index.jsx";
import { useSelector } from "react-redux";
import { SearchedResults } from "../../components/SearchedResults/index.jsx";

const Dashboard = ({ handleLogout }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (
      profile.accountDeleted === true ||
      (profile.expirationDate && new Date(profile.expirationDate) < new Date())
    ) {
      navigate("/login");
    }
  }, [profile.accountDeleted, profile.expirationDate]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: isSidebarOpen ? 0 : "-20%",
            height: "100%",
            width: "20%",
            backgroundColor: "#f8f9fa",
            overflowY: "auto",
            transition: "left 0.3s ease",
            zIndex: 999,
          }}
        >
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div
          style={{
            marginLeft: isSidebarOpen ? "20%" : "0",
            width: isSidebarOpen ? "80%" : "100%",
            transition: "margin-left 0.3s ease",
          }}
        >
          {/* TopBar */}
          <TopBar handleLogout={handleLogout} />

          {/* Sidebar Toggle Button */}
          <button
            className="btn btn-outline-primary d-lg-none"
            style={{
              position: "fixed",
              top: "10px",
              left: isSidebarOpen ? "20%" : "10px",
              zIndex: 1050,
            }}
            onClick={toggleSidebar}
          >
            ☰
          </button>

          {/* Routes */}
          <Routes>
            <Route path="/groups/*" element={<Groups />} />
            {searchQuery && (
              <Route
                path="/*"
                element={<SearchedResults searchQuery={searchQuery} />}
              />
            )}
            {!searchQuery && (
              <Route
                path="/*"
                element={
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        gap: "2vw",
                        display: "flex",
                        paddingLeft: "35px",
                      }}
                    >
                      <div style={{ width: "65%" }}>
                        <SocialMediaPost showCreatePost={true} />
                      </div>
                      <SideWidgets />
                    </div>
                  </div>
                }
              />
            )}
            <Route path="/donations/*" element={<Donations />} />
            <Route path="/sponsorships/*" element={<Sponsorships />} />
            <Route path="/profile/*" element={<ProfilePage />} />
            <Route path="/notifications/*" element={<NotificationsPage />} />
            <Route path="/events/*" element={<Events />} />
            <Route path="/jobs/*" element={<Jobs />} />
            <Route path="/forums/*" element={<Forum />} />
          </Routes>

          {/* Chatbox */}
          <div
            className="chatbox-container"
            style={{
              position: "fixed",
              right: "0",
              bottom: "0",
              width: "300px",
              backgroundColor: "white",
            }}
          >
            <Chatbox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
