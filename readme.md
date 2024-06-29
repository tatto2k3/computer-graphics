## 1. Giới thiệu

Dự án Trực quan hóa Hệ mặt trời 3D là một ứng dụng dựa trên web tương tác cho phép người dùng khám phá Hệ mặt trời trong môi trường ba chiều. Dự án được phát triển bằng thư viện Three.js, thư viện này cung cấp các công cụ mạnh mẽ để tạo nội dung 3D trên web. Người dùng có thể chứng kiến ​​sự quay của các hành tinh quanh Mặt trời và sự tự quay của chúng, cũng như tận hưởng vẻ đẹp của không gian trong trải nghiệm sống động này.

## 2. Tổng quan dự án

Dự án bao gồm một tệp HTML dùng để thiết lập trang web, tải các thư viện cần thiết và xác định cấu trúc cơ bản. Tệp JavaScript chính, `solarSystem.js`, chứa mã tạo cảnh 3D, tải họa tiết cho các hành tinh và không gian, đồng thời xử lý hoạt ảnh và tính tương tác.

## 3. Tính năng

- Hình ảnh 3D thực tế của Hệ Mặt trời.
- Điều khiển tương tác để khám phá các hành tinh và quỹ đạo của chúng.

#### Kiểm soát tốc độ

Bạn có thể điều chỉnh tốc độ hoạt ảnh theo sở thích của mình. Thanh trượt `speed` trong GUI cho phép bạn kiểm soát tốc độ các hành tinh quay và di chuyển quanh Mặt trời. Trượt nó sang phải để tăng tốc độ hoạt ảnh và sang trái để làm chậm hoạt ảnh.

#### Hiện/Ẩn đường đi của hành tinh

Ứng dụng này cung cấp tùy chọn hiển thị hoặc ẩn đường đi của các hành tinh khi chúng quay quanh Mặt trời. Bằng cách bật nút chuyển đổi "Hiển thị đường dẫn" trong GUI, bạn có thể hình dung quỹ đạo của các hành tinh. Việc vô hiệu hóa nó sẽ ẩn các đường dẫn, cho phép có cái nhìn rõ ràng hơn về Hệ Mặt trời.

#### Ánh sáng thực tế

Tùy chọn "Chế độ xem thực" trong GUI tái tạo các điều kiện trong không gian, nơi các phần của hành tinh quay mặt ra xa Mặt trời không được chiếu sáng và có vẻ tối hơn. Khi được bật, ứng dụng sẽ điều chỉnh ánh sáng để tạo ra hình ảnh chân thực hơn về diện mạo của các hành tinh.

## Cấu hình và cài đặt
- Bước 1: Clone source code từ đường dẫn git.
- Bước 2: Mở code trên VS Code và chạy file index.html.