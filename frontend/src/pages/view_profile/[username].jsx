// import { BASE_URL, clientServer } from "@/config";
// import DashboardLayout from "@/layout/DashboardLayout";
// import UserLayout from "@/layout/UserLayout";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import styles from "./index.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPosts } from "@/config/redux/action/postAction";
// import { useRouter } from "next/router";
// import {
//   getConnectionRequest,
//   sendConnectionRequest,
// } from "@/config/redux/action/authAction";

// export default function ViewProfilePage({ userProfile }) {
//   const router = useRouter();
//   const postReducer = useSelector((state) => state.postReducer);
//   const dispatch = useDispatch();

//   const authState = useSelector((state) => state.auth);

//   const [userPosts, setUserPosts] = useState([]);

//   const [isCurrrentUserInConnection, setIsCurrentUserInConnection] =
//     useState(false);

//   const [isConectionNull, setIsConnectionNull] = useState(true);

//   const getUsersPost = async () => {
//     await dispatch(getAllPosts());
//     await dispatch(
//       getConnectionRequest({ token: localStorage.getItem("token") }),
//     );
//   };

//   useEffect(() => {
//     let post = postReducer.posts.filter((post) => {
//       return post.userId.username === router.query.username;
//     });

//     setUserPosts(post);
//   }, [postReducer.posts]);

//   useEffect(() => {
//     console.log(authState.connections, userProfile.userId._id);
//     if (
//       authState.connections.some(
//         (user) => user.connectionId._id === userProfile.userId._id,
//       )
//     ) {
//       setIsCurrentUserInConnection(true);
//       if (
//         authState.connections.find(
//           (user) => user.connectionId._id === userProfile.userId._id,
//         ).status === true
//       ) {
//         setIsConnectionNull(false);
//       }
//     }
//   }, [authState.connections]);

//   // const searchParamers = useSearchParams();
//   // useEffect(() => {
//   //   console.log("From View: View Profile");
//   // });

//   useEffect(() => {
//     getUsersPost();
//   }, []);
//   return (
//     <UserLayout>
//       <DashboardLayout>
//         <div className={styles.container}>
//           <div className={styles.backDropContainer}></div>

//           <img
//             className={styles.profilePicture}
//             src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
//             alt="Profile"
//           />
//         </div>

//         <div className={styles.profileContainer__details}>
//           <h2>{userProfile.userId.name}</h2>
//           <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>
//         </div>

