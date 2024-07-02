import { useState } from "react";
import Button from "./Button";

const calculateAverage = (good, bad, neutral) => {
  const calculatedScore = good * 1 + bad * -1 + neutral * 0;
  const average = calculatedScore / (good + bad + neutral);
  return average || 0;
};
const calculatePositive = (good, bad, neutral) => {
  const totalReviews = good + bad + neutral;
  const positivePercentage = good / totalReviews;
  return positivePercentage * 100 || 0;
};

const StatLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, bad, neutral } = props.stats;
  // console.log(good);
  return (
    <table>
      <tbody>
        <StatLine text={"No of Good reviews"} value={good} />
        <StatLine text={"No of Neutral reviews"} value={neutral} />
        <StatLine text={"No of Bad reviews"} value={bad} />
        <StatLine text={"All"} value={good + bad + neutral} />
        <StatLine
          text={"Average"}
          value={calculateAverage(good, bad, neutral)}
        />
        <StatLine
          text={"Positive"}
          value={calculatePositive(good, bad, neutral)}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const stats = {
    good,
    bad,
    neutral,
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Give Feedback</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <Button text="Good" setStat={setGood} />
        <Button text="Neutral" setStat={setNeutral} />
        <Button text="Bad" setStat={setBad} />
      </div>
      <h2>Statistics</h2>
      {good || neutral || bad ? (
        <Statistics stats={stats} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
