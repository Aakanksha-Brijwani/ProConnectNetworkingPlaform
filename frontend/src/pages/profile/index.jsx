//import React from 'react'; import UserLayout from '@/layout/UserLayout'; import DashboardLayout from '@/layout/DashboardLayout'; import styles from './index.module.css'; import {useSelector} from 'react-redux'; import {useEffect, useState} from 'react'; import {useDispatch} from 'react-redux'; import {getAboutUser} from '@/config/redux/action/authAction'; import {BASE_URL} from '@/config'; export default function ProfilePage(){ const authState = useSelector((state) => state.auth); const [userPosts, setUserPosts] = useState([]); const dispatch = useDispatch(); const userProfile = authState.user; useEffect(() => { dispatch(getAboutUser({token: localStorage.getItem('token')})) },[]) return( <UserLayout> <DashboardLayout> {authState.user && userProfile.userId &&( <div className={styles.page}> {/* ── Hero card ── */} <div className={styles.heroCard}> <div className={styles.backdrop} /> <div className={styles.heroBody}> <div className={styles.heroInfo}> <h1>{userProfile.userId.name}</h1> <p className={styles.username}>@{userProfile.userId.username}</p> {userProfile.bio && ( <p className={styles.headline}>{userProfile.bio}</p> )} </div> </div> </div> {/* ── Recent activity ── */} {userPosts.length > 0 && ( <div className={styles.sectionCard}> <h2 className={styles.sectionTitle}>Recent activity</h2> <div className={styles.activityGrid}> {userPosts.map((post) => ( <div key={post._id} className={styles.postItem}> {post.media ? ( <img className={styles.postThumb} src={`${BASE_URL}/${post.media}`} alt="" /> ) : ( <div className={`${styles.postThumb} ${styles.postThumbEmpty}`} /> )} <p className={styles.postBody}>{post.body}</p> </div> ))} </div> </div> )} {/* ── Work history ── */} {userProfile.pastWork.length > 0 && ( <div className={styles.sectionCard}> <h2 className={styles.sectionTitle}>Work history</h2> <div className={styles.workList}> {userProfile.pastWork.map((work, index) => ( <div key={index} className={styles.workItem}> <div className={styles.workIcon}>💼</div> <div> <p className={styles.workTitle}>{work.position}</p> <p className={styles.workCompany}>{work.company}</p> <p className={styles.workYears}>{work.years}</p> </div> </div> ))} </div> </div> )} </div> )} </DashboardLayout> </UserLayout> ) }

import React, { useEffect, useState } from "react";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getAboutUser,addEducation } from "@/config/redux/action/authAction";
import { BASE_URL } from "@/config";
import { clientServer } from "@/config";

export default function ProfilePage() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const postReducer = useSelector((state) => state.postReducer);
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [workSpace, setWorkSpace] = useState("");
  const [inputData, setInputData] = useState({
    company: "",
    position: "",
    years: "",
  });

  const handleWorkInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleEducationInputChange = (e) => {
  const { name, value } = e.target;

  setEducation({
    ...education,
    [name]: value,
  });
};

  const updatePicture = async (file) => {
    const request = await clientServer.post("/user_update", {
      token: localStorage.getItem("token"),
      name: userProfile.userId.name,
    });

    const response = await clientServer.post("/update_profile_data", {
      token: localStorage.getItem("token"),
      bio: userProfile.bio,
      currentPost: userProfile.currentPost,
      pastWork: userProfile.pastWork,
      education: userProfile.education,
    });

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };

  useEffect(() => {
    if (authState.user) {
      setUserProfile(authState.user);
    }
  }, [authState.user]);

  useEffect(() => {
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  }, []);

  // useEffect(() => {
  //   setUserPosts(
  //     postReducer.posts.filter(
  //       (post) => post.userId._id === userProfile.userId._id,
  //     ),
  //   );
  // }, [postReducer.posts]);

  useEffect(() => {
    if (userProfile?.userId) {
      setUserPosts(
        postReducer.posts.filter(
          (post) => post.userId._id === userProfile.userId._id,
        ),
      );
    }
  }, [postReducer.posts, userProfile]);
