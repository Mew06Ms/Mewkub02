const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ID: String,
  ชื่อหนังสือภาษาไทย: String,
  ชื่อหนังสือภาษาอังกฤษ: String,
  ผู้เขียน: String,
  สำนักพิมพ์: String,
  ปีที่พิมพ์: Number,
  ฉบับที่: Number,
  ราคา: Number,
  รายละเอียดหนังสือ: String,
  ISBN: String,
  Book_type: String,
  จำนวน: Number,
  IMG: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
