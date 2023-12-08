import React, { useEffect, useState } from "react";
import "../CSS/home.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { userActions } from "../Store/store";
import { useSearchParams } from "react-router-dom";

function SearchMedicine() {
  let [searchParam, setSearchParam] = useSearchParams();
  let userId = searchParam.get("user");
  let MedData = useSelector((state: any) => {
    return state.userData;
  });
  let dispatch = useDispatch();

  type dataType = {
    name: string;
    price: number;
    stock: number;
    content: string;
    expiryDate: string;
  }[];

  const [data, setData] = useState<dataType>([]);

  const [selected, setSelected] = useState<any>([]);

  const [total, setTotal] = useState(0);

  // SEARCH MEDICINE ----------------
  function searchMed(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.toLowerCase();
    if (value) {
      let filteredData = MedData.medicineList.filter(item => {
        return (
          item.name.toLowerCase().startsWith(value) ||
          item.name.toLowerCase().includes(value)
        );
      });
      setData(filteredData);
    }
    if (!value) {
      setData([]);
    }
  }
  // CLICK HANDLER ----------------
  function clickHandler(event: React.MouseEvent<HTMLDivElement>) {
    let value = event.target.innerText.toLowerCase();

    let selected = MedData.medicineList.filter((item, index) => {
      return (
        item.name.toLowerCase().startsWith(value) ||
        item.name.toLowerCase().includes(value)
      );
    });
    setSelected((prev: any) => {
      return [...prev, ...selected];
    });
  }
  // REMOVE Handler ----------------
  function removeHandler(event: any, index: number | string) {
    let filter = selected;
    let filter2 = filter.filter((item: any, ind: number | string) => {
      return ind != index;
    });
    setSelected(filter2);
  }
  // CLEAR HANDLER ----------------
  function clearHandler() {
    let inputSearch = document.getElementById("inputSearch");
    if (inputSearch) {
      inputSearch.value = "";
    }
    setData([]);
  }
  // QUANT HANDLER ...............
  function quantHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    price: number
  ) {}
  // TOTAL Handler ..............
  function totalSum() {
    let quanter = document.getElementsByClassName("quanter");
    let sum = 0;
    for (var i = 0; i < quanter.length; i++) {
      let price = +quanter[i].dataset.price;
      sum = sum + quanter[i].value * price;
    }
    setTotal(sum);
  }
  // Sell......
  function sell() {
    let quanter = document.getElementsByClassName("quanter");
    let sellArr = [];
    for (var i = 0; i < quanter.length; i++) {
      let quantity = quanter[i].value;
      let name = quanter[i].dataset.name;
      sellArr.push({ quantity: quantity, name: name });
    }
    dispatch(userActions.sellMedicine({ sellList: sellArr, userId: userId }));
  }
  return (
    <React.Fragment>
      <div id="search">
        <div id="searchMed">
          <input
            type="text"
            placeholder="Search Medicine"
            id="inputSearch"
            onChange={event => searchMed(event)}
          />
          <button onClick={clearHandler}>clear</button>
        </div>
        <div id="recommendation" style={{ display: data ? "block" : "none" }}>
          {data.map((item: any, index: number) => {
            let name =
              item.name.slice(0, 1).toUpperCase() +
              item.name.slice(1).toLowerCase();
            return (
              <div key={index} onClick={event => clickHandler(event)}>
                {name}
              </div>
            );
          })}
        </div>
      </div>
      <div id="medTable">
        <div className="tableWrapper">
          <div className="table">
            <div className="row tableHeader">
              <div className="cols thead srNo">Sr No.</div>
              <div className="cols thead">Medicine Name</div>
              <div className="cols thead">Price</div>
              <div className="cols thead">Stock</div>
              <div className="cols thead">Expiry date</div>
              <div className="cols thead quant">Quantity</div>
              <div className="cols thead remove">
                <button
                  onClick={() => {
                    setSelected([]);
                    setTotal(0);
                  }}
                >
                  Remove all
                </button>
              </div>
            </div>

            {selected.map((item: any, index: number) => {
              return (
                <div className="row" key={index}>
                  <div className="cols srNo">{`${index + 1}`}</div>
                  <div className="cols">{item.name}</div>
                  <div className="cols">{item.price}</div>
                  <div className="cols">{item.stock}</div>
                  <div className="cols">{item.expiryDate}</div>
                  <div className="cols quant">
                    <input
                      type="number"
                      className="quanter"
                      data-price={item.price}
                      data-name={item.name}
                      onChange={event => quantHandler(event, item.price)}
                      defaultValue={1}
                      step={1}
                      min={1}
                    />
                  </div>
                  <div className="cols">
                    <button
                      id="removeBtn"
                      onClick={event => removeHandler(event, index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          id="total"
          style={{ display: selected.length != 0 ? "flex" : "none" }}
        >
          <button onClick={totalSum}>Total : {total} /- Rs.</button>
          <button onClick={sell}>Sell</button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SearchMedicine;
