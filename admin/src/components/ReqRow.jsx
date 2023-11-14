import { getAllRequests } from "@/Redux/dachboardAdmin";
import React from "react";
import { useDispatch } from "react-redux";

const ReqRow = ({
  setRequest,
  openModal,
  setTypeModal,
  request,
  handleApproveRequest,
  handleDeclineRequest,
  handlePapers,
  openLocationInGoogleMaps,
}) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{request.id}</td>
      <td>{request.agencyName}</td>
      <td>
        <button
          className="btn btn-primary"
          style={{
            padding: "0.5rem 2.5rem",
            borderRadius: "0.3125rem",
            background: "#7abaf2",
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
            background: "#7abaf2",
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
              setTypeModal("request");
              setRequest({
                id: request.id,
                UserId: request.UserId,
                address: request.address,
                Media: request.Media,
                companyNumber: request.companyNumber,
                deposit: request.deposit,
                transportation: request.transportation,
                agencyName: request.agencyName,
              });
              openModal();
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#04bfbf",
              color: "#fff",
            }}
          >
            Approve
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              try {
                setTypeModal("reject");
                setRequest(request.id);
                openModal();
              } catch (error) {
                console.log(error);
              }
              // handleDeclineRequest(request.id), getAllRequests();
            }}
            style={{
              padding: "0.5rem 2.5rem",
              borderRadius: "0.3125rem",
              background: "#9250bc",
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
