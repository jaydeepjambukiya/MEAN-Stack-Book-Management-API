import React, { useState } from "react";
import { Edit, Trash2, X } from "lucide-react";

const BookCard = ({ book, onClick, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition relative overflow-hidden">

        {/* Card Content */}
        <div onClick={onClick} className="cursor-pointer pb-16">
          <img
            src={book.image || "https://via.placeholder.com/300x400?text=No+Image"}
            alt={book.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {book.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {book.author}
            </p>
            <p className="text-blue-600 font-bold text-xl">
              ${book.price}
            </p>
          </div>
        </div>

        {/* ALWAYS VISIBLE BOTTOM BUTTONS */}
        <div className="absolute bottom-0 left-0 w-full flex gap-2 p-3 bg-white border-t">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(book);
            }}
            className="flex-1 bg-blue-100 text-blue-600 py-2 rounded 
                       hover:bg-blue-200 flex items-center justify-center gap-1 text-sm"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="flex-1 bg-red-100 text-red-600 py-2 rounded 
                       hover:bg-red-200 flex items-center justify-center gap-1 text-sm"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-80 p-5 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold mb-3 text-center">
              Delete Book?
            </h3>

            <p className="text-gray-600 text-sm text-center mb-5">
              Are you sure you want to delete  
              <span className="font-semibold"> {book.name}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete(book._id);
                  setShowModal(false);
                }}
                className="flex-1 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
