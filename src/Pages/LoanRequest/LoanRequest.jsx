import React, { useState } from "react";
import "./LoanRequest.css"; // Importing the CSS file for styling
import UserNavbar from "../../Components/AdminNavbar/UserNavbar";
import UserSidebar from "../../Components/AdminSidebar/UserSidebar";

const LoanRequest = ({ isSidebarOpen, toggleSidebar }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [witnesses, setWitnesses] = useState([{ cnic: "", email: "", name: "", location: "", phoneNumber: "", address: "" }, { cnic: "", email: "", name: "", location: "", phoneNumber: "", address: "" }]);

  const loans = [
    {
      amount: "5000",
      timePeriod: "6 Months",
      category: "Car Loan",
      status: "Approved",
    },
    {
      amount: "10000",
      timePeriod: "12 Months",
      category: "Home Loan",
      status: "Pending",
    },
    // ... (other loan objects remain unchanged)
  ];

  const handleAddWitnessClick = () => {
    setModalOpen(true);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWitnesses = [...witnesses];
    updatedWitnesses[index][name] = value;
    setWitnesses(updatedWitnesses);
  };

  const handleSubmit = () => {
    // Handle the submission of witness data
    console.log(witnesses);
    setModalOpen(false);
  };

  return (
    <div className="admin-dashboard-content">
      <UserNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`admin-main-content ${isSidebarOpen ? "" : "expanded"}`}>
        <UserSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="loan-request-container">
          <h1 className="loan-request-title">Loan Request Details</h1>
          <div className="loan-request-details">
            {loans.map((loan, index) => (
              <div key={index} className="form-group">
                <div>
                  <label>Loan Amount:</label>
                  <span className="form-input">{loan.amount}</span>
                </div>
                <div>
                  <label>Time Period:</label>
                  <span className="form-input">{loan.timePeriod}</span>
                </div>
                <div>
                  <label>Category:</label>
                  <span className="form-input">{loan.category}</span>
                </div>
                <div>
                  <label>Status:</label>
                  <span className="form-input">{loan.status}</span>
                </div>
                <button className="add-witness-button" onClick={handleAddWitnessClick}>Add Witness</button>
              </div>
            ))}
          </div>
          {modalOpen && (
            <div className="modal">
              <h2>Add Witnesses</h2>
              <div className="witness-form-container">
              {witnesses.map((witness, index) => (
                <div  className="witness-form" key={index}>
                  <h3>Witness {index + 1}</h3>
                  <label>CNIC:</label>
                  <input type="text" name="cnic" value={witness.cnic} onChange={(e) => handleInputChange(index, e)} />
                  <label>Email:</label>
                  <input type="email" name="email" value={witness.email} onChange={(e) => handleInputChange(index, e)} />
                  <label>Name:</label>
                  <input type="text" name="name" value={witness.name} onChange={(e) => handleInputChange(index, e)} />
                  <label>Location:</label>
                  <input type="text" name="location" value={witness.location} onChange={(e) => handleInputChange(index, e)} />
                  <label>Phone Number:</label>
                  <input type="text" name="phoneNumber" value={witness.phoneNumber} onChange={(e) => handleInputChange(index, e)} />
                  <label>Address:</label>
                  <input type="text" name="address" value={witness.address} onChange={(e) => handleInputChange(index, e)} />
                </div>
              ))}
              </div>
              <div className="modal-buttons"><button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setModalOpen(false)}>Close</button></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoanRequest;
