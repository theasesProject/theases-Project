import React, { useRef, useState } from 'react';
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
let subtitle;
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    borderWidth: ".01rem",
    borderStyle: "groove",
    borderColor:"#30416B",
    bottom: 'auto',
    marginRight: '-50%',
    width:"50rem",
    height:"35rem",
    transform: 'translate(-50%, -50%)',

  },
};
const AddNewEntities = () => {
  const [activeTab, setActiveTab] = useState('car');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  // const openModal = (selectedValue) => {
  //   Swal.fire({
  //     title: 'You selected',
  //     text: selectedValue,
  //     icon: 'success',
  //     confirmButtonText: 'OK'
  //   });
  // };

  // const openModal = (initialStep = 1) => {
  //   setCurrentStep(initialStep); // Set the initial step
  //   const showModal = (step) => {
  //     if (step === 1) { // First step: Input field
  //       Swal.fire({
  //         title: 'Select field validation',
  //         input: 'select',
  //         inputOptions: data,
  //         inputPlaceholder: 'Select a Company',
  //         showCancelButton: true,
  //         customClass: {
  //           popup: 'custom-swal-container'
  //         },
  //         // didOpen: () => {
  //         //   const input = Swal.getInput();
  //         //   input.addEventListener('input', (event) => {
  //         //     const searchValue = event.target.value.toLowerCase();
  //         //     const select = Swal.getPopup().querySelector('.swal2-select');
  //         //     const options = select.querySelectorAll('option');
  //         //     options.forEach(option => {
  //         //       const optionText = option.textContent.toLowerCase();
  //         //       option.style.display = optionText.includes(searchValue) ? 'block' : 'none';
  //         //     });
  //         //   });
  //         // }
  //       })
  //     } else if (step === 2) { // Second step: File selection and additional input
  //       Swal.fire({
  //         title: 'Step 2',
  //         html: `
  //           <input id="fileInput" class="swal2-file" type="file" accept="image/*" style="display:none" />
  //           <label  class="swal2-file" for="fileInput">Select an image</label>
  //           <input id="additionalInput" type="text" placeholder="Additional input" />
  //         `,
  //         showCancelButton: true,
  //         confirmButtonText: 'Next',
  //         cancelButtonText: 'Cancel',
  //         preConfirm: () => {
  //           const fileInput = document.getElementById('fileInput');
  //           const additionalInput = document.getElementById('additionalInput');
  //           if (!fileInput.files.length) {
  //             Swal.showValidationMessage("You need to upload an image!");
  //           } else if (!additionalInput.value) {
  //             Swal.showValidationMessage("You need to fill in the additional input!");
  //           } else {
  //             setCurrentStep(step + 1); // Move to the next step
  //             showModal(step + 1); // Open the next modal
  //           }
  //         }
  //       });
  //     } else if (step === 3) { // Third step: Three dropdowns
  //       Swal.fire({
  //         title: 'Step 3',
  //         input: 'select',
  //         inputOptions: {
  //           'Option 1': 'option1',
  //           'Option 2': 'option2',
  //           'Option 3': 'option3'
  //         },
  //         inputPlaceholder: 'Select an option',
  //         showCancelButton: true,
  //         confirmButtonText: 'Finish',
  //         cancelButtonText: 'Cancel',
  //         inputValidator: (value) => {
  //           if (!value) {
  //             return 'You need to select an option!';
  //           }
  //         },
  //         preConfirm: () => {
  //           Swal.close(); // Close the modal
  //         }
  //       });
  //     }
  //   };

  //   showModal(currentStep); // Start the modal with the current step
  // };

  // Your component's return statement and other logic remain unchanged
  // const handleSelectChange = (selectedOption) => {
  //   // Open the modal and pass the selected value
  //   openModal(selectedOption.value);
  // };
  const [image, setImage] = useState(null); // State to store the selected or dropped image
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      setImage(URL.createObjectURL(file)); // Update the image state with the dropped file
    }
  };
  const handleChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file)); // Update the image state with the selected file
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleSelectChange = (selectedOption) => {
    // your handleSelectChange function here
  };
  const fileInputRef = useRef(null);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className='boxContainer' style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
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
                  <Button style={{
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
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="whiteboard-container">
          <div className="image-input-container">
            <div className="image-input-text">Press here to add image</div>
            {/* <input className="title-input" type="text" placeholder="Input the car's details" /> */}
          </div>
          <Select
            className="select-box"
            options={Object.keys(data).map(key => ({ label: key, value: key }))}
            onChange={handleSelectChange}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
          />
          <div className="two-select-container">
            <div className="select-container">
              <input
                className="select-box"
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
            <div className="select-container">
              <Select
                className="select-box"
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <Select
            className="select-box"
            options={Object.keys(data).map(key => ({ label: key, value: key }))}
            onChange={handleSelectChange}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 })
            }}
          />
          <div className="two-select-container">
            <div className="select-container">
              <Select
                className="select-box"
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
            <div className="select-container">
              <Select
                className="select-box"
                options={Object.keys(data).map(key => ({ label: key, value: key }))}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <div>Press Enter to Submit the form or click here</div>
        </div>
      </Modal>
    </>
  );
};

export default AddNewEntities;
