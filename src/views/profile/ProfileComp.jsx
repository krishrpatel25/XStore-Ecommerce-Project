import React, { useState, useEffect } from "react";
import { FiEdit2, FiCheck, FiX, FiCamera } from "react-icons/fi";

const DEFAULT_USER = {
  name: "krish",
  username: "patel",
  email: "krish@protocol.io",
  phone: "1234567890",
  id: "USER_0x2A9F",
  avatar: "/src/assets/profilepic1.png", // put this in /public
};

const ProfileComp = () => {
  const [isEditing, setIsEditing] = useState(false);

  /* ---------- LOAD FROM LOCAL STORAGE ---------- */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("profile_user");
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [editForm, setEditForm] = useState(user);

  /* ---------- KEEP EDIT FORM IN SYNC ---------- */
  useEffect(() => {
    setEditForm(user);
  }, [user]);

  /* ---------- IMAGE → BASE64 ---------- */
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditForm((prev) => ({
        ...prev,
        avatar: reader.result, // Base64
      }));
    };
    reader.readAsDataURL(file);
  };

  /* ---------- SAVE ---------- */
  const handleCommit = () => {
    setUser(editForm);
    localStorage.setItem("profile_user", JSON.stringify(editForm));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen text-foreground pt-24 pb-12 px-4 md:px-20 relative overflow-hidden font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16 border-b-2 border-foreground pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`w-2 h-2 ${
                isEditing
                  ? "bg-accent animate-pulse"
                  : "bg-primary animate-pulse"
              }`}
            />
            <p
              className={`text-[9px] font-mono font-black uppercase tracking-[0.3em] ${
                isEditing ? "text-accent" : "text-primary"
              }`}
            >
              {isEditing ? "System.Mode_Override" : "Access.Authorized"}
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-[1000] italic uppercase">
            {isEditing ? "Edit_Data" : "Welcome_Back"}
          </h1>
        </div>

        <div className="text-left md:text-right">
          <p className="text-[9px] font-mono opacity-40 uppercase tracking-widest">
            Protocol_ID
          </p>
          <p className="text-lg font-black italic text-primary">{user.id}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* --- AVATAR --- */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary" />

            <div className="w-30 h-30 md:w-40 md:h-40 bg-secondary border border-foreground/10 p-2 relative overflow-hidden ">
              <img
                src={isEditing ? editForm.avatar : user.avatar}
                alt="User"
                className="w-full h-full object-cover brightness-110 group-hover:grayscale-0 transition-all duration-500"
              />

              {isEditing && (
                <label className="absolute inset-0 bg-accent/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <FiCamera className="text-2xl text-background mb-2" />
                  <span className="text-[8px] font-mono font-black text-background uppercase tracking-widest">
                    Update_Asset
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* --- DATA GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            { label: "Firstname", key: "name", type: "text" },
            { label: "Lastname", key: "username", type: "text" },
            { label: "User_Email", key: "email", type: "email" },
            { label: "Mobile", key: "phone", type: "tel" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-[11px] font-mono font-bold text-accent/50 uppercase tracking-[0.2em] mb-2 block">
                {field.label}
              </label>

              {isEditing ? (
                <input
                  type={field.type}
                  value={editForm[field.key]}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [field.key]: e.target.value })
                  }
                  className="w-full bg-secondary border-b-2 border-foreground/20 p-3 text-sm font-mono outline-none uppercase"
                />
              ) : (
                <div className="border-b border-foreground/10 py-3">
                  <span className="text-lg font-black italic">
                    {user[field.key]}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- ACTIONS --- */}
        <div className="mt-16 flex justify-center">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleCommit}
                className="bg-accent text-background py-4 px-6 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <FiCheck /> Save_Changes
              </button>

              <button
                onClick={() => {
                  setEditForm(user);
                  setIsEditing(false);
                }}
                className="border-2 py-4 px-6 text-xs font-black uppercase"
              >
                <FiX /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-background py-5 px-10 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-4"
            >
              <FiEdit2 /> Edit_Information
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
