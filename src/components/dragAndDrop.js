import { useEffect, useRef, useState } from "react";
import { FaImage, FaArrowCircleUp } from "react-icons/fa";

const DragAndDrop = () => {
  const dropzoneRef = useRef(null);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    let dragCounter = 0;

    const dragHandle = (e) => {
      e.preventDefault();
      e.stopPropagation();

      switch (e.type) {
        default:
          break;
        case "dragenter":
          if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true);
            dragCounter++;
          }
          break;
        case "dragleave":
          dragCounter--;
          if (dragCounter === 0) {
            setDrag(false);
          }
          break;
        case "drop":
          setDrag(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log(e.dataTransfer.files);
            e.dataTransfer.clearData();
            dragCounter = 0;
          }
          break;
      }
    };

    const dropzone = dropzoneRef.current;
    dropzone.addEventListener("dragenter", dragHandle);
    dropzone.addEventListener("dragleave", dragHandle);
    dropzone.addEventListener("dragover", dragHandle);
    dropzone.addEventListener("drop", dragHandle);
  }, []);

  return (
    <>
      <div className="upload-container" ref={dropzoneRef}>
        <div>
          {drag ? (
            <>
              <div className="upload-wrapper dragover">
                <div className="icon">
                  <FaArrowCircleUp size="64" />
                </div>
                <p>Drop your file to upload</p>
              </div>
            </>
          ) : (
            <>
              <div className="upload-wrapper">
                <div className="icon">
                  <FaImage size="64" />
                </div>
                <p>Drag &amp; drop a file to upload</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;
