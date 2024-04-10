import React from "react";
import "./Style.css";
import { Form, InputGroup } from "react-bootstrap";
import ontralogo from "../../assets/ontralogo.png";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="loginback" onClick={() => {}}>
        <div className="texts">CORPORATE TRAVEL MANAGEMENT SOLUTION</div>
        <div className="top"/>
        <div className="bottom"/>
        <div className="center">
          <Form className="mt-5 ">
            <div className="d-flex justify-content-center mb-3">
              <img src={ontralogo} alt="" />
            </div>

            <div className="login-reg-wrap">
              <h2>Enter Valid Email</h2>
            </div>

            <InputGroup style={{ height: 44 }} className="mb-3 ">
              <Form.Control
                style={{ fontSize: 15,boxShadow: "none",borderRadius: 25,textAlign: "center" }}
                type="email"
                placeholder="Email ID"
              />
            </InputGroup>

            <div className="d-flex justify-content-between mb-5">
              <button type="submit" className="submit-btn mx-1">
                Submit
              </button>
              <button className="submit-btn mx-1" onClick={() => navigate("/login")} >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
