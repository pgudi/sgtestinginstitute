import React, { useState } from 'react';
import NavBarComponent from '../components/NavBarComponent';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeServices from '../services/EmployeeServices';

const ImportEmployee = () => {
    const [fileName, setFileName] = useState('');
    const [errorList, setErrorList] = useState([]);   // <-- row-wise validation errors
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();

    const navigateHome = () => navigate("/home");

    const handleImportEmployee = async (e) => {
        e.preventDefault();

        setErrorList([]);

        if (!fileName) {
            setErrorList([{ rowNumber: "-", errors: ["Please select a file to upload"] }]);
            return;
        }

        // NEW CSV EMPTY VALIDATION
        try {
            await validateCsvHasRecords(fileName);
        } catch (msg) {
            setErrorList([{ rowNumber: "-", errors: [msg] }]);
            return;
        }
        setUploading(true);

        const formData = new FormData();
        formData.append("file", fileName);

        try {
            const response = await EmployeeServices.importEmployeeFile(formData);

            // SUCCESS → no validation errors
            navigate("/employee");

        } catch (err) {
            console.error(err);
            if (Array.isArray(err.response?.data)) {
                setErrorList(err.response.data);
            } else if (err.response?.data?.message) {
                setErrorList([{ rowNumber: "-", errors: [err.response.data.message] }]);
            } else {
                setErrorList([{ rowNumber: "-", errors: ["Something went wrong. Try again."] }]);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDownloadFile = (e) => {
        e.preventDefault();
        EmployeeServices.downloadEmployeeFile()
            .then((response) => {
                const blob = new Blob([response.data], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = "employees.csv";
                link.click();

                window.URL.revokeObjectURL(url);
            })
            .catch(console.log);
    };

    const validateCsvHasRecords = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const text = e.target.result;

                const rows = text
                    .split(/\r?\n/)           // split lines
                    .map(r => r.trim())
                    .filter(r => r !== "");  // remove empty lines

                if (rows.length <= 1) {
                    reject("File is blank or does not contain any records");
                } else {
                    resolve(true);
                }
            };

            reader.readAsText(file);
        });
    };

    return (
        <div>
            <NavBarComponent />

            <div className="container p-5">
                <div className="row justify-content-evenly">
                    <div className="col-md-6 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="text-center p-2">Import Employee</h4>

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Please Browse The File Name</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setFileName(e.target.files[0])}
                                        />
                                    </div>

                                    <p className="mt-3 mb-3">
                                        If you do not have file, please download it.{" "}
                                        <Link onClick={handleDownloadFile}>Download here</Link>
                                    </p>

                                    <div className="mt-3 text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                            onClick={handleImportEmployee}
                                            disabled={uploading}
                                        >
                                            {uploading ? "Uploading..." : "Import"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={navigateHome}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                {/* ------------------------------------------------------------
                                      CONSOLIDATED VALIDATION ERROR TABLE (ROW-WISE)
                                   ------------------------------------------------------------ */}
                                {errorList.length > 0 && (
                                    <div className="mt-4">
                                        <h5 className="text-danger">Validation Errors</h5>

                                        <table className="table table-bordered mt-2">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "150px" }}>Row Number</th>
                                                    <th>Errors</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {errorList.map((err, index) => (
                                                    <tr key={index}>
                                                        <td>{err.rowNumber}</td>
                                                        <td>
                                                            <ul className="mb-0">
                                                                {err.errors.map((e, i) => (
                                                                    <li key={i} className="text-danger">{e}</li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportEmployee;