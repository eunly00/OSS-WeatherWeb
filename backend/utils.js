// utils.js

// 위경도 → 격자(nx, ny) 변환 함수 (기상청 단기예보 공식)
function convertToXY(lat, lon) {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0;      // 격자 간격(km)
    const SLAT1 = 30.0;    // 투영 위도1
    const SLAT2 = 60.0;    // 투영 위도2
    const OLON = 126.0;    // 기준점 경도
    const OLAT = 38.0;     // 기준점 위도
    const XO = 43;         // 기준점 X좌표 (GRID)
    const YO = 136;        // 기준점 Y좌표 (GRID)
  
    const DEGRAD = Math.PI / 180.0;
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;
  
    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);
  
    const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    const r = re * sf / Math.pow(ra, sn);
    let theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
  
    const x = Math.floor(r * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro - r * Math.cos(theta) + YO + 0.5);
    return [x, y];
  }
  
  // 기상청 단기예보 API용 base_date, base_time 계산
  function getBaseDateTime() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
  
    const baseDate = `${year}${month}${date}`;
    const baseTime = '0600'; // ✅ 12시 정오 고정
  
    return { baseDate, baseTime };
  }
  
  module.exports = {
    convertToXY,
    getBaseDateTime
  };
  