import {useState} from "react";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import addImg from '../public/add-image.png'

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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(selectedImages);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSelectedImages(items);
    };

    return (
        <>
            <div className="container mx-auto border-2 rounded-2xl">
                {selectedImageCount > 0 ? (<div className="grid grid-cols-2 p-5 border-b-2">
                        <div>
                            <label className="ps-2"> {selectedImageCount} Image Selected</label>
                        </div>
                        <div>
                            <button className="text-decoration-none float-right text-red-500 hover:text-red-700"
                                    onClick={deleteSelectedImages}>Delete Images
                            </button>
                        </div>
                    </div>)
                    :
                    (<div className="p-5 border-b-2">
                        <h1 className="text-2xl">Image Gallery</h1>
                    </div>)}


                <div className="p-5">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="gallery">
                            {(provided) => (
                                <div {...provided.droppableProps}
                                     ref={provided.innerRef}
                                     className="grid grid-cols-5 grid-flow-row gap-5">
                                    {selectedImages.map((image, index) => (
                                        <Draggable key={index} draggableId={index.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`${index === 0 ? 'col-span-2 row-span-2' : ''} border-2 rounded-2xl overflow-hidden relative ${selectedImageIndexes.includes(index) ? 'border-red-500' : ''}`}
                                                    key={index}>
                                                    <img src={image} alt={`image-${index}`}/>
                                                    <label htmlFor={`imageCheckbox${index}`}
                                                           className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                                        <input type="checkbox" id={`imageCheckbox${index}`}
                                                               className="hidden"
                                                               onChange={() => toggleSelection(index)}/>
                                                        <span className="m-auto text-white">
                                            <svg fill="#000000" height="80px" width="80px" version="1.1" id="Capa_1"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                                                 xml:space="preserve"><g id="SVGRepo_bgCarrier"></g><g
                                                id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <path
                                                d="M474.045,173.813c-4.201,1.371-6.494,5.888-5.123,10.088c7.571,23.199,11.411,47.457,11.411,72.1 c0,62.014-24.149,120.315-68,164.166s-102.153,68-164.167,68s-120.316-24.149-164.167-68S16,318.014,16,256 S40.149,135.684,84,91.833s102.153-68,164.167-68c32.889,0,64.668,6.734,94.455,20.017c28.781,12.834,54.287,31.108,75.81,54.315 c3.004,3.239,8.066,3.431,11.306,0.425c3.24-3.004,3.43-8.065,0.426-11.306c-23-24.799-50.26-44.328-81.024-58.047 C317.287,15.035,283.316,7.833,248.167,7.833c-66.288,0-128.608,25.813-175.48,72.687C25.814,127.392,0,189.712,0,256 c0,66.287,25.814,128.607,72.687,175.479c46.872,46.873,109.192,72.687,175.48,72.687s128.608-25.813,175.48-72.687 c46.873-46.872,72.687-109.192,72.687-175.479c0-26.332-4.105-52.26-12.201-77.064 C482.762,174.736,478.245,172.445,474.045,173.813z"></path> <path
                                                d="M504.969,83.262c-4.532-4.538-10.563-7.037-16.98-7.037s-12.448,2.499-16.978,7.034l-7.161,7.161 c-3.124,3.124-3.124,8.189,0,11.313c3.124,3.123,8.19,3.124,11.314-0.001l7.164-7.164c1.51-1.512,3.52-2.344,5.66-2.344 s4.15,0.832,5.664,2.348c1.514,1.514,2.348,3.524,2.348,5.663s-0.834,4.149-2.348,5.663L217.802,381.75 c-1.51,1.512-3.52,2.344-5.66,2.344s-4.15-0.832-5.664-2.348L98.747,274.015c-1.514-1.514-2.348-3.524-2.348-5.663 c0-2.138,0.834-4.149,2.351-5.667c1.51-1.512,3.52-2.344,5.66-2.344s4.15,0.832,5.664,2.348l96.411,96.411 c1.5,1.5,3.535,2.343,5.657,2.343s4.157-0.843,5.657-2.343l234.849-234.849c3.125-3.125,3.125-8.189,0-11.314 c-3.124-3.123-8.189-3.123-11.313,0L212.142,342.129l-90.75-90.751c-4.533-4.538-10.563-7.037-16.98-7.037 s-12.448,2.499-16.978,7.034c-4.536,4.536-7.034,10.565-7.034,16.977c0,6.412,2.498,12.441,7.034,16.978l107.728,107.728 c4.532,4.538,10.563,7.037,16.98,7.037c6.417,0,12.448-2.499,16.977-7.033l275.847-275.848c4.536-4.536,7.034-10.565,7.034-16.978 S509.502,87.794,504.969,83.262z"></path> </g> </g></svg>
                                        </span>
                                                    </label>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <div className="border-dotted border-2 rounded-2xl overflow-hidden">
                                        <label htmlFor="upload" className="cursor-pointer">
                                            <img src={addImg} alt="add"/>
                                            <input type="file" id="upload" className="hidden " multiple
                                                   accept="image/png , image/jpeg, image/webp" onChange={selectFile}/>
                                        </label>
                                    </div>
                                </div>
                            )}</Droppable>
                    </DragDropContext>

                </div>
            </div>
        </>
    )
}

export default App
