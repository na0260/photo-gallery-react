import './App.css'
import {useState} from "react";

function App() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageIndexes, setSelectedImageIndexes] = useState([]);
    const [selectedImageCount, setSelectedImageCount] = useState(0);
    const selectFile = (e) => {
        const selectedFiles = e.target.files;
        const selectedFilesArr = Array.from(selectedFiles);
        const imgArr = selectedFilesArr.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((prevImages) => prevImages.concat(imgArr));
        e.target.value = "";
    }
    const increaseCount = () => {
        setSelectedImageCount(selectedImageCount + 1)
    }
    const decreaseCount = () => {
        setSelectedImageCount(selectedImageCount - 1)
    }

    function toggleSelection(index) {
        const isSelected = selectedImageIndexes.includes(index);
        setSelectedImageIndexes(prevIndexes => {
            if (isSelected) {
                decreaseCount();
                return prevIndexes.filter(i => i !== index);
            } else {
                increaseCount();
                return [...prevIndexes, index];
            }
        });
    }


    const deleteSelectedImages = () => {
        const updatedImages = selectedImages.filter((_, index) => !selectedImageIndexes.includes(index));
        setSelectedImages(updatedImages);
        setSelectedImageIndexes([]);
        setSelectedImageCount(0);
    };


    return (
        <>
            <div className="container mx-auto border-2 rounded-2xl">
                {selectedImageCount > 0 ? (<div className="grid grid-cols-2 p-5 border-b-2">
                        <div>
                            <input type="checkbox"/>
                            <label className="ps-2">{selectedImageCount} Image Selected</label>
                        </div>
                        <div>
                            <button className="text-decoration-none float-right text-red-500"
                                    onClick={deleteSelectedImages}>Delete Images
                            </button>
                        </div>
                    </div>)
                    :
                    (<div className="p-5 border-b-2">
                        <h1 className="text-2xl">Image Gallery</h1>
                    </div>)}


                <div className="p-5">
                    <div className="grid grid-cols-5 gap-5">
                        {selectedImages.map((image, index) => {
                            if (index === 0) {
                                return (
                                    <div key={index}
                                         className={`col-span-2 row-span-2 border-2 rounded-2xl overflow-hidden relative ${selectedImageIndexes.includes(index) ? 'border-red-500' : ''}`}>
                                        <img src={image} alt={`image-${index}`}/>
                                        <label htmlFor={`imageCheckbox${index}`}
                                               className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                            <input type="checkbox" id={`imageCheckbox${index}`}
                                                   className="absolute top-5 left-5"
                                                   onChange={() => toggleSelection(index)}/>
                                        </label>
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        className={`border-2 rounded-2xl overflow-hidden relative ${selectedImageIndexes.includes(index) ? 'border-red-500' : ''}`}
                                        key={index}>
                                        <img src={image} alt={`image-${index}`}/>
                                        <label htmlFor={`imageCheckbox${index}`}
                                               className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                            <input type="checkbox" id={`imageCheckbox${index}`}
                                                   className="absolute top-5 left-5"
                                                   onChange={() => toggleSelection(index)}/>
                                        </label>
                                    </div>
                                )
                            }
                        })}
                        <div className="border-dotted border-2 rounded-2xl overflow-hidden">
                            <label htmlFor="upload" className="cursor-pointer">
                                <img src="/src/assets/images/add-image.png" alt="add"/>
                                <input type="file" id="upload" className="hidden " multiple
                                       accept="image/png , image/jpeg, image/webp" onChange={selectFile}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
