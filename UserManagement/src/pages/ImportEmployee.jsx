import React, { useState } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeServices from '../services/EmployeeServices'

const ImportEmployee = () => {
    const [fileName, setFileName] = useState('')
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate()
    function navigateHome() {
        navigate("/home")
    }

    const handleImportEmployee = async(e) => {
        e.preventDefault()
        if (!fileName) {
            setError("Please select a file to upload.");
            return;
        }

        setError("");
        setUploading(true);

        const formData = new FormData();
        formData.append("file", fileName);

        try {
            const response = await EmployeeServices.importEmployeeFile(formData);
            console.log("Upload success:", response.data);
            navigate("/employee");
        } catch (err) {
            console.error(err);

            if (err.response && err.response.data) {
                setError(err.response.data.message || "Upload failed");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setUploading(false);
        }
    }

    const handleDownloadFile = (e) => {
        e.preventDefault()
        EmployeeServices.downloadEmployeeFile().then((response) => {
            const blob = new Blob([response.data], { type: 'text/csv' });

            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = "employees.csv"; // file name
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(downloadUrl);
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <NavBarComponent />

            <div className='container p-5'>
                <div className="row justify-content-evenly">
                    <div className="col-md-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h4 className='text-center p-2'>Import Employee</h4>
                                <form>
                                    <div className='form-group'>
                                        <label className='form-label'>Please Browse The File Name</label>
                                        <div>
                                            <input
                                                type='file'
                                                placeholder='Enter File Path'
                                                onChange={(e) => setFileName(e.target.files[0])}
                                            ></input>
                                            {error && <p className="text-danger mt-2">{error}</p>}
                                        </div>
                                    </div>
                                    <p className='mt-3 mb-3'>If you do not have File, Please DownLoad It. <Link onClick={handleDownloadFile}>Down Here</Link></p>
                                    <div className='mt-3 text-center'>
                                        <button type='submit' className='btn btn-success' onClick={handleImportEmployee} >Import</button>
                                        <button type='button' className='btn btn-danger ms-2' onClick={navigateHome} >Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportEmployee