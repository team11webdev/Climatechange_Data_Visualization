import V1_v2 from "../components/V1_V2_Temp";
import V5 from "../components/V5_CO2";
import V6 from "../components/V6_CO2";
import V7 from "../components/V7_V10_Carbon";
import colToggle from '../components/colToggle.js';



function N1_CO2_TEMP() {

  
  return (
    <>
        <div className={colToggle()}>
          <V5></V5>
          <V5></V5>
        </div>
        <div className={colToggle()}>
          <V6></V6>
          <V7></V7>
        </div>
        <div className={colToggle()}>
          <V5></V5>
          <V5></V5>
        </div>
        <div className={colToggle()}>
          <V7></V7>
        </div>

      
    </>
  );
}


export default N1_CO2_TEMP;
