"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers, updateStateBlock } from "@/Redux/dachboardAdmin";
import { useDispatch, useSelector } from "react-redux";
function TableAdmin({ user }) {
  console.log(user, "this is");
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.allUsers);
  //   useEffect(() => {
  //     dispatch(getAllUsers());
  //   }, [dispatch]);

  const handleBlock = (id) => {
    dispatch(updateStateBlock(id));
    console.log(user, "update");
  };

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
                  <h5 className="modal-title" id="exampleModalLabel">
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
}

export default TableAdmin;
