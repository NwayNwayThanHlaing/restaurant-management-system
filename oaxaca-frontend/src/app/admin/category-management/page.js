"use client";
import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";
import CategoryCreateForm from "./create-form";

// this component is for managing categories in the staff interface
export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]); // holds list of categories
  const [editingCategory, setEditingCategory] = useState({}); // holds category being edited

  const titles = ["ID", "Category Name", "Actions"]; // table column titles

  // fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    editingCategory && console.log("Editing Category: ", editingCategory);
  }, [editingCategory]);

  // function to fetch categories from server
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setCategories(data.categories);
      } else {
        console.error("Failed to fetch menu categories");
      }
    } catch (error) {
      console.error("Error fetching menu categories:", error);
    }
  };

  // function to save edited category
  const handleSaveCategory = async (editingCategory) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingCategory),
        }
      );
      if (response.ok) {
        setCategories(
          categories.map((category) => {
            if (category.id === editingCategory.id) {
              return editingCategory;
            }
            return category;
          })
        );
        setEditingCategory(null); // clear editing state
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // function to delete a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/category/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
        );
        setEditingCategory(null); // clearing editing state
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // function to cancel editing a category
  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  // rendering the categroy management page
  return (
    <AdminLayout>
      <div className="h-screen overflow-hidden mt-16">
        <div className="w-4/5 overflow-y-auto h-screen pt-20 pb-36 absolute right-0">
          <div className="m-auto">
            <p className="text-lg font-bold text-center">Category Management</p>
            <div className="w-fit mx-auto flex flex-col items-end ">
              <CategoryCreateForm setCategories={setCategories} />
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
                    {categories.map((category, index) => (
                      <tr key={index} className="text-center">
                        {editingCategory &&
                        editingCategory.id === category.id ? (
                          <>
                            <td className="shadow-md bg-[#e4dbb8] w-20">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                size={4}
                                value={editingCategory.id}
                                onChange={(e) =>
                                  setEditingItem({
                                    ...editingCategory,
                                    id: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8] w-60">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingCategory.name}
                                size={30}
                                onChange={(e) =>
                                  setEditingCategory({
                                    ...editingCategory,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </td>

                            <td className="shadow-md bg-[#e4dbb8] px-2">
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2"
                                onClick={() =>
                                  handleSaveCategory(editingCategory)
                                }
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
                            <td className="shadow-md px-4 py-3 w-20">
                              {category.id}
                            </td>
                            <td className="shadow-md px-4 py-3 text-left w-60">
                              {category.name}
                            </td>
                            <td className="shadow-md px-4 py-3 w-40">
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2"
                                onClick={() => {
                                  setEditingCategory(category);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2 ml-1"
                                onClick={() =>
                                  handleDeleteCategory(category.id)
                                }
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
