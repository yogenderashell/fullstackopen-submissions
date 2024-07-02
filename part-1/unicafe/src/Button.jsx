const Button = ({ text, setStat }) => {
  return <button onClick={() => setStat((prev) => prev + 1)}>{text}</button>;
};

export default Button;
