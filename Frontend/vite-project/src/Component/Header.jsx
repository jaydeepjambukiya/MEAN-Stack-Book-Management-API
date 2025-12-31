import { useState, useEffect } from 'react';
import { BookOpen, Search, X, Edit, Trash2, Filter, Plus, Loader2 } from 'lucide-react';


// API Base URL - Update this to your backend URL
const API_URL = 'http://localhost:5000/api/books';

// Header Component
const Header = ({ onAddNew }) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={32} />
            <h1 className="text-2xl font-bold">Book Store</h1>
          </div>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Plus size={20} />
            Add New Book
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;