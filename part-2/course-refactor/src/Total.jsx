const Total = (props) => {
  // console.log(props.parts[0].exercises)

  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h2 style={{ fontWeight: "bold" }}>Number of exercises {total}</h2>;
};

export default Total;
