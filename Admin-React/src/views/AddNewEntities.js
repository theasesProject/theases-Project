import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import "../assets/css/addNewEntities.css"
import Select from 'react-select'
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
  const [currentStep, setCurrentStep] = useState(1); // Initialize the current step
  const [imageUri, setImageUri] = useState(null); // State to store the image URI

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

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className='boxContainer'>
              <div className='tabChangeContainer'>
                {/* <div className='header' onClick={() => (handleTabClick('car'), openModal(1))} active={activeTab === 'car'}>Add a Car</div>
                <div className="separator"></div>
                <div className='header' onClick={() => handleTabClick('company')} active={activeTab === 'company'}>Add a Company</div> */}
              </div>
              <CardBody className='centerBody'>

                <div style={{
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
                  <label className="custum-file-upload" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} for="file">
                    <div className="icon">
                      {image ? (
                        <img src={image} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                          {/* SVG content */}
                        </svg>
                      )}
                    </div>
                    <div className="text">
                      <span>Click to upload image</span>
                    </div>
                    <input type="file" id="file" onChange={handleChange} />
                  </label>

                </div>
                {activeTab === 'car' && (
                  <div>
                    <p>Recently Added Cars :</p>
                    {/* Content for Car tab */}
                  </div>
                )}
                {activeTab === 'company' && (
                  <div>
                    <p>Companies Who Recently Joined Us :</p>
                    {/* Content for Company tab */}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddNewEntities;
