import "../CSS/home.css";
import SideBar from "./sideBar";

import { Outlet, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Home() {
  const [searchParam] = useSearchParams();
  const userInfo = useSelector((state: any) => {
    return state.userData;
  });

  let userId = searchParam.get("user");

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
