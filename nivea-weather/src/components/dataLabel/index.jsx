const DataLabel = ({ label, dataValue }) => {
  return (
    <div>
      <span>{label}</span>
      {": "}
      <span>{dataValue}</span>
    </div>
  );
};

export default DataLabel;
