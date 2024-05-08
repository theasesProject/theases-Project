import { getAllRequests } from "Redux/adminSlice";
import { selectLoadingStatus } from "Redux/adminSlice";
import { selectAllRequests } from "Redux/adminSlice";
import { selectLoading } from "Redux/adminSlice";
import { getLimitedCars } from "Redux/adminSlice";
import "../assets/css/addNewEntities.css"
import { selectAllCars } from "Redux/adminSlice";
import Modal from 'react-modal';
import { selectAllUsers } from "Redux/adminSlice";
import ReqRow from "components/Tables/ReqRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { getAllCars } from "Redux/adminSlice";
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    borderWidth: ".01rem",
    borderStyle: "groove",
    borderColor: "#30416B",
    bottom: 'auto',
    marginRight: '-50%',
    width: "70rem",
    height: "55rem",
    transform: 'translate(-50%, -50%)',
  },
};

function Tables() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const cars = useSelector(selectAllCars)
  const [refresh, setRefresh] = useState(false)
  const [car, setCar] = useState({})
  const dispatch = useDispatch()
  const [value, onChange] = useState(new Date());
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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
  useEffect(() => {
    if (!cars?.length) {
      dispatch(getLimitedCars())
    }
  }, [cars])
  useEffect(() => {
    dispatch(getAllCars())
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4"><Button >List Of All Affiliated Cars</Button></CardTitle>
              </CardHeader>
              <CardBody style={{ overflowX: 'auto', width: '100%' }}>
                <Table striped responsive style={{
                  width: "100%",
                  tableLayout: "auto",
                  borderCollapse: "collapse",
                }} className="tablesorter responsive-table" >
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Model</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Type Of Fuel</th>
                      <th>Status</th>
                      <th>Agency</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>peopleCount</th>
                      <th>DoorNumber</th>
                      <th>Capacity</th>
                      <th>Year Of Manufacturing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars?.map((request, i) => {
                      return (
                        <ReqRow key={i} setRefresh={setRefresh} request={request} handlePapers={handlePapers} openModal={openModal} openLocationInGoogleMaps={openLocationInGoogleMaps} setCar={setCar} />
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div >
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}>
        <div className="Sample">
          <header>
            <h1>react-calendar sample page</h1>
          </header>
          <div className="Sample__container">
            <main className="Sample__container__content">
              <Calendar onChange={onChange} showWeekNumbers value={value} />
            </main>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Tables;
