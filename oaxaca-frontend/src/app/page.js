"use client";

import { useState } from "react";

// component for displaying an image slider with navigation for home page
const ImageSlider = () => {
  // state for tracking current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // array of image file names
  const images = ["lbeef.jpg", "lempanadas.jpg", "lmango.jpg", "lmich.jpg"];
  // array of text descriptions for each image
  const text = [
    "CRUNCHY BEEF TACOS",
    "EMPANADAS",
    "MANGONADA SORBET",
    "MICHELADA",
  ];

  // function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  // function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  // render the image slider
  return (
    <div className="w-4/5 m-auto mt-40 mb-32">
      <p className="bg-red-800 rounded-t-xl py-2 text-[#eadaa2] text-xl font-bold flex justify-center">
        WELCOME TO OAXACA
      </p>
      <div className="w-full">
        <img
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          style={{
            height: "450px",
            width: "100%",
          }}
        />
        <p className="flex justify-around py-2 font-semibold bg-blue-950 text-[#eadaa2]">
          ~ {text[currentSlide]} ~
        </p>
      </div>

      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
            style={{
              opacity: index === currentSlide ? 1 : 0.6,
              width: "25%",
              height: "100px",
              display: "inline-block",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
