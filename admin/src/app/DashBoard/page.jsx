"use client";
import React, { useEffect, useState } from "react";
import "../../styles/dashboard/page.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, selectReviews } from "@/Redux/adminSlice";
import LineChart from "../../components/LineChart";
import Select from "react-select";
import {
  getAllUsers,
  updateStateBlock,
  getAllRequests,
  approveRequest,
  declineRequest,
  triggerRefresh,
} from "@/Redux/dachboardAdmin";
import Modal from "react-modal";
Modal.setAppElement("body");
import UserRow from "../../components/UserRow.jsx";
import ReqRow from "../../components/ReqRow.jsx";
import TableAdmin from "@/components/tableAdmin.jsx";
const Dashboard = () => {
  const options = [
    { value: "year", label: "Year" },
    { value: "month", label: "Month" },
    { value: "week", label: "Week" },
    { value: "day", label: "Day" },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleConfirm = () => {
    // Handle confirmation here
    closeModal();
  };
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({});
  const ReviewData = useSelector(selectReviews);
  const [modalType, setTypeModal] = useState("");
  const [request, setRequest] = useState({});
  const [interval, setInterval] = useState("year");
  const [interval2, setInterval2] = useState("year");
  const allUsers = useSelector((state) => state.user.allUsers);
  const loading = useSelector((state) => state.user.loading);
  const refreshed = useSelector((state) => state.user.refreshed);
  const allRequests = useSelector((state) => state.user.requests);
  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(getAllUsers());
    dispatch(getAllRequests()).then(console.log(allRequests));
    console.log(allUsers);
    loading ? setRefresh(!refresh) : null;
  }, [dispatch, refresh]);
  const handleBlock = (id) => {
    try {
      const user = allUsers.find((user) => user.id === id);
      if (user) {
        dispatch(updateStateBlock(id));
        setRefresh(!refresh);
        closeModal();
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleApproveRequest = (request) => {
    try {
      dispatch(approveRequest(request));
      setRefresh(!refresh);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };
  const handleIntervalChange = (v) => {
    setInterval(v);
  };
  const handleIntervalChange2 = (v) => {
    setInterval2(v);
  };
  const handlePapers = (papers) => {
    for (let paper of papers) {
      window.open(paper.media);
    }
  };
  function openLocationInGoogleMaps(location) {
    if (location && location.latitude && location.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      window.open(url, "_blank");
    } else {
      console.error("Invalid location data.");
    }
  }
  return (
    <div
      style={{
        fontFamily: "MuseoModerno",
        padding:10
      }}
    >
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your special dashboard!</p>
        {/* <label style={{ */}
        {/* width: "200px" */}
        {/* }}> */}
        Interval:
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "85%",
          }}
        >
          <Select
            value={options.find((option) => option.value === interval)}
            onChange={(selectedOption) =>
              handleIntervalChange(selectedOption.value)
            }
            options={options}
            styles={{ container: (provided) => ({ ...provided, flex: 1 }) }}
          />

          <Select
            value={options.find((option) => option.value === interval2)}
            onChange={(selectedOption) =>
              handleIntervalChange2(selectedOption.value)
            }
            options={options}
            styles={{ container: (provided) => ({ ...provided, flex: 1 }) }}
          />
        </div>
        {/* </label> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <LineChart allUsers={allUsers} interval={interval} />
          <LineChart allUsers={allRequests} interval={interval2} />
        </div>
        <div>
          <h2>Your Data</h2>
          <p>Here's where you can see all your Users...</p>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
                <th>BlockedUser</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, i) => {
                return (
                  <UserRow
                    key={i}
                    setTypeModal={setTypeModal}
                    setUser={setUser}
                    openModal={openModal}
                    user={user}
                  />
                );
              })}
            </tbody>
          </table>
          <br></br>
          <br></br>
          <br></br>
          <table className="table">
            <thead>
              <tr>
                <th>request id</th>
                <th>User</th>
                <th>address</th>
                <th>Company Phone Number</th>
                <th>papers</th>
                <th>approve/decline</th>
              </tr>
            </thead>
            <tbody>
              {allRequests?.map((request, i) => {
                return (
                  <ReqRow
                    key={i}
                    openModal={openModal}
                    setRequest={setRequest}
                    setTypeModal={setTypeModal}
                    openLocationInGoogleMaps={openLocationInGoogleMaps}
                    handlePapers={handlePapers}
                    request={request}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity 0.3s ease-in-out",
            // borderWidth:"10",
            // borderColor:"6C77BF",
          },
          content: {
            width: "20rem",
            height: "15rem",
            borderRadius: 7,
            backgroundColor: "white",
            color: "black",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "black",
            transition: "all 1.0s ease-in-out",
          },
        }}
      >
        <h2>Ban this User?</h2>
        <p>Are you sure you want to Ban this User?</p>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexDirection: "row",
          }}
        >
          <button
            style={{
              background: "linear-gradient(to right, #6C77BF, #4485C5)",
              fontWeight: "400",
              borderWidth: ".15rem",
              height: "2rem",
              width: "4rem",
              borderRadius: 7,
              borderWidth: "0px",
              borderColor: "white",
            }}
            onClick={() => {
              if (modalType === "user") {
                handleBlock(user.id);
              } else if (modalType === "request") {
                handleApproveRequest(request);
              } else if (modalType === "reject") {
                console.log("hihihhhihiihi", request);
                dispatch(declineRequest(request));
                setRefresh(!refresh);
                closeModal();
              }
            }}
          >
            Yes
          </button>
          <button
            style={{
              background: "linear-gradient(to right, #6C77BF, #4485C5)",
              // padding: 5
              fontWeight: "400",
              borderWidth: ".15rem",
              height: "2rem",
              width: "4rem",
              borderWidth: "0px",
              borderRadius: 7,
              borderColor: "white",
            }}
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
