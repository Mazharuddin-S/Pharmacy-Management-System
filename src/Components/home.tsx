import React, { useEffect, useState } from "react";
import "../CSS/home.css";
import SideBar from "./sideBar";
import SearchMedicine from "./searchMed";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Home() {
  const [searchParam, setSearchParam] = useSearchParams();
  const userInfo = useSelector((state: any) => {
    return state.userData;
  });

  let userId = searchParam.get("user");
  let [userData, setUserdata] = useState({});

  return (
    <div id="home">
      <SideBar userId={userId} />
      <div id="header">
        <h3>{userInfo.medicalName}</h3>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
