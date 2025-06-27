"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import MessageModal from "@/components/modal";
import { Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordDialog() {
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isAlphaNumeric = (value: string) => /^[a-zA-Z0-9]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !isAlphaNumeric(lastName) ||
      !isAlphaNumeric(username) ||
      !isAlphaNumeric(parentFirstName) ||
      !isAlphaNumeric(contactNumber)
    ) {
      setModalMessage("Only letters and numbers are allowed in the form.");
      setShowModal(true);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("lastName", "==", lastName),
      where("username", "==", username),
      where("parentFirstName", "==", parentFirstName),
      where("contactNumber", "==", contactNumber)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      setUserIdToUpdate(docId);

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setShowResetForm(true);
    } else {
      setModalMessage("User not found. Please check the information.");
      setShowModal(true);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (verificationCode !== generatedCode) {
      setModalMessage("Invalid verification code.");
      setShowModal(true);
      return;
    }

    if (!isAlphaNumeric(newPassword)) {
      setModalMessage("Password must contain only letters and numbers.");
      setShowModal(true);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const userRef = doc(db, "users", userIdToUpdate);
      await updateDoc(userRef, { password: hashedPassword });

      setModalMessage("Password successfully updated.");
      setShowResetForm(false);
      setLastName("");
      setUsername("");
      setParentFirstName("");
      setContactNumber("");
      setNewPassword("");
      setVerificationCode("");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating password:", error);
      setModalMessage("Failed to update password.");
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalMessage === "Password successfully updated.") {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Label className="text-xs underline">Forgot Password</Label>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
        </DialogHeader>

        {showModal && (
          <MessageModal message={modalMessage} onClose={handleModalClose} />
        )}

        {!showResetForm ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <h3 className="text-xl font-bold">Fill the Information</h3>

            <Label>Last Name</Label>
            <input
              className="p-2 border rounded"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value.replace(/[^a-zA-Z]/g, "").trim())
              }
              required
              pattern="[A-Za-z0-9]+"
              title="Only letters and numbers allowed"
            />

            <Label>Username</Label>
            <input
              className="p-2 border rounded"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.replace(/[^a-zA-Z0-9@_]/g, "").trim()
                )
              }
              required
              pattern="[A-Za-z0-9@_]+"
              title="Only letters, numbers, @ and _ are allowed"
            />

            <Label>Parent First Name</Label>
            <input
              className="p-2 border rounded"
              value={parentFirstName}
              onChange={(e) =>
                setParentFirstName(
                  e.target.value.replace(/[^a-zA-Z]/g, "").trim()
                )
              }
              required
              pattern="[A-Za-z0-9]+"
              title="Only letters and numbers allowed"
            />

            <Label>Parent Contact Number</Label>
            <input
              className="p-2 border rounded"
              value={contactNumber}
              onChange={(e) =>
                setContactNumber(e.target.value.replace(/[^0-9]/g, "").trim())
              }
              required
              pattern="[0-9]+"
              title="Only numbers allowed"
            />

            <Button type="submit">Check Information</Button>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="p-2 bg-gray-100 border rounded text-sm text-center text-black">
              Your verification code is: <strong>{generatedCode}</strong>
            </div>

            <Label>Enter Verification Code</Label>
            <input
              className="p-2 border rounded"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))
              }
              required
              pattern="[0-9]+"
              title="Only numbers allowed"
            />

            <Label>New Password</Label>
            <div className="relative">
              <input
                className="p-2 border rounded pr-10 w-full"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value.replace(/[^a-zA-Z0-9@_]/g, ""))
                }
                required
                pattern="[A-Za-z0-9@_]+"
                title="Only letters, numbers, @, and _ allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit">Reset Password</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
