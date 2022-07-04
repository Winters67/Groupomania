import React, { useContext } from "react";
import Log from '../components/log'
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return <div className="profil-page">
    {uid ? (
      <UpdateProfil>

      </UpdateProfil>

    ) : (

      <div className="log-container">
        <Log signin={false} signup={true} />
        <div className="img-container">
          <img src="./img/log.jpg" alt="img-log" />
        </div>

      </div>
    )}
  </div>;
};

export default Profil;
