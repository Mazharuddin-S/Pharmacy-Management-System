import { useState } from "react";
import { useSelector } from "react-redux";
import "../CSS/expiring.css";
import { MedObjectType } from "../Store/store";

function Expiring() {
  const medList = useSelector((state: any) => {
    return state.userData.medicineList;
  });

  let date = new Date();
  let month = 11 - date.getMonth();
  let year = date.getFullYear();

  let expired: MedObjectType[] = [];
  medList.map((item: MedObjectType) => {
    let expMonth = +item.expiryDate.slice(5, 7);
    let expYear = +item.expiryDate.slice(0, 4);
    let value = month + expMonth + (expYear - 1 - year) * 12;

    if (value <= 1) {
      expired.push(item);
    }
  });
  return (
    <div id="expiring">
      <h3>List of medicines expiring within 1 month </h3>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Expiry date</th>
          </tr>
        </thead>
        <tbody>
          {expired.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.expiryDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Expiring;
