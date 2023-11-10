import { getAllUsers } from "@/Redux/dachboardAdmin";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserRow = ({openModal,user,handleBlock}) => {
    const [refresh,setRefresh]=useState(false)
    const dispatch= useDispatch()
  return (
    <tr>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            // handleBlock(user.id);
            // dispatch(getAllUsers())
            openModal()
          }}
          style={{
            padding: "0.5rem 2.5rem",
            borderRadius: "0.3125rem",
            background: "red",
            color: "#fff",
          }}
        >
          {!user.stateBlocked ? "block" : "Unblock"}
        </button>
        

      </td>
    </tr>
  );
};

export default UserRow;
