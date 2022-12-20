import React, { useState } from 'react';
import ImportExcel from './ImportExcel';

const ReadFiles = () => {
    const [sheetData, setSheetData] = useState(null);
    const [sheet, setSheet] = useState(null);
    const [sheetChange,setSheetChange] = useState([])
    const [sheetNames, setSheetNames] = useState(null)

    const handleFileUpload = (e) => {
        console.log("file Uploades", e);

        if (e) {
            let sheetNames = Object.keys(e);
            setSheetNames(sheetNames);
            setSheet(sheetNames[0])
        }
        else {
            setSheetNames(null);
        }
        setSheetData(e);
        console.log(sheetData)
    };

    const handleSheetChange = (e) => {
       
        setSheet(e.target.value);
    }

    

    return (
        <>
            <div>
                <ImportExcel onFileUpload={(e) => handleFileUpload(e)} />
            </div>
            <div>{sheetData && (<>
                <div className='row'>
                    <div className='col'>
                        {sheetNames.map(s =>
                            <div>
                                <input 
                                type="radio" 
                                name="sheetName" 
                                checked={s === sheet} 
                                onChange={(e) => handleSheetChange(e)}
                                value={s} />
                                <label>{s}</label>
                            </div>)}
                    </div>

                </div>

                <div className='row'>
                    <label>{sheet}</label>
                    <div className='col'>
                        <table class="table">
                            <thead>
                                <tr>
                                    {sheetData[sheet][0].map(h => <th>{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {sheetData[sheet].slice(1).map(row => <tr >
                                    {row.map(c => <td>{c}</td>)}</tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            )

            }
            </div>
        </>

    )
}

export default ReadFiles;
