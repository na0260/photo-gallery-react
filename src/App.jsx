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
        <div className="flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <div className="mb-8">
                    <img src={imageUrl+'/'+images[0]} alt="Main" className="w-full"/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={imageUrl+'/'+images[index]}
                            alt={`Thumbnail ${index}`}
                            className="w-full cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default App
