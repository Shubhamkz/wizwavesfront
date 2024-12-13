import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="my__loader">
        <div data-glitch="Loading..." className="my__glitch">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader;
