import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, storage  } from '../../firebase';
import Modal from '../Modal';
import { getDownloadURL, uploadBytesResumable, onStateChanged, ref  } from 'firebase/storage';

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    });

    useEffect(() => {
        getPortfolio();
    }, []);

    const openModal = (port) => {
        console.log("port", port)
        setSelectedPortfolio(port);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPortfolio(null);
        console.log("closeModal", closeModal)
        setIsModalOpen(false);
    };
    

    const getPortfolio = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'portfolio'));
            const portfolioData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
            setPortfolio(portfolioData);
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
        }
    }

    const handleEditFormSubmit = async (editedData) => {
        try {
            console.log("selectedPortfolio", selectedPortfolio)
        if (!selectedPortfolio || !selectedPortfolio.id) {
            console.error('Error: selectedPortfolio or selectedPortfolio.id is undefined.');
            return;
        }
         const portfolioRef = doc(db, 'portfolio', selectedPortfolio.id);

            console.log("portfolioRef0", portfolioRef)
          // If a new file is selected, upload it to Firestore Storage
          if (selectedFile) {
            const storageRef = ref(storage, `portfolio/${selectedPortfolio.id}/${selectedFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      
            // Listen for state changes, and update the editedData with the new image URL
            uploadTask.on('state_changed',
              (snapshot) => {
                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 console.log(`Upload is ${progress}% done`);
              },
              (error) => {
                console.error('Error during upload:', error);
              },
              async () => {
                try {
                  // Once the upload is complete, get the download URL
                  const downloadURL = await getDownloadURL(storageRef);
      
                  // Update the editedData with the new image URL
                  editedData.image = downloadURL
                    console.log("downloadURL", downloadURL)
                  // Update the Firestore document with the editedData
                  await updateDoc(portfolioRef, editedData);
      
                  // Close modal and refresh portfolio
                  closeModal();
                  getPortfolio();
                } catch (error) {
                  console.error('Error getting download URL:', error);
                }
              }
            );
          } else {
            // If no new file is selected, update the Firestore document directly
            await updateDoc(portfolioRef, editedData);
      
            // Close modal and refresh portfolio
            closeModal();
            getPortfolio();
          }
        } catch (error) {
          console.error('Error updating portfolio item:', error);
        }
      };

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                {port.image && <img 
                                src={port.image}
                                className="portfolio-image"
                                alt="portfolio" />}
                                <div className="content">
                                    <p className="title">{port.name}</p>
                                    <h4 className="description">{port.description}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url)}
                                    >View</button>
                                     <button
                                        className="btn"
                                        onClick={() => openModal(port)}>Edit
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }


    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                <div>{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman" />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleEditFormSubmit}
                portfolio={selectedPortfolio}
                onFileSelect={setSelectedFile}
            />
        </>
    );
}

export default Portfolio;