const express = require('express');
const path = require('path');
const router = require('./route/route');
const mongoose = require('mongoose');  // สำหรับเชื่อมต่อ MongoDB
const app = express();
const port = process.env.PORT || 3000;  // ใช้ process.env.PORT เผื่อกรณี deploy


// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://localhost:27017/libraryDB', {
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


// การเพิ่ม middleware ต่างๆ
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ตั้งค่า view engine เป็น EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// ใช้ routing จากไฟล์ router
app.use('/', router);


// จัดการ error handling กรณี route ไม่ถูกต้อง
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});


// จัดการข้อผิดพลาดของเซิร์ฟเวอร์
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
