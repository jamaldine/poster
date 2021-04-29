import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltUp, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./DropZone.scss";

const Dropzone = ({ onImageDrop }) => {
  const [files, setFiles] = useState([]);
  const [run, setRun] = useState(-1);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 5,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      /*setFiles((oldElement) => [
        ...oldElement,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);*/
      
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
        );
        
        
      onImageDrop(acceptedFiles);
    },
  });

  useEffect(()=>{
    files.map((file, i) => {
      console.log("files??", file)
      })
      console.log("files??", files)
  },[files])

  const deleteMedia = (file) => {
    setRun(file);
      var thumb = document.querySelector(`.thumb-${file}`);
      thumb.classList.add("d-none");
      console.log("thumb", thumb);
      console.log("i", file);
      console.log("acceptedFiles", acceptedFiles);
      const newFiles = [...files]; // make a var for the new array
      console.log("newFiles", files);
      console.log("splice", file);
      acceptedFiles.splice(file, 1);
      console.log("acceptedFiles", acceptedFiles);
      console.log("acceptedFiles", acceptedFiles);
      onImageDrop(acceptedFiles);
      setFiles(acceptedFiles);
      /**
       * setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
       */
      };
    useEffect(() => {
      console.log('run', run)
    }, [run]);

  const thumbs = files.map((file, i) => {
    console.log("ggggg ><>>>>>><<<<<>><<<<><><<<<>", files);
    var str = file.name;
    var endStr;
    if (str.length > 12) {
      endStr = str.slice(-4);
      str = str?.substring(0, 10);
      str = str + ".." + endStr;
    }
    return (
      <div className={`thumb thumb-${i}`} key={file.name}>
        <div className="thumbInner">
          <img src={file.preview} className="img-thumbInner" />
          <div className="info-thumbInner">
            <div className="data-name">{str}</div>
            <div className="data-size">
              {Math.floor(file.size / 1000)} Kbytes
            </div>
          </div>
          <div className="font-dropzone">
            <FontAwesomeIcon
              icon={faTimes}
              className="times"
              onClick={() => deleteMedia(i)}
            />
          </div>
        </div>
      </div>
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    console.log("toooooooooooooot");
  }, [acceptedFiles, files, onImageDrop]);

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  console.log("acceptedFiles", acceptedFiles);
  console.log("files>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", files);
  return (
    <div className="section-DropZone">
      {console.log('<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')}
      <div
        className=""
        className={
          acceptedFiles.length > 0
            ? "dropZone-list dropZone-list-acceptedFiles"
            : "dropZone-list"
        }
      >
        <div className="dropIrem">
          {acceptedFiles.length > 0 && (
            <div className="drop-title">Upload Designs</div>
          )}
          <div
            {...getRootProps({
              className:
                acceptedFiles.length > 0
                  ? "dropzone dropzone-acceptedFiles"
                  : "dropzone",
            })}
          >
            <div
              className={
                acceptedFiles.length > 0
                  ? "uploaddropzone uploaddropzone-acceptedFiles"
                  : "uploaddropzone"
              }
            >
              <input className="input-dropzone" {...getInputProps()} />
              <button
                className={
                  acceptedFiles.length > 0
                    ? "dragFile dragFile-acceptedFiles"
                    : "dragFile"
                }
                type="button"
                onClick={open}
              >
                <FontAwesomeIcon icon={faLongArrowAltUp} />
              </button>
              <p
                className={
                  acceptedFiles.length > 0
                    ? "dragFile-info dragFile-info-acceptedFiles"
                    : "dragFile-info"
                }
              >
                Drag file to upload
              </p>
              <p
                className={
                  acceptedFiles.length > 0
                    ? "dragFile-info-plus dragFile-info-plus-acceptedFiles"
                    : "dragFile-info-plus"
                }
              >
                Avaible formats PNG, JPEG, JPG, SVG ...
              </p>
            </div>
          </div>
        </div>

        {acceptedFiles.length > 0 ? (
          <div className="dropZone-items">
            <div className="thumbsContainer">{thumbs}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dropzone;
{
  /*

<div style={thumbsContainer}>{thumbs}</div> */
}
