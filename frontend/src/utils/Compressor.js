import Compressor from "compressorjs";

// Compress avatar using compressorjs
export const compressAvatar = (avatar) => {
  return new Promise((resolve, reject) => {
    new Compressor(avatar, {
      quality: 0.6, // Adjust quality as needed (0.6 means 60% compression)
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error);
      },
    });
  });
};
