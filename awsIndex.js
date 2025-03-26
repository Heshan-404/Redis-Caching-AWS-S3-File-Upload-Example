const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");
const express = require("express");
const config = require("./aws-config.json");

const app = express();

// Initialize the S3 client
const s3Client = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadParams = {
      Bucket: "helixz-test-blog-uploads", // Your bucket name
      Key: file.originalname, // File name
      Body: file.buffer, // File data
      ContentType: file.mimetype, // File type
    };

    // Use @aws-sdk/lib-storage for managed upload
    const upload = new Upload({
      client: s3Client,
      params: uploadParams,
    });

    const result = await upload.done();

    res.json({
      message: "File uploaded successfully",
      url: `https://${uploadParams.Bucket}.s3.${config.AWS_REGION}.amazonaws.com/${uploadParams.Key}`,
    });
  } catch (err) {
    console.error("Error uploading file:", err.message);
    res
      .status(500)
      .json({ message: "Error uploading file", error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
