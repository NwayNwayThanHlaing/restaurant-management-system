"use client";
import React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";
import UserCreateForm from "./user-create-form";

// component for user management page
export default function UserManagementPage() {
  // state variables for managing users and editing state
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState({});
  const titles = [
    "ID",
    "Firstname",
    "Lastname",
    "Email",
    "Username",
    "Role",
    "Actions",
  ];

  // fetch users from server on compoenent mount and when editingUser
  useEffect(() => {
    fetchUsers();
    editingUser && console.log("Editing user: ", editingUser);
  }, [editingUser]);

  // function to fetch users from server
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3333/admin/users`);
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        setUsers(data.users);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // function to handle saving editing user
  const handleSaveUser = async (editingUser) => {
    try {
      const response = await fetch(
        `http://localhost:3333/admin/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        }
      );
      if (response.ok) {
        setUsers(
          users.map((user) => {
            if (user.id === editingUser.id) {
              return editingUser;
            }
            return user;
          })
        );
        setEditingUser(null);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // function to handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/admin/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        setEditingUser(null);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // function to handle canceling editing
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <AdminLayout>
      <div className="h-screen overflow-hidden mt-16">
        <div className="w-4/5 overflow-y-auto h-screen pt-20 pb-36 absolute right-0">
          <div className="m-auto">
            <h1 className="text-lg font-bold text-center ">User Management</h1>
            <div className="w-fit mx-auto flex flex-col items-end ">
              <UserCreateForm setUsers={setUsers} />
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
                    {users.map((user) => (
                      <tr key={user.id} className="text-center">
                        {editingUser && editingUser.id === user.id ? (
                          <>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                size={2}
                                value={editingUser.id}
                                onChange={(e) =>
                                  setEditingUser({
                                    ...editingUser,
                                    id: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                size={10}
                                value={editingUser.firstname}
                                onChange={(e) =>
                                  setEditingUser({
                                    ...editingUser,
                                    firstname: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingUser.lastname}
                                size={8}
                                onChange={(e) =>
                                  setEditingUser({
                                    ...editingUser,
                                    lastname: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingUser.email}
                                size={15}
                                onChange={(e) =>
                                  setEditingUser({
                                    ...editingUser,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingUser.username}
                                size={8}
                                onChange={(e) =>
                                  setEditingUser({
                                    ...editingUser,
                                    username: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8]">
                              <input
                                className="px-3 py-3 bg-[#e4dbb8] w-full"
                                type="text"
                                value={editingUser.role}
                                size={8}
                                onChange={(e) =>
                                  setEditingUser({
                                    ...editingUser,
                                    role: e.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="shadow-md bg-[#e4dbb8] px-2">
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2"
                                onClick={() => handleSaveUser(editingUser)}
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
                            <td className="shadow-md px-4 py-3">{user.id}</td>
                            <td className="shadow-md px-4 py-3">
                              {user.firstname}
                            </td>
                            <td className="shadow-md px-4 py-3">
                              {user.lastname}
                            </td>
                            <td className="shadow-md px-4 py-3">
                              {user.email}
                            </td>
                            <td className="shadow-md px-4 py-3">
                              {user.username}
                            </td>
                            <td className="shadow-md px-4 py-3">{user.role}</td>
                            <td className="shadow-md px-4 py-3">
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2"
                                onClick={() => {
                                  setEditingUser(user);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-700 text-white rounded-lg py-1 px-2 ml-1"
                                onClick={() => handleDeleteUser(user.id)}
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
