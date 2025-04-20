"use client";

import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/navigation";

// CSS class for background image overlay
const beforeCSS =
  " before:bg-[url('/background.png')] before:content-[''] before:bg-cover before:absolute before:inset-0 before:opacity-20";

// component for user log in
function LoginPage() {
  // AuthContext for user authentication
  const { user, setUser } = useContext(AuthContext);
  // state variables for username, password and toast
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  // function to handle login submission
  const handleLogin = (event) => {
    event.preventDefault();

    // sending login request to the server
    fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        // handling response from the server
        if (!response.ok) {
          toast({
            title: "Invalid credentials",
            description: "Please check your username and password",
            type: "error",
          });
          throw new Error("Invalid credentials");
        } else {
          toast({
            title: "Login successful",
            description: "You have successfully logged in",
            type: "success",
          });
        }
        return response.json();
      })
      .then((data) => {
        // setting user data and navigating to activer orders page
        console.log(data);
        setUser(data.user);
        router.push("/admin/active-orders");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // login form UI
  return (
    <div className={clsx("relative h-screen w-full bg-[#eadaa2]", beforeCSS)}>
      <div className="w-1/3 m-auto">
        <form className="pt-44" onSubmit={handleLogin}>
          <div className="mt-16 bg-blue-950 opacity-100 text-white rounded-3xl max-h-fit z-10 relative">
            <p className="text-2xl font-bold p-10">STAFF LOG IN</p>
            <div className="flex justify-between px-10 py-1">
              <label className="font-semibold px-0 py-2">Username:</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="w-3/4 px-3 py-1 rounded-lg text-black"
                type="text"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="flex justify-between px-10 py-1">
              <label className="font-semibold px-0 py-2">Password:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-3/4 px-3 py-1 rounded-lg text-black"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-between pb-10 pt-5">
              <button
                className="w-5/6 m-auto p-3 rounded-lg bg-red-800 text-white"
                type="submit"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
