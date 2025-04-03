const axios = require('axios');
const { convertToXY, getBaseDateTime } = require('./utils');

// 항목별 기상청 카테고리 코드
const CATEGORY_MAP = {
  temp: 'T1H',   // 기온
  rain: 'RN1',   // 1시간 강수량
  wind: 'WSD',   // 풍속
  humid: 'REH' ,  // 습도
  humidity: 'REH'
};

// 단위 설정
function getUnit(type) {
  switch (type) {
    case 'temp': return '°C';
    case 'rain': return 'mm';
    case 'wind': return 'm/s';
    case 'humid': return '%';
    case 'humidity': return '%';
    default: return '';
  }
}

// 메인 함수
async function fetchData({ lat, lon, type }) {
  const [nx, ny] = convertToXY(parseFloat(lat), parseFloat(lon));
  const { baseDate, baseTime } = getBaseDateTime();

  const category = CATEGORY_MAP[type];
  if (!category) {
    throw new Error(`지원하지 않는 type입니다: ${type}`);
  }

  // 기온(temp)은 실황 API, 나머지는 예보 API 사용
  const isNowcast = type === 'temp';
  const url = isNowcast
    ? 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    : 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

  const params = {
    serviceKey: process.env.SERVICE_KEY,
    numOfRows: 100,
    pageNo: 1,
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx,
    ny
  };

  const response = await axios.get(url, { params });
  console.dir(response.data, { depth: null }); // 전체 응답 출력
  console.log('요청 파라미터:', params);

  const items = response.data.response?.body?.items?.item;
  if (!items || items.length === 0) {
    throw new Error('기상청 응답이 비어 있습니다.');
  }

  const result = items.find(i => i.category === category);
  if (!result) {
    throw new Error(`카테고리(${category}) 데이터 없음`);
  }

  return {
    value: isNowcast ? result.obsrValue : result.fcstValue,
    unit: getUnit(type),
    nx,
    ny,
    baseDate,
    baseTime
  };
}

module.exports = { fetchData };
