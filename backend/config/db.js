const mongoose = require("mongoose");

let gfs; // GridFS instance

const connectDB = async (mongoURI) => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize GridFSBucket
    gfs = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: "uploads",
    });

  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Function to access GridFS anywhere in the app
const getGFS = () => {
  if (!gfs) {
    throw new Error("GridFS is not initialized. Ensure DB is connected.");
  }
  return gfs;
};

module.exports = {
  connectDB,
  getGFS,
};