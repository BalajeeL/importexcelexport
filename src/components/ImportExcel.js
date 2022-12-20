import React, { useState } from 'react'
import * as XLSX from 'xlsx';

const ImportExcel = (props) => {
    const [fileName, setFileName] = useState(null);
    const [SheetNames, setSheetNames] = useState([]);
    const [sheetdata, setSheetdata] = useState({})

    const fileType = ["xlsx", "xls"];

    const checkFileType = (name) => {
        return fileType.includes(name.split(".").pop().toLowerCase());
    }

    const excelContent = (data) =>{
        const workbook = XLSX.read(data);
        setSheetNames(workbook.SheetNames);

        var mySheetData = {};

        for( var i = 0; i< workbook.SheetNames.length; i++) {
            let sheetName = workbook.SheetNames[i];

            const workSheet =workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(workSheet,{
                header:1,
            });
            mySheetData[sheetName] = jsonData;
            console.log(sheetName);
        }

        setSheetdata(mySheetData);

        return (mySheetData)
    }

    

    const handleFile = async (e) => {

        const myFile = e.target.files[0];

        if(!myFile) return;

        if(!checkFileType(myFile.name)) {
            alert("Invalid File Type !");
            return;
        }
        
        const data = await myFile.arrayBuffer();
        
        const mySheetDataAll = excelContent(data)

        setFileName(myFile.name)

        props.onFileUpload(mySheetDataAll)

    }
  return (
    <div>
            <div>
                {fileName && <label>File Name : {fileName}</label>}
                {!fileName && <label>Upload a File</label>}
            </div>
            <input 
            type="file"
            accept="xlsx, xls"
            multiple={false}
            onChange = {(e) => handleFile(e)} />
    </div>
  )
}

export default ImportExcel;
