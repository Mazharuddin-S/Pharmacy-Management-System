import { useSelector } from "react-redux";
import "../CSS/outOfStock.css";
import { MedObjectType } from "../Store/store";

function OutOfStock() {
  const medList = useSelector((state: any) => {
    return state.userData.medicineList;
  });

  let stock: MedObjectType[] = [];
  medList.map((item: MedObjectType) => {
    if (item.stock <= 10) {
      stock.push(item);
    }
  });

  return (
    <div id="outOfStock">
      <h3>List of medicines less than 10 in inventory</h3>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OutOfStock;
