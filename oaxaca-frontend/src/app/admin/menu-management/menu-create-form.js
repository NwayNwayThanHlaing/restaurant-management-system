"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";  // import dialog components
import { useToast } from "@/components/ui/use-toast"; // import custom toast hook
import { useEffect, useState } from "react";  // import React hooks
import { useForm } from "react-hook-form";  // import form validation hook

// component for creating new menu item
export default function MenuCreateForm({ setItems }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();  // initialise form hook

  const { toast } = useToast(); // initialise toast hook
  const [open, setOpen] = useState(false);  // state for controlling dialog visibility
  const [categories, setCategories] = useState([]); // state for storing menu categories

  // effect hook to fetch menu categories from server
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3333/categories");
      if (response.ok) {
        const { categories } = await response.json();
        setCategories(categories);
      }
    };
    fetchCategories();
  }, []);

  // function to handle form submission
  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:3333/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { menu } = await response.json();
      setItems((items) => [...items, menu]);
      reset();  // resetting form fields

      toast({
        title: "Menu created",
        description: "The menu was created successfully",
        type: "success",
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-red-700 text-white hover:bg-red-900 py-1 px-3 rounded-lg my-5">
          + New
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="name" className="font-semibold">
              Name:
            </label>
            <input
              {...register("name", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="name"
            />
            {errors.name && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="price" className="font-semibold">
              Price:
            </label>
            <input
              {...register("price", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="price"
              type="number"
            />
            {errors.price && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="category" className="font-semibold">
              Category:
            </label>
            <select
              {...register("category", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="category"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="allergens" className="font-semibold">
              Allergens:
            </label>
            <input
              {...register("allergens", { required: false })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="allergens"
            />
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="calories" className="font-semibold">
              Calories:
            </label>
            <input
              type="number"
              {...register("calories", { required: false })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="calories"
            />
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="description" className="font-semibold">
              Description:
            </label>
            <textarea
              {...register("description", { required: false })}
              className="border border-gray-400 rounded-md w-full pl-2 h-20"
              id="description"
            />
          </div>

          <DialogFooter>
            <button
              className="bg-red-800 text-white p-2 rounded-lg mt-5"
              type="submit"
            >
              Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
