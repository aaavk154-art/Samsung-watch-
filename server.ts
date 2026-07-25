import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not configured in environment variables.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// AI Smartwatch Advisor API endpoint
app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { primaryUse, workoutType, preferredSize, desiredBattery, budgetRange, additionalNotes } = req.body;

    const gemini = getGeminiClient();
    if (!gemini) {
      return res.status(200).json({
        success: true,
        isFallback: true,
        recommendation: {
          recommendedModelId: budgetRange === 'above20k' ? 'galaxy-watch-ultra' : 'galaxy-watch7-cream',
          title: 'Samsung Galaxy Watch7 / Ultra',
          summary: 'ขออภัย ระบบตอบคำถามแบบถ่ายทอดสดขัดข้องชั่วคราว แต่จากตัวเลือกของคุณ เราขอแนะนำ Samsung Galaxy Watch7 หรือ Watch Ultra ที่คุ้มค่าและตรงตามไลฟ์สไตล์ของคุณที่สุด',
          reasons: [
            'มีเซนเซอร์ BioActive Gen 2 แม่นยำระดับศูนย์แพทย์',
            'รองรับระบบ Galaxy AI ตรวจสอบ Energy Score และวัดคุณภาพการนอน',
            'ตัวเรือนดีไซน์หรูหรา และกระจก Sapphire Crystal ทนทานต่อรอยขีดข่วน'
          ],
          suggestedStrapName: 'Trail Band / Marine Band'
        }
      });
    }

    const prompt = `คุณคือ "Galaxy Watch Luxury Advisor" ผู้เชี่ยวชาญระดับไฮเอนด์ประจำร้าน Samsung Thailand Official Store
ผู้ใช้กำลังค้นหานาฬิกา Samsung Galaxy Watch ที่ตรงกับสไตล์และชีวิตประจำวันของพวกเขา

ข้อมูลผู้ใช้:
- การใช้งานหลัก: ${primaryUse || 'ออกกำลังกายและติดตามสุขภาพ'}
- ประเภทการออกกำลังกาย/กิจกรรม: ${workoutType || 'ทั่วไป'}
- ขนาดข้อมือ/ขนาดที่ชอบ: ${preferredSize || 'มาตรฐาน'}
- การใช้งานแบตเตอรี่ที่ต้องการ: ${desiredBattery || 'ยาวนาน 1-3 วัน'}
- งบประมาณ: ${budgetRange || 'ไม่จำกัด'}
${additionalNotes ? `- หมายเหตุเพิ่มเติม: ${additionalNotes}` : ''}

คำแนะนำของผลิตภัณฑ์ที่มีให้เลือก:
1. "galaxy-watch-ultra" - Samsung Galaxy Watch Ultra (23,900 THB) - สายลุย ดำน้ำ 10ATM ไทเทเนียมเกรด 4 ปุ่ม Quick Button ไซเรน 86dB แบตเตอรี่ 100 ชม.
2. "galaxy-watch7-cream" - Samsung Galaxy Watch7 (12,900 THB) - ดีไซน์หรู ชิป 3nm ระบบ Galaxy AI แฟชั่นทันสมัย
3. "galaxy-watch6-classic" - Samsung Galaxy Watch6 Classic (13,900 THB) - ขอบหมุนได้จริง สแตนเลสสตีล หรูหราคลาสสิก
4. "galaxy-watch-fe" - Samsung Galaxy Watch FE (6,990 THB) - ราคาสุดคุ้ม กระจก Sapphire บอดี้อลูมิเนียม

กรุณาวิเคราะห์และตอบกลับในรูปแบบ JSON แท้ (JSON Format เท่านั้น) ดังนี้:
{
  "recommendedModelId": "galaxy-watch-ultra" | "galaxy-watch7-cream" | "galaxy-watch6-classic" | "galaxy-watch-fe",
  "title": "หัวข้อคำแนะนำสั้นๆ สไตล์หรูหรา",
  "summary": "สรุปคำแนะนำในสไตล์นุ่มนวล สุภาพ ภาษาไทยระดับพรีเมียม ความยาว 2-3 ประโยค",
  "reasons": [
    "เหตุผลข้อที่ 1 ที่ตรงกับความต้องการของผู้ใช้",
    "เหตุผลข้อที่ 2",
    "เหตุผลข้อที่ 3"
  ],
  "suggestedStrapName": "ชื่อสายที่เข้ากัน เช่น Trail Band หรือ Royal Gold Stainless Link"
}
`;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response from Gemini');
    }

    const parsedData = JSON.parse(responseText);
    return res.json({
      success: true,
      recommendation: parsedData
    });
  } catch (error: any) {
    console.error('AI Recommendation endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate recommendation',
      error: error.message
    });
  }
});

// Checkout Order Simulation API
app.post('/api/orders/checkout', (req, res) => {
  const { cartItems, customerInfo, paymentMethod, totalAmount } = req.body;

  const orderId = 'GW-' + Math.floor(100000 + Math.random() * 900000);
  const trackingNumber = 'TH' + Math.floor(100000000 + Math.random() * 900000000) + 'EX';

  res.json({
    success: true,
    orderId,
    trackingNumber,
    estimatedDelivery: '1-2 วันทำการ (Express VIP Delivery)',
    totalAmount,
    customerInfo,
    paymentMethod,
    items: cartItems,
    createdAt: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Samsung Galaxy Watch Luxury Store server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
