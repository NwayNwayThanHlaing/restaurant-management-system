import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

// inline style for italic text
const textStyle = {
  fontStyle: "italic",
};

// compoenent for displaying details of a menu item
function MenuCard({
  id,
  name,
  price,
  spice,
  calories,
  allergens,
  image,
  description,
  addToCart,
}) {
  // access user context
  const { user } = useContext(AuthContext);

  return (
    <div className="rounded-lg flex flex-col m-3 shadow-lg">
      <img className="rounded-t-md w-full max-h-72" src={image} alt={name} />
      <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
        <h1 className="font-semibold text-sm">{name}</h1>
        <p className="text-xs" style={textStyle}>
          {spice}
        </p>
        <p className="text-xs" style={textStyle}>
          {calories}
        </p>
        <p className="text-xs" style={textStyle}>
          {allergens}
        </p>
        <p className="text-xs">{description}</p>
        <span className="mt-auto block text-sm font-semibold">£ {price}</span>
        {!user ? (
          <button
            onClick={() =>
              addToCart({
                id,
                name,
                spice,
                calories,
                allergens,
                description,
                price,
                image,
              })
            }
            className="bg-red-800 rounded-md py-2 text-white mt-auto"
          >
            Order Now
          </button>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
