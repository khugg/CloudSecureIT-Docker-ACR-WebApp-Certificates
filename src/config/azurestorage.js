const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();
const { StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");





const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        new StorageSharedKeyCredential(
          process.env.AZURE_STORAGE_ACCOUNT_NAME,
          process.env.AZURE_STORAGE_ACCOUNT_KEY
      )
  );




const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

function generateSecureLink(blobName) {
try {
  const sasToken = generateBlobSASQueryParameters(
      {
        containerName: process.env.AZURE_CONTAINER_NAME, // Nom du container
        blobName: blobName, // Nom du fichier Blob
        permissions: BlobSASPermissions.parse("r"), // Permissions (ici en lecture seule)
        expiresOn: new Date(Date.now() + 3600 * 1000), // Expiration dans 1 heure
      },
      new StorageSharedKeyCredential(
        process.env.AZURE_STORAGE_ACCOUNT_NAME,
        process.env.AZURE_STORAGE_ACCOUNT_KEY
      )
  ).toString();
  
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const secureLink = `${blockBlobClient.url}?${sasToken}`;
  return secureLink;
} catch (error) {
    console.error("Error generating SAS token:", error);
    throw new Error("Failed to generate secure link");
}
}   
module.exports = { containerClient, generateSecureLink };
