import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import "./terminal.css";
import { LoginProps } from "./types";

export const Login = (props: LoginProps) => {
  const apiUrl: string = process.env.REACT_APP_LOGIN_API_URL || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ email: "mario@rossi.it", password: "12345678" });
  const { openLogin, setOpenLogin } = props;
  const { openTerminal, setOpenTerminal } = props;
  const { username, setUsername } = props;
  useEffect(() => {
    inputRef.current?.focus();
  });
  const [error, setError] = useState(false);
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (openLogin && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openLogin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (openLogin === 1) {
      if (formData.email !== "") {
        setOpenLogin(2);
      }
    } else if (openLogin === 2) {
      if (formData.password !== "") {
        axios
          .post(apiUrl, {
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            console.log("Response:", response.data);
            if (response.data.status === "success") {
              localStorage.setItem("token", response.data.token);
              setOpenLogin(0);
              setOpenTerminal(true);
              setError(false);
              setUsername(response.data.user.username);
            } else {
              localStorage.setItem("token", "");
              setOpenLogin(1);
              setOpenTerminal(false);
              setError(true);
              setFormData({ email: "", password: "" });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            setOpenLogin(1);
            setError(true);
            setFormData({ email: "", password: "" });
          });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && openLogin) {
        inputRef.current.focus();
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [openLogin]);

  return (
    <div>
      <span style={{ color: "orange" }}>
        <strong>Terminal login</strong>
      </span>
      <div style={{ height: "10px" }}></div>
      <span style={{ color: "#c4c4c4" }}>
        use this data to access. Email: mario@rossi.it - Password: 12345678
        <br />
      </span>
      {error && (
        <>
          <br />
          <br />
          <b style={{ color: "red" }}>Login error, data are incorrect</b>
        </>
      )}

      <div className="terminalPrompt">
        {openLogin === 1 ? (
          <>
            <div className="terminalPromptLabel">email:</div>
            <div className="terminalPromptInput">
              <input
                type="text"
                name="email"
                ref={inputRef}
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div style={{ height: "50px" }}></div>
            </div>
          </>
        ) : (
          <>
            <div className="terminalPromptLabel">password:</div>
            <div className="terminalPromptInput">
              <input
                type="password"
                name="password"
                value={formData.password}
                ref={inputRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div style={{ height: "50px" }}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
