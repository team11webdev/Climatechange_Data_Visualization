import V8 from "../components/V8";
import V9 from "../components/V9_CO2_Sector";
import V5 from "../components/V5_CO2";
import colToggle from "../components/colToggle";

function N2_EMISSION() {
  return (
    <>
      <div className={colToggle()}>
        <V8 />
        <V5></V5>
      </div>
    </>
  );
}

/* <V8/>
       <V9/>*/

export default N2_EMISSION;
