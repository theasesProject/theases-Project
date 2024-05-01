import React, { useRef, useState } from 'react';
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
import { Modal } from 'react-responsive-modal';
import Select from 'react-select'
import "../assets/css/customUpload.css"
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
const AddNewEntities = () => {
  const [activeTab, setActiveTab] = useState('car');
  const [isOpen, setIsOpen] = useState(false);
  const [imageUri, setImageUri] = useState(null); // State to store the image URI
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const openModal = (selectedValue) => {
    Swal.fire({
      title: 'You selected',
      text: selectedValue,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

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
  const handleSelectChange = (selectedOption) => {
    // Open the modal and pass the selected value
    openModal(selectedOption.value);
  };


  const [image, setImage] = useState(null); // State to store the selected or dropped image

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

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
                {/* <div className='CardHeader'>
                  List Of Recently Added Cars And Newly Joined Companies
                </div> */}
              </CardHeader>
              {/* <div className='tabChangeContainer'> */}
              {/* <div className='header' onClick={() => (handleTabClick('car'), openModal(1))} active={activeTab === 'car'}>Add a Car</div>
                <div className="separator"></div>
                <div className='header' onClick={() => handleTabClick('company')} active={activeTab === 'company'}>Add a Company</div> */}
              {/* </div> */}
              {/* <div style={{
                  width: "50vh"
                }}>
                  <Select
                    options={Object.keys(data).map(key => ({ label: key, value: key }))}
                    onChange={handleSelectChange}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                  />

                </div>
                <div>
                  <form className="file-upload-form">
                    <label htmlFor="file" className="file-upload-label" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                      <div className="file-upload-design">
                        {image ? (
                          <img src={image} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                        ) : (
                          <svg viewBox="0 0 640 512" height="1em">
                            <path
                              d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                            ></path>
                          </svg>
                        )}
                        <p>Drag and Drop</p>
                        <p>or</p>
                        <span className="browse-button" onClick={handleClick}>Browse file</span>
                      </div>
                      <input id="file" type="file" ref={fileInputRef} onChange={handleChange} style={{ display: 'none' }} />
                    </label>
                  </form>

                </div> */}
              <CardBody style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",

                // backgroundColor:"red"
              }}>
                <Modal className="Modal" open={isOpen} onClose={onCloseModal} center>
                  <h2>Simple centered modal</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                  </p>
                </Modal>
                <div className='half' style={{
                  justifyContent: "flex-start",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div id='Title'>Recently Added Cars</div>
                  <Button onClick={onOpenModal} style={{
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

    </>
  );
};

export default AddNewEntities;
