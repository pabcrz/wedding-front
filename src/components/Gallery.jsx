import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function Gallery() {
  const images = [
    {
      original: "/src/images/1.png",
    },
    {
      original: "/src/images/2.png",
    },
    {
      original: "/src/images/3.png",
    },
    {
      original: "/src/images/4.png",
    },
    {
      original: "/src/images/5.png",
    },
    {
      original: "/src/images/6.png",
    },
    {
      original: "/src/images/7.png",
    },
    {
      original: "/src/images/8.png",
    },
  ];

  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      showFullscreenButton={false}
      showNav={false}
      showBullets={true}
      autoPlay={false}
      slideInterval={3500}
      renderItem={(item) => (
        <div className="w-full h-full">
          <img
            src={item.original}
            alt=""
            className="shadow-lg min-h-[50dvh] object-cover"
          />
        </div>
      )}
    />
  );
}
