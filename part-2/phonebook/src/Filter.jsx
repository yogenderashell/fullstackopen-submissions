const Filter = (props) => {
  return (
    <div style={{ marginTop: 20, marginBottom: 40 }}>
      Filter
      <input value={props.filterText} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;
