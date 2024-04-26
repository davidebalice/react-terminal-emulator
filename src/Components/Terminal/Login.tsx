import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import "./terminal.css";

interface LoginProps {
  openLogin: number;
  setOpenLogin: React.Dispatch<React.SetStateAction<number>>;
}

export const Login = (props: LoginProps) => {
  const apiUrl: string = process.env.REACT_APP_LOGIN_API_URL || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { openLogin, setOpenLogin } = props;
  useEffect(() => {
    inputRef.current?.focus();
  });

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
    console.log("Valore Username:", formData.username);
    console.log("Valore Password:", formData.password);
    if (openLogin === 1) {
      if (formData.username !== "") {
        setOpenLogin(2);
      }
    } else if (openLogin === 2) {
      if (formData.password !== "") {
        //REACT_APP_LOGIN_API_URL
        axios
          .post(apiUrl, {
            username: formData.username,
            password: formData.password,
          })
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
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
        <strong>Login</strong>
      </span>
      <div className="terminal__prompt">
        {openLogin === 1 ? (
          <>
            <div className="terminal__prompt__label">username:</div>
            <div className="terminal__prompt__input">
              <input
                type="text"
                name="username"
                ref={inputRef}
                value={formData.username}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <div style={{ height: "50px" }}></div>
            </div>
          </>
        ) : (
          <>
            <div className="terminal__prompt__label">password:</div>
            <div className="terminal__prompt__input">
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
