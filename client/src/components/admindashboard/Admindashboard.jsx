import React from 'react'
import "./css/Admindashboard.css"

function Admindashboard() {
  return (
    <>
    <div className="maindash">
      
      <div className="cards">
         
          <div className="totalstu">
              <div className="tstu">
                  <h3>Total No Of Students</h3>
                  <h4>300</h4>
              </div>
              <img src='adminimg/cardstu.png' width={"70px"} height={'70px'} />
          </div>
         
          <div className="totalstaf">
              <div className="tsta">
                  <h3>Total No Of Staffs</h3>
                  <h4>50</h4>
              </div>
              <img src='adminimg/cardstaff.png' width={"70px"} height={'70px'}/>
          </div>
         
          <div className="totalfees">
                <div className="tf">
                    <h3>Total Fees Collected</h3>
                    <h4>Rs 3000000</h4>
               </div>
               <img src='adminimg/cardmoney.png' width={"80px"} height={'70px'}/>
          </div>

      </div>




    </div>
    </>
  )
}

export default Admindashboard
