# UIT iMAP 🗺️

Bản đồ 3D trực tuyến cho Trường Đại học Công nghệ Thông tin – ĐHQG TP.HCM.

---

## Cài đặt & Chạy

```bash
npm install
npm run dev
```

Truy cập: `http://localhost:5173`

---

## Cấu trúc dự án

```
uit-imap/
├── index.html                    # Entry HTML – nhúng model-viewer & các thông tin chung
├── public/
│   ├── logo.png
│   ├── favicon.png
│   ├── models/map.glb
│   ├── hotspots.json             # Dữ liệu hotspot
│   └── edge-list.json            # Danh sách cạnh
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── model-viewer.d.ts     # TypeScript declarations cho <model-viewer>
    ├── lib/
    │   ├── utils.ts              # cn(), jaccardSimilarity(), euclidean2D/3D, ...
    │   ├── types/
    │   │   ├── category.ts       # Kiểu Category + labels/colors
    │   │   ├── hotspot.ts        # Kiểu Hotspot + parseRawHotspot()
    │   │   └── filter.ts         # Kiểu Filter
    │   └── services/
    │       ├── getFilteredHotspots.ts   # Tìm kiếm xấp xỉ Jaccard
    │       ├── getSupportingHotspots.ts
    │       └── getDirection.ts          # Dijkstra shortest path
    ├── contexts/
    │   ├── modeContext.tsx        # "default" | "direction"
    │   ├── hotspotsContext.tsx    # hotspots[], visibleIds, selectedHotspot, ...
    │   └── graphContext.tsx       # adj (adjacency list from edge-list)
    ├── pages/
    │   └── HomePage.tsx           # / và /hotspot/:id
    └── components/
        ├── ui/                    # Shadcn/UI components
        └── main/
            ├── LoadingScreen.tsx
            ├── ModelViewer.tsx    # Wraps <model-viewer>, quản lý hotspot slots + SVG lines
            ├── navbar/
            │   ├── Navbar.tsx     # Right sidebar (desktop) / bottom bar (mobile)
            │   ├── Header.tsx     # Logo + Giới thiệu + Hướng dẫn dialogs
            │   ├── FilterBar.tsx  # Form tìm kiếm / lọc
            │   └── FilterResult.tsx # Danh sách kết quả tìm kiếm
            ├── hotspot/
            │   ├── HotspotButton.tsx # Nút trên model (slot của model-viewer)
            │   └── HotspotDetail.tsx # Left sheet thông tin hotspot
            └── direction/
                ├── DirectionBar.tsx    # Top bar chọn điểm đầu/cuối + GPS
                ├── DirectionSheet.tsx  # Right panel danh sách bước đường đi
                └── HotspotDirection.tsx # SVG lines đỏ nối các hotspot trên path
```

---

## Dữ liệu đầu vào

### `public/hotspots.json`

Mảng các object mô tả từng hotspot theo cấu trúc:

```json
{
  "id": "A101",
  "name": "Phòng A.101",
  "categories": ["classroom"],
  "floor": 1,
  "belongs_to": "bldA",
  "description": ["Mô tả phòng học..."],
  "capacity": 40,
  "real_position": [10.87012, 106.8031],
  "model_position": [-3.0, 0, 0.5]
}
```

**Quy tắc chuyển đổi sang Hotspot:**

- `floor`: Nếu là `"B1"` → parse thành `-1`. Với thang máy/cầu thang có `floor: ["B1", 5]` → tự động tạo 7 hotspot (tầng -1 đến 5).
- `categories`: Mảng, phần tử đầu tiên là category chính hiển thị trên button.
- `model_position`: Tọa độ `[x, y, z]` trong không gian 3D model (meter).
- `real_position`: Tọa độ `[lat, lng]` ngoài thực tế (dùng cho định vị GPS).

### `public/edge-list.json`

Mảng các object mô tả danh sách cạnh trong đồ thị dùng để tìm đường đi ngắn nhất:

```json
{ "start_id": "gate1", "end_id": "sp_nav1" }
```
