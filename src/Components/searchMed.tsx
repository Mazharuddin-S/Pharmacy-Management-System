import React, { useRef, useState } from "react";
import "../CSS/home.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { MedObjectType, userActions } from "../Store/store";
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
  };

  const [data, setData] = useState<dataType[]>([]);

  const [selected, setSelected] = useState<dataType[]>([]);

  const [forSum, setForsum] = useState<
    { name: string; price: number; quantity: number }[]
  >([]);

  const [total, setTotal] = useState(0);
  const inputSearch = useRef<HTMLInputElement | null>(null);

  // SEARCH MEDICINE ----------------
  function searchMed(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.toLowerCase();
    if (value) {
      let filteredData = MedData.medicineList.filter((item: MedObjectType) => {
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
  function clickHandler(event: React.MouseEvent<HTMLDivElement>, name: string) {
    let value = name.toLowerCase();

    let selected = MedData.medicineList.filter((item: MedObjectType) => {
      if (item.name == value) {
        setForsum(prev => {
          return [...prev, { name: value, price: item.price, quantity: 1 }];
        });
      }
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
    if (inputSearch.current) {
      inputSearch.current.value = "";
    }
    setData([]);
  }
  // QUANT HANDLER ...............
  function quantHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) {
    let arr = [...forSum];
    let modified: { name: string; price: number; quantity: number }[] = [];
    arr.map(item => {
      if (item.name.toLowerCase() == name.toLowerCase()) {
        modified.push({ ...item, quantity: +event.target.value });
      } else {
        modified.push(item);
      }
    });
    setForsum(prev => {
      return modified;
    });
  }
  // TOTAL Handler ..............
  function totalSum() {
    let sum = 0;
    forSum.map(item => {
      sum = sum + item.price * item.quantity;
    });

    setTotal(sum);
  }
  // Sell......
  function sell() {
    let sellArr: { quantity: number; name: string }[] = [];
    forSum.map(item => {
      sellArr.push({ quantity: item.quantity, name: item.name });
    });
    dispatch(userActions.sellMedicine({ sellList: sellArr, userId: userId }));
  }
  return (
    <React.Fragment>
      <div id="search">
        <div id="searchMed">
          <input
            type="text"
            placeholder="Search Medicine"
            ref={inputSearch}
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
              <div key={index} onClick={event => clickHandler(event, name)}>
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
                    setForsum([]);
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
                      // data-price={item.price}
                      // data-name={item.name}
                      onChange={event => quantHandler(event, item.name)}
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
