import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const LineChartImp = (props) => {
  const { item } = props;
  console.log(item.qualities);

  return (
    <LineChart
      width={1800}
      height={400}
      data={item.qualities}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="high" stroke="black" />
      <Line type="monotone" dataKey="med" stroke="red" />
      <Line type="monotone" dataKey="low" stroke="orange" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="order" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default LineChartImp;
