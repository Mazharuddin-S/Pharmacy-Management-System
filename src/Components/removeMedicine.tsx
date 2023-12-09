import React, { useState, useRef } from "react";
import "../CSS/removeMedicine.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { userActions } from "../Store/store";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MedDataType } from "../Store/store";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function RemoveMedicine() {
  const MedData: MedDataType = useSelector((state: any) => {
    return state.userData.medicineList;
  });
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const userId = searchParam.get("user");
  type removeListType = {
    name: string;
    price: number;
    stock: number;
    expiryDate: string;
  };
  const [recommend, setRecommend] = useState<string[]>([]);

  const [removeList, setRemoveList] = useState<removeListType[]>([]);
  const [confirm, setConfirm] = useState(false);
  const searchDelete = useRef<HTMLInputElement | null>(null);
  const debounce = useRef<number | undefined>(undefined);
  ///Search to remove
  function searchToRemove(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.toLowerCase();
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setRecommend([]);
      console.log("setTimeout activated");

      if (value == " ") {
        setRecommend([]);
      }
      if (value) {
        MedData.map((item, index) => {
          if (
            item.name.toLowerCase().startsWith(value) ||
            item.name.toLowerCase().includes(value)
          ) {
            setRecommend(prev => {
              return [...prev, item.name];
            });
          }
        });
      }
    }, 500);
  }
  // Clear remove Search.....
  function clearSearch(event: React.MouseEvent<HTMLButtonElement>) {
    setRecommend([]);
    if (searchDelete.current) {
      searchDelete.current.value = "";
    }
  }
  // select from recommend list
  function selectRemove(event: React.MouseEvent<HTMLDivElement>, item: string) {
    let value = item;
    MedData.map((item, index) => {
      if (item.name.toLowerCase() == value.toLowerCase()) {
        setRemoveList(prev => {
          return [...prev, item];
        });
      }
    });
  }
  // Unselect item........
  function unselect(ind: number) {
    setRemoveList(prev => {
      return prev.filter((item, index) => {
        return index != ind;
      });
    });
  }
  // Delete Selected Item......
  function deleteSelected() {
    setConfirm(true);
  }
  // Confirm Delete
  function yesDelete() {
    console.log(removeList);
    dispatch(
      userActions.deleteMedicine({ removeList: removeList, userId: userId })
    );
    setConfirm(false);
    setRemoveList([]);
  }
  // disConfirm Delete
  function noDelete() {
    setConfirm(false);
  }
  return (
    <div id="removeMed">
      <div
        id="searchRemove"
        style={{ filter: confirm ? "blur(0.1rem)" : "blur(0)" }}
      >
        <div id="typeToRemove">
          <input
            type="text"
            ref={searchDelete}
            placeholder="Search medicine to delete"
            onChange={event => searchToRemove(event)}
          />
          <button onClick={event => clearSearch(event)}>Clear</button>
        </div>
        <div id="recommendRemove">
          {recommend.map((item, index) => {
            return (
              <div key={index} onClick={event => selectRemove(event, item)}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div
        id="removeList"
        style={{ filter: confirm ? "blur(0.1rem)" : "blur(0)" }}
      >
        <div className="table">
          <div className="row head">
            <div className="cols">Medicine name</div>
            <div className="cols">Price</div>
            <div className="cols">Expiry date</div>
            <div className="cols">Stock</div>
            <div className="cols">
              <button onClick={() => setRemoveList([])}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          </div>
          {removeList.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="cols">{item.name}</div>
                <div className="cols">{item.price}</div>
                <div className="cols">{item.expiryDate}</div>
                <div className="cols">{item.stock}</div>
                <div className="cols">
                  <button onClick={() => unselect(index)}>
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: removeList.length ? "flex" : "none" }}>
          <button id="deleteSelectedBtn" onClick={deleteSelected}>
            Delete Selected
          </button>
        </div>
      </div>
      <div id="confirmBox" style={{ display: confirm ? "block" : "none" }}>
        <p>Are you sure to delete this items from inventory.</p>
        <div>
          <button onClick={yesDelete}>Yes,delete</button>
          <button onClick={noDelete}>No,cancel</button>
        </div>
      </div>
    </div>
  );
}

export default RemoveMedicine;
