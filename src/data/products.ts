import { Product, CustomStrap, CustomerReview } from '../types';

import heroImg from '../assets/images/galaxy_watch_hero_1784998469251.jpg';
import ultraImg from '../assets/images/watch_ultra_titanium_1784998483070.jpg';
import watch7CreamImg from '../assets/images/watch7_gold_cream_1784998496792.jpg';

export const HERO_BANNER_IMAGE = heroImg;

export const PRODUCTS: Product[] = [
  {
    id: 'galaxy-watch-ultra',
    name: 'Samsung Galaxy Watch Ultra',
    series: 'Galaxy Watch Ultra',
    tagline: 'ที่สุดแห่งสมาร์ทวอทช์สายลุยระดับพรีเมียม ตัวเรือนไทเทเนียมเกรด 4 ทนทานขั้นสุด',
    category: 'ultra',
    price: 23900,
    originalPrice: 25900,
    rating: 4.9,
    reviewCount: 384,
    colors: [
      { id: 'tit-white', name: 'Titanium White', hex: '#EAEAEA', bgClass: 'bg-slate-200' },
      { id: 'tit-gray', name: 'Titanium Gray', hex: '#3A3D40', bgClass: 'bg-zinc-700' },
      { id: 'tit-silver', name: 'Titanium Silver (Gold Accent)', hex: '#D4AF37', bgClass: 'bg-amber-500' }
    ],
    sizes: ['47mm'],
    connectivity: ['Bluetooth/Wi-Fi + 4G LTE'],
    image: ultraImg,
    gallery: [
      ultraImg,
      heroImg,
      watch7CreamImg
    ],
    specs: {
      caseMaterial: 'ไทเทเนียมเกรด 4 (Titanium Grade 4 Aerospace Standard)',
      glass: 'กระจกคริสตัลแซฟไฟร์ (Sapphire Crystal Glass)',
      processor: 'Exynos W1000 (3nm High Performance Chipset)',
      battery: '590 mAh (ใช้งานทั่วไปสูงสุด 100 ชั่วโมงในโหมด Power Saving)',
      waterResistance: '10ATM + IP68 / MIL-STD-810H (กันน้ำลึก 100 เมตร ดำน้ำได้)',
      gps: 'Dual-Frequency GPS (L1+L5) เที่ยงตรงระดับมืออาชีพ',
      sensors: ['BioActive Sensor Gen 2', 'ECG Heart Rate', 'BIA Body Comp', 'Skin Temperature', 'Dual Engine Siren 86dB'],
      weight: '60.5 กรัม'
    },
    highlights: [
      'ตัวเรือน Titanium Grade 4 ทนทานความร้อน/ความเย็นสุดขั้ว -20°C ถึง 55°C',
      'ระบบ Galaxy AI วิเคราะห์พลังงาน Energy Score และวัดคุณภาพการนอนเชิงลึก',
      'ปุ่ม Quick Button สั่งการด่วน พร้อมเสียงไซเรนฉุกเฉิน 86 เดซิเบล ดังไกล 180 เมตร',
      'กันน้ำระดับ 10ATM ดำน้ำ/ว่ายน้ำในทะเลได้อย่างมั่นใจ',
      'หน้าจอ Super AMOLED สว่างสูงสุด 3,000 nits สู้แสงแดดจ้าได้คมชัด'
    ],
    isNew: true,
    isBestseller: true,
    inStock: true
  },
  {
    id: 'galaxy-watch7-cream',
    name: 'Samsung Galaxy Watch7 (Cream Gold / Silver)',
    series: 'Galaxy Watch7',
    tagline: 'สมาร์ทวอทช์ดีไซน์หรูหราทรงกลมคลาสสิก พร้อมระบบ Galaxy AI ติดตามสุขภาพประจำวัน',
    category: 'watch7',
    price: 12900,
    originalPrice: 13900,
    rating: 4.8,
    reviewCount: 512,
    colors: [
      { id: 'cream-gold', name: 'Cream Gold (ครีมทองหรูหรา)', hex: '#F3E5AB', bgClass: 'bg-amber-100' },
      { id: 'green', name: 'Green (เขียวมรกต)', hex: '#2D4B3E', bgClass: 'bg-emerald-800' },
      { id: 'silver', name: 'Silver (เงินเงางาม)', hex: '#C0C0C0', bgClass: 'bg-slate-300' }
    ],
    sizes: ['40mm', '44mm'],
    connectivity: ['Bluetooth/Wi-Fi', 'Bluetooth/Wi-Fi + 4G LTE'],
    image: watch7CreamImg,
    gallery: [
      watch7CreamImg,
      heroImg,
      ultraImg
    ],
    specs: {
      caseMaterial: 'อลูมิเนียมพรีเมียม (Armor Aluminum 2.0)',
      glass: 'กระจกแซฟไฟร์ (Sapphire Crystal)',
      processor: 'Exynos W1000 (3nm)',
      battery: '300 mAh (40mm) / 425 mAh (44mm)',
      waterResistance: '5ATM + IP68 / MIL-STD-810H',
      gps: 'Dual-Frequency GPS (L1+L5)',
      sensors: ['BioActive Sensor 2.0', 'AGEs Index Tracking', 'Sleep Apnea Feature', 'BIA', 'ECG'],
      weight: '28.8 กรัม (40mm) / 33.8 กรัม (44mm)'
    },
    highlights: [
      'ชิปประมวลผล 3nm รุ่นแรก เร็วขึ้น 3 เท่า ประหยัดพลังงานขึ้น 30%',
      'วัดค่า AGEs Index สุขภาพระดับเซลล์ ป้องกันการเสื่อมชราล่วงหน้า',
      'ฟีเจอร์ตรวจจับภาวะหยุดหายใจขณะหลับ (Sleep Apnea Detection) ผ่าน FDA',
      'สายนาฬิกาสไตล์ใหม่พร้อมแถบสีส้มและฟ้าเอกลักษณ์สะดุดตา',
      'น้ำหนักเบาเพียง 28.8 กรัม สวมใส่สบายได้ตลอด 24 ชั่วโมง'
    ],
    isNew: true,
    isBestseller: true,
    inStock: true
  },
  {
    id: 'galaxy-watch6-classic',
    name: 'Samsung Galaxy Watch6 Classic',
    series: 'Galaxy Watch6 Classic',
    tagline: 'เสน่ห์แห่งความคลาสสิกด้วยขอบหมุนได้จริง (Rotating Bezel) หน้าจอแซฟไฟร์กว้างพิเศษ',
    category: 'classic',
    price: 13900,
    originalPrice: 15900,
    rating: 4.7,
    reviewCount: 289,
    colors: [
      { id: 'black', name: 'Classic Black', hex: '#111111', bgClass: 'bg-slate-900' },
      { id: 'silver', name: 'Classic Silver', hex: '#E0E0E0', bgClass: 'bg-slate-200' }
    ],
    sizes: ['43mm', '47mm'],
    connectivity: ['Bluetooth/Wi-Fi', 'Bluetooth/Wi-Fi + 4G LTE'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      heroImg
    ],
    specs: {
      caseMaterial: 'สแตนเลสสตีลแท้พรีเมียม (Stainless Steel)',
      glass: 'กระจกแซฟไฟร์ (Sapphire Crystal)',
      processor: 'Exynos W930 (Dual-Core 1.4GHz)',
      battery: '300 mAh (43mm) / 425 mAh (47mm)',
      waterResistance: '5ATM + IP68',
      gps: 'GPS / GLONASS / Beidou / Galileo',
      sensors: ['BioActive Sensor', 'ECG', 'Heart Rate', 'BIA Sensor', 'Infrared Temp'],
      weight: '52 กรัม (43mm) / 59 กรัม (47mm)'
    },
    highlights: [
      'ขอบหน้าปัดหมุนได้จริง (Physical Rotating Bezel) หมุนสั่งการได้อย่างลื่นไหลน่าสัมผัส',
      'ขอบหน้าจอที่แคบลง 15% ทำให้พื้นที่หน้าจอกว้างขึ้น 20%',
      'สายแบบ One-Click เปลี่ยนสายง่ายเพียงกดปุ่มเดียว',
      'การติดตามวงจรการนอน Sleep Coaching พร้อมสัญลักษณ์สัตว์นำทาง',
      'วัดมวลกล้ามเนื้อและไขมันในร่างกาย (BIA Analysis)'
    ],
    isBestseller: false,
    inStock: true
  },
  {
    id: 'galaxy-watch-fe',
    name: 'Samsung Galaxy Watch FE (Fan Edition)',
    series: 'Galaxy Watch FE',
    tagline: 'คุ้มค่าสมบูรณ์แบบสำหรับผู้เริ่มต้นสุขภาพดี ฟังก์ชัน Galaxy Watch ครบครันในราคามิตรภาพ',
    category: 'fe',
    price: 6990,
    originalPrice: 7990,
    rating: 4.6,
    reviewCount: 198,
    colors: [
      { id: 'black', name: 'Black', hex: '#1C1C1C', bgClass: 'bg-slate-800' },
      { id: 'pink-gold', name: 'Pink Gold (พิงค์โกลด์สุดน่ารัก)', hex: '#E8C3C8', bgClass: 'bg-rose-200' },
      { id: 'silver', name: 'Silver Blue Accent', hex: '#B8C4D0', bgClass: 'bg-sky-200' }
    ],
    sizes: ['40mm'],
    connectivity: ['Bluetooth/Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
      watch7CreamImg
    ],
    specs: {
      caseMaterial: 'อลูมิเนียมน้ำหนักเบา (Aluminum)',
      glass: 'กระจกคริสตัลแซฟไฟร์ (Sapphire Crystal)',
      processor: 'Exynos W920 Dual-Core',
      battery: '247 mAh (ใช้งานได้ยาวนานตลอดวัน)',
      waterResistance: '5ATM + IP68',
      gps: 'GPS / Glonass / Galileo',
      sensors: ['BioActive Sensor (HR + ECG + BIA)', 'Accelerometer', 'Barometer'],
      weight: '26.6 กรัม'
    },
    highlights: [
      'คุ้มที่สุดในตระกูล Galaxy Watch พร้อมกระจก Sapphire กันรอยขีดข่วน',
      'ติดตามการออกกำลังกายมากกว่า 100 โหมด',
      'ตรวจจับการล้มฉุกเฉิน Fall Detection ส่งข้อความขอความช่วยเหลืออัตโนมัติ',
      'รองรับ Samsung Wallet แตะจ่ายเงินง่ายผ่านนาฬิกา',
      'ดีไซน์มินิมอลสายมีกิมมิกเย็บด้ายสีส้มและสีฟ้าขอบสาย'
    ],
    isNew: true,
    inStock: true
  }
];

