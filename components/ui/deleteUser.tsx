"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Delete } from "lucide-react"; // import the icon
import { deleteDoc, doc } from "firebase/firestore";

export function DeleteUser() {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this member?");
    if (!confirmed) return;

    try {
      const docRef = doc(db, "users", user.id);
      await deleteDoc(docRef);
      alert("Member account deleted.");
      router.back();
      // Optionally redirect or update state here
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete account.");
    }
  };
  return (
    <Button variant="destructive" onClick={handleDelete}>
      <Delete className="w-4 h-4" />
      Delete
    </Button>
  );
}
