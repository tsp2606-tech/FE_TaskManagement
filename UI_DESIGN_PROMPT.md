# Prompt Gen Giao Diện Dự Án Task Management

Bạn là một AI chuyên thiết kế giao diện frontend hiện đại. Hãy tạo giao diện cho dự án **Task Management** dựa trên REST API quản lý công việc bên dưới. Chỉ tập trung vào **UI/UX và component giao diện**, chưa cần tích hợp logic API thật.

## Bối Cảnh Dự Án

Xây dựng giao diện quản lý công việc cho người dùng cá nhân hoặc team nhỏ. Ứng dụng cần giúp người dùng xem danh sách task, tìm kiếm, lọc, phân trang, tạo task mới, xem chi tiết, cập nhật, xóa và chuyển trạng thái task theo đúng workflow.

Tech stack mong muốn:

- React + Vite
- Tailwind CSS
- Lucide React icons
- Component-based architecture
- Responsive desktop/mobile

## API Model

Mỗi task có cấu trúc:

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

Quy định dữ liệu:

- `title`: bắt buộc.
- `description`: không bắt buộc.
- `status`: `todo | doing | done`, mặc định `todo`.
- `priority`: `low | medium | high`, mặc định `medium`.
- `dueDate`: không bắt buộc.
- `createdAt`, `updatedAt`: tự động sinh từ backend.

## API Routes Cần Hỗ Trợ Trên UI

- `GET /api/tasks`: lấy danh sách task.
- `GET /api/tasks?status=todo&priority=high&page=1&limit=10`: filter, search, pagination, sort.
- `POST /api/tasks`: tạo task.
- `GET /api/tasks/:id`: xem chi tiết task.
- `PUT /api/tasks/:id`: cập nhật task.
- `DELETE /api/tasks/:id`: xóa task.
- `PATCH /api/tasks/:id/status`: chuyển trạng thái task.

Business rule chuyển trạng thái:

- Chỉ cho phép `todo → doing → done`.
- Không cho phép chuyển ngược.
- Không cho phép bỏ qua trạng thái, ví dụ `todo → done`.

## Yêu Cầu Giao Diện

Hãy tạo một giao diện quản lý task có cảm giác **professional, clean, productivity-focused**, không phải landing page. Màn hình đầu tiên phải là dashboard thao tác được.

### Layout Chính

Thiết kế một dashboard gồm:

- Sidebar bên trái với logo/tên app: **TaskFlow Admin** hoặc **Task Management**.
- Navigation tối thiểu: Dashboard, Tasks, Calendar, Settings.
- Topbar có search box, notification icon, avatar user.
- Main content hiển thị trang quản lý Tasks.
- Responsive: trên mobile sidebar thu gọn thành menu button.

### Trang Tasks Dashboard

Cần có:

- Header trang: title **Tasks**, subtitle ngắn.
- Nút primary **Add Task**.
- Các statistic cards:
  - Total Tasks
  - Todo
  - Doing
  - Done
  - High Priority
- Toolbar:
  - Search input theo `title`.
  - Filter theo `status`: All, Todo, Doing, Done.
  - Filter theo `priority`: All, Low, Medium, High.
  - Sort theo `createdAt` hoặc `dueDate`.
  - Select limit/page size.
- Hai chế độ xem:
  - Table/List view.
  - Kanban board view theo 3 cột `Todo`, `Doing`, `Done`.

### Task Table/List

Mỗi dòng task cần hiển thị:

- Title.
- Description rút gọn.
- Status badge.
- Priority badge.
- Due date.
- Created date.
- Actions:
  - View detail.
  - Edit.
  - Delete.
  - Move next status.

Yêu cầu UI:

- Status badge:
  - `todo`: gray/blue subtle.
  - `doing`: amber/indigo.
  - `done`: green.
- Priority badge:
  - `low`: muted green.
  - `medium`: blue.
  - `high`: red/orange.
- Due date quá hạn cần có trạng thái nổi bật.

### Kanban Board

Tạo board gồm 3 cột:

- Todo
- Doing
- Done

Mỗi task card gồm:

- Title.
- Description ngắn.
- Priority badge.
- Due date.
- Action menu.
- Button chuyển sang trạng thái tiếp theo nếu hợp lệ.

Không cần drag-and-drop thật nếu chưa làm logic, nhưng UI nên thể hiện rõ workflow chuyển trạng thái.

### Modal Add Task

Modal tạo task gồm:

- Title input, required.
- Description textarea.
- Priority select: low, medium, high.
- Due date picker/input.
- Buttons: Cancel, Create Task.

Không cho nhập `createdAt` hoặc `updatedAt`.

### Modal Edit Task

Modal cập nhật task gồm:

- Title.
- Description.
- Priority.
- Due date.
- Status hiển thị dạng disabled hoặc segmented control có rule.
- Buttons: Cancel, Save Changes.

Không cho sửa `createdAt`.

### Modal Task Detail

Modal hoặc drawer xem chi tiết task gồm:

- Title lớn.
- Full description.
- Status, priority, due date.
- Created at, updated at.
- Timeline nhỏ thể hiện workflow `todo → doing → done`.
- Actions: Edit, Delete, Move Next Status.

### Modal Delete Confirmation

Modal xác nhận xóa gồm:

- Icon cảnh báo.
- Nội dung: xác nhận xóa task theo title.
- Text cảnh báo thao tác không thể hoàn tác.
- Buttons: Cancel, Delete Task.

## Trạng Thái UI Cần Có

Thiết kế đầy đủ các state:

- Loading skeleton khi fetch task.
- Empty state khi chưa có task.
- Error state khi API lỗi.
- Disabled state khi đang submit.
- Validation error cho title trống.
- Disabled “Move Next Status” khi task đã `done`.
- Tooltip hoặc helper text khi không thể chuyển trạng thái do rule backend.

## Design Style

Phong cách đề xuất:

- Dashboard tối giản, hiện đại, dễ scan dữ liệu.
- Màu nền sáng hoặc dark mode đều được, nhưng phải nhất quán.
- Ưu tiên bố cục quản trị thực dụng, không dùng hero marketing.
- Border radius vừa phải, khoảng 8px.
- Font rõ ràng, dễ đọc.
- Không dùng quá nhiều gradient trang trí.
- Dùng icon từ `lucide-react`.
- Buttons và input phải có focus/hover state rõ.
- Text không được tràn khỏi button/card trên mobile.

## Cấu Trúc File Mong Muốn

Tạo code theo cấu trúc:

```txt
src/
├── components/
│   └── tasks/
│       ├── TaskTable.jsx
│       ├── TaskKanban.jsx
│       ├── TaskFormModal.jsx
│       ├── TaskDetailModal.jsx
│       ├── DeleteTaskModal.jsx
│       ├── TaskToolbar.jsx
│       └── TaskStats.jsx
├── pages/
│   └── TasksPage/
│       └── index.jsx
├── services/
│   └── api/
│       ├── apiTask.js
│       └── index.js
├── App.jsx
└── index.css
```

## Dữ Liệu Mock Cho UI

Nếu chưa tích hợp API thật, dùng mock data:

```js
const tasks = [
  {
    _id: "1",
    title: "Học Express.js",
    description: "Hoàn thành REST API quản lý công việc",
    status: "todo",
    priority: "high",
    dueDate: "2026-08-20T00:00:00.000Z",
    createdAt: "2026-08-16T08:00:00.000Z",
    updatedAt: "2026-08-16T08:00:00.000Z",
  },
  {
    _id: "2",
    title: "Thiết kế giao diện Task Dashboard",
    description: "Tạo table, kanban, modal và filter controls",
    status: "doing",
    priority: "medium",
    dueDate: "2026-08-22T00:00:00.000Z",
    createdAt: "2026-08-16T09:00:00.000Z",
    updatedAt: "2026-08-16T10:00:00.000Z",
  },
  {
    _id: "3",
    title: "Deploy API lên Railway",
    description: "Kiểm tra endpoint production và tài liệu API",
    status: "done",
    priority: "low",
    dueDate: "2026-08-18T00:00:00.000Z",
    createdAt: "2026-08-15T14:00:00.000Z",
    updatedAt: "2026-08-16T11:00:00.000Z",
  },
];
```

## Kết Quả Mong Muốn

Hãy sinh giao diện hoàn chỉnh, chạy được trong React/Vite, gồm:

- Một dashboard task management usable ngay ở màn hình đầu.
- Table view và Kanban view.
- Các modal add/edit/detail/delete.
- Toolbar search/filter/sort/page size.
- Loading/empty/error states.
- Responsive tốt trên desktop và mobile.
- Chưa cần gọi API thật, nhưng code nên đặt props/handler rõ ràng để dễ tích hợp API sau.