export const CUSTOM_STRAPS: CustomStrap[] = [
  {
    id: 'trail-band-orange',
    name: 'Trail Band (ส้มโอเปอเรชัน)',
    material: 'ไนลอนทอแน่นยืดหยุ่นสูง ซับเหงื่อแห้งไว',
    price: 2490,
    colorName: 'Orange / Dark Navy',
    colorHex: '#FF5722',
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=600&auto=format&fit=crop',
    compatibleModels: ['galaxy-watch-ultra', 'galaxy-watch7-cream']
  },
  {
    id: 'marine-band-blue',
    name: 'Marine Band (น้ำเงินดีปบลู)',
    material: 'ยางฟลูโอโรอีลาสโตเมอร์ ทนน้ำทะเลและคลอรีน',
    price: 2490,
    colorName: 'Ocean Deep Blue',
    colorHex: '#0F2167',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    compatibleModels: ['galaxy-watch-ultra', 'galaxy-watch7-cream', 'galaxy-watch6-classic']
  },
  {
    id: 'gold-link-bracelet',
    name: 'Royal Gold Stainless Link Bracelet',
    material: 'สแตนเลสสตีลชุบทองคำแท้ 18K Luxury Matte Gold',
    price: 4590,
    colorName: 'Champagne Gold 18K',
    colorHex: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop',
    compatibleModels: ['galaxy-watch7-cream', 'galaxy-watch6-classic']
  },
  {
    id: 'peakform-leather-brown',
    name: 'Peakform Hybrid Leather (น้ำตาลวินเทจ)',
    material: 'หนังแท้พรีเมียมบุยางกันเหงื่อด้านใน',
    price: 2990,
    colorName: 'Cognac Brown',
    colorHex: '#8B4513',
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=600&auto=format&fit=crop',
    compatibleModels: ['galaxy-watch6-classic', 'galaxy-watch7-cream']
  },
  {
    id: 'fabric-band-white',
    name: 'Fabric Comfort Band (ขาวสโนว์)',
    material: 'ผ้านุ่มพิเศษ ใส่นอนสบายไม่ระคายเคือง',
    price: 1890,
    colorName: 'Snow White',
    colorHex: '#FFFFFF',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop',
    compatibleModels: ['galaxy-watch7-cream', 'galaxy-watch-fe']
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    userName: 'คุณพิชญ์พงศ์ สุขุมวิท',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '18 กรกฎาคม 2026',
    watchModel: 'Galaxy Watch Ultra (Titanium White)',
    title: 'สวยหรูสมราคา แบตเตอรี่อึดมาก ใส่วิ่งเทรลประทับใจสุดๆ',
    comment: 'สั่งซื้อผ่านเว็บนี้บริการจัดส่งไวมาก สภาพกล่องแพ็คอย่างดี งานประกอบตัวเรือนไทเทเนียมและหน้าจอสีทองพรีเมียมสุดๆ แบตเตอรี่ใช้อยู่ได้ 3 วันสบายๆ ระบบ AI ช่วยวิเคราะห์พลังงาน Energy Score แม่นยำตรงเป๊ะครับ!',
    verifiedPurchase: true,
    likes: 42
  },
  {
    id: 'rev-2',
    userName: 'คุณณิชาภัทร วรเดช',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '22 กรกฎาคม 2026',
    watchModel: 'Galaxy Watch7 (Cream Gold 40mm)',
    title: 'ตัวเรือนสีครีมทองหรูหราเข้ากับทุกชุดฟิตเนสและทำงาน',
    comment: 'ประทับใจโทนสี Cream Gold มากค่ะ ดูเป็นเครื่องประดับราคาแพง ใส่ทำงานก็สวย ใส่ออกกำลังกายก็ตอบโจทย์ ฟังก์ชันวัดการนอนพร้อมระบบแจ้งเตือน Sleep Apnea ทำให้เรารู้สุขภาพตัวเองชัดเจนขึ้นมาก ชอบบริการประกันศูนย์ไทย 2 ปีเต็มค่ะ',
    verifiedPurchase: true,
    likes: 38
  },
  {
    id: 'rev-3',
    userName: 'ดร.ธนกฤต ชัยพัฒนา',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    date: '10 กรกฎาคม 2026',
    watchModel: 'Galaxy Watch6 Classic (47mm Black)',
    title: 'ขอบหมุนหมุนสนุก สัมผัสคลาสสิก สมกับเป็นสาวก Samsung',
    comment: 'ขอบหน้าปัดหมุนได้จริงให้ฟีลลิ่งนาฬิกาสวิสระดับไฮเอนด์ หน้าจอคมชัด BIA วัดมวลกล้ามเนื้อช่วงฟิตหุ่นได้ผลดีเยี่ยม การสั่งซื้อและใช้คูปองส่วนลดในเว็บลื่นไหลมาก',
    verifiedPurchase: true,
    likes: 29
  }
];

