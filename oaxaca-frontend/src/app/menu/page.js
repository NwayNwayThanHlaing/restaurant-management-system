"use client";
import React, { useContext, useEffect, useState } from "react";
import MenuCard from "./components/menu-card";
import { clsx } from "clsx";
import "./components/style.css";
import { CartContext } from "../context/cart";

// compoenent for displaying menu items and categories
function MenuPage() {
  // state variables for selecting category, filtered menus, categories and menus
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [filteredMenus, setFilteredMenus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  // cart context for adding items to cart
  const { addToCart } = useContext(CartContext);

  // fetch categories and menus data on compoenent mount
  useEffect(() => {
    fetch("http://localhost:3333/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));

    fetch("http://localhost:3333/menu")
      .then((response) => response.json())
      .then((data) => setMenus(data.menus));
  }, []);

  // update filteredMenus when menus state changes
  useEffect(() => {
    setFilteredMenus(menus);
  }, [menus]);

  return (
    <div className="px-20 bg-[#eadaa2] h-full mt-20 mb-20">
      <div className="flex gap-5 font-semibold p-7">
        <span
          onClick={() => {
            setSelectedCategoryId(0);
            setFilteredMenus(menus);
          }}
          className={`text-lg cursor-pointer px-3 py-1 rounded-sm ${
            selectedCategoryId === 0 ? "bg-red-800 text-white" : ""
          }`}
        >
          All
        </span>
        {categories.map((category) => (
          <span
            onClick={() => {
              setSelectedCategoryId(category.id);
              setFilteredMenus(
                menus.filter((menu) => menu.categoryId === category.id)
              );
            }}
            className={`text-lg cursor-pointer px-3 py-1 rounded-sm ${
              selectedCategoryId === category.id ? "bg-red-800 text-white" : ""
            }`}
            key={category.id}
          >
            {category.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-5 mt-15 mb-15 gap-3">
        {filteredMenus?.map((menu) => (
          <MenuCard
            key={menu.name}
            id={menu.id}
            name={menu.name}
            spice={menu.spice}
            calories={menu.calories}
            allergens={menu.allergens}
            image={menu.image}
            price={menu.price}
            description={menu.description}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
export default MenuPage;
