"use client";

import { Button } from "./ui/button";

function MessageModalSuccessful({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
        <p className="text-black font-semibold text-lg font-black">
          {message}
        </p>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={onClose}
            className="border border-black px-6 py-2 text-sm font-medium"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageModalSuccessful;
