import { getAllRequests } from "Redux/adminSlice";
import { selectLoadingStatus } from "Redux/adminSlice";
import { selectAllRequests } from "Redux/adminSlice";
import { selectLoading } from "Redux/adminSlice";
import { selectAllUsers } from "Redux/adminSlice";
import ReqRow from "components/Tables/ReqRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const loadingStatus = useSelector(selectLoadingStatus)
  const Requests = useSelector(selectAllRequests)
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
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
    dispatch(getAllRequests())
  }, [])
  const allRequests = useSelector(selectAllRequests)
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Inquiries for Agency Status</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Agency Phone Number</th>
                      <th>Agency Location</th>
                      <th>Papers</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr> */}
                    {allRequests?.map((request, i) => {
                      return (
                        <ReqRow key={i} setRefresh={setRefresh} request={request} handlePapers={handlePapers} openLocationInGoogleMaps={openLocationInGoogleMaps} />
                      );
                    })}
                    {/* <td>1</td>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td>lkjazekljaekjaze</td>
                      <td >$36,738</td>
                      <td >Yes/No</td> */}
                    {/* </tr> */}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Reports from Clients</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