const [education, setEducation] = useState({
  school: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
  description: "",
});

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));

    const response = await clientServer.post(
      "/update_profile_picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };
  return (
    <UserLayout>
      <DashboardLayout>
        {userProfile && userProfile.userId && (
          <div className={styles.page}>
            {/* ── Hero card ── */}
            <div className={styles.heroCard}>
              <div className={styles.backdrop} />

              <div className={styles.heroBody}>
                {/* <img
                className={styles.avatar}
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt={userProfile.userId.name}
              /> */}
                <div className={styles.avatarContainer}>
                  <label
                    htmlFor="profilePictureUpload"
                    className={styles.avatarOverlay}
                  >
                    <p>Edit</p>
                  </label>

                  <input
                    onChange={(e) => {
                      updateProfilePicture(e.target.files[0]);
                    }}
                    hidden
                    type="file"
                    id="profilePictureUpload"
                  />

                  <img
                    className={styles.avatar}
                    src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                    alt={userProfile.userId.name}
                  />
                </div>
                <div className={styles.heroActions}>
                  {/* Edit Profile button later */}
                </div>
                <div className={styles.heroInfo}>
                  <input
                    className={styles.nameEdit}
                    type="text"
                    value={userProfile.userId.name}
                    onChange={(e) => {
                      setUserProfile({
                        ...userProfile,
                        userId: { ...userProfile.userId, name: e.target.value },
                      });
                    }}
                  />

                  <p contentEditable className={styles.username}>
                    @{userProfile.userId.username}
                  </p>

                  <div>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => {
                        setUserProfile({ ...userProfile, bio: e.target.value });
                      }}
                      rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                      style={{ width: "100%" }}
                    />
                  </div>
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
                        <div
                          className={`${styles.postThumb} ${styles.postThumbEmpty}`}
                        />
                      )}

                      <p className={styles.postBody}>{post.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Work history ── */}
            <div className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Work history</h2>

              <div className={styles.workList}>
                {userProfile.pastWork.length > 0 ? (
                  userProfile.pastWork.map((work, index) => (
                    <div key={index} className={styles.workItem}>
                      <div className={styles.workIcon}></div>

                     <div className={styles.workDetails}>
                        <p className={styles.workTitle}>{work.position}</p>
                        <p className={styles.workCompany}>{work.company}</p>
                       <p className={styles.workYears}>{work.years}</p>
                     </div>
                      <button
        className={styles.deleteWorkButton}
        onClick={() => {
          const updatedWork = userProfile.pastWork.filter(
            (_, i) => i !== index
          );
          setUserProfile({
            ...userProfile,
            pastWork: updatedWork,
          });
        }}
        aria-label="Delete work entry"
      >
        &#10005;
      </button>
                    </div>
                  ))
                ) : (
                  <p>No work experience added yet.</p>
                )}

                <button
                  className={styles.addWorkButton}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Add Work
                </button>
              </div>
            </div>

          
           {/* ── Education ── */}
<div className={styles.sectionCard}>
  <h2 className={styles.sectionTitle}>Education</h2>

  <div className={styles.workList}>
    {userProfile.education && userProfile.education.length > 0 ? (
      userProfile.education.map((edu, index) => (
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

          <button
            className={styles.deleteWorkButton}
            onClick={() => {
              const updatedEducation = userProfile.education.filter(
                (_, i) => i !== index
              );

              setUserProfile({
                ...userProfile,
                education: updatedEducation,
              });
            }}
          >
            ✕
          </button>
        </div>
      ))
    ) : (
      <p>No education added yet.</p>
    )}

    <button
      className={styles.addWorkButton}
      onClick={() => setIsEducationModalOpen(true)}
    >
      Add Education
    </button>
  </div>
</div>

         {userProfile != authState.user && (
              <div
                onClick={() => {
                  updatePicture();
                }}
                className={styles.btnConnect}
              >
                Update Profile
              </div>
            )}
 
          </div>
        )}

    
      
        {isModalOpen && (
          <div
            className={styles.commentsContainer}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className={styles.allComentContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                className={styles.inputField}
                name="company"
                placeholder="Enter Company"
                value={inputData.company}
                onChange={handleWorkInputChange}
              />
              <input
                type="text"
                className={styles.inputField}
                name="position"
                placeholder="Enter Position"
                value={inputData.position}
                onChange={handleWorkInputChange}
              />
              <input
                type="number"
                className={styles.inputField}
                name="years"
                placeholder="Years"
                value={inputData.years}
                onChange={handleWorkInputChange}
              />
              <div
                onClick={() => {
                  setUserProfile({
                    ...userProfile,
                    pastWork: [...userProfile.pastWork, inputData],
                  });

                  setIsModalOpen(false);
                }}
                className={styles.btnConnect}
              >
                Add Work
              </div>
            </div>
            </div>   
        )}


     


        {isEducationModalOpen && (
  <div
    className={styles.commentsContainer}
    onClick={() => setIsEducationModalOpen(false)}
  >
    <div
      className={styles.allComentContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        className={styles.inputField}
        type="text"
        name="school"
        placeholder="School"
        value={education.school}
        onChange={handleEducationInputChange}
      />

      <input
        className={styles.inputField}
        type="text"
        name="degree"
        placeholder="Degree"
        value={education.degree}
        onChange={handleEducationInputChange}
      />

      <input
        className={styles.inputField}
        type="text"
        name="fieldOfStudy"
        placeholder="Field of Study"
        value={education.fieldOfStudy}
        onChange={handleEducationInputChange}
      />

      <input
        className={styles.inputField}
        type="date"
        name="startDate"
        value={education.startDate}
        onChange={handleEducationInputChange}
      />

      <input
        className={styles.inputField}
        type="date"
        name="endDate"
        value={education.endDate}
        onChange={handleEducationInputChange}
      />

      <input
        className={styles.inputField}
        type="text"
        name="grade"
        placeholder="Grade"
        value={education.grade}
        onChange={handleEducationInputChange}
      />

      <textarea
        className={styles.inputField}
        name="description"
        placeholder="Description"
        value={education.description}
        onChange={handleEducationInputChange}
      />

      <div
        className={styles.btnConnect}
        onClick={async () => {
          await dispatch(addEducation(education));

          dispatch(
            getAboutUser({
              token: localStorage.getItem("token"),
            })
          );

          setEducation({
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            grade: "",
            description: "",
          });

          setIsEducationModalOpen(false);
        }}
      >
        Add Education
      </div>
    </div>
  </div>
)}
      </DashboardLayout>
    </UserLayout>
  );
}
