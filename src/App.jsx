import { useState } from "react";
import imageCompression from "browser-image-compression";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [originalSize, setOriginalSize] = useState("");
  const [compressedSize, setCompressedSize] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setOriginalSize((file.size / 1024).toFixed(2));
  };

  const compressImage = async () => {
    if (!image) return;

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(image, options);

      setCompressed(compressedFile);
      setCompressedSize((compressedFile.size / 1024).toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImage = () => {
    const url = URL.createObjectURL(compressed);

    const link = document.createElement("a");
    link.href = url;
    link.download = "compressed-image.jpg";
    link.click();
  };

  return (
    <div className="container">
      <h1>Image Compressor Tool</h1>

      <input type="file" accept="image/*" onChange={handleImage} />

      <button onClick={compressImage}>
        Compress Image
      </button>

      {originalSize && (
        <p>Original Size: {originalSize} KB</p>
      )}

      {compressedSize && (
        <p>Compressed Size: {compressedSize} KB</p>
      )}

      {compressed && (
        <button onClick={downloadImage}>
          Download Image
        </button>
      )}

      <div className="footer">
        <h3>Tanwi Dey</h3>
        <p>abc@gmail.com</p>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          <button>
            Built for Digital Heroes
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;