import React, { useEffect, useState } from "react";
import "./LoanRequest.css"; // Importing the CSS file for styling
import UserNavbar from "../../Components/UserNavbar/UserNavbar";
import UserSidebar from "../../Components/UserSidebar/UserSidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../utils/url";
import { toast, Toaster } from "sonner";
import {
  getLoanReqSuccess,
  updateLoanReqSuccess,
} from "../../redux/Slices/loanReqSlice.jsx"; // Updated action import

const LoanRequest = ({ isSidebarOpen, toggleSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(false);

  const [witnesses, setWitnesses] = useState([
    {
      cnic: "",
      email: "",
      name: "",
      location: "",
      phoneNumber: "",
      address: "",
    },
    {
      cnic: "",
      email: "",
      name: "",
      location: "",
      phoneNumber: "",
      address: "",
    },
  ]);
  const { user } = useSelector((state) => state.user);
  const { LoanReq } = useSelector((state) => state.loanReq);
  const api = axios.create({
    baseURL: url,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(LoanReq);
  }, [LoanReq]);

  useEffect(() => {
    setLoading(true);
    const res = api.get("loanreq/get?id=" + user?._id);

    res
      .then((res) => {
        dispatch(getLoanReqSuccess(res?.data?.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [user?._id]);

  const handleAddWitnessClick = (index) => {
    setIndex(index);
    setModalOpen(true);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedWitnesses = [...witnesses];
    updatedWitnesses[index][name] = value;
    setWitnesses(updatedWitnesses);
  };

  const handleSubmit = () => {
    setLoading(true);
    const loanID = LoanReq[index]._id; // Using loanReq from state

    const witnessData = witnesses.map((witness) => ({
      cnic: witness.cnic,
      email: witness.email,
      name: witness.name,
      location: witness.location,
      phoneNumber: witness.phoneNumber,
      address: witness.address,
    }));

    api
      .put(`loanreq/update/${loanID}`, { witners: witnessData })
      .then((response) => {
        dispatch(updateLoanReqSuccess(response.data.data)); // Dispatching updated loans
        setLoading(false);
        toast.success("Witnesses added successfully!", {
          style: {
            padding: "16px",
            backgroundColor: "#0eadad",
            color: "white",
            border: "1px solid #0eadad",
          },
        });

        setIndex(null);
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error updating the witnesses!", error);
        setLoading(false);
        toast.error("Failed to add witnesses.", {
          style: {
            padding: "16px",
            backgroundColor: "#d90429",
            color: "white",
            border: "1px solid #d90429",
          },
        });
      });
  };

  return (
    <>
      {loading && (
        <div className="loader">
          <div className="loader-spinner"></div>
        </div>
      )}
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
            {LoanReq?.map(
              (
                loan,
                index // Mapping over loanReq from state
              ) => (
                <div key={index} className="form-group">
                  <div>
                    <label>Category:</label>
                    <span className="form-input">{loan.category}</span>
                  </div>
                  <div>
                    <label>Sub-Category:</label>
                    <span className="form-input">{loan.subCategory}</span>
                  </div>
                  <div>
                    <label>Deposite-Amount:</label>
                    <span className="form-input">{loan.depositeAmount}</span>
                  </div>
                  <div>
                    <label>Loan Amount:</label>
                    <span className="form-input">{loan.loanAmount}</span>
                  </div>
                  <div>
                    <label>Time Period:</label>
                    <span className="form-input">{loan.period}</span>
                  </div>
                  <div>
                    <label>Status:</label>
                    <span className="form-input">{loan.status}</span>
                  </div>
                  {loan?.witners?.length <= 0 && (
                    <button
                      className="add-witness-button"
                      onClick={() => handleAddWitnessClick(index)}
                    >
                      Add Witness
                    </button>
                  )}
                </div>
              )
            )}
          </div>
          {modalOpen && (
            <div className="modal">
              <h2>Add Witnesses</h2>
              <div className="witness-form-container">
                {witnesses.map((witness, index) => (
                  <div className="witness-form" key={index}>
                    <h3>Witness {index + 1}</h3>
                    <label>CNIC:</label>
                    <input
                      type="text"
                      name="cnic"
                      value={witness.cnic}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={witness.email}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={witness.name}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={witness.location}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={witness.phoneNumber}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={witness.address}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={() => setModalOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
        <Toaster position="top-right" />
      </main>
    </div>
    </>
  );
};

export default LoanRequest;
