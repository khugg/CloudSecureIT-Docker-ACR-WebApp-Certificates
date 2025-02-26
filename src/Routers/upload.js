// Authentication routes
const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const router = express.Router();

// configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




//verificated token


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = decoded;
      next();
    });
  };



// endpoint to upload file
router.post( '/upload', verifyToken, upload.single('file'), async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
              return res.status(400).json({ message: 'No file uploaded' });
            }


            //connect to azure storage
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
            const containerClient = blobServiceClient.getContainerClient('container');

            //generate a unique name for the file
            const blobName = `${Date.now()}-${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            //upload file to azure storage
            await blockBlobClient.uploadData(file.buffer, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype // content type of the file
                }
            
            })
                //save file url to database
                const fileUrl = blockBlobClient.url;
                const currentuser = await user.findById(req.user.id);
                currentuser.files.push({ name: file.originalname, url: fileUrl });
                await currentuser.save();
                res.json({ message: 'File uploaded successfully', fileUrl });
                
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });



  
  
  // endpoint to generate secure link
    router.get('/secure-link/:fileName', verifyToken, async (req, res) => {
        try {
        const blobName = req.params.fileName;
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient('container');
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const sasToken = await blockBlobClient.generateSasUrl({
            permissions: 'r',
            expiresOn: new Date(new Date().valueOf() + 86400 * 1000), // 24h
        });
        res.json({ url: `${blockBlobClient.url}?${sasToken}` });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    });
  module.exports = router;

