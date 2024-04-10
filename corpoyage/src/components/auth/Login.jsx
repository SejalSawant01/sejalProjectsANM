import React, { useState } from "react";
import "./Style.css";
import { Form, InputGroup } from "react-bootstrap";
import ontralogo from "../../assets/ontralogo.png";
import logo1 from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../util/useSessionStorage";
import axios from "axios";
import { showToastError, showToastWarning } from "../../simpleForm/fields/ToastFunctions";
import { useForm } from "react-hook-form";
import { LoginLoader } from "../../simpleForm/fields/LoaderFunction";

const Login = () => {
  const navigate = useNavigate();
  const [sessionLogin, setSessionLogin] = useSessionStorage("login", "false");
  const [sessionToken, setSessionToken] = useSessionStorage("token", "");
  const [sessionUser, setSessionUser] = useSessionStorage(  "user", {});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, clearErrors, formState: { errors }, } = useForm();

  const handleLogin = async (data) => {
    const { orgregid, userName, password } = data;
    clearErrors();
    const body = { orgregid, userName, password };
   
    // const passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    // if (orgregid.length > 0) {
      if (userName.length > 0) {
        // if (password.length > 0 && passreg.test(password) === true) {
          if (password.length > 0 ) {
          setLoading(true);
          const response = await axios
            .post("/token", body)
            .catch((err) => console.log(err));
          setLoading(false);
          if (response.status === 200) {
            setSessionLogin("true");
            // const user = response.data.message[0];
            // dispatch(setUser(user));
            // setSessionUser(JSON.stringify(user));
            setSessionToken(response.data.token);
            navigate("/insights");
          } else if (response.data.status === 206) {
            console.log(response);
            showToastWarning(response.data.message);
          } else if (response.status === 500 || response.status === 400) {
            showToastError(response.data.message);
          } else showToastError();
        } else {
          setError("password", {
            type: "custom",
            message: "Enter valid password",
          });
        }
      } else {
        setError("userName", {
          type: "custom",
          message: "Enter valid user name",
        });
      }
    // }
    //  else {
    //   setError("orgregid", {
    //     type: "custom",
    //     message: "Enter valid Organization Id",
    //   });
    // } 

  };

  return (
    <>
      <div className="loginback">
        <div className="texts">CORPORATE TRAVEL MANAGEMENT SOLUTION</div>
        <div className="top"/>
        <div className="bottom"/>
        <div className="center">
          <Form className="mt-5 " onSubmit={handleSubmit(handleLogin)}>
            <div className="d-flex justify-content-center mb-3">
              <img src={logo1} alt="" style={{ height: 45}}/>
            </div>
            <div className="login-reg-wrap">
              <h2>Enter Login Details</h2>
            </div>

            <InputGroup style={{ height: 44 }} className="mb-3 ">
              <Form.Control
                style={{fontSize: 15,boxShadow: "none",borderRadius: 25,textAlign: "center",}}
                type="text"
                placeholder="Organization ID"
                // {...register("orgregid", { required: false })}
              />
            </InputGroup>
              {/* {errors.orgregid && (
                  <p style={{ color: "red", fontSize: 13,textAlign: "center", }}>
                    {errors.orgregid.message}
                  </p>
                )} */}

            <InputGroup style={{ height: 44 }} className="mb-3 ">       
              <Form.Control
                style={{fontSize: 15,boxShadow: "none",borderRadius: 25,textAlign: "center",}}
                type="text "
                placeholder="User Name"
                {...register("userName", { required: false })}
              />
            </InputGroup>
            {errors.userName && (
                  <p style={{ color: "red", fontSize: 13,textAlign: "center", }}>
                    {errors.userName.message}
                  </p>
                )}

            <InputGroup style={{ height: 44 }} className="mb-3  ">       
              <Form.Control
                style={{fontSize: 15,boxShadow: "none",borderRadius: 25,textAlign: "center",}}
                type="password"
                placeholder="Password"
                {...register("password", { required: false })}
              />
            </InputGroup>
            {errors.password && (
                  <p style={{ color: "red", fontSize: 13,textAlign: "center", }}>
                    {errors.password.message}
                  </p>
                )}
            <div>
              <p className="mb-0 text-center"
                style={{ color: "#1e88b3", cursor: "pointer", fontSize: 13 }}
                onClick={() => navigate("/forgot-password")}
              >
                <u>{"Forgot password?"}</u>
              </p>
            </div>
            {loading && <div className="text-center"> <LoginLoader /> </div>  }
            <div className="d-flex justify-content-center mb-5">
              <div className="col-6">
                <button type="submit" className="submit-btn">
                  Login
                </button>
              </div>
             

              
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
