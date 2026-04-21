import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader-container">
      <div className="circle-preloader"></div>
      <h1 className="preloader-text">Searching for news...</h1>
    </div>
  );
}

export default Preloader;
