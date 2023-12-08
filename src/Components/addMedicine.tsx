import React, { useState } from "react";
import "../CSS/addMedicine.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { userActions } from "../Store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";

function AddMedicine() {
  let dispatch = useDispatch();
  let [searchParam, setSearchParam] = useSearchParams();
  let userId = searchParam.get("user");
  let medData = useSelector((state: any) => {
    return state.useData;
  });
  type medType = {
    name: string;
    price: number;
    stock: number;
    content: string;
    expiryDate: string;
  };
  let [medDetails, setMeddetails] = useState<medType>({} as medType);
  let [detailsArr, setDetailsArr] = useState<medType[]>([]);
  // Input Change Handler
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let name = event.target.name;
    let value = event.target.value;
    setMeddetails(prev => {
      return { ...prev, [name]: value };
    });
  }
  // Submit Handler
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(medDetails);
    setDetailsArr(prev => {
      return [...prev, medDetails];
    });
    console.log(detailsArr);
  }
  // Remove handler
  function removeHandler(ind: number) {
    setDetailsArr(prev => {
      return prev.filter((item, index: number) => {
        return index !== ind;
      });
    });
  }

  // Clear all table.....
  function clearAll() {
    setDetailsArr([]);
  }

  // Add Medicine to inventory
  function addMedicine() {
    dispatch(
      userActions.addMedicine({ detailsArr: detailsArr, userId: userId })
    );
    setDetailsArr([]);
    alert("Added");
  }
  return (
    <div id="addMed">
      <div id="medDetails">
        <form onSubmit={event => submitHandler(event)}>
          <div>
            <label htmlFor="medicineName">Medicine name</label>
            <input
              type="text"
              name="name"
              id="medicineName"
              required
              onChange={event => changeHandler(event)}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <input
              type="text"
              name="content"
              id="content"
              onChange={event => changeHandler(event)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              min={0}
              name="price"
              id="price"
              onChange={event => changeHandler(event)}
              required
            />
          </div>
          <div>
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              min={0}
              step={1}
              name="stock"
              id="stock"
              onChange={event => changeHandler(event)}
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry date</label>
            <input
              type="date"
              name="expiryDate"
              id="expiryDate"
              onChange={event => changeHandler(event)}
              required
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
      <div id="medDetailsTable">
        <div className="table">
          <div className="row header">
            <div className="cols">Medicine name</div>
            <div className="cols">Content</div>
            <div className="cols">Price</div>
            <div className="cols">Stock</div>
            <div className="cols">Expiry date</div>
            <div className="cols">
              <button onClick={clearAll}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          </div>
          {detailsArr.map((item: any, index: number) => {
            return (
              <div key={index} className="row">
                <div className="cols">{item.name}</div>
                <div className="cols">{item.content}</div>
                <div className="cols">{item.price}</div>
                <div className="cols">{item.stock}</div>
                <div className="cols">{item.expiryDate}</div>
                <div className="cols">
                  <button onClick={() => removeHandler(index)}>
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div
          id="addToinventory"
          style={{ display: detailsArr.length != 0 ? "flex" : "none" }}
        >
          <button onClick={addMedicine}>Add to Inventory</button>
        </div>
      </div>
    </div>
  );
}
export default AddMedicine;
