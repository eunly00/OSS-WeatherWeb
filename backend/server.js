const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherService = require('./weatherService');

const app = express();
app.use(cors());

app.get('/weather/:type', async (req, res) => {
  const { lat, lon } = req.query;
  const { type } = req.params;

  try {
    const data = await weatherService.fetchData({ lat, lon, type });
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message || '기상청 API 요청 실패' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ 서버 실행 중: http://localhost:${PORT}`));