//         <div style={{display: "flex", alignItems: "center", gap: "1.2rem"}}>
//           {isCurrrentUserInConnection ? (
//           <button className={styles.connectedButton}>
//             {isConectionNull ? "Pending" : "Connected"}
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               dispatch(
//                 sendConnectionRequest({
//                   token: localStorage.getItem("token"),
//                   connectionId: userProfile.userId._id,
//                 }),
//               );
//               dispatch(
//                 getConnectionRequest({
//                   token: localStorage.getItem("token"),
//                 }),
//               );
//             }}
//             className={styles.connectBtn}
//           >
//             Connect
//           </button>
//         )}
//         </div>

//         <div onClick={async()=>{
//           const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
//           window.open(`${BASE_URL}/${response.data.message}`,"_blank")
//         }} style={{cursor:"pointer"}}>
//           <svg style={{width: "1.2em"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
// </svg>

//         </div>

//         <div>
//           <p>{userProfile.bio}</p>
//         </div>

//         <div style={{ flex: "0.2" }}>
//           <h3>Recent Activity</h3>
//           {userPosts.map((post) => {
//             return (
//               <div key={post._id} className={styles.postCard}>
//                 <div className={styles.card}>
//                   <div className={styles.card__profileContainer}>
//                     {post.media !== "" ? (
//                       <img src={`${BASE_URL}/${post.media}`} alt="" />
//                     ) : (
//                       <div
//                         style={{
//                           width: "3.4rem",
//                           height: "3.4rem",
//                         }}
//                       ></div>
//                     )}
//                   </div>

//                   <p>{post.body}</p>
//                 </div>
//               </div>
//             );
//           })}

//           <div className="workHistory">
//             <h2>Work History</h2>

//             <div className={styles.workHistoryContainer}>
//               {userProfile.pastWork.map((work, index) => {
//                 console.log("PROFILE:", userProfile);
//                 return (
//                   <div key={index} className={styles.workHistoryCard}>
//                     <p
//                       style={{
//                         fontWeight: "bold",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.8rem",
//                       }}
//                     >
//                       {work.company} - {work.position}
//                     </p>
//                     <p>{work.years}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </DashboardLayout>
//     </UserLayout>
//   );
// }

// export async function getServerSideProps(context) {
//   console.log("From view");
//   console.log(context.query.username);

//   const request = await clientServer.get(
//     "/user/get_profile_based_on_username",
//     {
//       params: {
//         username: context.query.username,
//       },
//     },
//   );

//   const response = await request.data;
//   console.log(response);

//   return { props: { userProfile: request.data.profile } };
// }


import { BASE_URL, clientServer } from "@/config";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";
import {
  getConnectionRequest,
  getMyConnectionRequest,
  sendConnectionRequest,
} from "@/config/redux/action/authAction";

export default function ViewProfilePage({ userProfile }) {
  const router = useRouter();
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const [isCurrrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
  const [isConectionNull, setIsConnectionNull] = useState(true);

  const getUsersPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionRequest({ token: localStorage.getItem("token") }));
    await dispatch(getMyConnectionRequest({token:localStorage.getItem("token")}));
  };

  useEffect(() => {
    setUserPosts(
      postReducer.posts.filter((post) => post.userId.username === router.query.username)
    );
  }, [postReducer.posts]);

//   useEffect(() => {
//     console.log(authState.connections, userProfile.userId._id)
// if (authState.connections.some(user => user.connectionId._id === userProfile.userId._id)) {
//     setIsCurrentUserInConnection(true);
//       if (
//         authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status === true) 
//       {setIsConnectionNull(false);}
//     }


//     if (authState.connectionRequests.some(user => user.userId._id === userProfile.userId._id)) {
//     setIsCurrentUserInConnection(true);
//       if (
//         authState.connectionRequests.find(user => user.userId._id === userProfile.userId._id).status === true) 
//       {setIsConnectionNull(false);}
//     }
    
//   }, [authState.connections, authState.connectionRequests]);



useEffect(() => {
  // Reset state first
  setIsCurrentUserInConnection(false);
  setIsConnectionNull(true);

  const sentConnection = authState.connections.find(
    (user) => user.connectionId._id === userProfile.userId._id
  );

  if (sentConnection) {
    setIsCurrentUserInConnection(true);

    if (sentConnection.status_accepted === true) {
      setIsConnectionNull(false);
    }
  }

  const receivedConnection = authState.connectionRequests.find(
    (user) => user.userId._id === userProfile.userId._id
  );

  if (receivedConnection) {
    setIsCurrentUserInConnection(true);

    if (receivedConnection.status_accepted === true) {
      setIsConnectionNull(false);
    }
  }
}, [
  authState.connections,
  authState.connectionRequests,
  userProfile.userId._id,
]);







  useEffect(() => { getUsersPost(); }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.page}>

          {/* ── Hero card ── */}
          <div className={styles.heroCard}>
            <div className={styles.backdrop} />
            <div className={styles.heroBody}>
              <img
                className={styles.avatar}
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt={userProfile.userId.name}
              />

              {/* action row sits top-right while avatar overlaps */}
              <div className={styles.heroActions}>
                {isCurrrentUserInConnection ? (
                  <button className={styles.btnPending}>
                    {isConectionNull ? "Pending" : "Connected"}
                  </button>
                ) : (
                  <button
                    className={styles.btnConnect}
                    onClick={() => {
                      dispatch(sendConnectionRequest({
                        token: localStorage.getItem("token"),
                        connectionId: userProfile.userId._id,
                      }));
                      dispatch(getConnectionRequest({ token: localStorage.getItem("token") }));
                    }}
                  >
                    Connect
                  </button>
                )}

                <button
                  className={styles.btnMore}
                  onClick={async () => {
                    const response = await clientServer.get(
                      `/user/download_resume?id=${userProfile.userId._id}`
                    );
                    window.open(`${BASE_URL}/${response.data.message}`, "_blank");
                  }}
                >
                  Download resume
                </button>
              </div>

              <div className={styles.heroInfo}>
                <h1>{userProfile.userId.name}</h1>
                <p className={styles.username}>@{userProfile.userId.username}</p>
                {userProfile.bio && (
                  <p className={styles.headline}>{userProfile.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Recent activity ── */}
          {userPosts.length > 0 && (
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Recent activity</h2>
              <div className={styles.activityGrid}>
                {userPosts.map((post) => (
                  <div key={post._id} className={styles.postItem}>
                    {post.media ? (
                      <img
                        className={styles.postThumb}
                        src={`${BASE_URL}/${post.media}`}
                        alt=""
                      />
                    ) : (
                      <div className={`${styles.postThumb} ${styles.postThumbEmpty}`} />
                    )}
                    <p className={styles.postBody}>{post.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Work history ── */}
          {userProfile.pastWork.length > 0 && (
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Work history</h2>
              <div className={styles.workList}>
                {userProfile.pastWork.map((work, index) => (
                  <div key={index} className={styles.workItem}>
                    <div className={styles.workIcon}>💼</div>
                    <div>
                      <p className={styles.workTitle}>{work.position}</p>
                      <p className={styles.workCompany}>{work.company}</p>
                      <p className={styles.workYears}>{work.years}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {userProfile.education && userProfile.education.length > 0 && (
  <div className={styles.sectionCard}>
    <h2 className={styles.sectionTitle}>Education</h2>

    <div className={styles.workList}>
      {userProfile.education.map((edu, index) => (
        <div key={index} className={styles.workItem}>
          <div className={styles.workIcon}>🎓</div>

          <div className={styles.workDetails}>
            <p className={styles.workTitle}>{edu.school}</p>

            <p className={styles.workCompany}>
              {edu.degree}
              {edu.fieldOfStudy && ` • ${edu.fieldOfStudy}`}
            </p>

            <p className={styles.workYears}>
              {new Date(edu.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
              {" - "}
              {new Date(edu.endDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>

            {edu.grade && (
              <p className={styles.educationGrade}>
                Grade: {edu.grade}
              </p>
            )}

            {edu.description && (
              <p className={styles.educationDescription}>
                {edu.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  const request = await clientServer.get("/user/get_profile_based_on_username", {
    params: { username: context.query.username },
  });
  return { props: { userProfile: request.data.profile } };
}