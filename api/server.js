const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// 静的ファイル配信設定（wwwフォルダを公開）
app.use(express.static(path.join(__dirname, '../www')));

// DB接続
const db = new sqlite3.Database('./questions.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('DB接続エラー:', err.message);
  } else {
    console.log('DB接続成功');
  }
});

// API：問題一覧を返す
app.get('/api/questions', (req, res) => {
  db.all('SELECT id, question, option1, option2, option3, option4, correct_option FROM questions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const questions = rows.map(row => ({
      id: row.id,
      question: row.question,
      options: [row.option1, row.option2, row.option3, row.option4],
      answer: row['option' + row.correct_option]
    }));

    res.json(questions);
  });
});

// サーバー起動
app.listen(port, () => {
  console.log(`APIサーバーが http://localhost:${port} で起動中`);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`APIサーバー起動：ポート${port}`);
});

