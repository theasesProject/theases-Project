
import { getAllUsers } from "Redux/adminSlice";
import { selectAllUsers } from "Redux/adminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import SelectSearch from 'react-select-search';
import Select from 'react-select';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { updateStateBlock } from "Redux/adminSlice";
import "../assets/css/nucleo-icons.css"
import { Sort } from "Redux/adminSlice";
import { filterUsers } from "Redux/adminSlice";
function Icons() {
  const [selectedOption, setSelectedOptions] = useState({ value: 'all', label: 'All Users' });
  const [selectedSortOption, setSelectedSortOptions] = useState({ value: "Sort Your List...", label: "Sort Your List" });
  const [searchValue, setSearchValue] = useState("")
  const options = [
    { value: 'all', label: 'All Users' },
    { value: 'clients', label: 'Clients Only' },
    { value: 'agencies', label: 'Agencies Only' },
  ];
  const replaceSelectedOption = (selectedSortOption) => {
    const newOptions = [
      { value: 'A-Z', label: 'Alphabetical Order(A-Z) ↾' },
      { value: 'createdAt', label: 'Date of Account Creation ↾' },
      { value: 'carsRented', label: 'Number of Cars Rented ↾' }
    ];

    newOptions.forEach((option, index) => {
      if (option.value === selectedSortOption.value) {
        newOptions[index] = {
          value: option.value === 'A-Z' ? 'A-Z-desc' : option.value === 'createdAt' ? 'createdAt-desc' : 'carsRented-desc',
          label: option.label === 'Alphabetical Order(A-Z) ↾' ? 'Alphabetical Order(A-Z) ⇂' : option.label === 'Date of Account Creation ↾' ? 'Date of Account Creation ⇂' : 'Number of Cars Rented ⇂'
        };
      }
    });
    return newOptions;
  };
  const sortOptions = replaceSelectedOption(selectedSortOption);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleInputChange = (inputValue, { action }, filteredOptions) => {
    if (action === 'input-change' && inputValue.length >= 2) {
      setMenuIsOpen(true);
      const filtered = allUsers.filter((e) => {
        console.log(inputValue);
        return e.userName.includes(inputValue)
      })
      filtered[0] ? dispatch(filterUsers(filtered)) : console.log(filtered);
    }
    else if (action === 'input-change' && inputValue.length === 0) {
      setMenuIsOpen(false);
      dispatch(getAllUsers())
    }
  };
  const handleBlur = () => {
    setMenuIsOpen(false);
  };
  const searchCustomStyles = {
    menu: (provied, state) => ({
      ...provied,
      background: "#1E1E2F",
      // width: "15%"
    }),
    control: (provided, state) => ({
      ...provided,
      background: '#1E1E2F',
      borderColor: state.isFocused ? '#007BFF' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 1px #007BFF' : 'none',
      '&:hover': {
        borderColor: '#007BFF',
      },
      width: "25rem"
    }),
    lineHeight: "2px",
    height: "2px",
    minHeight: '20px',
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? 'white' : state.isSelected ? 'white' : '#1E1E2F',
      // width: "15%",
      color: state.isFocused ? '#1E1E2F' : state.isSelected ? 'black' : '#fff',
      width: "25rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Change this to your desired selected value color
    }),
  }
  const customStyles = {
    menu: (provied, state) => ({
      ...provied,
      background: "#1E1E2F",
      // width: "15%"
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#1E1E2F",
      borderColor: state.isFocused ? '#007BFF' : '#ced4da',
      boxShadow: state.isFocused ? '0 0 0 1px #007BFF' : 'none',
      '&:hover': {
        borderColor: '#007BFF',
      },
      width: "17rem"
    }),
    lineHeight: "2px",
    height: "2px",
    minHeight: '20px',
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused ? 'white' : state.isSelected ? 'white' : '#1E1E2F',
      // width: "15%",
      color: state.isFocused ? '#1E1E2F' : state.isSelected ? 'black' : '#fff',
      width: "17rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Change this to your desired selected value color
    }),
  }
  const handleBlock = (id) => {
    try {
      const user = allUsers.find((user) => user.id === id);
      if (user) {
        dispatch(updateStateBlock(id));
        setRefresh(!refresh);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (chosen) => {
    setMenuIsOpen(false);
    setSelectedOptions(chosen)
    console.log(selectedOption);
  }
  const handleSortChange = async (chosen) => {
    try {
      setSelectedSortOptions(chosen)
      await dispatch(Sort(chosen.value))
      console.log(selectedSortOption);
    } catch (error) {
      console.error(error);
    }
    // setRefresh(!refresh)
  }
  const loading = useSelector((state) => state.Admin.loading);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch()
  const allUsers = useSelector(selectAllUsers)
  const searchOptions = allUsers?.map(user => ({
    label: user.userName,
    value: user.id
  }));
  useEffect(() => {
    dispatch(getAllUsers())
    console.log(allUsers);
    loading ? setRefresh(!refresh) : null;

  }, [dispatch, refresh])
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                // backgroundColor: "red",
                height: "3rem"
              }}>
                <Select
                  options={searchOptions}
                  filterOption={(option, input) => input.length >= 2 && option.label.toLowerCase().includes(input.toLowerCase())}
                  value={null}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null
                  }}
                  styles={searchCustomStyles}
                  placeholder="find a specific User..."
                  onInputChange={handleInputChange}
                  // onChange={handleChange}
                  onBlur={handleBlur}
                  menuIsOpen={menuIsOpen}
                />
                {/* <div>
                  <h5 className="title">List of Users</h5>
                  <p className="category">
                    Manage your users from this tab.
                  </p>
                </div> */}
                <div style={{
                  display: "flex",
                  flexDirection: "row"
                }}>
                  <div style={{
                    paddingRight: "2rem",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    // alignContent:"center",
                    // textAlign:"center",
                    alignItems: "center"
                  }}>
                    Sort By:
                    <Select
                      isSearchable={true}
                      // width="50%"
                      // placeholder={"filter your list..."}
                      value={selectedSortOption}
                      onChange={handleSortChange}
                      options={sortOptions}
                      styles={customStyles}
                    />
                  </div>
                  <div style={{
                    paddingRight: "2rem",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    // alignContent:"center",
                    // textAlign:"center",
                    alignItems: "center"
                  }}>
                    Filter By:
                    <Select
                      isSearchable={true}
                      // width="50%"
                      // placeholder={"filter your list..."}
                      value={selectedOption}
                      onChange={handleChange}
                      options={options}
                      styles={customStyles}
                    />
                  </div></div>
              </CardHeader>
              <CardBody className="all-icons">
                {selectedOption.label === "All Users" ?
                  (
                    <>
                      <div style={{
                        fontSize: "1rem"
                      }}>
                        All Clients:
                      </div>
                      <Row>
                        {allUsers.map((user, i) =>
                          user.type === "client" ? (
                            <Col
                              key={i}
                              className="font-icon-list col-xs-6 col-xs-6"
                              lg="2"
                              md="3"
                              sm="4"
                              onClick={() => {
                                console.log(user);
                                Swal.fire({
                                  title: `<strong>${user.type === "client" ? "Client" : "Agency"} Profile Details</strong>`,
                                  html: `
                                 <b>UserName: </b>${user.userName}
                                 <br>
                                 <b>email: </b>${user.email}
                                 <br>
                                 <b>phoneNumber: </b>${user.phoneNumber}
                                 <br>
                                 <b>type: </b>${user.type}
                                 <br>
                                 <b>id number: </b>${user.idCard}
                                                                 `,
                                  imageUrl: `${user.avatar}`,
                                  imageWidth: 200,
                                  imageHeight: 200,
                                  imageAlt: "Custom image",
                                  backdrop: `rgba(0,0,123,0.4)`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: `
                                 <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                `,
                                  confirmButtonAriaLabel: "Thumbs up, great!",
                                  customClass: {
                                    text: "swal-secondary-text",
                                    container: 'my-modal',
                                    confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                    cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                  },
                                  cancelButtonText: `
                                 <i class="fa fa-close"></i>
                                `,
                                  // cancelButtonAriaLabel: "Thumbs down"
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                      // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Yes, ban it!",
                                      cancelButtonText: "No, cancel!"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleBlock(user.id)
                                        Swal.fire({
                                          title: user.stateBlocked ? `User <b>${user.userName}</b> unBanned!` : `User ${user.userName} Banned!`,
                                          text: user.stateBlocked ? "The user has been Unbanned." : "The user has been banned.",
                                          icon: "success"
                                        });
                                      } else if (
                                        result.dismiss === Swal.DismissReason.cancel
                                      ) {
                                        Swal.fire({
                                          title: "Cancelled",
                                          text: "The user ban has been cancelled.",
                                          icon: "error"
                                        });
                                      }
                                    });
                                  }
                                });
                              }}
                            >
                              <div className="font-icon-detail">
                                <img src={user.avatar} style={{
                                  height: "50%", width: "35%"
                                }} />
                                <p className="userNameCol">{user.userName}<br></br>(
                                  {user.email})</p>
                              </div>
                            </Col>) : null
                        )}
                      </Row>
                      <div style={{
                        padding: "1rem"
                      }}>
                        <div style={{
                          width: "100%",
                          height: ".005rem",
                          backgroundColor: "#4ca9e4"
                        }}></div>
                      </div>
                      <div style={{

                        fontSize: "1rem"
                      }}>
                        All Agencies:
                      </div>
                      <Row>
                        {allUsers.map((user, i) =>
                          user.type === "agency" ? (

                            <Col
                              key={i}
                              className="font-icon-list col-xs-6 col-xs-6"
                              lg="2"
                              md="3"
                              sm="4"
                              onClick={() => {
                                console.log(user);
                                Swal.fire({
                                  title: `<strong>${user.type === "client" ? "Client" : "Agency"} Profile Details</strong>`,
                                  html: `
                                 <b>UserName: </b>${user.userName}
                                 <br>
                                 <b>email: </b>${user.email}
                                 <br>
                                 <b>phoneNumber: </b>${user.phoneNumber}
                                 <br>
                                 <b>type: </b>${user.type}
                                 <br>
                                 <b>id number: </b>${user.idCard}
                                `,
                                  imageUrl: `${user.avatar}`,
                                  imageWidth: 200,
                                  imageHeight: 200,
                                  imageAlt: "Custom image",
                                  backdrop: `rgba(0,0,123,0.4)`,
                                  showCloseButton: true,
                                  showCancelButton: true,
                                  focusConfirm: false,
                                  confirmButtonText: `
                                 <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                `,
                                  confirmButtonAriaLabel: "Thumbs up, great!",
                                  customClass: {
                                    text: "swal-secondary-text",
                                    container: 'my-modal',
                                    confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                    cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                  },
                                  cancelButtonText: `
                                 <i class="fa fa-close"></i>
                                `,
                                  // cancelButtonAriaLabel: "Thumbs down"
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                      // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Yes, ban it!",
                                      cancelButtonText: "No, cancel!"
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleBlock(user.id)
                                        Swal.fire({
                                          title: user.stateBlocked ? `User <b>${user.userName}</b> unBanned!` : `User ${user.userName} Banned!`,
                                          text: user.stateBlocked ? "The user has been Unbanned." : "The user has been banned.",
                                          icon: "success"
                                        });
                                      } else if (
                                        result.dismiss === Swal.DismissReason.cancel
                                      ) {
                                        Swal.fire({
                                          title: "Cancelled",
                                          text: "The user ban has been cancelled.",
                                          icon: "error"
                                        });
                                      }
                                    });
                                  }
                                });
                              }}

                            >
                              <div className="font-icon-detail">
                                <img src={user.avatar} style={{
                                  height: "50%", width: "35%"
                                }} />
                                <p className="userNameCol">{user.userName}<br></br>(
                                  {user.email})</p>
                              </div>
                            </Col>) : null

                        )}
                      </Row>
                    </>) : selectedOption.label === "Clients Only" ? (
                      <>
                        <div style={{
                          fontSize: "1rem"
                        }}>
                          All Clients:
                        </div>
                        <Row>
                          {allUsers.map((user, i) =>
                            user.type === "client" ? (
                              < Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "client" ? "Client" : "Agency"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                   <br>
                                   <b>id number: </b>${user.idCard}
                                  `,
                                    imageUrl: `${user.avatar}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0,0,123,0.4)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, ban it!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.stateBlocked ? `User <b>${user.userName}</b> unBanned!` : `User ${user.userName} Banned!`,
                                            text: user.stateBlocked ? "The user has been Unbanned." : "The user has been banned.",
                                            icon: "success"
                                          });
                                        } else if (
                                          result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "The user ban has been cancelled.",
                                            icon: "error"
                                          });
                                        }
                                      });
                                    }
                                  });
                                }}
                              >
                                <div className="font-icon-detail">
                                  <img src={user.avatar} style={{
                                    height: "50%", width: "35%"
                                  }} />
                                  <p className="userNameCol">{user.userName}<br></br>(
                                    {user.email})</p>
                                </div>
                              </Col>
                            ) : null
                          )}
                        </Row>

                      </>
                    ) : selectedOption.label === "Agencies Only" ? (
                      <>
                        <div style={{

                          fontSize: "1rem"
                        }}>
                          All Agencies:
                        </div>
                        <Row>
                          {allUsers.map((user, i) =>
                            user.type === "agency" ? (
                              <Col
                                key={i}
                                className="font-icon-list col-xs-6 col-xs-6"
                                lg="2"
                                md="3"
                                sm="4"
                                onClick={() => {
                                  console.log(user);
                                  Swal.fire({
                                    title: `<strong>${user.type === "client" ? "Client" : "Agency"} Profile Details</strong>`,
                                    html: `
                                   <b>UserName: </b>${user.userName}
                                   <br>
                                   <b>email: </b>${user.email}
                                   <br>
                                   <b>phoneNumber: </b>${user.phoneNumber}
                                   <br>
                                   <b>type: </b>${user.type}
                                   <br>
                                   <b>id number: </b>${user.idCard}
                                  `,
                                    imageUrl: `${user.avatar}`,
                                    imageWidth: 200,
                                    imageHeight: 200,
                                    imageAlt: "Custom image",
                                    backdrop: `rgba(0,0,123,0.4)`,
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText: `
                                   <i class="fa fa-ban"></i> ${user.stateBlocked ? "unBan this User?" : "ban this User?"}
                                  `,
                                    confirmButtonAriaLabel: "Thumbs up, great!",
                                    customClass: {
                                      text: "swal-secondary-text",
                                      container: 'my-modal',
                                      confirmButton: user.stateBlocked ? 'unban-button' : 'ban-button',
                                      cancelButton: !user.stateBlocked ? 'unban-button' : 'ban-button'
                                    },
                                    cancelButtonText: `
                                   <i class="fa fa-close"></i>
                                  `,
                                    // cancelButtonAriaLabel: "Thumbs down"
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      Swal.fire({
                                        title: "Are you sure?",
                                        html: user.stateBlocked ? `You will ban <strong>${user.userName}</strong> ?` : `You will unBan <strong>${user.userName}</strong> ?`,
                                        // text: user.stateBlocked ?`You will ban <strong>${user.userName}</strong> ?`:`You will unBan <strong>${user.userName}</strong> ?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, ban it!",
                                        cancelButtonText: "No, cancel!"
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          handleBlock(user.id)
                                          Swal.fire({
                                            title: user.stateBlocked ? `User <b>${user.userName}</b> unBanned!` : `User ${user.userName} Banned!`,
                                            text: user.stateBlocked ? "The user has been Unbanned." : "The user has been banned.",
                                            icon: "success"
                                          });
                                        } else if (
                                          result.dismiss === Swal.DismissReason.cancel
                                        ) {
                                          Swal.fire({
                                            title: "Cancelled",
                                            text: "The user ban has been cancelled.",
                                            icon: "error"
                                          });
                                        }
                                      });
                                    }
                                  });
                                }}
                              >
                                <div className="font-icon-detail">
                                  <img src={user.avatar} style={{
                                    height: "50%", width: "35%"
                                  }} />
                                  <p className="userNameCol">{user.userName}</p>
                                </div>
                              </Col>
                            ) : null

                          )}
                        </Row></>
                    ) : null
                }



                {/* <Row>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                    onClick={()=>{
                      swal("Hello there my name is a user")
                    }}
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-alert-circle-exc" />
                      <p>icon-alert-circle-exc</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-align-center" />
                      <p>icon-align-center</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-align-left-2" />
                      <p>icon-align-left-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-app" />
                      <p>icon-app</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-atom" />
                      <p>icon-atom</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-attach-87" />
                      <p>icon-attach-87</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-badge" />
                      <p>icon-badge</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bag-16" />
                      <p>icon-bag-16</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bank" />
                      <p>icon-bank</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-basket-simple" />
                      <p>icon-basket-simple</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bell-55" />
                      <p>icon-bell-55</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bold" />
                      <p>icon-bold</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-book-bookmark" />
                      <p>icon-book-bookmark</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-double-right" />
                      <p>icon-double-right</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bulb-63" />
                      <p>icon-bulb-63</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bullet-list-67" />
                      <p>icon-bullet-list-67</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-bus-front-12" />
                      <p>icon-bus-front-12</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-button-power" />
                      <p>icon-button-power</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-camera-18" />
                      <p>icon-camera-18</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-calendar-60" />
                      <p>icon-calendar-60</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-caps-small" />
                      <p>icon-caps-small</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-cart" />
                      <p>icon-cart</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-chart-bar-32" />
                      <p>icon-chart-bar-32</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-chart-pie-36" />
                      <p>icon-chart-pie-36</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-chat-33" />
                      <p>icon-chat-33</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-check-2" />
                      <p>icon-check-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-cloud-download-93" />
                      <p>icon-cloud-download-93</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-cloud-upload-94" />
                      <p>icon-cloud-upload-94</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-coins" />
                      <p>icon-coins</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-compass-05" />
                      <p>icon-compass-05</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-controller" />
                      <p>icon-controller</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-credit-card" />
                      <p>icon-credit-card</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-delivery-fast" />
                      <p>icon-delivery-fast</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-email-85" />
                      <p>icon-email-85</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-gift-2" />
                      <p>icon-gift-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-globe-2" />
                      <p>icon-globe-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-headphones" />
                      <p>icon-headphones</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-heart-2" />
                      <p>icon-heart-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-html5" />
                      <p>icon-html5</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-double-left" />
                      <p>icon-double-left</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-image-02" />
                      <p>icon-image-02</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-istanbul" />
                      <p>icon-istanbul</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-key-25" />
                      <p>icon-key-25</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-laptop" />
                      <p>icon-laptop</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-light-3" />
                      <p>icon-light-3</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-link-72" />
                      <p>icon-link-72</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-lock-circle" />
                      <p>icon-lock-circle</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-map-big" />
                      <p>icon-map-big</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-minimal-down" />
                      <p>icon-minimal-down</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-minimal-left" />
                      <p>icon-minimal-left</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-minimal-right" />
                      <p>icon-minimal-right</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-minimal-up" />
                      <p>icon-minimal-up</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-mobile" />
                      <p>icon-mobile</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-molecule-40" />
                      <p>icon-molecule-40</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-money-coins" />
                      <p>icon-money-coins</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-notes" />
                      <p>icon-notes</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-palette" />
                      <p>icon-palette</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-paper" />
                      <p>icon-paper</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-pin" />
                      <p>icon-pin</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-planet" />
                      <p>icon-planet</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-puzzle-10" />
                      <p>icon-puzzle-10</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-pencil" />
                      <p>icon-pencil</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-satisfied" />
                      <p>icon-satisfied</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-scissors" />
                      <p>icon-scissors</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-send" />
                      <p>icon-send</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-settings-gear-63" />
                      <p>icon-settings-gear-63</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-settings" />
                      <p>icon-settings</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-wifi" />
                      <p>icon-wifi</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-single-02" />
                      <p>icon-single-02</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-single-copy-04" />
                      <p>icon-single-copy-04</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-sound-wave" />
                      <p>icon-sound-wave</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-spaceship" />
                      <p>icon-spaceship</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-square-pin" />
                      <p>icon-square-pin</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-support-17" />
                      <p>icon-support-17</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-tablet-2" />
                      <p>icon-tablet-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-tag" />
                      <p>icon-tag</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-tap-02" />
                      <p>icon-tap-02</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-tie-bow" />
                      <p>icon-tie-bow</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-time-alarm" />
                      <p>icon-time-alarm</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-trash-simple" />
                      <p>icon-trash-simple</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-trophy" />
                      <p>icon-trophy</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-tv-2" />
                      <p>icon-tv-2</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-upload" />
                      <p>icon-upload</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-user-run" />
                      <p>icon-user-run</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-vector" />
                      <p>icon-vector</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-video-66" />
                      <p>icon-video-66</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-wallet-43" />
                      <p>icon-wallet-43</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-volume-98" />
                      <p>icon-volume-98</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-watch-time" />
                      <p>icon-watch-time</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-world" />
                      <p>icon-world</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-zoom-split" />
                      <p>icon-zoom-split</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-refresh-01" />
                      <p>icon-refresh-01</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-refresh-02" />
                      <p>icon-refresh-02</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-shape-star" />
                      <p>icon-shape-star</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-components" />
                      <p>icon-components</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-triangle-right-17" />
                      <p>icon-triangle-right-17</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-button-pause" />
                      <p>icon-button-pause</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-simple-remove" />
                      <p>icon-simple-remove</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-simple-add" />
                      <p>icon-simple-add</p>
                    </div>
                  </Col>
                  <Col
                    className="font-icon-list col-xs-6 col-xs-6"
                    lg="2"
                    md="3"
                    sm="4"
                  >
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-simple-delete" />
                      <p>icon-simple-delete</p>
                    </div>
                  </Col>
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default Icons;
