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
import TableAdmin from "@/components/tableAdmin";
const Dashboard = () => {
  const dispatch = useDispatch();
  const ReviewData = useSelector(selectReviews);
  const allUsers = useSelector((state) => state.user.allUsers);
  const allRequests = useSelector((state) => state.user.requests);
  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(getAllUsers());
    dispatch(getAllRequests());
  }, [dispatch]);
  const handleBlock = (id) => {
    dispatch(updateStateBlock(id));
    console.log(user, "update");
  };

  const handleApproveRequest = (id) => {
    dispatch(approveRequest(id));
  };

  const handleDeclineRequest = (id) => {
    dispatch(declineRequest(id));
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

        <div>
          <table className="table">
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Role</th>
              <th>BlockedUser</th>
            </tr>

            {allUsers.map((user) => {
              return (
                <tr>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      name="d-flex btn-service-book-appointement w-80"
                      style={{
                        padding: "0.5rem 2.5rem",
                        borderRadius: "0.3125rem",
                        background: "red",
                        color: "#fff",
                      }}
                    >
                      {user.stateBlocked === false ? "block" : "Unblock"}
                    </button>
                    <div>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Are you sure to blocked this user?
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                onClick={() => {
                                  handleBlock(user.id);
                                }}
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>

          <table className="table">
            <tr>
              <th>request id</th>
              <th>address</th>
              <th>Company Phone Number</th>
              <th>papers</th>
              <th>approve/decline</th>
            </tr>

            {allRequests.map((request) => {
              return (
                <tr>
                  <td>{request.id}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{
                        padding: "0.5rem 2.5rem",
                        borderRadius: "0.3125rem",
                        background: "red",
                        color: "#fff",
                      }}
                      onClick={() =>
                        openLocationInGoogleMaps(JSON.parse(request.address))
                      }
                    >
                      Open in maps
                    </button>
                  </td>
                  <td>{request.companyNumber}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{
                        padding: "0.5rem 2.5rem",
                        borderRadius: "0.3125rem",
                        background: "red",
                        color: "#fff",
                      }}
                      onClick={() => handlePapers(request.Media)}
                    >
                      Check papers
                    </button>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#approveModal"
                        data-bs-toggle="modal"
                        data-bs-target="#approveModal"
                        name="d-flex btn-service-book-appointement w-80"
                        style={{
                          padding: "0.5rem 2.5rem",
                          borderRadius: "0.3125rem",
                          background: "blue",
                          color: "#fff",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#declineModal"
                        data-bs-toggle="modal"
                        data-bs-target="#declineModal"
                        name="d-flex btn-service-book-appointement w-80"
                        style={{
                          padding: "0.5rem 2.5rem",
                          borderRadius: "0.3125rem",
                          background: "red",
                          color: "#fff",
                        }}
                      >
                        Decline
                      </button>
                    </div>
                    <div>
                      <div
                        className="modal fade"
                        id="approveModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Are you sure you want to switch this user's
                                account to an agency account?
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        className="modal fade"
                        id="declineModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Are you sure you want to decline this request?
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => handleDeclineRequest(request.id)}
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
