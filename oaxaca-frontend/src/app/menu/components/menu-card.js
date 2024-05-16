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
      <img className="rounded-t-md w-full" src={image} alt={name} />
      <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
        <h1 className="font-semibold text-lg">{name}</h1>
        <p className="text-sm line-clamp-2" style={textStyle}>
          {spice}
        </p>
        <p className="text-sm line-clamp-2" style={textStyle}>
          {calories}
        </p>
        <p className="text-sm line-clamp-2" style={textStyle}>
          {allergens}
        </p>
        <p>{description}</p>
        <span className="mt-auto block">£ {price}</span>
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
