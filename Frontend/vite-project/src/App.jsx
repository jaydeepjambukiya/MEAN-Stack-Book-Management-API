import { useState,useEffect } from 'react'
import './App.css'
import Header from './Component/Header.jsx';
import Footer from './Component/Footer.jsx';
import BookCard from './Component/BookCard.jsx';
import BookDetailModal from './Component/BookDetailModal.jsx';
import BookFormModal from './Component/BookFormModal.jsx';
import { Search, Filter, Loader2 } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_BACK_URL}/api/books`;



const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.map(book => book.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error loading books. Please check your API connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let result = books;

    if (categoryFilter !== 'All') {
      result = result.filter(book => book.category === categoryFilter);
    }

    if (searchTerm) {
      result = result.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(result);
  }, [searchTerm, categoryFilter, books]);

  // Create new book
  const handleCreate = async (formData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to create book');
      
      await fetchBooks();
      setShowAddForm(false);
      alert('Book created successfully!');
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Error creating book. Please try again.');
    }
  };

  // Update book
  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/${editingBook._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to update book');
      
      await fetchBooks();
      setEditingBook(null);
      setSelectedBook(null);
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Error updating book. Please try again.');
    }
  };

  // Delete book
  const handleDelete = async (id) => {    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete book');
      
      await fetchBooks();
      setSelectedBook(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header onAddNew={() => setShowAddForm(true)} />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Search and Filter Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        )}

        {/* Books Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onClick={() => setSelectedBook(book)}
                onEdit={setEditingBook}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No books found</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Book Detail Modal */}
      {selectedBook && !editingBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onEdit={setEditingBook}
          onDelete={handleDelete}
        />
      )}

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingBook) && (
        <BookFormModal
          book={editingBook}
          onClose={() => {
            setShowAddForm(false);
            setEditingBook(null);
          }}
          onSave={editingBook ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
};

export default App;

