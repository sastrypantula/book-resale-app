import React, { useState } from "react";
import * as XLSX from "xlsx";

const booksListData = [
  {
    id: 1,
    name: "Advanced Physics by H.C. Verma",
    image: "/assets/hcverma.webp",
    price: 200,
  },
  {
    id: 2,
    name: "Organic Chemistry by Morrison Boyd",
    image: "/assets/organic.jpg",
    price: 600,
  },
  {
    id: 3,
    name: "Mathematics by R.D. Sharma",
    image: "https://example.com/math-book.jpg",
    price: 400,
  },
  {
    id: 4,
    name: "Modern Biology by Peter Raven",
    image: "https://example.com/biology-book.jpg",
    price: 450,
  },
];

export default function App() {
  const [booksList, setBooksList] = useState(booksListData);
  const [bookings, setBookings] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState(""); // Replacing email with phone number
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Add booking
  const handleBooking = () => {
    if (!studentName || !studentPhone || !selectedBookId) {
      alert("Please enter name, phone number, and select a book");
      return;
    }
    const book = booksList.find((b) => b.id === parseInt(selectedBookId));
    const newBooking = {
      id: bookings.length + 1,
      studentName,
      studentPhone, // Save phone number instead of email
      bookName: book.name,
      price: book.price,
    };
    setBookings([...bookings, newBooking]);

    // Remove the booked book from the list
    setBooksList(booksList.filter((b) => b.id !== parseInt(selectedBookId)));

    // Clear inputs
    setStudentName("");
    setStudentPhone("");
    setSelectedBookId(null);
  };

  // Export to Excel
  const exportToExcel = () => {
    if (bookings.length === 0) {
      alert("No bookings yet!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(bookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "student_bookings.xlsx");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          backgroundColor: "#1746A2",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <h1>IIT JEE Second-hand Books Resale</h1>
        <p>Buy top-quality books at lowest price from your seniors!</p>
      </header>

      <main style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2>Available Books</h2>
        <div
          style={{
            display: "flex",
            gap: 15,
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {booksList.map((book) => (
            <div
              key={book.id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                borderRadius: 10,
                width: 150,
                textAlign: "center",
              }}
            >
              <img
                src={book.image}
                alt={book.name}
                style={{ width: "100%", borderRadius: 6 }}
              />
              <p>{book.name}</p>
              <p style={{ fontWeight: "bold", color: "#3B7A57" }}>
                ₹{book.price}
              </p>
            </div>
          ))}
        </div>

        <h2>Book a Book</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxWidth: 400,
            marginBottom: 20,
          }}
        >
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={{ padding: 8, borderRadius: 5, border: "1px solid #aaa" }}
          />
          <input
            type="tel"
            placeholder="Student Phone Number"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
            style={{ padding: 8, borderRadius: 5, border: "1px solid #aaa" }}
          />
          <select
            value={selectedBookId || ""}
            onChange={(e) => setSelectedBookId(e.target.value)}
            style={{ padding: 8, borderRadius: 5, border: "1px solid #aaa" }}
          >
            <option value="" disabled>
              Select Book
            </option>
            {booksList.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name} - ₹{book.price}
              </option>
            ))}
          </select>
          <button
            onClick={handleBooking}
            style={{
              padding: 10,
              backgroundColor: "#3B7A57",
              color: "white",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Book Now
          </button>
        </div>

        <button
          onClick={exportToExcel}
          style={{
            padding: "12px 25px",
            backgroundColor: "#3B7A57",
            color: "white",
            border: "none",
            borderRadius: 25,
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: 50,
          }}
        >
          Download Student Bookings Excel
        </button>
      </main>

      <footer
        style={{
          backgroundColor: "#1746A2",
          color: "white",
          padding: 15,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        © 2025 BookResale. Made for Students by Students.
      </footer>
    </div>
  );
}