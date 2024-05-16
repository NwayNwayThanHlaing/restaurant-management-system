import React from "react";

// component for contact us page
function ContactUsPage() {
  // structure for contact us page
  return (
    <div className="w-full text-center">
      <div className="bg-[#e68656] p-10 border-double border-gray-600 border-8 rounded-3xl h-full m-auto mt-40 w-2/5">
        <h1 className="text-3xl font-semibold text-center pb-6">FAQs</h1>
        <h3 className="text-lg font-bold">
          Do you cater for people with allergies?
        </h3>
        <p className="mb-5">
          Yes, please let the staff know if you have any allergies and we can
          ensure you are catered for.
        </p>
        <h3 className="text-lg font-bold">
          Do you have vegetarian and vegan options?
        </h3>
        <p className="mb-5">
          Yes, we have multiple options all clearly marked on our menus.
        </p>
        <h3 className="text-lg font-bold">What are your opening times?</h3>
        <p className="mb-5">
          Our stores are open from 11:30-23:00, however holidays may affect
          this.
        </p>
      </div>
      <div className="text-xl m-10">
        FAQs not helped? We encourage you to get in contact with us via the
        following:
        <br />
        Telephone: 0712345678
        <br />
        Email: oaxacahelp@gmail.com
      </div>
    </div>
  );
}

export default ContactUsPage;
