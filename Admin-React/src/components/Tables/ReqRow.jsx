// import { getAllRequests } from "@/Redux/dachboardAdmin";
import { setReqForSwal } from "Redux/adminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import "../../assets/css/nucleo-icons.css";
import requestImg from "../../assets/img/request.jpg";
import { approveRequest } from "Redux/adminSlice";
import { declineRequest } from "Redux/adminSlice";
import { Media } from "Redux/adminSlice";
import { getSingleMedia } from "Redux/adminSlice";
const ReqRow = ({ request,setRefresh, handlePapers, setCar,openModal,setMedia }) => {
  const dispatch = useDispatch();
  const refresh=(input)=>{
    setRefresh(input)
  }
  // const handleSwalToast = () => {
  //   Swal.fire({
  //     title: `<strong>do u want to accept or reject this request</strong>`,
  //     html: `
  //     `,
  //     imageUrl: `${requestImg}`,
  //     imageWidth: 200,
  //     imageHeight: 200,
  //     imageAlt: "Custom image",
  //     backdrop: `rgba(0,0,123,0.4)`,
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     confirmButtonText: `
  //      <i class="fa fa-reject"></i> Consent
  //     `,
  //     confirmButtonAriaLabel: "Thumbs up, great!",
  //     rejectButtonText: `
  //      <i class="fa fa-reject"></i> Accept
  //     `,
  //     rejectButtonAriaLabel: "Thumbs up, great!",
  //     customClass: {
  //       text: "swal-secondary-text",
  //       container: "my-modal",
  //     },
  //     cancelButtonText: `
  //      <i class="fa fa-close"></i> close
  //     `,
  //     // cancelButtonAriaLabel: "Thumbs down"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Are you sure?",
  //         html: `You will accept  <strong>${request.agencyName}</strong>'s request`,
  //         // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes, accept it!",
  //         cancelButtonText: "No, Reject this Request!",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           {
  //             dispatch(approveRequest(request));
  //             refresh(false)
  //           }
  //           Swal.fire({
  //             title: `User <b>${request.agencyName}</b>'s request accept!`,
  //             text: "This user's Request has been Accepted, he now is an Agency",
  //             icon: "success",
  //           });
  //         } else if (result.dismiss === Swal.DismissReason.cancel) {
  //           dispatch(declineRequest(request));
  //           refresh(false)
  //           {
  //           }
  //           Swal.fire({
  //             title: "Cancelled",
  //             text: "This user's Request has been Rejected, he will remain a User",
  //             icon: "error",
  //           });
  //         }
  //       });
  //     }
  //   });
  // };
  const images = useSelector(Media)
  const getMedia =async()=>{
    try {
      dispatch(getSingleMedia(request.id))
      setMedia(images)
    } catch (error) {
      
    }
  }
  return (
    <tr res hover onClick={()=>{
      setCar(request)
      getMedia()
      openModal()
    }} >
      {console.log(request, "<=Request List")}
      <td>{request.id}</td>
      <td>{request.model}</td>
      <td>{request.brand}</td>
      <td>{request.price}</td>
      <td>{request.typeOfFuel}</td>
      {/* <td>{request.acceptation}</td> */}
      <td>{request.Owner}</td>
      <td>{request.Category}</td>
      <td>{request.Type}</td>
      <td>{request.peopleCount}</td>
      <td>{request.DoorNumber}</td>
      <td>{request.Capacity}</td>
      <td>{request.Year}</td>
      {/* <td>
        <Button
          className="btn"
          // style={{
          //   padding: "0.5rem 2.5rem",
          //   borderRadius: "0.3125rem",
          //   background: "#7abaf2",
          //   color: "#fff",
          // }}
          onClick={() => {
            openLocationInGoogleMaps(JSON.parse(request.address));
          }}
        >
          Open in maps
        </Button>
      </td>
      <td>
        <Button
          className="btn"
          onClick={() => handlePapers(request.Media)}
        >
          Check papers
        </Button>
      </td> */}
      {/* <td>
        <Button
          className="btn"
          onClick={() => {
            handleSwalToast();
          }}
        >
          Consent
        </Button>
      </td> */}
      {/* <td>
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
      </td> */}
    </tr>
  );
};

export default ReqRow;
