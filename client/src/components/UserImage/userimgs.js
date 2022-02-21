import React, { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import UserimgContext from "../../context/userimg/userimgContext";
import UserimgItem from "./UserimgItem";

const Userimgs = () => {
  const userimgContext = useContext(UserimgContext);

  const { userimgs, filtered, getUserimgs, loading } = userimgContext;

  useEffect(() => {
    getUserimgs();

    // eslint-disable-next-line
  }, [loading]);

  return (
    <>
      {userimgs !== null && !loading ? (
        filtered !== null ? (
          filtered.map((userimg) => (
            <div key={userimg._id} timeout={500}>
              <UserimgItem userimg={userimg} />
            </div>
          ))
        ) : (
          userimgs.map((userimg) => (
            <div key={userimg._id} timeout={500}>
              <UserimgItem userimg={userimg} />
            </div>
          ))
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Userimgs;
