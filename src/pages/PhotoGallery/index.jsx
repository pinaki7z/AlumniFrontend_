import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

// Import demo images from src/images folder
import image1 from '../../images/bhuUni (2).jpg';
import image2 from '../../images/bhuUni.jpg';
import image3 from '../../images/gallery.svg';
import image4 from '../../images/bhuUni.jpg';
import image5 from '../../images/bhuUni.jpg';

const PhotoGallery = () => {
  // Demo images array
  const demoImages = [
    { id: 1, url: image1, alt: 'Image 1' },
    { id: 2, url: image2, alt: 'Image 2' },
    { id: 3, url: image3, alt: 'Image 3' },
    { id: 4, url: image4, alt: 'Image 4' },
    { id: 5, url: image5, alt: 'Image 5' }
  ];

  const [images, setImages] = useState(demoImages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [googleDriveLink, setGoogleDriveLink] = useState('');

  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    // Handle the upload logic here (e.g., validate the link, upload image, etc.)
    console.log('Google Drive Link:', googleDriveLink);
    setGoogleDriveLink('');
    closeUploadModal();
  };

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Photo Gallery</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by tags"
              aria-label="Search by tags"
            />
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-primary" onClick={openUploadModal}>
            <Upload size={20} className="me-2" />
            Upload Photo
          </button>
        </div>
      </div>
      <div className="row g-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`col-6 col-md-4 ${index % 5 === 0 ? 'col-lg-6' : 'col-lg-3'}`}
            onClick={() => openImageModal(image)} // Open modal on image click
            style={{ cursor: 'pointer' }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="img-fluid rounded w-100 h-100 object-fit-cover"
              style={{ aspectRatio: index % 5 === 0 ? '2 / 1' : '1 / 1' }}
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={closeImageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.alt}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="img-fluid rounded"
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Upload Photo Modal */}
      <Modal show={showUploadModal} onHide={closeUploadModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUploadSubmit}>
            <Form.Group className="mb-3" controlId="googleDriveLink">
              <Form.Label>Enter Google Drive Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Google Drive Link"
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={closeUploadModal} className="me-2">
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
