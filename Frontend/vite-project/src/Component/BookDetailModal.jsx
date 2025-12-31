import { Edit, Trash2, X } from 'lucide-react';
import React from 'react'

const BookDetailModal = ({ book, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{book.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src={book.image || 'https://via.placeholder.com/300x400?text=No+Image'}
              alt={book.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-600">Author</p>
                <p className="text-gray-800">{book.author}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600">Category</p>
                <p className="text-gray-800">{book.category}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600">Price</p>
                <p className="text-2xl font-bold text-blue-600">${book.price}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600">Rating</p>
                <p className="text-gray-800">⭐ {book.rating}/5</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-600">Publish Date</p>
                <p className="text-gray-800">{book.publishDate}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-600 mb-2">Description</p>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => onEdit(book)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Edit size={18} />
              Edit
            </button>
            <button
              onClick={() => onDelete(book._id)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BookDetailModal