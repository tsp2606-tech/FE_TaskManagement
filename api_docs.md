**Mục tiêu:** Xây dựng REST API quản lý công việc (`Task`) sử dụng Node.js/Express và MongoDB.

### 1. Task Model

Mỗi task gồm:

```json
{
  "_id": "...",
  "title": "Học Express.js",
  "description": "Hoàn thành REST API",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2026-08-20T00:00:00.000Z",
  "createdAt": "...",
  "updatedAt": "..."
}
```

Quy định:

- `title`: bắt buộc.
- `description`: không bắt buộc.
- `status`: `todo | doing | done`, mặc định `todo`.
- `priority`: `low | medium | high`, mặc định `medium`.
- `dueDate`: không bắt buộc.
- Tự động tạo `createdAt`, `updatedAt`.

### 2. API Requirements

#### Lấy danh sách task

```
GET /api/tasks
```

Hỗ trợ:

- Filter theo `status`, `priority`.
- Search theo `title`.
- Pagination với `page`, `limit`.
- Sort theo `createdAt` hoặc `dueDate`.

Ví dụ:

```
GET /api/tasks?status=todo&priority=high&page=1&limit=10
```

#### Tạo task

```
POST /api/tasks
```

Body:

```json
{
  "title": "Học Express.js",
  "description": "Hoàn thành REST API",
  "priority": "high",
  "dueDate": "2026-08-20"
}
```

#### Lấy chi tiết task

```
GET /api/tasks/:id
```

Task không tồn tại → `404`.

#### Cập nhật task

```
PUT /api/tasks/:id
```

Cho phép cập nhật các field hợp lệ, **không được phép cập nhật `createdAt`**.

#### Xóa task

```
DELETE /api/tasks/:id
```

Task không tồn tại → `404`.

### 3. Business Logic

Tạo API:

```
PATCH /api/tasks/:id/status
```

Body:

```json
{
  "status": "doing"
}
```

Chỉ cho phép chuyển trạng thái theo thứ tự:

```
todo → doing → done
```

Không cho phép chuyển ngược trạng thái hoặc bỏ qua trạng thái.

Ví dụ:

```
todo → done   ❌
done → doing  ❌
doing → todo  ❌
```

### 4. Validation & Error Handling

API cần xử lý tối thiểu:

- Request body không hợp lệ → `400`.
- MongoDB ObjectId không hợp lệ → `400`.
- Task không tồn tại → `404`.
- Server/database error → `500`.
- Response lỗi có format thống nhất.

### 5. Yêu cầu

- Code git repo dự án tên API_TaskManagement
- Deploy ở Railway
- Tạo file .http để test tất cả route API
- Tạo file api_docs.md (Tài liệu đặc tả API)
