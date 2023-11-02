import './App.css'
import {useState} from "react";

function App() {
    const [selectedImages, setSelectedImages] = useState([]);
    const selectFile = (e)=>{
        const selectedFiles = e.target.files;
        const selectedFilesArr = Array.from(selectedFiles);
        const imgArr = selectedFilesArr.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((prevImages) => prevImages.concat(imgArr));
        e.target.value = "";
    }

  return (
    <>
        <div className="container mx-auto border-2 rounded-2xl">
            <div className="grid grid-cols-2 p-5 border-b-2">
                <div>
                    <input  type="checkbox"/>
                    <label className="ps-2">Image Selected</label>
                </div>
                <div>
                    <a className="text-decoration-none float-right text-red-500" href="#">Delete Images</a>
                </div>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-5 gap-5">
                    {selectedImages.map((image, index) => {
                        if (index === 0) {
                            return (
                                <div key={index} className="col-span-2 row-span-2 border-2 rounded-2xl overflow-hidden relative">
                                    <img src={image} alt={`image-${index}`}/>
                                    <label htmlFor="imageCheckbox"
                                           className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                        <input type="checkbox" id="imageCheckbox" className="hidden"/>
                                        <span className="text-white text-2xl absolute top-5 left-5">✓</span>
                                    </label>
                                </div>
                            )
                        } else {
                            return (
                                <div className="border-2 rounded-2xl overflow-hidden relative" key={index}>
                                    <img src={image} alt={`image-${index}`} />
                                    <label htmlFor="imageCheckbox" className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                        <input type="checkbox" id="imageCheckbox" className="hidden" />
                                        <span className="text-white text-2xl absolute top-5 left-5">✓</span>
                                    </label>
                                </div>
                            )
                        }
                    })}
                    <div className="border-dotted border-2 rounded-2xl overflow-hidden">
                        <label htmlFor="upload" className="cursor-pointer">
                            <img src="/src/assets/images/add-image.png" alt="add" />
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
