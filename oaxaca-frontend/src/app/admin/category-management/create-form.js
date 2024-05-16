"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // importing components for dialog
import { useToast } from "@/components/ui/use-toast"; // importing useToast hook
import { useState } from "react"; // importing useState hook
import { useForm } from "react-hook-form"; // importing useForm hook

// this component is for creating new category
export default function CategoryCreateForm({ setCategories }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // function to handle form submission
  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:3333/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { category } = await response.json();
      setCategories((categories) => [...categories, category]);
      reset(); // resets form fields

      // showing successful toast
      toast({
        title: "Category created",
        description: "The category was created successfully",
        type: "success",
      });
      setOpen(false);
    }
  };

  // rendering category creation form
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-red-700 text-white hover:bg-red-900 py-1 px-3 rounded-lg my-5">
          + New
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
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
