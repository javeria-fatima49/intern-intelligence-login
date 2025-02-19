"use client"

import { useRouter } from "next/navigation";
import { auth } from '@/lib/firebase';
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard 🎉</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
