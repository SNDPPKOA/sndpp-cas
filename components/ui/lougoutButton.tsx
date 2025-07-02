"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import MessageModalSuccess from "../modal-2";


export function Logout() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setModalMessage("You have been logged out successfully.");
    setShowModal(true);
  };

  return (
    <div className="p-4">
      {showModal && (
        <MessageModalSuccess
          message={modalMessage}
          onClose={() => {
            setShowModal(false);
            router.push("/"); // adjust if needed
          }}
        />
      )}

      <Button
        onClick={handleLogout}
        className="w-full h-[36px] bg-red-500 hover:bg-red-600 text-white"
      >
        Logout
      </Button>
    </div>
  );
}
