import React, { useEffect, useState } from "react";
import API from "../api/api";

function TempleList() {

  const [temples, setTemples] = useState([]);

  useEffect(() => {
    API.get("/temples")
      .then(res => setTemples(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      <h2>Temples</h2>

      {temples.map((temple) => (
        <div key={temple._id} className="card">
          <h3>{temple.name}</h3>
          <p>{temple.location}</p>
        </div>
      ))}

    </div>
  );
}

export default TempleList;