import { getAllUsers } from "@/Redux/dachboardAdmin";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserRow = ({ openModal, setUser, user, handleBlock, setTypeModal }) => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  return (
    <tr style={{ 
      // backgroundColor: user.type === "agency" ? "#6C77BF" : "fff", 
      // color: user.type === "agency" ? "white" : "black",
      transition: 'background-color 0.3s ease',
      animation: 'rowFadeIn 0.5s ease'
    }}>
      <td>{user.userName}</td>
      <td>{user.email}</td>
      <td>{user.type}</td>
      <td>
        <button
          type="button"
          className=""
          onClick={() => {
            setTypeModal("user");
            setUser(user);
            openModal();
          }}
          style={{
            padding: "0.5rem 2.5rem",
            borderRadius: "0.3125rem",
            background:!user.stateBlocked? "#9250bc":"red",
            padding:10,
            width:"8rem",
            color: "#fff",
            transition: 'background-color 0.3s ease',
            animation: 'buttonFadeIn 0.5s ease'
          }}
        >
          {!user.stateBlocked ? "Block" : "Unblock"}
        </button>
      </td>
    </tr>
  );
  
};

export default UserRow;
