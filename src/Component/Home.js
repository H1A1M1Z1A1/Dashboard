import React from "react";
import PropTypes from "prop-types";
import BarChart from "./BarChart";


function Home({ dataX, dataY }) {
  return (
    <div>
      <div class="container">
        <div class="row">
          <div class="col">
          <BarChart dataX={Object.keys(props.data2)} dataY={Object.values(props.data2)} />
            </div>
          <div class="col">Column</div>
          <div class="w-100"></div>
          <div class="col">Column</div>
          <div class="col">Column</div>
        </div>
      </div>
    </div>
  );
}

// home.propTypes = {};

export default Home;
