"use client";

type MessageModalProps = {
  message: string;
  onClose: () => void;
};

function MessageModalSuccess({ message, onClose }: MessageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">
          Notice!
        </h2>

        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          {message}
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageModalSuccess;
