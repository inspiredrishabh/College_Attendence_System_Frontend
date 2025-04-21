# College Attendance System Frontend

A modern web application for managing student attendance in educational institutions efficiently and accurately.

## 📚 Features

- **Authentication System**: Secure login for students and faculty.
- **Faculty Dashboard**: Faculty interface to start attendance sessions and monitor student participation
- **Student Portal**: Easy attendance submission and history tracking for students
- **Attendance Analytics**: Visual representation of attendance patterns and statistics
- **Export Functionality**: Download attendance records in CSV format for further processing
- **Responsive Design**: Works seamlessly across desktops, tablets, and mobile devices
- **Real-time Updates**: Instant reflection of attendance status after submission

## 🛠️ Technologies Used

- React.js for frontend development
- Material UI for responsive design components
- Axios for API communication
- Chart.js for attendance analytics and reports

## 📋 Prerequisites

- Node.js (v14.0.0 or above)
- npm (v6.0.0 or above)
- Backend API running (refer to the backend repository)

## 🚀 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/inspiredrishabh/college-attendance-system-frontend.git
   cd college-attendance-system-frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables

   - VITE_API_URL=http://localhost:5000
   - VITE_API_MARK=/api/attendance/mark-attendance
   - VITE_API_START=/api/attendance/start-attendance
   - VITE_API_COUNT=/api/attendance/count
   - VITE_API_CSV=/api/attendance/export-csv

   - Update the API base URL and other configurations

4. Start the development server
   ```bash
   npm run dev
   ```

## 🤝 Contributing

We welcome contributions to enhance the system:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
