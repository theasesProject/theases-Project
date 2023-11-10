"use client";
import React, { useEffect, useState } from "react";
import "../../styles/dashboard/page.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, selectReviews } from "@/Redux/adminSlice";
import {
  getAllUsers,
  updateStateBlock,
  getAllRequests,
  approveRequest,
  declineRequest,
} from "@/Redux/dachboardAdmin";
import Modal from 'react-modal';
Modal.setAppElement('body');
import UserRow from "../../components/UserRow.jsx"
import ReqRow from "../../components/ReqRow.jsx"
import TableAdmin from "@/components/tableAdmin";
const Dashboard = () => {
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
  const [refresh, setRefresh] = useState(false)
  const ReviewData = useSelector(selectReviews);
  const allUsers = useSelector((state) => state.user.allUsers);
  const allRequests = useSelector((state) => state.user.requests);
  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(getAllUsers());
    dispatch(getAllRequests());
  }, [dispatch, refresh]);
  const handleBlock = (id) => {
    const user = allUsers.find((user) => user.id === id);
    if (user) {
      // console.log(user, "update");
      dispatch(updateStateBlock(id))
        .then(
          setRefresh(!refresh))
      // dispatch(getAllUsers());

    } else {
      console.log('User not found');
    }
  };
  var input = {}
  const handleApproveRequest = (id, address, Media, companyNumber, deposit, transportation, agencyName) => {
    dispatch(approveRequest(input = { id, address, Media, companyNumber, deposit, transportation, agencyName }, id)).then(setRefresh(!refresh))

  };
  const handleDeclineRequest = (id) => {
    dispatch(declineRequest(id)).then(setRefresh(!refresh)).then(setRefresh(!refresh))

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
    <div>
      <div>
        
        <h1>Dashboard</h1>
        <p>Welcome to your special dashboard!</p>
        <div>
          <h2>Your Data</h2>
          <p>Here's where we'll show some interesting data...</p>
        </div>
        <div >
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
              {allUsers?.map((user) => {
                return (
                  <UserRow openModal={openModal} user={user} handleBlock={handleBlock} />
                )
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
                <th>address</th>
                <th>Company Phone Number</th>
                <th>papers</th>
                <th>approve/decline</th>
              </tr>
            </thead>
            <tbody>
              {allRequests?.map((request) => {
                return (
                  <ReqRow openLocationInGoogleMaps={openLocationInGoogleMaps} handleDeclineRequest={handleDeclineRequest} handlePapers={handlePapers} handleApproveRequest={handleApproveRequest} request={request} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Confirm Action</h2>
        <p>Are you sure you want to perform this action?</p>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </div>
  );

};

export default Dashboard;