export const FAQ_LIST = [
  {
    q: 'สินค้าทุกชิ้นเป็นของแท้ประกันศูนย์ Samsung Thailand หรือไม่?',
    a: 'ใช่ครับ สินค้าทุกเรือนในร้านเป็นสินค้าแท้ 100% จาก Samsung Thailand พร้อมใบรับประกันศูนย์ไทยนาน 2 ปีเต็ม สามารถเข้ารับบริการได้ที่ศูนย์บริการ Samsung ทุกสาขาทั่วประเทศ'
  },
  {
    q: 'มีโปรโมชั่นผ่อนชำระ 0% หรือไม่?',
    a: 'ทางร้านมีโปรโมชั่นผ่อน 0% นานสูงสุด 10 เดือน ร่วมกับบัตรเครดิตชั้นนำ ได้แก่ กสิกรไทย, ไทยพาณิชย์, กรุงเทพ, กรุงศรี, และ KTC หรือเลือกชำระผ่าน PromptPay รับส่วนลดพิเศษเพิ่มเติม'
  },
  {
    q: 'Galaxy Watch Ultra ต่างจาก Galaxy Watch7 อย่างไร?',
    a: 'Galaxy Watch Ultra ออกแบบมาสำหรับการใช้งานลุยหนัก ตัวเรือนทำจากไทเทเนียมเกรด 4 ดำน้ำลึก 100m (10ATM) แบตเตอรี่ใหญ่ขึ้นใช้งานได้สูงสุด 100 ชั่วโมง และมีปุ่ม Quick Button พร้อมเสียงไซเรนฉุกเฉิน ส่วน Watch7 เน้นความบางเบา หรูหรา ใส่สบายในชีวิตประจำวัน'
  },
  {
    q: 'บริการจัดส่งใช้เวลากี่วัน?',
    a: 'จัดส่งด่วนฟรีทั่วประเทศภายใน 1-2 วันทำการ สำหรับกรุงเทพฯ และปริมณฑลมีบริการ Express Same-Day ถึงมือภายใน 4 ชั่วโมงเมื่อสั่งซื้อก่อน 12.00 น.'
  }
];
