import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../CSS/dashboard.css";
import { useSelector } from "react-redux";
import { MedObjectType } from "../Store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarXmark,
  faCartFlatbed,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  let [searchParam, setSearchParam] = useSearchParams();
  let userId = searchParam.get("user");
  const medList = useSelector((store: any) => store.userData.medicineList);
  let stock = 0;
  let expired = 0;
  let date = new Date();
  let remainigMonth = 11 - date.getMonth();
  let year = date.getFullYear();

  medList.map((item: MedObjectType) => {
    if (item.stock <= 10) {
      stock++;
    }
    let expMonth = +item.expiryDate.slice(5, 7);
    let expYear = +item.expiryDate.slice(0, 4);
    let value = expMonth + remainigMonth + (expYear - 1 - year) * 12;
    value <= 1 && expired++;
  });

  return (
    <div id="dashboard">
      <Link to={`/Users/out-of-stock?user=${userId}`}>
        <FontAwesomeIcon color="chocolate" icon={faCartFlatbed} />
        <div className="number">
          <span> {stock}</span>
          <span> Out of Stock</span>
        </div>
      </Link>
      <Link to={`/Users/expiring?user=${userId}`}>
        <FontAwesomeIcon color="red" icon={faCalendarXmark} />
        <div className="number">
          <span>{expired}</span>
          <span>Expiring Medicines</span>
        </div>
      </Link>
    </div>
  );
}
export default Dashboard;
