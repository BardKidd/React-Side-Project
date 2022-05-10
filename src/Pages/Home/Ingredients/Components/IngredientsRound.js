const Round = (props) => {
  const { Name, Image } = props.item;
  return (
    <div className="foods_sort">
      <img className="round" src={Image} alt="" />
      <span>{Name}</span>
    </div>
  );
};

export default Round;
