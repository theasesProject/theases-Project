import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Button,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import "../assets/css/addNewEntities.css"
import Select from 'react-select'
import "../assets/css/customUpload.css"
import Modal from 'react-modal';
import { ReactComponent as Add } from '../assets/Svg/add-circle.svg';
import companyImage from "../assets/img/companyImage.jpeg"
import { SignUpCompany } from 'Redux/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from 'Redux/adminSlice';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { selectLoadingStatus } from 'Redux/adminSlice';
import { Companies } from 'Redux/adminSlice';
import { addCar } from 'Redux/adminSlice';
const data = {
  "Al-Kāf": {
    "key1": "value1",
    "key2": "value2"
  },
  "Al-Mahdiyah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Al-Munastīr": {
    "key1": "value1",
    "key2": "value2"
  },
  "Al-Qaṣrayn": {
    "key1": "value1",
    "key2": "value2"
  },
  "Al-Qayrawān": {
    "key1": "value1",
    "key2": "value2"
  },
  "Aryānah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Bājah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Banzart": {
    "key1": "value1",
    "key2": "value2"
  },
  "Bin 'Arūs": {
    "key1": "value1",
    "key2": "value2"
  },
  "Jundūbah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Madanīn": {
    "key1": "value1",
    "key2": "value2"
  },
  "Manūbah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Nābul": {
    "key1": "value1",
    "key2": "value2"
  },
  "Qābis": {
    "key1": "value1",
    "key2": "value2"
  },
  "Qafṣah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Qibilī": {
    "key1": "value1",
    "key2": "value2"
  },
  "Ṣafāqis": {
    "key1": "value1",
    "key2": "value2"
  },
  "Sīdī Bū Zayd": {
    "key1": "value1",
    "key2": "value2"
  },
  "Silyānah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Sūsah": {
    "key1": "value1",
    "key2": "value2"
  },
  "Taṭāwīn": {
    "key1": "value1",
    "key2": "value2"
  },
  "Tawzar": {
    "key1": "value1",
    "key2": "value2"
  },
  "Tūnis": {
    "key1": "value1",
    "key2": "value2"
  },
  "Zaghwān": {
    "key1": "value1",
    "key2": "value2"
  }
}


const years = [];
const currentYear = new Date().getFullYear();

