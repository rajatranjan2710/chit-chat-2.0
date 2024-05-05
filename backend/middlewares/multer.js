import multer from "multer";

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // export const uploadAvatar = upload.single("avatar");

// export const uploadAvatar = (req, res, next) => {
//   console.log("running");

//   // Check if avatar field exists in the request
//   if (req.file) {
//     // If avatar field exists, apply multer middleware
//     upload.single("avatar")(req, res, next);
//   } else {
//     // If avatar field does not exist, proceed to the next middleware
//     next();
//   }
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads"); // Save uploaded files to the "uploads" directory
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     ); // Rename uploaded files with a unique name
//   },
// });

// const upload = multer({ storage });

const storage = multer.memoryStorage();

// Multer file filter
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
console.log("filtered user : ", fileFilter);

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});

export const uploadAvatar = upload.single("avatar");
