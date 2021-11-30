const Carousel = () => {
    return ( 
        <div id="carouselExampleControls" className="carousel slide my-2" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://firebasestorage.googleapis.com/v0/b/online-store-f4d80.appspot.com/o/74d32a7f-6a2d-49a3-b325-114de4b055c5.jpg.webp?alt=media&token=c1d52975-f445-4573-bb0a-51051a1a94a5" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://firebasestorage.googleapis.com/v0/b/online-store-f4d80.appspot.com/o/d4cde366-c949-455e-9b90-68cbd7a22022.jpg.webp?alt=media&token=5a674507-7475-402f-8dfd-7133d07e3293" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
     );
}
 
export default Carousel;