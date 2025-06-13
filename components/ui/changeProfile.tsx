"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { db, storage } from "@/lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, updateDoc } from "firebase/firestore";

export function ChangeProfilePic() {

  const [image, ] = useState<File | null>(null);
  const [uploading, ] = useState(false);

  // const handleUpload = async () => {
  //   const userData = localStorage.getItem("user");
  //   if (!userData || !image) return;

  //   const user = JSON.parse(userData);
  //   const imageRef = ref(storage, `profilePics/${user.id}`);

  //   try {
  //     setUploading(true);
  //     await uploadBytes(imageRef, image);
  //     const downloadURL = await getDownloadURL(imageRef);

  //     const userDocRef = doc(db, "users", user.id);
  //     await updateDoc(userDocRef, { profilePic: downloadURL });

  //     alert("Profile picture updated!");
  //   } catch (err) {
  //     console.error("Error uploading image:", err);
  //     alert("Failed to update profile picture.");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <div className="p-4 space-y-4">

      <Button
        // onClick={}
        className="w-[100px]"
        disabled={uploading || !image}
      >
        {uploading ? "Uploading..." : "Change Profile Picture"}
      </Button>


    </div>
  );
}
