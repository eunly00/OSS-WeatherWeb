<template>
  <div id="map" class="map-area"></div>
</template>

<script>
/* global naver */

export default {
  props: ['layer'],

  data() {
    return {
      map: null,
      markers: [],
      markerPositions: new Set() // ✅ 중복 마커 방지용
    };
  },

  mounted() {
    this.initMap();
    naver.maps.Event.addListener(this.map, 'idle', () => {
      this.updateMarkersInBounds();
    });
  },

  watch: {
    layer() {
      this.updateMarkersInBounds();
    }
  },

  methods: {
    initMap() {
      const center = new naver.maps.LatLng(37.5665, 126.9780);
      this.map = new naver.maps.Map('map', {
        center,
        zoom: 11
      });
      this.updateMarkersInBounds();
    },

    getMarkerIconByLayer(layer) {
      const colorMap = {
        temp: 'rgba(255, 99, 132, 0.6)',   // 빨강 반투명
        rain: 'rgba(54, 162, 235, 0.6)',   // 파랑 반투명
        wind: 'rgba(75, 192, 192, 0.6)',   // 민트
        humid: 'rgba(153, 102, 255, 0.6)'  // 보라
      };
      const color = colorMap[layer] || 'rgba(200, 200, 200, 0.6)';

      return {
        content: `<div style="
          width: 24px;
          height: 24px;
          background-color: ${color};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.2);
        "></div>`,
        size: new naver.maps.Size(24, 24),
        anchor: new naver.maps.Point(12, 12)
      };
    },

    async updateMarkersInBounds() {
      // 기존 마커 제거
      this.markers.forEach(m => m.setMap(null));
      this.markers = [];

      const bounds = this.map.getBounds();
      const sw = bounds.getSW();
      const ne = bounds.getNE();

      // ✅ 마커 좌표 추적 초기화
      this.markerPositions = new Set();

      // 줌 레벨에 따른 간격 조정
      const zoom = this.map.getZoom();
      let latStep, lonStep;

      if (zoom >= 13) {
        latStep = 0.05;
        lonStep = 0.06;
      } else if (zoom >= 11) {
        latStep = 0.07;
        lonStep = 0.08;
      } else if (zoom >= 9) {
        latStep = 0.1;
        lonStep = 0.2;
      } else {
        latStep = 0.15;
        lonStep = 0.16;
      }

      for (let lat = sw.y; lat <= ne.y; lat += latStep) {
        for (let lon = sw.x; lon <= ne.x; lon += lonStep) {
          const posKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
          if (this.markerPositions.has(posKey)) continue;
          this.markerPositions.add(posKey);

          try {
            const res = await fetch(`http://localhost:3000/weather/${this.layer}?lat=${lat}&lon=${lon}`);
            const data = await res.json();
            const numericValue = Number(data.value);

            // ✅ 이상값 제거
            if (!data.value || isNaN(numericValue) || numericValue <= -900) continue;

            const value = `${data.value}${data.unit}`;

            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(lat, lon),
              map: this.map,
              icon: this.getMarkerIconByLayer(this.layer)
            });

            const infoWindow = new naver.maps.InfoWindow({
              content: `
                <div style="background: rgba(255,255,255,0.85); padding: 8px; border-radius: 10px;">
                  <strong>${value}</strong>
                </div>`,
              borderWidth: 0
            });

            naver.maps.Event.addListener(marker, 'mouseover', () => {
              infoWindow.open(this.map, marker);
            });
            naver.maps.Event.addListener(marker, 'mouseout', () => {
              infoWindow.close();
            });

            this.markers.push(marker);
          } catch (err) {
            console.error(`❌ 날씨 데이터 로드 실패 (lat=${lat}, lon=${lon})`, err);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.map-area {
  width: 100%;
  height: 600px;
  border-radius: 1rem;
  overflow: hidden;
}
</style>
