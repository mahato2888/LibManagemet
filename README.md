📖 Easy Library Management System
A beginner-friendly Library Management System using Django REST Framework (Backend) and React (Frontend).

📂 Project Structure:
Copy
Edit
LibraryManagement/
├── backend/ (Django API)
├── frontend/ (React App)
🔥 Installation & Setup:
Clone the Project:

sh
Copy
Edit
git clone https://github.com/mahato2888/LibManagemet.git
Backend (Django):

sh
Copy
Edit
cd backend
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
Frontend (React):

sh
Copy
Edit
cd ../frontend
npm install
npm run dev
🌟 Features:
Admin Signup, Login & Book Management (Create, Edit, Delete)

Students can View Books

📌 Tech Stack:
Django, React, MySQL, Axios, Token Authentication.