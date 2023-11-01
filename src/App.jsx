import './App.css'

function App() {
    const imageUrl = '/src/assets/images'
    const images = [
        'image-1.webp',
        'image-2.webp',
        'image-3.webp',
        'image-4.webp',
        'image-5.webp',
        'image-6.webp',
        'image-7.webp',
        'image-8.webp',
        'image-9.webp',
        'image-10.jpeg',
        'image-11.jpeg',
    ];
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
                    <div className="col-span-2 row-span-2 border-2 rounded-2xl overflow-hidden relative">
                        <img src={`${imageUrl}/${images[0]}`} alt="image-1" />
                        <label htmlFor="imageCheckbox" className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                            <input type="checkbox" id="imageCheckbox" className="hidden" />
                            <span className="text-white text-2xl absolute top-5 left-5">✓</span>
                        </label>
                    </div>
                    {images.map((image, index) => {
                        if (index > 0 && index < 15) {
                            return (
                                <div className="border-2 rounded-2xl overflow-hidden relative" key={index}>
                                    <img src={`${imageUrl}/${image}`} alt={`image-${index}`} />
                                    <label htmlFor="imageCheckbox" className="absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                        <input type="checkbox" id="imageCheckbox" className="hidden" />
                                        <span className="text-white text-2xl absolute top-5 left-5">✓</span>
                                    </label>
                                </div>
                            )
                        }
                    })}
                    <div className="border-dotted border-2 rounded-2xl overflow-hidden">
                        <img src="/src/assets/images/add-image.png" alt="add" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
