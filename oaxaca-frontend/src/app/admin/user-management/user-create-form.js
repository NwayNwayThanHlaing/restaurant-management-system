"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";

// compoenent for creating a new user
export default function UserCreateForm({ setUsers }) {
  // state variables and hook initialisation
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
    const response = await fetch(
      "${process.env.NEXT_PUBLIC_API_URL}/admin/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const { user } = await response.json();
      setUsers((users) => [...users, user]);
      reset();

      toast({
        title: "User created",
        description: "The user was created successfully",
        type: "success",
      });
      setOpen(false);
    }
  };

  // structure for user creation form
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-red-700 text-white hover:bg-red-900 py-1 px-3 rounded-lg my-5">
          + New
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="username" className="font-semibold">
              Username:
            </label>
            <input
              {...register("username", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="username"
            />
            {errors.username && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="email"
            />
            {errors.email && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="firstname" className="font-semibold">
              First Name:
            </label>
            <input
              {...register("firstname", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="firstname"
            />
            {errors.firstname && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="lastname" className="font-semibold">
              Last Name:
            </label>
            <input
              {...register("lastname", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="lastname"
            />
            {errors.lastname && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              {...register("password", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="password"
            />
            {errors.password && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-semibold">
              Role:
            </label>
            <select
              {...register("role", { required: true })}
              className="border border-gray-400 rounded-md w-full pl-2 h-7"
              id="role"
            >
              <option value="ADMIN">Admin</option>
              <option value="KITCHEN_STAFF">Kitchen Staff</option>
              <option value="WAITER">Waiter</option>
            </select>
            {errors.role && (
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
