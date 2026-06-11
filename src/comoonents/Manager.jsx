import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwords, setPasswords] = useState([]);
  const [editId, setEditId] = useState(null);

  const editPassword = (item) => {
    setForm({
      site: item.site,
      username: item.username,
      password: item.password,
    });

    setEditId(item._id);

    toast.info("Editing Password");
  };

  const getPasswords = async () => {
    let req = await fetch("https://passop-backend-la9l.onrender.com/");
    let data = await req.json();
    setPasswords(data);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const savePassword = async () => {
    if (!form.site.trim() && !form.username.trim() && !form.password.trim())
      return;

    if (editId) {
      // update existing password
      await fetch(`https://passop-backend-la9l.onrender.com/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      toast.success("Password Updated");

      setEditId(null);
    } else {
      // add new password
      await fetch("https://passop-backend-la9l.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      toast.success("Password Saved");
    }

    setForm({
      site: "",
      username: "",
      password: "",
    });

    getPasswords();
  };
  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);

    toast.success("Copied to Clipboard", {
      position: "top-right",
      autoClose: 2000,
      transition: Bounce,
    });
  };

  const deleteform = async (id) => {
    await fetch(`https://passop-backend-la9l.onrender.com/${id}`, {
      method: "DELETE",
    });

    toast.success("Password Deleted", {
      position: "top-right",
      autoClose: 2000,
      transition: Bounce,
    });

    getPasswords();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />

      <div className="relative min-h-screen w-full bg-green-50">
        <div className="absolute left-1/2 top-0 h-[90px] w-[250px] -translate-x-1/2 rounded-full bg-[rgba(25,189,58,0.5)] opacity-60 blur-[60px]"></div>

        <div className="max-w-5xl container font-bold text-black mx-auto">
          <div className="logo mt-6 text-2xl text-center">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
          </div>

          <h3 className="text-zinc-600 text-center">
            Your Own Password manager
          </h3>
        </div>

        <div className="container flex flex-col mx-auto bg-green-50 max-w-5xl pt-6 px-4">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            type="text"
            placeholder="Enter Website"
            className="rounded-full w-full border-2 border-green-600 px-4 py-2 outline-none"
          />

          <div className="flex gap-4 mt-4">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              className="rounded-full border-2 border-green-600 w-full px-4 py-2 outline-none"
            />

            <div className="relative w-full">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="rounded-full border-2 border-green-600 w-full px-4 py-2 pr-12 outline-none"
              />

              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            className="flex items-center gap-2 bg-green-500 rounded-full border px-4 py-2 hover:bg-green-300 mt-6 w-fit mx-auto"
            onClick={savePassword}
          >
            <i className="fa-solid fa-circle-plus"></i>
            Add Password
          </button>
        </div>

        <div className="passwords mt-10 text-center">
          <h2 className="font-bold text-2xl">Your Passwords</h2>

          {passwords.length === 0 && <div>No Passwords To Show</div>}

          {passwords.length !== 0 && (
            <table className="table-auto mx-auto w-5xl rounded overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="p-2">Site</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Password</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-green-100">
                {passwords.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="group py-2 text-center w-64 border border-white">
                        {item.site}

                        <span
                          className="pl-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => copyText(item.site)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </span>
                      </td>

                      <td className="group py-2 text-center w-64 border border-white">
                        {item.username}

                        <span
                          className="pl-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => copyText(item.username)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </span>
                      </td>

                      <td className="group py-2 text-center w-64 border border-white">
                        {item.password}

                        <span
                          className="pl-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => copyText(item.password)}
                        >
                          <i className="fa-solid fa-copy"></i>
                        </span>
                      </td>

                      <td className="border border-white py-2">
                        <div className="flex justify-center gap-3">
                          <button
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                            onClick={() => deleteform(item._id)}
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => editPassword(item)}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
