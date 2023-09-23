import React, { useCallback, useEffect, useState } from "react";

import "./App.css";
import Navbar from "./Component/Navbar";
import BarChart from "./Component/BarChart";
import LineChart from "./Component/LineChart";
import PieChart2 from "./Component/PieChart2";
import Donut from "./Component/Donut";
import ScatterPlot from "./Component/ScatterPlot";
import CircularBarplot from "./Component/CircularBarplot";

function App() {
  // USESTAtE

  const [energyData, setEnergyData] = useState([]);
  const [sector_topic, setSector_topic] = useState("Information Technology");
  const [option, setOption] = useState("Sector");
  const [country, setCountry] = useState("India");
  const [isDivFixed, setIsDivFixed] = useState(false);

  // DATA
  useEffect(() => {
    // Fetch data when the component mounts
    fetch("/data")
      .then((response) => response.json())
      .then((data) => {
        setEnergyData(data.energy_data);
      })
      .catch((error) => {
        console.error("Error fetching energy data:", error);
      });
  }, []);

  // FUNCTIONS

  function pestle_count(data) {
    const sector1 = {};
    for (const x of data) {
      if (x.pestle !== "Energy" && x.pestle !== "") {
        if (!(x.pestle in sector1)) {
          sector1[x.pestle] = 1;
        } else {
          sector1[x.pestle] = sector1[x.pestle] + 1;
        }
      }
    }
    return sector1;
  }
  console.log(pestle_count(energyData));

  function sector_v_likelihood(data) {
    const sector1 = {};
    for (const x of data) {
      if (x.sector !== "Energy" && x.sector !== "") {
        if (!(x.sector in sector1)) {
          sector1[x.sector] = 1;
        } else {
          sector1[x.sector] = sector1[x.sector] + x.likelihood;
        }
      }
    }
    return sector1;
  }

  function sector_v_topic(data, sector_name) {
    const topic = {};
    for (const x of data) {
      if (x.sector == sector_name) {
        if (!(x.topic in topic)) {
          topic[x.topic] = 1;
        } else {
          topic[x.topic] = topic[x.topic] + 1;
        }
      }
    }
    return topic;
  }

  function sector_v_date(data, sector_name) {
    const year = {};
    for (const x of data) {
      if (x.sector == sector_name && x.start_year !== "") {
        if (!(x.start_year in year)) {
          year[x.start_year] = 1;
        } else {
          year[x.start_year] = year[x.start_year] + 1;
        }
      }
    }
    return year;
  }

  function topic_p_country(data, country) {
    const topic = {};
    for (const x of data) {
      if (x.country === country) {
        if (!(x.topic in topic)) {
          topic[x.topic] = 1;
        } else {
          topic[x.topic] = topic[x.topic] + 1;
        }
      }
    }
    return topic;
  }

  function country_names(data) {
    const countrySet = new Set();

    for (const x of data) {
      countrySet.add(x.country);
    }

    return Array.from(countrySet);
  }

  function pestle_names(data) {
    const pestleSet = new Set();

    for (const x of data) {
      pestleSet.add(x.pestle);
    }

    return Array.from(pestleSet);
  }

  function sector_names(data) {
    const sectorSet = new Set();

    for (const x of data) {
      sectorSet.add(x.sector);
    }

    return Array.from(sectorSet);
  }
  const handleScroll = () => {
    if (window.scrollY) {
      setIsDivFixed(true);
    } else {
      setIsDivFixed(false);
    }
  };

  const handleSubmit = (event) => {
    setSector_topic(event.target.value);
  };
  const handleSubmitCountry = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <Navbar />

      <div style={{ margin: "0" }}>
        <div className="row" >
          <div
            className="col-sm"
            style={{
              backgroundColor: "white",
              padding: "0",
              flex: "0 0 21%",


            }}
          >
            <ul style={{ color: "blue", fontSize: "26px",position: "-webkit-sticky", /* Safari */
              position: "sticky",
              left: 0,
              top:171
          }}>
              <li className="li1">
                <button
                  onClick={() => {
                    setOption("Sector");
                  }}
                >
                  Sector
                </button>
              </li>
              <li className="li1">
                <button
                  onClick={() => {
                    setOption("Country");
                  }}
                >
                  Country
                </button>
              </li>
              <li className="li1">
                <button
                  onClick={() => {
                    setOption("Pestle");
                  }}
                >
                  Pestle
                </button>
              </li>
              <li className="li1">
                <button
                  onClick={() => {
                    setOption("Sector");
                  }}
                >
                  Project Duration
                </button>
              </li>
            </ul>
          </div>

          <div className="col-sm" style={{ backgroundColor: "white" }}>
            <div className="container">
              <div className="row" justify-content-md-center>
                {option === "Sector" && (
                  <>
                    <div className="text-center">
                      {" "}
                      {/* Center-align the contents */}
                      <select
                        className="form-select form-select-lg mx-auto"
                        aria-label=".form-select-lg example"
                        style={{ width: "fit-content" }}
                        onChange={handleSubmit}
                        name="selectCoin"
                      >
                        <option  value="Information Technology">Information Technology</option>
                        {sector_names(energyData).map((topic, index) => (
                          <option key={index} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm">
                      
                      <BarChart
                        dataX={Object.keys(
                          sector_v_topic(energyData, sector_topic)
                        )}
                        dataY={Object.values(
                          sector_v_topic(energyData, sector_topic)
                        )}
                        handleSubmit={handleSubmit}
                        X_label={sector_topic}
                        Y_label="Number of sectors"
                      />
                    </div>
                    
                    <div className="col-sm">
                      <LineChart
                        dataX={Object.keys(
                          sector_v_date(energyData, sector_topic)
                        )}
                        dataY={Object.values(
                          sector_v_date(energyData, sector_topic)
                        )}
                        X_label="start_year"
                        // Y_label="Sector Count per Year"
                        handleSubmit={handleSubmit}
                      />
                    </div>
                    {/* <div className="col-sm">
                      <PieChart2
                        dataX={Object.keys(
                          sector_v_topic(energyData, sector_topic)
                        )}
                        dataY={Object.values(
                          sector_v_topic(energyData, sector_topic)
                        )}
                      />
                    </div> */}
                  </>
                )}

                {option === "Sector" && (
                  <>
                    <div className="text-center">
                      {" "}
                      {/* Center-align the contents */}
                      <select
                        className="form-select form-select-lg mx-auto"
                        aria-label=".form-select-lg example"
                        style={{ width: "fit-content" }}
                        onChange={handleSubmitCountry}
                        name="select"
                      >
                        <option disabled value="India">India</option>
                        {country_names(energyData).map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm">
                      <BarChart
                        dataX={Object.keys(
                          topic_p_country(energyData, country)
                        )}
                        dataY={Object.values(
                          topic_p_country(energyData, country)
                        )}
                        X_label="Topics name"
                        Y_label="Number of topic per country"
                      />
                    </div>
                    <div className="col-sm">
                      <Donut
                        dataX={Object.keys(
                          topic_p_country(energyData, country)
                        )}
                        dataY={Object.values(
                          topic_p_country(energyData, country)
                        )}
                        X_label="Topics name"
                        Y_label="Number of topic per country"
                      />
                    </div>
                  </>
                )}
              </div>
              {option === "Sector" && (
                <>
                  <div className="col-sm">
                    <CircularBarplot
                      dataX={Object.keys(pestle_count(energyData))}
                      dataY={Object.values(pestle_count(energyData))}
                      X_label="Topics name"
                      Y_label="Number of topic per country"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
