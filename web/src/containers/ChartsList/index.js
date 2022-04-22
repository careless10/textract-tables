import React from "react";
import { Row, Table } from "reactstrap";
import LineChart from "../../components/LineChart";

const ChartsList = (props) => {
  const { list } = props;
  return (
    <div>
      <h3>List</h3>
      <Table className="table-striped">
        <thead>
          <tr>
            <th>Item</th>
            <th>Graph</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                <LineChart item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ChartsList;
