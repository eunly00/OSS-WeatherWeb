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
        markers: []
      };
    },
  
    mounted() {
      this.initMap();
    },
  
    watch: {
      layer(newVal) {
        this.showWeatherData(newVal);
      }
    },
  
    methods: {
      initMap() {
        const center = new naver.maps.LatLng(37.5665, 126.9780);
        this.map = new naver.maps.Map('map', {
          center,
          zoom: 11
        });
        this.showWeatherData(this.layer);
      },
  
      showWeatherData(layer) {
        // 기존 마커 제거
        this.markers.forEach(m => m.setMap(null));
        this.markers = [];
  
        const locations = [
          { name: '종로구', lat: 37.5733, lon: 126.9794 },
          { name: '서대문구', lat: 37.5796, lon: 126.9368 },
          { name: '강남구', lat: 37.4979, lon: 127.0276 },
          { name: '송파구', lat: 37.5145, lon: 127.1059 },
          { name: '영등포구', lat: 37.5264, lon: 126.8963 }
        ];
  
        locations.forEach(async (loc) => {
          try {
            const res = await fetch(`http://localhost:3000/weather/${layer}?lat=${loc.lat}&lon=${loc.lon}`);
            const data = await res.json();
            const value = `${data.value}${data.unit}`;
  
            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(loc.lat, loc.lon),
              map: this.map
            });
  
            const infoWindow = new naver.maps.InfoWindow({
              content: `
                <div style="background: rgba(255,255,255,0.8); padding: 8px; border-radius: 10px;">
                  <strong>${loc.name}</strong><br/>${value}
                </div>`,
              borderWidth: 0
            });
  
            naver.maps.Event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
            });
            this.markers.push(marker);
          } catch (err) {
            console.error(`❌ ${loc.name} 날씨 데이터 가져오기 실패`, err);
          }
        });
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
  