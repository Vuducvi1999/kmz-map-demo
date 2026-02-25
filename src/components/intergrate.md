

### tách ra thành component riêng (dynamic nhất có thể) 
- components/ChoosingOverlay.tsx 
  cho phép upload hoặc select danh sách các geojson layer 
  tự động center map theo geojson layer đã chọn 
- components/ControlPanel.tsx 
  set thông số hiển thị cho các thành phần trong map 
  thông số được lưu trong custom hook useControlPanel 
  * polyline 
    BASE_POLYLINE_WEIGHT
    thang màu status 
  * heat 
    BASE_HEAT_RADIUS 
    BASE_HEAT_BLUR 
    thang màu gradient 
  * marker 
    BASE_ICON_WIDTH
    BASE_ICON_HEIGH
    active animation 
  * geojson
    active
  * interval refetch 
    dành cho react-query 

- components/Map.tsx 
  nhận vào tất cả các cấu hình dynamic, sau đó áp dụng chúng cho map component 
  có 2 dạng cấu hình dynamic 
  + client state 
    lấy thông số đã được điều chỉnh trong useControlPanel 
  + server state 
    data thay đổi do refetch của react-query 
  xử lý nhiều data và state nên có thể bị rerender nhiều, cần tuân theo các best practice
    + function thì không cần subscribe 
    + chỉ subscribe đúng biến cần dùng 
    + không nên sử dụng useContext cho các global state thường xuyên thay đổi 

- components/PolylineLayer.tsx
- components/HeatLayer.tsx
- components/Marker.tsx
- components/Geojson.tsx
  các

### built in 
- tự động scale object theo mức zoom hiện tại 
- mức zoom tối đa là 18 
- mức zoom default là 15 


### giải thích cơ chế
- map component phải được render dynamic phía client, vì nó yêu cầu truy cập vào window 











































