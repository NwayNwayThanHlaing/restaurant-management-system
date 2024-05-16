import React from "react";

// this component is for the About Us page on the restaurant website
function AboutUsPage() {
  return (
    // sets the bg colour to a light yellow
    <div className="bg-[#eadaa2] h-full">
      <div className="">
        {/* displays the kitchen staff image as a background */}
        <img
          className="opacity-50 relative top-0 left-0 z-1  h-screen w-full"
          src="kitchen_staff.jpeg"
          style={{ width: "100%", objectFit: "cover" }}
        />

        {/* contains the about us information */}
        <div className="absolute top-32 left-15 z-2">
          {/* title text */}
          <h4 className="text-2xl font-semibold text-center">About Us</h4>
          {/* information about the restaurant */}
          <p className="w-3/4 bg-red-800 text-white m-auto p-14 mt-20 rounded-xl text-lg tracking-wider">
            We are a restaurant group that have been slowly growing our London
            and UK presence over the last 10 years. We currently have 25
            restaurants located across the whole of London. When Oaxaca was
            created in 2007 our competitve advantage was our menu, which
            includes a unique style of Mexican Street food.
          </p>
          {/* information about the head chef */}
          <p className="w-3/4 mt-20 bg-red-800 text-white m-auto p-14 rounded-xl text-lg tracking-wider">
            Our head chef has worked tirelessly to achieve her dream of sharing
            a taste of Mexico with the rest of the world. With multiple awards
            presented to the restaurant, we're proud to say her dream has come
            true. We hope to see you at one of our locations soon!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
