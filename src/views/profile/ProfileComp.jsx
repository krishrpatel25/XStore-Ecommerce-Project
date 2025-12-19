import React, { useState } from "react";
import {
  FiEdit2,
  FiCheck,
  FiX,
  FiShield,
  FiCpu,
  FiCamera,
} from "react-icons/fi";

const ProfileComp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "krish",
    username: "patel",
    email: "krish@protocol.io",
    phone: "1234567890",
    id: "USER_0x2A9F",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Meet",
  });

  const [editForm, setEditForm] = useState({ ...user });

  const handleCommit = () => {
    setUser({ ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-4 md:px-20 relative overflow-hidden font-sans">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* --- RESPONSIVE HEADER --- */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 md:mb-16 border-b-2 border-foreground pb-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`w-2 h-2 ${
                isEditing ? "bg-accent animate-pulse" : "bg-primary animate-pulse"
              }`}
            />
            <p
              className={`text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.3em] md:tracking-[0.4em] ${
                isEditing ? "text-accent" : "text-primary"
              }`}
            >
              {isEditing ? "System.Mode_Override" : "Access.Authorized"}
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-[1000] italic uppercase tracking-tighter leading-none">
            {isEditing ? "Edit_Data" : "Welcome_Back"}
          </h1>
        </div>

        <div className="text-left md:text-right border-l-2 md:border-l-0 md:pl-0 pl-4 border-primary/20 md:border-transparent">
          <p className="text-[9px] md:text-[10px] font-mono opacity-40 uppercase tracking-widest text-foreground">
            Protocol_ID
          </p>
          <p className="text-lg md:text-xl font-black italic text-primary leading-none mt-1">
            {user.id}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* --- AVATAR UPLINK SECTION --- */}
        <div className="flex flex-col items-center mb-10 relative">
          <div className="relative group">
            {/* HUD Corner Brackets */}
            <div
              className={`absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 ${
                isEditing ? "border-accent" : "border-primary"
              }`}
            />
            <div
              className={`absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 ${
                isEditing ? "border-accent" : "border-primary"
              }`}
            />

            <div className="w-30 h-30 md:w-40 md:h-40 bg-secondary border border-foreground/10 p-2 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
              <img
                src={user.avatar}
                alt="User"
                className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none" />

              {isEditing && (
                <label className="absolute inset-0 bg-accent/60 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <FiCamera className="text-2xl text-background mb-2" />
                  <span className="text-[8px] font-mono font-black text-background uppercase tracking-widest text-center px-4">
                    Update_Asset
                  </span>
                  <input type="file" className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* --- DATA ENTRY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-12">
          {[
            { label: "Firstname", key: "name", type: "text" },
            { label: "Lastname", key: "username", type: "text" },
            { label: "User_Email", key: "email", type: "email" },
            { label: "Mobile", key: "phone", type: "tel" },
          ].map((field) => (
            <div key={field.key} className="relative group">
              <label className="text-[11px] md:text-[12px] font-mono font-bold text-accent/50 uppercase tracking-[0.2em] mb-2 block group-hover:text-primary transition-colors">
                {field.label}
              </label>

              {isEditing ? (
                <div className="relative">
                  <input
                    type={field.type}
                    value={editForm[field.key]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [field.key]: e.target.value })
                    }
                    className="w-full bg-secondary border-b-2 border-foreground/20 p-3 text-sm font-mono focus:border-accent focus:bg-accent/5 outline-none transition-all uppercase text-foreground"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-focus-within:w-full transition-all duration-500" />
                </div>
              ) : (
                <div className="flex items-center justify-between border-b border-foreground/10 py-3 group-hover:border-primary/30 transition-colors">
                  <span className="text-base md:text-lg font-black italic tracking-tight text-foreground">
                    {user[field.key] || "NULL_DATA"}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- ACTION TERMINAL --- */}
        <div className="mt-16 md:mt-24 flex justify-center pb-10">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button
                onClick={handleCommit}
                className="flex-1 bg-accent text-background py-4 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"
              >
                <FiCheck size={16} /> Save_Changes
              </button>
              <button
                onClick={() => {
                  setEditForm({ ...user });
                  setIsEditing(false);
                }}
                className="px-6 border-2 border-foreground/20 text-foreground py-4 text-xs font-black uppercase hover:bg-red-600 hover:border-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <FiX size={16} /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full max-w-xs bg-primary text-background py-5 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 group transition-all hover:bg-primary/80 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
            >
              <FiEdit2 size={16} />
              Edit_Information
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                ❯❯
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComp;
