import React, { useState } from "react";
import "./Home.css"; // Importing the CSS file
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [emi, setEmi] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [loanError, setLoanError] = useState("");
  const [periodError, setPeriodError] = useState(false);
  const [depositError, setDepositError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [cnic, setCnic] = useState(""); // State for CNIC input
  const [email, setEmail] = useState(""); // State for email input

  const loanCategories = [
    {
      name: "Wedding Loans",
      subCategories: ["Valima", "Furniture", "Food", "Jahez"],
      maxLoan: 500000,
      period: 3,
    },
    {
      name: "Home Construction Loans",
      subCategories: ["Structure", "Finishing", "Loan"],
      maxLoan: 1000000,
      period: 5,
    },
    {
      name: "Business Startup Loans",
      subCategories: [
        "Buy Stall",
        "Advance Rent for Shop",
        "Shop Assets",
        "Shop Machinery",
      ],
      maxLoan: 1000000,
      period: 5,
    },
    {
      name: "Education Loans",
      subCategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on requirement",
      period: 4,
    },
  ];

  const calculateEMI = () => {
    if (!loanPeriod || !initialDeposit || !loanAmount || !category) return;

    const selectedCategory = loanCategories.find(cat => cat.name === category);
    const maxLoan = selectedCategory?.maxLoan;

    if (typeof maxLoan === "number" && loanAmount > maxLoan) {
      setEmi(`Loan amount exceeds maximum limit of PKR ${maxLoan}`);
      return;
    }

    if (loanPeriod > selectedCategory.period) {
      setEmi("Loan period exceeds the maximum allowed for this category.");
      return;
    }

    const emi = (loanAmount - initialDeposit) / (loanPeriod * 12);
    setEmi(emi.toFixed(2));
  };

  const handleLoanAmountChange = (value) => {
    const amount = Number(value);
    setLoanAmount(amount);

    const selectedCategory = loanCategories.find(cat => cat.name === category);
    const maxLoan = selectedCategory?.maxLoan;

    if (typeof maxLoan === "number" && amount > maxLoan) {
      setLoanError(`Maximum loan limit is PKR ${maxLoan}`);
    } else {
      setLoanError("");
    }

    if (loanPeriod && initialDeposit && category && amount <= maxLoan) {
      const emi = (amount - initialDeposit) / (loanPeriod * 12);
      setEmi(emi.toFixed(2));
    }
  };

  const handleInitialDepositChange = (value) => {
    const deposit = Number(value);
    setInitialDeposit(deposit);

    const selectedCategory = loanCategories.find(cat => cat.name === category);
    const maxLoan = selectedCategory?.maxLoan;

    if (deposit > loanAmount) {
      setDepositError("Initial deposit cannot exceed the required loan amount.");
    } else {
      setDepositError("");
    }

    if (loanAmount && loanPeriod && category && deposit <= loanAmount) {
      const emi = (loanAmount - deposit) / (loanPeriod * 12);
      setEmi(emi.toFixed(2));
    }
  };

  const handleApplyClick = () => {
    setShowModal(true); // Open the modal on button click
  };

  const handleModalSubmit = () => {
    // Handle the submission of CNIC and email
    console.log("CNIC:", cnic);
    console.log("Email:", email);
    setShowModal(false); // Close the modal after submission
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Saylani Microfinance App</h1>
        <p>Simplifying Loan Applications for Everyone</p>
      </header>

      <main className="main-content">
        {/* Loan Categories */}
        <section className="loan-categories">
          <h2>Loan Categories</h2>
          <div className="categories-container">
            {loanCategories.map((category, index) => (
              <div key={index} className="category-card">
                <h3>{category.name}</h3>
                <ul>
                  {category.subCategories.map((sub, idx) => (
                    <li key={idx}>{sub}</li>
                  ))}
                </ul>
                <p>Max Loan: PKR {category.maxLoan}</p>
                <p>Loan Period: {category.period} years</p>
              </div>
            ))}
          </div>
        </section>

        {/* Loan Calculator */}
        <section className="loan-calculator">
          <h2>Loan Calculator</h2>
          <div className="calculator-form">
            <div className="form-group">
              <label>Category</label>
              <div className="custom-dropdown">
                <div 
                  className="dropdown-header"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  {category || "Select Category"}
                </div>
                {showCategoryDropdown && (
                  <div className="dropdown-list">
                    {loanCategories.map((cat, idx) => (
                      <div 
                        key={idx} 
                        className="dropdown-item"
                        onClick={() => {
                          setCategory(cat.name);
                          setShowCategoryDropdown(false);
                          setSubCategory("");
                        }}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Subcategory</label>
              <div className="custom-dropdown">
                <div 
                  className="dropdown-header"
                  onClick={() => setShowSubCategoryDropdown(!showSubCategoryDropdown)}
                >
                  {subCategory || "Select Subcategory"}
                </div>
                {showSubCategoryDropdown && (
                  <div className="dropdown-list">
                    {loanCategories
                      .find((cat) => cat.name === category)
                      ?.subCategories.map((sub, idx) => (
                        <div 
                          key={idx} 
                          className="dropdown-item"
                          onClick={() => {
                            setSubCategory(sub);
                            setShowSubCategoryDropdown(false);
                          }}
                        >
                          {sub}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Required Loan Amount (PKR)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => handleLoanAmountChange(e.target.value)}
                placeholder="e.g., 300000"
                style={{borderColor: loanError ? 'red' : ''}}
              />
              {loanError && <p style={{color: 'red', margin: '0.5rem 0'}}>{loanError}</p>}
            </div>

            <div className="form-group">
              <label>Loan Period (Years)</label>
              <input
                type="number"
                value={loanPeriod}
                onChange={(e) => {
                  const period = Number(e.target.value);
                  setLoanPeriod(period);
                  const selectedCategory = loanCategories.find(cat => cat.name === category);
                  if (selectedCategory && period > selectedCategory.period) {
                    setPeriodError(true);
                  } else {
                    setPeriodError(false);
                  }
                  if(loanAmount && initialDeposit && category && period <= selectedCategory.period) {
                    const emi = (loanAmount - initialDeposit) / (period * 12);
                    setEmi(emi.toFixed(2));
                  }
                }}
                placeholder="e.g., 3"
                style={{borderColor: periodError ? 'red' : ''}}
              />
              {periodError && <p style={{color: 'red', margin: '0.5rem 0'}}>Loan period exceeds the maximum allowed for this category.</p>}
            </div>

            <div className="form-group">
              <label>Initial Deposit (PKR)</label>
              <input
                type="number"
                value={initialDeposit}
                onChange={(e) => handleInitialDepositChange(e.target.value)}
                placeholder="e.g., 100000"
                style={{borderColor: depositError ? 'red' : ''}}
              />
              {depositError && <p style={{color: 'red', margin: '0.5rem 0'}}>{depositError}</p>}
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <button className="calculate-btn" onClick={handleApplyClick} disabled={!category || depositError || periodError}>
              Applied
            </button>

            <div style={{ marginTop: '1rem' }}>
              {emi && (
                <p className="emi-result">
                  {emi.includes("exceeds") ? (
                    emi
                  ) : (
                    `Estimated EMI: PKR ${emi} / month`
                  )}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Modal for CNIC and Email */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Enter Your Details</h3>
              <div className="form-group">
                <label>CNIC Number</label>
                <input
                  type="text"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="Enter CNIC Number"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>

              <button onClick={handleModalSubmit} className="submit-btn">Submit</button>
              <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
