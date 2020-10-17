import React, { useState } from "react";

export const MultiBrowsePic = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleImageChange = (event) => {

        if (event.target.files) {
            const arrFiles = Array.from(event.target.files).map((file) =>
                URL.createObjectURL(file)
            );



            setSelectedFiles((prevImages) => prevImages.concat(arrFiles));
            Array.from(event.target.files).map(
                (file) => URL.revokeObjectURL(file)
            );
        }
    };

    const renderPhotos = (arrPics) => {
        console.log("source: ", arrPics);
        return arrPics.map((picture) => {
            return <img src={picture} alt="" key={picture} />;
        });
    };

    return (
        <div className="app">
            <div>
                <input type="file" id="file" multiple onChange={handleImageChange} />
                <div className="label-holder">
                    <label htmlFor="file" className="label">
                    </label>
                </div>
                <div className="result">{renderPhotos(selectedFiles)}</div>
            </div>
        </div>
    );
};

