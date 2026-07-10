// import UserLayout from "@/layout/UserLayout";
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";
// import styles from "./style.module.css";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, registerUser } from "@/config/redux/action/authAction";
// import { emptyMessage } from "@/config/redux/reducer/authReducer";

// function LoginComponent() {
//   const authState = useSelector((state) => state.auth);

//   const router = useRouter();

//   const dispatch = useDispatch();
//   const [userLoginMethod, setUserLoginMethod] = useState(false);

//   const [email, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");



//   // useEffect(() => {
//   //   if (localStorage.getItem("token")) {
//   //     router.push("/dashboard");
//   //   }
//   // }, []);
//   useEffect(() => {
//     console.log("loggedIn =", authState.loggedIn);

//     if (authState.loggedIn) {
//       console.log("AUTH REDIRECT");
//       router.push("/dashboard");
//     }
//   }, [authState.loggedIn]);

//   useEffect(() => {
//     dispatch(emptyMessage());
//   }, [userLoginMethod, dispatch]);

//   const handleRegister = () => {
//     console.log("registering");

//     dispatch(
//       registerUser({
//         username,
//         name,
//         email,
//         password,
//       }),
//     );
//   };

//   const handleLogin = () => {
//     console.log("login...");

//     dispatch(
//       loginUser({
//         email,
//         password,
//       }),
//     );
//   };

//   return (
//     <UserLayout>
//       <div className={styles.container}>
//         <div className={styles.cardContainer}>
//           <div className={styles.cardContainer__left}>
//             <p className={styles.cardleft__heading}>
//               {userLoginMethod ? "Sign In" : "Sign Up"}
//             </p>

//             <p style={{ color: authState.isError ? "red" : "green" }}>
//               {" "}
//               {authState.message?.message}
//             </p>

//             <div className={styles.inputContainers}>
//               {!userLoginMethod && (
//                 <div className={styles.inputRow}>
//                   <input
//                     onChange={(e) => setUsername(e.target.value)}
//                     className={styles.inputField}
//                     type="text"
//                     placeholder="Username"
//                   />
//                   <input
//                     onChange={(e) => setName(e.target.value)}
//                     className={styles.inputField}
//                     type="text"
//                     placeholder="Name"
//                   />
//                 </div>
//               )}

//               <input
//                 onChange={(e) => setEmailAddress(e.target.value)}
//                 className={styles.inputField}
//                 type="text"
//                 placeholder="Email"
//               />
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={styles.inputField}
//                 type="text"
//                 placeholder="Password"
//               />

//               <div
//                 onClick={() => {
//                   if (userLoginMethod) {
//                     handleLogin();
//                   } else {
//                     handleRegister();
//                   }
//                 }}
//                 className={styles.buttonWithOutline}
//               >
//                 <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
//               </div>
//             </div>
//           </div>
//           <div className={styles.cardContainer__right}>
//             {userLoginMethod ? (
//               <p>Don't Have an Account?</p>
//             ) : (
//               <p>Already Have an Account</p>
//             )}
//             <div
//               onClick={() => {
//                 setUserLoginMethod(!userLoginMethod);
//               }}
//               style={{ color: "black", textAlign: "center" }}
//               className={styles.buttonWithOutline}
//             >
//               <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// }

// export default LoginComponent;



// import UserLayout from "@/layout/UserLayout";
// import { useRouter } from "next/router";
// import React, { useEffect, useRef, useState } from "react";
// import styles from "./style.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, registerUser, googleLogin } from "@/config/redux/action/authAction";
// import { emptyMessage } from "@/config/redux/reducer/authReducer";

// // Replace with your actual Google OAuth Client ID
// const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

// function LoginComponent() {
//   const authState = useSelector((state) => state.auth);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [userLoginMethod, setUserLoginMethod] = useState(false);

//   const [email, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const googleButtonRef = useRef(null);

//   useEffect(() => {
//     console.log("loggedIn =", authState.loggedIn);
//     if (authState.loggedIn) {
//       console.log("AUTH REDIRECT");
//       router.push("/dashboard");
//     }
//   }, [authState.loggedIn]);

//   useEffect(() => {
//     dispatch(emptyMessage());
//     setErrors({});
//     setTouched({});
//   }, [userLoginMethod, dispatch]);

//   // Load Google Identity Services script and render button
//   useEffect(() => {
//     const scriptId = "google-identity-script";
//     if (document.getElementById(scriptId)) {
//       initializeGoogle();
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.id = scriptId;
//     script.async = true;
//     script.defer = true;
//     script.onload = initializeGoogle;
//     document.body.appendChild(script);

//     function initializeGoogle() {
//       if (window.google && googleButtonRef.current) {
//         window.google.accounts.id.initialize({
//           client_id: GOOGLE_CLIENT_ID,
//           callback: handleGoogleResponse,
//         });
//         window.google.accounts.id.renderButton(googleButtonRef.current, {
//           theme: "outline",
//           size: "large",
//           width: 300,
//           text: userLoginMethod ? "signin_with" : "signup_with",
//         });
//       }
//     }
//   }, [userLoginMethod]);

//   const handleGoogleResponse = (response) => {
//     // response.credential is the Google ID token — send it to your backend
//     dispatch(googleLogin({ idToken: response.credential }));
//   };

//   const validateField = (field, value) => {
//     switch (field) {
//       case "username":
//         return value.trim() ? "" : "Username is required";
//       case "name":
//         return value.trim() ? "" : "Name is required";
//       case "email":
//         if (!value.trim()) return "Please enter your email.";
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
//         return "";
//       case "password":
//         if (!value) return "Please enter your password.";
//         if (value.length < 6) return "Password must be at least 6 characters";
//         return "";
//       default:
//         return "";
//     }
//   };

//   const handleFieldChange = (field, value, setter) => {
//     setter(value);
//     if (touched[field]) {
//       setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
//     }
//   };

//   const handleBlur = (field, value) => {
//     setTouched((prev) => ({ ...prev, [field]: true }));
//     setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
//   };

//   const validateAll = (fields) => {
//     const newErrors = {};
//     const newTouched = {};
//     fields.forEach(({ field, value }) => {
//       newTouched[field] = true;
//       newErrors[field] = validateField(field, value);
//     });
//     setErrors(newErrors);
//     setTouched(newTouched);
//     return Object.values(newErrors).every((err) => !err);
//   };

//   const handleRegister = () => {
//     const isValid = validateAll([
//       { field: "username", value: username },
//       { field: "name", value: name },
//       { field: "email", value: email },
//       { field: "password", value: password },
//     ]);
//     if (!isValid) return;

//     console.log("registering");
//     dispatch(registerUser({ username, name, email, password }));
//   };

//   const handleLogin = () => {
//     const isValid = validateAll([
//       { field: "email", value: email },
//       { field: "password", value: password },
//     ]);
//     if (!isValid) return;

//     console.log("login...");
//     dispatch(loginUser({ email, password }));
//   };

//   const errorStyle = {
//     color: "#d11124",
//     fontSize: "12px",
//     marginTop: "-8px",
//     marginBottom: "8px",
//   };

//   return (
//     <UserLayout>
//       <div className={styles.container}>
//         <div className={styles.cardContainer}>
//           <div className={styles.cardContainer__left}>
//             <p className={styles.cardleft__heading}>
//               {userLoginMethod ? "Sign In" : "Sign Up"}
//             </p>

//             <p style={{ color: authState.isError ? "red" : "green" }}>
//               {" "}
//               {authState.message?.message}
//             </p>

//             <div className={styles.inputContainers}>
//               {!userLoginMethod && (
//                 <div className={styles.inputRow}>
//                   <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//                     <input
//                       value={username}
//                       onChange={(e) => handleFieldChange("username", e.target.value, setUsername)}
//                       onBlur={(e) => handleBlur("username", e.target.value)}
//                       className={styles.inputField}
//                       type="text"
//                       placeholder="Username *"
//                     />
//                     {errors.username && <span style={errorStyle}>{errors.username}</span>}
//                   </div>
//                   <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//                     <input
//                       value={name}
//                       onChange={(e) => handleFieldChange("name", e.target.value, setName)}
//                       onBlur={(e) => handleBlur("name", e.target.value)}
//                       className={styles.inputField}
//                       type="text"
//                       placeholder="Name *"
//                     />
//                     {errors.name && <span style={errorStyle}>{errors.name}</span>}
//                   </div>
//                 </div>
//               )}

//               <input
//                 value={email}
//                 onChange={(e) => handleFieldChange("email", e.target.value, setEmailAddress)}
//                 onBlur={(e) => handleBlur("email", e.target.value)}
//                 className={styles.inputField}
//                 type="text"
//                 placeholder="Email *"
//               />
//               {errors.email && <span style={errorStyle}>{errors.email}</span>}

//               <input
//                 value={password}
//                 onChange={(e) => handleFieldChange("password", e.target.value, setPassword)}
//                 onBlur={(e) => handleBlur("password", e.target.value)}
//                 className={styles.inputField}
//                 type="password"
//                 placeholder="Password *"
//               />
//               {errors.password && <span style={errorStyle}>{errors.password}</span>}

//               <div
//                 onClick={() => {
//                   if (userLoginMethod) {
//                     handleLogin();
//                   } else {
//                     handleRegister();
//                   }
//                 }}
//                 className={styles.buttonWithOutline}
//               >
//                 <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
//               </div>

//               <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
//                 <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
//                 <span style={{ margin: "0 12px", color: "#666", fontSize: "13px" }}>or</span>
//                 <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
//               </div>

