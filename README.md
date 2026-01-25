# GPA Calculator (Bảng Tính Điểm GPA)

A simple and intuitive web-based GPA calculator that helps students calculate their Grade Point Average based on their subject scores.

## Features

- **Add Subjects**: Easily add subjects with names and scores
- **Calculate GPA**: Automatically calculates GPA based on Vietnamese grading system
- **Edit Subjects**: Modify existing subject information
- **Delete Subjects**: Remove subjects you no longer need
- **Real-time Summary**: Shows total subjects, average grades (scale 10 and 4), and overall ranking
- **Responsive Design**: Works well on both desktop and mobile devices

## Grading System

The calculator uses the Vietnamese grading system:
- **Scale 10**: 0-10 points
- **Letter Grades**: A, B+, B, C+, C, D+, D, F
- **Scale 4**: 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0
- **Rankings**: Giỏi (Excellent), Khá giỏi (Very Good), Khá (Good), Trung bình khá (Average Good), Trung bình (Average), Trung bình yếu (Below Average), Yếu (Weak), Kém (Poor)

## Scoring Formula

The final grade is calculated using the weighted average:
```
Final Grade = CC × 0.1 + GK × 0.3 + KT × 0.6
```
Where:
- CC: Chuyên cần (Attendance/Diligence) - 10%
- GK: Giữa kỳ (Midterm Exam) - 30%
- KT: Cuối kỳ (Final Exam) - 60%

## How to Use

1. Enter the subject name in the "Tên môn học" field
2. Input scores for CC (Chuyên cần), GK (Giữa kỳ), and KT (Cuối kỳ)
3. Click "➕ Thêm môn" to add the subject
4. View the calculated results in the table
5. Use "✏️ Sửa" to edit existing subjects
6. Use "🗑️ Xoá" to delete subjects

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Responsive Grid Layout

## Installation

Simply download the `index.html` file and open it in any modern web browser. No installation required!

## Customization

You can customize the application by modifying:
- Styling in the `<style>` section
- Calculation formulas in the JavaScript
- Color schemes and layout

## Author

Created by van vinh

## License

This project is open source and available under the MIT License.