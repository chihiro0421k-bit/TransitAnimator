// 地図初期化
const map = L.map("map").setView([35.1, 135.2], 9);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap contributors"
  }
).addTo(map);

// 描画用レイヤー
const drawLayer = L.layerGroup().addTo(map);

// 仮の駅データ
const stations = {
  "福知山": [35.2966, 135.1268],
  "園部": [35.1024, 135.4706],
  "京都": [35.0116, 135.7681],
  "大阪": [34.7025, 135.4959]
};

// マーカー表示
Object.entries(stations).forEach(([name, pos]) => {
  L.marker(pos).addTo(map).bindPopup(name);
});

// 経路描画
function drawRoute(names){

    drawLayer.clearLayers();

    const points=[];

    names.forEach(name=>{

        if(stations[name]){
            points.push(stations[name]);
        }

    });

    if(points.length<2) return;

    L.polyline(points,{
        color:"blue",
        weight:6
    }).addTo(drawLayer);

    map.fitBounds(points);
}

// サンプル
drawRoute([
    "福知山",
    "園部",
    "京都",
    "大阪"
]);
