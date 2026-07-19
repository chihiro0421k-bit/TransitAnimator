// =========================
// TransitAnimator v0.2
// 地図表示＋マーカー＋経路描画
// =========================

// 地図作成
const map = L.map("map").setView([35.15, 135.35], 9);

// OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }
).addTo(map);

// 描画レイヤー
const routeLayer = L.layerGroup().addTo(map);

// 駅データ（今後JSON化）
const stations = {
    "福知山": {
        lat: 35.2966,
        lng: 135.1268
    },
    "園部": {
        lat: 35.1024,
        lng: 135.4706
    },
    "京都": {
        lat: 35.0116,
        lng: 135.7681
    },
    "大阪": {
        lat: 34.7025,
        lng: 135.4959
    }
};

// マーカー表示
for (const name in stations) {

    const s = stations[name];

    L.marker([s.lat, s.lng])
        .addTo(map)
        .bindPopup(name);

}

// サンプル経路
const sampleRoute = [
    "福知山",
    "園部",
    "京都",
    "大阪"
];

// 経路描画
function drawRoute(route){

    routeLayer.clearLayers();

    const latlngs = [];

    for(const stationName of route){

        if(stations[stationName]){

            latlngs.push([
                stations[stationName].lat,
                stations[stationName].lng
            ]);

        }

    }

    if(latlngs.length < 2){
        return;
    }

    const line = L.polyline(
        latlngs,
        {
            color: "#1565C0",
            weight: 6
        }
    );

    line.addTo(routeLayer);

    map.fitBounds(line.getBounds());

}

// 起動時に描画
drawRoute(sampleRoute);
