import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiCheckSquare,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiLayers,
  FiInbox
} from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/notes`);
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchNotes();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    try {
      await axios.post(`${API_URL}/todos`, { text: todoText });
      setTodoText('');
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    try {
      await axios.post(`${API_URL}/notes`, { title: noteTitle, content: noteContent });
      setNoteTitle('');
      setNoteContent('');
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container pb-5">
      <header className="app-header fade-in-up">
        <h1 className="app-title">
          <FiLayers className="text-primary" />
          TaskFlow
        </h1>
        <p className="text-muted mt-2">Manage your tasks and notes beautifully.</p>
      </header>

      <div className="row g-4">
        {/* Todos Section */}
        <div className="col-lg-6 mb-4">
          <div className="premium-card fade-in-up delay-1">
            <div className="premium-card-header todo-header">
              <FiCheckSquare size={24} />
              <h2>Action Items</h2>
            </div>
            <div className="premium-card-body">
              <form onSubmit={addTodo} className="d-flex gap-2">
                <input
                  type="text"
                  className="premium-input flex-grow-1"
                  placeholder="What needs to be done?"
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                />
                <button type="submit" className="premium-btn btn-primary" disabled={!todoText.trim()}>
                  <FiPlus size={20} /> Add
                </button>
              </form>

              <div className="premium-list">
                {todos.map((todo) => (
                  <div key={todo._id} className="todo-item">
                    <span className="todo-text">{todo.text}</span>
                    <button
                      className="premium-btn btn-danger-soft"
                      onClick={() => deleteTodo(todo._id)}
                      title="Delete Task"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))}

                {todos.length === 0 && (
                  <div className="empty-state">
                    <FiInbox size={48} opacity={0.5} />
                    <p>You have no pending tasks. Enjoy your day!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="col-lg-6 mb-4">
          <div className="premium-card fade-in-up delay-2">
            <div className="premium-card-header note-header">
              <FiFileText size={24} />
              <h2>Scratchpad</h2>
            </div>
            <div className="premium-card-body">
              <form onSubmit={addNote} className="d-flex flex-column gap-3 mb-4">
                <input
                  type="text"
                  className="premium-input"
                  placeholder="Note Title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
                <textarea
                  className="premium-input"
                  placeholder="Jot something down..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                ></textarea>
                <button type="submit" className="premium-btn btn-success w-100" disabled={!noteTitle.trim() || !noteContent.trim()}>
                  <FiPlus size={20} /> Save Note
                </button>
              </form>

              <div className="premium-list">
                {notes.map((note) => (
                  <div key={note._id} className="note-item">
                    <div className="note-item-header">
                      <h3 className="note-title">{note.title}</h3>
                      <button
                        className="premium-btn btn-danger-soft pb-0 pt-1 px-2"
                        onClick={() => deleteNote(note._id)}
                        title="Delete Note"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    <p className="note-content">{note.content}</p>
                  </div>
                ))}

                {notes.length === 0 && (
                  <div className="empty-state">
                    <FiInbox size={48} opacity={0.5} />
                    <p>Your scratchpad is empty. Add a note above!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
