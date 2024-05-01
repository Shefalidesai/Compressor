import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import { green, purple } from '@mui/material/colors';
import HuffmanAlgorithm from './HuffmanAlgorithm/HuffmanAlgo';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const ColorButton1 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[300]),
  backgroundColor: green[300],
  '&:hover': {
    backgroundColor: green[500],
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  display: 'flex',
  justifyContent:'center',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
const [file, setfile] = useState({ selectedFile: null });
const [isMessage, setIsMessage] = useState(false);
const [msg, setMsg] = useState("");
const [uploadedFileName, setUploadedFileName] = useState("");


function onUploadFile(e) {
  const uploadedFile = e.target.files[0];
    setfile({ selectedFile: e.target.files[0] }); 
    if(setfile!=null){
      alert("File Uploaded Sucessfully")
    }else{
      alert("Error");
    }
}

function saveFile() {

    var uploadedFile = file.selectedFile;
    if (uploadedFile === undefined || uploadedFile === null) {
        alert("No file uploaded.\nPlease upload a valid .txt file and try again!");
        return false
    }
    let nameSplit = uploadedFile.name.split('.');
    var extension = nameSplit[nameSplit.length - 1].toLowerCase();
    if (extension !== "txt") {
        alert(`Invalid file type (.${extension}).\nPlease upload a valid .txt file and try again`);
        return false;
    }
    return true;
}
let codecObj = new HuffmanAlgorithm;

const encodeBtn = () => {
    if (saveFile()) {
        //Checking if file is uploaded
        var uploadedFile = file.selectedFile;
        if (uploadedFile === undefined) {
            alert("No file uploaded.\nPlease upload a valid .txt file and try again!");
            return;
        }

        //Giving warning on smaller sizes
        if (uploadedFile.size === 0) {
            alert("WARNING: You have uploaded an empty file!\nThe compressed file might be larger in size than the uncompressed file (compression ratio might be smaller than one).\nBetter compression ratios are achieved for larger file sizes!");
        }
        else if (uploadedFile.size < 1000) {
            alert("WARNING: The uploaded file is small in size (" + uploadedFile.size + " bytes) !\nThe compressed file's size might be larger than expected (compression ratio might be small).\nBetter compression ratios are achieved for larger file sizes!");
        }

        //Reading the files and sending it for encoding and then, to download
        let reader = new FileReader();
        reader.onload = function () {
            let text = reader.result;
            let [encodedString, outputMsg] = codecObj.encode(text);
            setIsMessage(true);
            setMsg(outputMsg);
            myDownloadFile(uploadedFile.name.split('.')[0] + "_compressed.txt", encodedString);
            // onDownloadChanges(outputMsg);
        };
        reader.readAsText(uploadedFile, "UTF-8");
    }
    
}
const decodeBtn = () => {
  if (saveFile()) {
      var uploadedFile = file.selectedFile;

      //If file is not uploaded
      if (uploadedFile === undefined) {
          alert("No file uploaded.\nPlease upload a valid .txt file and try again!");
          return;
      }

      //Rading the file and sending it for decode and then, to download
      let reader = new FileReader();
      reader.onload = function () {
          let text = reader.result;
          let [decodedString, outputMsg] = codecObj.decode(text);
          setIsMessage(true);
          setMsg(outputMsg);
          myDownloadFile(uploadedFile.name.split('.')[0] + "_decompressed.txt", decodedString);
      };
      reader.readAsText(uploadedFile, "UTF-8");
  }
}
function myDownloadFile(fileName, text) {
    let a = document.createElement('a');
    a.href = "data:application/octet-stream," + encodeURIComponent(text);
    a.download = fileName;
    a.click();
}

function refreshPage(){ 
    window.location.reload(); 
}

const onChangeHandler = (e) => {
    onUploadFile(e);
}
  return (
    <>
    <h2 className='hi'>Compress Decompress File</h2>
      <div className='container'>
        <Button
          component="label"
          spacing={3}
          role={undefined}
          variant="contained"  
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={onChangeHandler} accept=".txt" />
        </Button>
      
      </div>
   
      <div className='container-main'>
        <Stack spacing={3} direction="row">
          <ColorButton variant="contained" onClick={encodeBtn}>Download Compressed File</ColorButton>
          <ColorButton1 variant="contained" onClick={decodeBtn}>Download DeCompressed File</ColorButton1>
        </Stack>
      </div>
    </>
  );
}
