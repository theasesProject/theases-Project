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
import { useDispatch } from 'react-redux';
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

for (let year = 1901; year <= currentYear; year++) {
  years.push(year);
}

// Assuming you're using a library like react-select or a similar component that expects options in a specific format
const options = years.map(year => ({ label: year.toString(), value: year.toString() }));

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
    height: "50rem",
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
    height: "25",
    transform: 'translate(-50%, -50%)',
  },
};
const AddNewEntities = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('car');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    userName: "",
    RNE: "",
    idCard: "",
    email: "",
    phoneNumber: "",
    avatar: ""
  })
  const [carDetails, setCarDetails] = useState({
    Owner: "",
    Brand: "",
    Type: "",
    Year: "",
    Category: "",
    DoorNumber: "",
    Capacity: ""
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        dispatch(SignUpCompany(companyDetails))
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
  }, [modalIsOpen2, companyDetails]);

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
  const fileInputRef = useRef(null);
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
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        onAfterClose={() => setSelectedImage("")}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="whiteboard-container">
          <div className="image-input-container" style={{
            backgroundColor: selectedImage ? "transparent" : "#f3f3f3"
          }} onClick={() => document.getElementById('imageInput').click()}>
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: "20rem", }} />

            ) : (
              <div className="image-input-text">Press here to add image</div>
            )}
            <input
              type="file"
              id="imageInput"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
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
              options={Object.keys(data).map(key => ({ label: key, value: key }))}
              onChange={(selectedOption) => handleSelectChange("Owner", selectedOption.value)}
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
                  onChange={(e) => handleSelectChange("Brand", e.target.value)}
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
                onChange={(selectedOption) => handleSelectChange("Type", selectedOption.value)}
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
                options={options.reverse()}
                onChange={(selectedOption) => handleSelectChange("Year", selectedOption.value)}
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
                onChange={(selectedOption) => handleSelectChange("Category", selectedOption.value)}
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
                onChange={(selectedOption) => handleSelectChange("DoorNumber", selectedOption.value)}
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
                onChange={(selectedOption) => handleSelectChange("Capacity", selectedOption.value)}
                menuportaltarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <div style={{
            color: "grey",
            fontSize: ".8rem",
            paddingTop: "1rem"
          }}>Press Enter to Submit the form or click here</div>
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
          <div className="image-input-container" style={{
            backgroundColor: companyDetails.avatar ? "transparent" : "#f3f3f3"
          }} onClick={() => document.getElementById('imageInput').click()}>
            {companyDetails.avatar ? (
              <img src={companyDetails.avatar} alt="Selected" style={{ maxWidth: '100%', maxHeight: "10rem" }} />


            ) : (
              <div className="image-input-text">Press here to add image</div>
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


          </div>
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
          <div style={{
            color: "grey",
            fontSize: ".8rem",
            paddingTop: "1rem"
          }}>Press Enter to Submit the form or click here</div>
        </div>
      </Modal >
    </>
  );
};

export default AddNewEntities;
