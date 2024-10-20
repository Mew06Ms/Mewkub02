const express = require('express');
const router = express.Router();
const Book = require('../model/book'); // นำเข้าโมเดล Book

// เส้นทางสำหรับหน้าแรก
router.get('/', (req, res) => {
  res.render('index');  // เรนเดอร์ไฟล์ index.ejs
});

// เส้นทางสำหรับหน้า newreleased
router.get('/newreleased', (req, res) => {
  res.render('newreleased');  // เรนเดอร์ไฟล์ newreleased.ejs
});

// เส้นทางสำหรับหน้า Books (ดึงข้อมูลหนังสือจาก MongoDB และส่งไปยังหน้า Books.ejs)
router.get('/Books', async (req, res) => {
  try {
    // ดึงข้อมูลหนังสือทั้งหมดจากฐานข้อมูล
    const books = await Book.find({});
    
    // ส่งข้อมูลหนังสือไปยังหน้า Books.ejs
    res.render('Books', { books: books });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Error fetching books');
  }
});

// เส้นทางสำหรับหน้า cart
router.get('/cart', (req, res) => {
  res.render('cart');  // เรนเดอร์ไฟล์ cart.ejs
});

// เส้นทางสำหรับหน้า login
router.get('/login', (req, res) => {
  res.render('login');  // เรนเดอร์ไฟล์ login.ejs
});

// เส้นทางสำหรับหน้า checkout
router.get('/checkout', (req, res) => {
  res.render('checkout');  // เรนเดอร์ไฟล์ checkout.ejs
});

// เส้นทางสำหรับหน้า purchaseHistory
router.get('/purchaseHistory', (req, res) => {
  res.render('purchaseHistory');  // เรนเดอร์ไฟล์ purchaseHistory.ejs
});

module.exports = router;