for (let year = 2000; year <= currentYear; year++) {
  years.push(year);
}
const fuels = ["Gasoline", "Diesel", "Electric"]
// Assuming you're using a library like react-select or a similar component that expects options in a specific format
const yearOptions = years.map(year => ({ label: year.toString(), value: year.toString() }));
const fuelOptions = fuels.map(fuel => ({ label: fuel.toString(), value: fuel.toString() }));

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
const customStyles2 = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
const AddNewEntities = () => {
  const companies = useSelector(Companies)
  const options = companies.map(company => ({
    label: company.userName, // Display the userName as the label
    value: company.id, // Use the id as the value
  }));
  // const loadingStatus = useSelector(selectLoadingStatus.getAllCompanies)
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    userName: "",
    RNE: "",
    idCard: "",
    email: "",
    phoneNumber: "",
    avatar: "",
    type: "company"
  })
  const [carDetails, setCarDetails] = useState({
    Owner: "",
    model: "",
    price: "",
    brand: "",
    Type: "",
    typeOfFuel: "",
    Year: "",
    peopleCount: "",
    Category: "",
    DoorNumber: "",
    Capacity: "",
    media: ""
  })
  const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedImageCompany, setSelectedImageCompany] = useState(null);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setSelectedImage(URL.createObjectURL(image));
    }
  };
  const handleImageChangeCompany = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      handleSelectChange("avatar", URL.createObjectURL(image));
    }
  };
  function openModal() {
    setIsOpen(true);
  }
  function openModal2() {
    setIsOpen2(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function closeModal2() {
    setIsOpen2(false);
  }


  // }; // State to store the selected or dropped image
  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };
  const handleSelectChange = (id, value) => {
    setCarDetails(prevDetails => ({
      ...prevDetails, // Spread the previous state to maintain other properties
      [id]: value // Use computed property name to dynamically set the property
    }));
  };
  function notify(modalType) {
    const checkAndNotify = (details, type) => {
      Object.entries(details).forEach(([key, value]) => {
        if (value === '' || value === undefined) {
          toast.error(`Please fill in the ${key} field for ${type}.`);
        }
      });
    };

    // Determine which details to check based on the modal type
    if (modalType === 'car') {
      // Check carDetails
      checkAndNotify(carDetails, 'car');
    } else if (modalType === 'company') {
      // Check companyDetails
      checkAndNotify(companyDetails, 'company');
    }
  }




  const handleCompanyChange = (id, value) => {
    console.log(`Updating ${id} with value: ${value}`);
    setCompanyDetails(prevDetails => {
      const newDetails = {
        ...prevDetails,
        [id]: value
      };
      console.log('New state:', newDetails);
      return newDetails;
    });
  };
  const handleCarChange = (id, value) => {
    console.log(`Field: ${id}, Value: ${value}`);
    setCarDetails(prevDetails => {
      const newDetails = {
        ...prevDetails,
        [id]: value
      };
      console.log('New state:', newDetails);
      return newDetails;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('Key pressed:', event.key); // Debugging line
      if (event.key === 'Enter') {
        console.log('Enter key pressed'); // Debugging line
        if (Object.values(companyDetails).every(value => value)) {
          console.log('All details are filled out.'); // Debugging line
          dispatch(SignUpCompany(companyDetails));
          closeModal2()
        }
        console.log("closed the modal", modalIsOpen2)
      }
    };


    // Add event listener when modal is open
    if (modalIsOpen2) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Remove event listener when modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen2]);
  // console.log(`${process.env.EXPO_PUBLIC_SERVER_IP}`)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log(carDetails);
      }
    };

    // Add event listener when modal is open
    if (modalIsOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Remove event listener when modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen, carDetails]);
  useEffect(() => {
    if (!companies.length) {
      dispatch(getAllCompanies())
    }
  }, [companies])
  console.log(companies);
  const fileInputRef = useRef(null);
  const [imageSelected, setImageSelected] = useState(false);

  // In your onChange handler
  // setImageSelected(true);
  // setTimeout(() => setImageSelected(false), 2000); // Reset after 2 seconds

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className='boxContainer' style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginLeft: "1rem"
            }}>
              <CardHeader style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "3rem"
              }}>
              </CardHeader>
              <CardBody style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
                <div className='half' style={{
                  justifyContent: "flex-start",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div id='Title'>Recently Added Cars</div>
                  <Button onClick={() => {
                    openModal()
                  }} style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    width: "17rem",
                    marginTop: "2rem",
                  }}><Add />Add a New Car</Button>
                  <ListGroup style={{
                    marginTop: "5rem",
                    gap: "1rem"
                  }} flush>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Cras justo odio</ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Morbi leo risus </ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Porta ac consectetur ac </ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                </div>
                <div className='separator'></div>
                <div className='half'>
                  <div id='Title'>Newly Joined Companies</div>
                  <Button onClick={() => {
                    openModal2()
                  }} style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    width: "17rem",
                    marginTop: "2rem",
                  }}><Add />Add a New Company</Button>
                  <ListGroup style={{
                    marginTop: "5rem",
                    gap: "1rem"
                  }} flush>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Cras justo odio</ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Morbi leo risus </ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Porta ac consectetur ac </ListGroupItem>
                    <ListGroupItem style={{
                      borderStyle: "ridge",
                      borderWidth: ".1rem",
                      borderColor: "#30416B",
                      borderRadius: "5px"
                    }}>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer/>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        onAfterClose={() => setSelectedImage("")}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="whiteboard-container">
          <button className="image-input-container" style={{
            backgroundColor: carDetails.media ? "transparent" : "#f3f3f3",
            // border: "none",
            padding: 0,
            cursor: "pointer",
          }} onClick={() => document.getElementById('imageInput').click()}>
            {carDetails.media ? (
              <>
                <img src={carDetails.media} alt="Selected" style={{ maxWidth: '100%', maxHeight: "20rem", }} />
                <div className="image-preview-text">Image selected</div>
              </>
            ) : (
              <div style={{
                flexDirection: "row-reverse",
                display: "flex"
              }}>
                <i className="fas fa-camera"></i> {/* Example using Font Awesome */}
                <div className="image-input-text">Press here to add image</div>
              </div >
            )}

            <input
              type="file"
              id="imageInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  const imageUri = URL.createObjectURL(file);
                  handleCarChange("media", imageUri);
                }
              }}
            />
          </button>


          <div className='scrollable-input-container'>
            <div style={{
              fontSize: "1.2rem",
              paddingBottom: "0.5rem"
            }}>Input The Car's Details here :</div>
            <div className='first-select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>Which Company Owns This Car :</div>
              <Select
                className="select-box"
                options={options}
                onChange={(selectedOption) => handleCarChange("Owner", selectedOption.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />

            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              justifyItems: "center",
              flexDirection: "column",
              marginBottom: "1rem",
              width: "100%",
            }}>
              <div style={{
                fontSize: ".9rem",

              }}>What Is The Daily Price For This Car :</div>
              <div style={{
              }} className="input-container">
                <input
                  className="input-box"
                  placeholder='Type here...'
                  options={Object.keys(data).map(key => ({ label: key, value: key }))}
                  onChange={(e) => handleCarChange("price", e.target.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <div className='first-select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>What Is The Type Of Fuel That This Car Uses :</div>
              <Select
                className="select-box"
                options={fuelOptions}
                onChange={(selectedOption) => handleCarChange("typeOfFuel", selectedOption.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />

            </div>
            <div className="two-select-container">
              <div className='select-container'>
                <div style={{
                  fontSize: ".9rem"
                }}>Insert The Brand Of The Car :</div>
                <div className="input-container">
                  <input
                    className="input-box"
                    placeholder='Type here...'
                    options={Object.keys(data).map(key => ({ label: key, value: key }))}
                    onChange={(e) => handleCarChange("brand", e.target.value)}
                    menuportaltarget={document.body}
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                  />
                </div>
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select The Type Of The Car :</div>
                <Select
                  className="select-box"
                  options={[
                    { value: 'Automatic', label: 'Automatic' },
                    { value: 'Manual', label: 'Manual' },
                  ]}
                  onChange={(selectedOption) => handleCarChange("Type", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <div className="two-select-container">
              <div className='select-container'>
                <div style={{
                  fontSize: ".9rem"
                }}>What Year Was The Car Created At :</div>
                <Select
                  className="select-box"
                  options={yearOptions.reverse()}
                  onChange={(selectedOption) => handleCarChange("Year", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select The Category Of The Car :</div>
                <Select
                  className="select-box"
                  options={[
                    { value: 'Economic Class', label: 'Economic Class' },
                    { value: 'Luxery Car', label: 'Luxery Car' },
                    { value: 'Sports', label: 'Sports' },
                  ]}
                  onChange={(selectedOption) => handleCarChange("Category", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>

            <div className="two-select-container">
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select How Many Doors In Your Car :</div>
                <Select
                  className="select-box"
                  options={[
                    { label: '3', value: 3 },
                    { label: '5', value: 5 },
                  ]}
                  onChange={(selectedOption) => handleCarChange("DoorNumber", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select the Capacity of the Car's Luggage :</div>
                <Select
                  className="select-box"
                  options={[
                    { label: "1 suitcase", value: 1 },
                    { label: "2 suitcases", value: 2 },
                    { label: "3 suitcases", value: 3 },
                    { label: "4 suitcases", value: 4 },
                    { label: "5 suitcases", value: 5 }
                  ]}
                  onChange={(selectedOption) => handleCarChange("Capacity", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>
            <div className="two-select-container">
              <div className='select-container'>
                <div style={{
                  fontSize: ".9rem"
                }}>Insert The Model Of The Car :</div>
                <div className="input-container">
                  <input
                    className="input-box"
                    placeholder='Type here...'
                    options={Object.keys(data).map(key => ({ label: key, value: key }))}
                    onChange={(e) => handleCarChange("model", e.target.value)}
                    menuportaltarget={document.body}
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                  />
                </div>
              </div>
              <div className="select-container">
                <div style={{
                  fontSize: ".9rem"
                }}>Select How Many People Can Fit Into This Car :</div>
                <Select
                  className="select-box"
                  options={[
                    { label: "1", value: 1 },
                    { label: "2", value: 2 },
                    { label: "3", value: 3 },
                    { label: "4", value: 4 },
                    { label: "5", value: 5 }
                  ]}
                  onChange={(selectedOption) => handleCarChange("peopleCount", selectedOption.value)}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />
              </div>
            </div>

          </div>
          <Button onClick={() => {
            console.log(carDetails);
            if (Object.values(carDetails).every(value => value)) {
              dispatch(addCar(carDetails))
              closeModal()
            }
            notify('car');

          }} className='pressEnter' style={{
            // color: "grey",
            // fontSize: "1rem",
            // paddingTop: "1rem"
          }}>Press Here to Submit the form </Button>
        </div>
      </Modal >
      <Modal
        isOpen={modalIsOpen2}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal2}
        onAfterClose={() => setSelectedImage("")}
        style={customStyles2}
        contentLabel="Example Modal"
      >
        <div className="whiteboard-container">
          {/* <div className="image-input-container" style={{
            backgroundColor: companyDetails.avatar ? "transparent" : "#f3f3f3"
          }} onClick={() => document.getElementById('imageInput').click()}>
            {companyDetails.avatar ? (
              <img src={companyDetails.avatar} alt="Selected" style={{ maxWidth: '100%', maxHeight: "20rem" }} />
            ) : (
              <div className="image-input-text">Press here to add image↓</div>
            )}
            <input
              type="file"
              id="imageInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  const imageUri = URL.createObjectURL(file);
                  handleCompanyChange("avatar", imageUri);
                }
              }}
            />


          </div> */}
          <button className="image-input-container" style={{
            backgroundColor: carDetails.media ? "transparent" : "#f3f3f3",
            // border: "none",
            padding: 0,
            cursor: "pointer",
          }} onClick={() => document.getElementById('imageInput').click()}>
            {carDetails.media ? (
              <>
                <img src={carDetails.media} alt="Selected" style={{ maxWidth: '100%', maxHeight: "20rem", }} />
                <div className="image-preview-text">Image selected</div>
              </>
            ) : (
              <div style={{
                flexDirection: "row-reverse",
                display: "flex"
              }}>
                <i className="fas fa-camera"></i> {/* Example using Font Awesome */}
                <div className="image-input-text">Press here to add image</div>
              </div >
            )}

            <input
              type="file"
              id="imageInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  const imageUri = URL.createObjectURL(file);
                  handleCompanyChange("media", imageUri);
                }
              }}
            />
          </button>
          <div style={{
            fontSize: "1.2rem",
            paddingBottom: "0.5rem"
          }}>Input The Company's Details here :</div>
          <div className='first-select-container'>
            <div style={{
              fontSize: ".9rem"
            }}>What Is The Name Of The Company :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                placeholder='Input The Company Name Here...'
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={(e) => handleCompanyChange("userName", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <div className="two-select-container">
            <div className='select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>Select An Image/Document Of The R.N.E :</div>
              <div className="input-container">
                <input
                  className="input-box"
                  type="file"
                  placeholder='Type here...'
                  onChange={(e) => {
                    // Check if a file is selected
                    if (e.target.files && e.target.files.length > 0) {
                      // Create a URL for the selected file
                      const fileURI = URL.createObjectURL(e.target.files[0]);
                      // Update the state with the file URI
                      handleCompanyChange("RNE", fileURI);
                    }
                  }}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />

              </div>
            </div>
            <div className='select-container'>
              <div style={{
                fontSize: ".9rem"
              }}>Select A Picture/Document Of the ID card Of The Owner :</div>
              <div className="input-container">
                <input
                  className="input-box"
                  type="file"
                  placeholder='Type here...'
                  onChange={(e) => {
                    // Check if a file is selected
                    if (e.target.files && e.target.files.length > 0) {
                      // Create a URL for the selected file
                      const fileURI = URL.createObjectURL(e.target.files[0]);
                      // Update the state with the file URI
                      handleCompanyChange("idCard", fileURI);
                    }
                  }}
                  menuportaltarget={document.body}
                  styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 })
                  }}
                />

              </div>
            </div>
          </div>
          <div className='first-select-container'>
            <div style={{
              fontSize: ".9rem",
            }}>What Is The E-mail Of The Owner :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                type="email"
                placeholder='Input The Email Here...'
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={(e) => handleCompanyChange("email", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div><div className='first-select-container'>
            <div style={{
              fontSize: ".9rem"
            }}>What Is The Phone Number Of The Owner :</div>
            <div className="input-container-long">
              <input
                className="select-box"
                placeholder='Input The Phone Number Here...'
                type="number"
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={(e) => handleCompanyChange("phoneNumber", e.target.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <Button className='pressEnter' onClick={() => {
            if (Object.values(companyDetails).every(value => value)) {
              console.log("should be created by now");
              dispatch(SignUpCompany(companyDetails))
              closeModal2()
            }

            notify('company');

          }} style={{
            // color: "grey",
            // fontSize: "1rem",
            // paddingTop: "1rem",
            // cursor: "pointer"
          }}>Press Here to Submit the form </Button>
        </div>
      </Modal >
    </>
  );
};

export default AddNewEntities;
