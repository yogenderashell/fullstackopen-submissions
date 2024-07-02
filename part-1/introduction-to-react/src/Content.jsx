import Part from "./Part";
const Content = (props) => {
  // console.log(props.parts);
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
