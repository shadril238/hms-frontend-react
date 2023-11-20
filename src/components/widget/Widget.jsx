import "./widget.scss";

const Widget = () => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">PATIENTS</span>
        <span className="counter">21313</span>
        <span className="link">See all patients</span>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Widget;
