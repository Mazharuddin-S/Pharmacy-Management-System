import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBars,
  faDashboard,
  faRemove,
  faSearch,
  faSignOut,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/sidebar.css";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons/faUserCircle";

function SideBar({ userId }: { userId: string | null }) {
  const [hide, setHide] = useState(true);
  // close sidebar............
  function closeSidebar() {
    let sidebar = document.getElementById("sideBar");
    if (sidebar) {
      sidebar.style.transform = "translateX(-25vw)";
    }
    setHide(true);
  }
  // Open Sidebar.......
  function openSidebar() {
    let sidebar = document.getElementById("sideBar");
    if (sidebar) {
      sidebar.style.transform = "translateX(0)";
    }
    setHide(false);
  }
  // Sidebar link....
  let sideLink = document.getElementsByClassName("sidebarLink");
  for (var i = 0; i < sideLink.length; i++) {
    sideLink[i].addEventListener("click", function () {
      closeSidebar();
    });
  }
  return (
    <div id="sideBar">
      <div id="sidebarHeader">
        <span>
          <FontAwesomeIcon icon={faUserCircle} size="xl" />
        </span>
        <button
          onClick={openSidebar}
          style={{ display: hide ? "block" : "none" }}
        >
          <FontAwesomeIcon icon={faBars} size="sm" />
        </button>
        <button
          onClick={closeSidebar}
          style={{ display: hide ? "none" : "block" }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div id="sidebarContent">
        <NavLink to={`/Users?user=${userId}`} className="sidebarLink" end>
          <FontAwesomeIcon icon={faSearch} /> <span>Search Medicines</span>
        </NavLink>
        <NavLink to={`dashboard?user=${userId}`} className="sidebarLink">
          <FontAwesomeIcon icon={faDashboard} /> <span>Dashboard</span>
        </NavLink>
        <NavLink to={`addMedicine?user=${userId}`} className="sidebarLink">
          <FontAwesomeIcon icon={faAdd} /> <span>Add Medicines</span>
        </NavLink>
        <NavLink to={`removeMedicine?user=${userId}`} className="sidebarLink">
          <FontAwesomeIcon icon={faRemove} /> <span>Remove Medicine</span>
        </NavLink>
        <NavLink to="/" className="sidebarLink">
          <FontAwesomeIcon icon={faSignOut} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
