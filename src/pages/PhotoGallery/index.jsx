import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Upload } from "lucide-react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import baseUrl from "../../config";
import { toast } from "react-toastify";

const PhotoGallery = () => {
    const [images, setImages] = useState([]); // All images
    const [displayedImages, setDisplayedImages] = useState([]); // Images to display
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [googleDriveLink, setGoogleDriveLink] = useState("");
    const profile = useSelector((state) => state.profile);

    const [currentPage, setCurrentPage] = useState(1); // Track current page for "Load More"
    const imagesPerPage = 10; // Number of images to display per page

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

    // Fetch Google Drive Folder Links and their Images
    const fetchImagesFromDrive = async () => {
        setIsLoading(true);
        try {
            // Fetch the list of Google Drive folder links
            const folderResponse = await axios.get(`${baseUrl}/images/getGoogleDriveFolders`);
            const folderLinks = folderResponse.data.folders; // Assuming API returns an array of folder links

            const imagePromises = folderLinks.map(async (folderLink) => {
                // Call backend to get all images from the folder
                const response = await axios.post(`${baseUrl}/images/getImagesFromFolder`, {
                    folderLink,
                });
                return response.data.images; // Assuming API returns an array of image URLs
            });

            // Resolve all folder image promises and flatten the array
            const allImages = (await Promise.all(imagePromises)).flat();

            setImages(allImages);
            setDisplayedImages(allImages.slice(0, imagesPerPage)); // Set initial 10 images to display
        } catch (err) {
            console.error("Error fetching images from Google Drive folders:", err);
            setError("Failed to load images. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Save the new Google Drive link in the backend
            await axios.post(`${baseUrl}/uploadGoogleDrive`, {
                link: googleDriveLink,
                userId: profile._id,
                department: profile.department,
                requestedUserName: `${profile.firstName} ${profile.lastName}`,
            });
            console.log("Upload successful");
            toast.success("Request has been sent to the admin");
            setLoading(false);
            setGoogleDriveLink("");
            closeUploadModal();
            fetchImagesFromDrive(); // Refresh the gallery after upload
        } catch (error) {
            console.error("Error uploading link:", error);
            setLoading(false);
        }
    };

    const loadMoreImages = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * imagesPerPage - imagesPerPage;
        const end = nextPage * imagesPerPage;
        setDisplayedImages((prevImages) => [
            ...prevImages,
            ...images.slice(start, end),
        ]);
        setCurrentPage(nextPage);
    };

    useEffect(() => {
        fetchImagesFromDrive(); // Fetch images on component mount
    }, []);

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="photoGallery" style={{ width: "100%", padding: "2% 5%" }}>
            <div
                style={{
                    textAlign: "left",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#a98de3",
                }}
            >
                <h2 style={{ margin: "0", color: 'white' }}>Photo Gallery</h2>
                <p style={{ marginTop: "10px", fontSize: "15px", color: "black" }}>
                    Relive memorable moments and explore highlights through our community’s captured moments.
                </p>
            </div>
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
                    <button className="btn btn-primary" onClick={openUploadModal} style={{ backgroundColor: '#301C5B' }}>
                        <Upload size={20} className="me-2" />
                        Upload Photo
                    </button>
                </div>
            </div>

            {/* Display "No images" if there are no images */}
            {displayedImages.length === 0 ? (
                <div className="text-center text-muted mt-5">No images</div>
            ) : (
                <div className="row g-4">
                    {displayedImages.map((image, index) => {
                        console.log('image2', image)
                        const directImageUrl = image.id
                            ? `https://drive.google.com/thumbnail?id=${image.id}`
                            : null;

                        return (
                            <div
                                key={image.id}
                                className={`col-6 col-md-4 ${index % 5 === 0 ? "col-lg-6" : "col-lg-3"}`}
                                onClick={() => openImageModal({ ...image, url: directImageUrl })}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={directImageUrl}
                                    alt={image.alt}
                                    className="img-fluid rounded w-100 h-100 object-fit-cover"
                                    style={{ aspectRatio: index % 5 === 0 ? '2 / 1' : '1 / 1' }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Load More Button */}
            {images.length > displayedImages.length && (
                <div className="text-center mt-4">
                    <Button onClick={loadMoreImages}>Load More</Button>
                </div>
            )}

            <Modal show={showImageModal} onHide={closeImageModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedImage?.alt}</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="d-flex justify-content-center align-items-center"
                    style={{ padding: "20px", maxHeight: "80vh", overflow: "auto" }}
                >
                    {selectedImage && (
                        <img
                            src={
                                selectedImage.id
                                    ? `https://drive.google.com/thumbnail?id=${selectedImage.id}`
                                    : null
                            }
                            alt={selectedImage.alt}
                            className="img-fluid rounded"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                borderRadius: "10px",
                            }}
                        />
                    )}
                </Modal.Body>
            </Modal>

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
                            <Button
                                variant="secondary"
                                onClick={closeUploadModal}
                                className="me-2"
                            >
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {loading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PhotoGallery;
