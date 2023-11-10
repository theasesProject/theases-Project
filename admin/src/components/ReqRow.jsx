import { getAllRequests } from "@/Redux/dachboardAdmin";
import React from "react";
import { useDispatch } from "react-redux";

const ReqRow = ({
  request,
  handleApproveRequest,
  handleDeclineRequest,
  handlePapers,
  openLocationInGoogleMaps
}) => {
    const dispatch= useDispatch()

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
          onClick={() => {
            openLocationInGoogleMaps(JSON.parse(request.address));
          }}
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
            onClick={() => {
              handleApproveRequest(
                request.id,
                request.address,
                request.Media,
                request.companyNumber,
                request.deposit,
                request.transportation,
                request.agencyName
              ),
               dispatch(getAllRequests());
            }}
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
            onClick={() => {
              handleDeclineRequest(request.id), getAllRequests();
            }}
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
      </td>
    </tr>
  );
};

export default ReqRow;
