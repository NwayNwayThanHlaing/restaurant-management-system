"use client";
import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";
import MenuCreateForm from "./menu-create-form";

// component for menu management page
export default function MenuManagementPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  const titles = ["ID", "Name", "Price", "Category", "Description", "Actions"];

  // effect hook to fetch menu items and log editing item
  useEffect(() => {
    fetchMenuItems();
    editingItem && console.log("Editing item: ", editingItem);
  }, [editingItem]);

  // function to fetch menu items from the server
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
      if (response.ok) {
        const data = await response.json();

        setItems(data.menus);
      } else {
        console.error("Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  // function to handle saving an item
  const handleSaveItem = async (editingItem) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/menu/${editingItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingItem),
        }
      );
      if (response.ok) {
        setItems(
          items.map((item) => {
            if (item.id === editingItem.id) {
              return editingItem;
            }
            return item;
          })
        );
        setEditingItem(null);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // function to handle deleting an item
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/menu/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setItems(items.filter((item) => item.id !== itemId));
        setEditingItem(null);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // function to handle canceling editing item
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <AdminLayout>
      <div className="h-screen overflow-hidden mt-16">
        <div className="w-4/5 overflow-y-auto h-screen pt-20 pb-36 absolute right-0">
          <div className="m-auto">
            <h1 className="text-lg font-bold text-center ">Menu Management</h1>
            <div className="w-fit mx-auto flex flex-col items-end">
              <MenuCreateForm setItems={setItems} />

              <div className="flex justify-center">
                <table>
                  <thead>
                    <tr className="bg-[#d5c481]">
                      {titles.map((title, index) => (
                        <th key={index} className="py-3 px-3 shadow-md">
                          {title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="text-center">
                        {editingItem && editingItem.id === item.id ? (
                          <>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                size={2}
                                value={editingItem.id}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    id: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8] w-14">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingItem.name}
                                size={8}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingItem.price}
                                size={5}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    price: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingItem.categoryId}
                                size={2}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    category_id: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8] w-16">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingItem.description}
                                size={8}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingItem,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8] px-2">
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2"
                                onClick={() => handleSaveItem(editingItem)}
                              >
                                Save
                              </button>
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2 ml-1"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="shadow-md px-4 py-3">{item.id}</td>
                            <td className="shadow-md px-4 py-3 w-40 text-left">
                              {item.name}
                            </td>
                            <td className="shadow-md px-4 py-3">
                              {item.price}
                            </td>
                            <td className="shadow-md px-4 py-3">
                              {item.category?.name}
                            </td>
                            <td className="shadow-md px-4 py-3 w-72 text-left">
                              {item.description}
                            </td>
                            <td className="shadow-md px-4 py-3 w-40">
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2"
                                onClick={() => {
                                  setEditingItem(item);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2 ml-1"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
