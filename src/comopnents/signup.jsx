import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import '../styles/signup.css';
import {
  checkUserExists,
  getOtp,
  RegisterNewUser,
  ValidateOtp,
} from "../services/Auth";

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  const identifier = watch("identifier");

  const [step, setStep] = useState("CHECK");
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const otpRefs = useRef([]);

  /* ---------------- Detect Email / Mobile ---------------- */
  useEffect(() => {
    if (!identifier) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmail(emailRegex.test(identifier));

    const timeout = setTimeout(() => {
      if (
        (emailRegex.test(identifier) && identifier.length > 5) ||
        (!emailRegex.test(identifier) && identifier.length === 10)
      ) {
        checkUser(identifier);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [identifier]);

  /* ---------------- Countdown ---------------- */
  useEffect(() => {
    if (!otpSent || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* ---------------- API Calls ---------------- */

  const checkUser = async (value) => {
    setLoading(true);
    try {
      const res = await checkUserExists({ param: value });
      if (res.status === 200) {
        setUserExist(true);
      } else {
        setUserExist(false);
        setStep("OTP");
      }
    } catch {
      alert("User check failed");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await getOtp({
        email: isEmail ? identifier : "",
        mobile: isEmail ? "" : identifier,
      });

      if (res.status === 200) {
        setOtpSent(true);
        setTimer(300);
        alert("OTP sent successfully");
      }
    } catch {
      alert("OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      alert("Enter 6 digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await ValidateOtp({
        [isEmail ? "email" : "mobile"]: identifier,
        otp: otpCode,
      });

      if (res.data.Status === "done") {
        setStep("REGISTER");
      } else {
        alert(res.data.error);
      }
    } catch {
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data) => {
    setLoading(true);
    try {
      const res = await RegisterNewUser({
        first_name: data.first_name,
        username: data.email,
        email: isEmail ? identifier : data.email,
        mobile: isEmail ? "" : identifier,
        password: data.password,
        usertype: "Customer",
      });

      if (res.status === 200) {
        alert("Registration successful");
        navigate("/login");
      }
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- OTP Input ---------------- */

  const handleOtpChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;

    const copy = [...otp];
    copy[i] = val;
    setOtp(copy);

    if (val && i < 5) otpRefs.current[i + 1].focus();
  };

  const handleOtpKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1].focus();
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="signup">
      <h2>Create Account</h2>

      <input
        {...register("identifier")}
        placeholder="Email or Mobile"
        disabled={step !== "CHECK"}
      />

      {userExist && <p className="error">User already exists</p>}

      {step === "OTP" && (
        <>
          {!otpSent ? (
            <button onClick={sendOtp} disabled={loading}>
              Send OTP
            </button>
          ) : (
            <p>Resend OTP in {timer}s</p>
          )}

          <div className="otp-row">
            {otp.map((v, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                maxLength={1}
                value={v}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
              />
            ))}
          </div>

          <button onClick={verifyOtp} disabled={loading}>
            Verify OTP
          </button>
        </>
      )}

      {step === "REGISTER" && (
        <form onSubmit={handleSubmit(onRegister)}>
          {!isEmail && (
            <input {...register("email")} placeholder="Email" />
          )}

          <input {...register("first_name")} placeholder="First Name" />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
          />

          <button type="submit" disabled={loading}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
