// 
import React, { useEffect } from "react";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { getMyConnectionRequest ,AcceptConnection} from "@/config/redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";

export default function MyConnections() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionRequest({ token: localStorage.getItem("token") }));
  }, []);
  const router = useRouter();
  useEffect(() => {
    if (authState.connectionRequests.length !== 0) {
      console.log(authState.connectionRequests);
    }
  }, [authState.connectionRequests]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.connectionsContainer}>
          <h1 className={styles.heading}>Connection Requests</h1>
          {authState.connectionRequests.length ===0 && <h1>No Connection Request</h1>}
          {authState.connectionRequests.length !== 0 &&
            authState.connectionRequests.filter((connection)=> connection.status_accepted === null).map((user, index) => (
              <div onClick={()=>{
                router.push(`/view_profile/${user.userId.username}`)
              }} className={styles.userCard} key={index}>
                <div className={styles.leftSection}>
                  <div className={styles.profilePicture}>
                    <img
                      src={`${BASE_URL}/${user.userId.profilePicture}`}
                      alt={user.userId.name}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h3>{user.userId.name}</h3>
                    <p>@{user.userId.username}</p>
                    
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                <button className={styles.btnConnect} 
                onClick={(e)=>{ e.stopPropagation();
                  dispatch( AcceptConnection({
                       connectionId: user._id,
                       token: localStorage.getItem("token"),
                       action: "accept" }));
                       }}>Accept</button>

          <button className={styles.ignoreBtn}
                  onClick={(e)=>{ e.stopPropagation();

          dispatch(AcceptConnection({
            connectionId: user._id,
            token: localStorage.getItem("token"),
            action: "ignore"}));}}>Ignore</button>

                </div>
              </div>
            ))}  
          <h4>My Network</h4>


           {authState.connectionRequests.filter((connection) => connection.status_accepted === true).map((user, index)=>{
             return (
             <div onClick={()=>{
                router.push(`/view_profile/${user.userId.username}`)
              }} className={styles.userCard} key={index}>
                <div className={styles.leftSection}>
                  <div className={styles.profilePicture}>
                    <img
                      src={`${BASE_URL}/${user.userId.profilePicture}`}
                      alt={user.userId.name}
                    />
                  </div>
                  <div className={styles.userInfo}>
                    <h3>{user.userId.name}</h3>
                    <p>@{user.userId.username}</p>
                    
                  </div>
                </div>
                </div>
             )
          })
          }  
          
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}