//               <div ref={googleButtonRef} style={{ display: "flex", justifyContent: "center" }} />
//             </div>
//           </div>
//           <div className={styles.cardContainer__right}>
//             {userLoginMethod ? (
//               <p>Don't Have an Account?</p>
//             ) : (
//               <p>Already Have an Account</p>
//             )}
//             <div
//               onClick={() => {
//                 setUserLoginMethod(!userLoginMethod);
//               }}
//               style={{ color: "black", textAlign: "center" }}
//               className={styles.buttonWithOutline}
//             >
//               <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// }

// export default LoginComponent;


import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, googleLogin } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [userLoginMethod, setUserLoginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const googleButtonRef = useRef(null);

  // Redirect to dashboard once auth succeeds
  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn]);

  // Reset validation state whenever the user switches between Sign In / Sign Up
  useEffect(() => {
    dispatch(emptyMessage());
    setErrors({});
    setTouched({});
  }, [userLoginMethod, dispatch]);

  // Load the Google Identity Services script and render the Google button
  useEffect(() => {
    const scriptId = "google-identity-script";

    if (document.getElementById(scriptId)) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);

    function initializeGoogle() {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: 300,
          text: userLoginMethod ? "signin_with" : "signup_with",
        });
      }
    }
  }, [userLoginMethod]);

  const handleGoogleResponse = (response) => {
    // response.credential is the Google ID token — hand it off to the backend
    dispatch(googleLogin({ idToken: response.credential }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "username":
        return value.trim() ? "" : "Username is required";
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value.trim()) return "Please enter your email.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
        return "";
      case "password":
        if (!value) return "Please enter your password.";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (field, value, setter) => {
    setter(value);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const validateAll = (fields) => {
    const newErrors = {};
    const newTouched = {};

    fields.forEach(({ field, value }) => {
      newTouched[field] = true;
      newErrors[field] = validateField(field, value);
    });

    setErrors(newErrors);
    setTouched(newTouched);

    return Object.values(newErrors).every((err) => !err);
  };

  const handleRegister = () => {
    const isValid = validateAll([
      { field: "username", value: username },
      { field: "name", value: name },
      { field: "email", value: email },
      { field: "password", value: password },
    ]);
    if (!isValid) return;

    dispatch(registerUser({ username, name, email, password }));
  };

  const handleLogin = () => {
    const isValid = validateAll([
      { field: "email", value: email },
      { field: "password", value: password },
    ]);
    if (!isValid) return;

    dispatch(loginUser({ email, password }));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer__left}>
            <p className={styles.cardleft__heading}>
              {userLoginMethod ? "Sign In" : "Sign Up"}
            </p>

            {authState.message?.message && (
              <p style={{ color: authState.isError ? "#d93025" : "#057642" }}>
                {authState.message.message}
              </p>
            )}

            <div className={styles.inputContainers}>
              {!userLoginMethod && (
                <div className={styles.inputRow}>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <input
                      value={username}
                      onChange={(e) => handleFieldChange("username", e.target.value, setUsername)}
                      onBlur={(e) => handleBlur("username", e.target.value)}
                      className={`${styles.inputField} ${errors.username ? styles.errorInput : ""}`}
                      type="text"
                      placeholder="Username"
                    />
                    {errors.username && <span className={styles.error}>{errors.username}</span>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <input
                      value={name}
                      onChange={(e) => handleFieldChange("name", e.target.value, setName)}
                      onBlur={(e) => handleBlur("name", e.target.value)}
                      className={`${styles.inputField} ${errors.name ? styles.errorInput : ""}`}
                      type="text"
                      placeholder="Name"
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <input
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value, setEmailAddress)}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  className={`${styles.inputField} ${errors.email ? styles.errorInput : ""}`}
                  type="text"
                  placeholder="Email"
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <input
                  value={password}
                  onChange={(e) => handleFieldChange("password", e.target.value, setPassword)}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                  className={`${styles.inputField} ${errors.password ? styles.errorInput : ""}`}
                  type="password"
                  placeholder="Password"
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>

              <div
                onClick={() => {
                  if (userLoginMethod) {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
                className={styles.buttonWithOutline}
              >
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
                <span style={{ margin: "0 12px", color: "#666", fontSize: "13px" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#ddd" }} />
              </div>

              <div ref={googleButtonRef} style={{ display: "flex", justifyContent: "center" }} />
            </div>
          </div>

          <div className={styles.cardContainer__right}>
            {userLoginMethod ? (
              <p>Don't Have an Account?</p>
            ) : (
              <p>Already Have an Account</p>
            )}
            <div
              onClick={() => setUserLoginMethod(!userLoginMethod)}
              style={{ color: "black", textAlign: "center" }}
              className={styles.buttonWithOutline}
            >
              <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}


export default LoginComponent;