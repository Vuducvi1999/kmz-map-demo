### requirement 
- heatMap
  + biểu diễn tình trạng thông thoáng hay ùn tắc (TrafficSituation)
  
- polyline làn xe
  + click vô hiển thị thông tin: 
    * số lượng xe (NumOfVehicle)
    * tốc độ trung bình (AvgSpeed)
    * mật độ chiếm dụng (Occupancy)
  
- VDS
  + click vô hiển thị thông tin 
    * vị trí
    * hướng 

- CCTV
  ...

- VMS
  ...

- Control panel
  + filter các thông tin của 
    * heatMap
    * poline làn xe 
    * thiết bị: CCTV, VDS, VMS

### giải pháp
- kích cỡ marker tùy chỉnh sao cho đẹp khi zoom in/out 
```
marker của tôi trên leaflet mặc định giữ nguyên size, zoom in hay out nó vẫn vậy
làm sao để chỉnh sửa kích cỡ marker trong range zoom từ 10-15
```



### kế hoạch triển khai 
- chuẩn bị data  
  + polyline 
  + heat  
  + marker 

- trước mắt
  + đảm bảo các UI được hiển thị 
    * tổng hợp các đầy đủ các polyline (dạng đơn giản)
    * polyline có thể nhận event click
    * hiển thị đầy đủ các loại heat 
    * làm 1 control panel dùng cho filter polyline, heat và marker  
  + đảm bảo các feature được implement 
    * sử dụng react query để lưu trạng thái của các polyline và heat 
    * cứ interval 1 phút nó sẽ refetch lại data 

- hoàn thiện
  + thêm animation cải thiện UX   
    * nhấp nháy marker khi sự cố thiết bị 
    * nhấp nháy polyline khi tuyến đường bị ùn tắc 
    * high light viền đen đoạn đường polyline khi click 
    * bật tắt geojson
  + cần tìm cách sao cho tính heat dựa trên cụm lưu lượng gần nhau 
    (hoặc chế thêm chức năng tính toán lưu lượng dưa trên bán kính, yêu cầu BE phải tự detect được khu vực đang ùn tắc có bán kính bao nhiêu)

### todo
- cuốn bẫy hạnh phúc đang làm tới chương 3
- cuốn tâm lý hành vi mở 3 tab: sigil, pdf gốc, text đang convert dở 


