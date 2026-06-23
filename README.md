# EazyEd

A student-focused academic resource platform designed to help university students access study materials, tutorials, announcements, and study tips in one place.

**Live Demo:** https://eazyed.vercel.app/

**GitHub Repository:** https://github.com/yusjeng21/EazyEd

---

## Overview

EazyEd is a frontend e-learning platform developed to solve real student workflow issues. Built with a strong focus on Human-Computer Interaction (HCI) principles, the platform brings together course materials, video tutorials, announcements, and study tips into a streamlined, mobile-first user interface.

---

## Preview

<img width="1920" height="2541" alt="Home_page" src="https://github.com/user-attachments/assets/f0d5fa00-9787-4cf2-a38f-d4a0edf1846e" />

<img width="412" height="3298" alt="Resources_mobile" src="https://github.com/user-attachments/assets/6a36bf18-5858-483b-b9fa-f3ed0cb46130" />

<img width="1920" height="3068" alt="Tutorials_page" src="https://github.com/user-attachments/assets/97f47a62-b5f4-495f-bb0b-5f93d833b237" />
<img width="1920" height="961" alt="Tutorials_Video_Modal" src="https://github.com/user-attachments/assets/8082881d-8d3e-4a65-862a-a01f33e489f3" />

<img width="412" height="2784" alt="Announcements_mobile" src="https://github.com/user-attachments/assets/cc17172f-e21d-40c1-b0d8-d7cef80f1e91" />
<img width="414" height="894" alt="Announcements_Modal" src="https://github.com/user-attachments/assets/9bcf5cc9-ebc9-4525-8013-2e90a006e04a" />

<img width="1920" height="1572" alt="Study-Tips_page" src="https://github.com/user-attachments/assets/bca2de38-1cd2-4978-9a93-fcac2d77baf6" />

<img width="412" height="2690" alt="Contact_mobile" src="https://github.com/user-attachments/assets/96229ef8-c306-4b3b-970a-9e253f5a79ca" />

<img width="1920" height="1379" alt="Bookmarks_page" src="https://github.com/user-attachments/assets/019e32b4-4ea9-495f-adb0-a5d5046463b4" />
<img width="412" height="2346" alt="Bookmarks_Mobile menu" src="https://github.com/user-attachments/assets/89f8108d-ffd6-43f1-88ea-f110b642ae8c" />

---

## Features

### Resources
* Browse academic resources and study materials
* Search resources by title or course
* Filter by school and course
* Sort by newest or oldest
* **Resource Request System:** Built-in form allowing students to request missing course materials directly
* Bookmark important resources

### Tutorials
* Video tutorial catalog with embedded YouTube tutorials
* **Video Modals:** Seamless, in-page iframe video players to keep users engaged without redirecting
* Search and filtering functionality
* Bookmark tutorials

### Announcements
* Academic notices and updates
* Priority indicators for urgent information
* Search and sorting functionality

### Study Tips & Support
* Curated study strategies and academic success tips in a clean card layout
* **Contact & FAQ Hub:** Dedicated support page with collapsible accordion FAQs and a contact submission form

### Bookmarks
* Save resources and tutorials for later access
* Persistent storage using browser Local Storage

### User Experience
* **Advanced Responsive Pagination:** Custom, fixed-length pagination that dynamically restructures its layout for optimal mobile thumb-reachability (Fitts's Law)
* Responsive design perfectly scaled for both desktop and mobile devices
* Dark mode support
* Toast notifications for real-time user feedback
* Smooth, frictionless page navigation

---

## Technology Stack

### Frontend
* React
* React Router
* Vite

### Styling
* Tailwind CSS

### UI Components
* Lucide React
* Custom reusable components

### State Management & Storage
* React Context API
* Browser Local Storage

### Deployment
* Vercel

---

## Installation

Clone the repository:

```bash
git clone [https://github.com/yusjeng21/EazyEd.git](https://github.com/yusjeng21/EazyEd.git)
```

Navigate to the project directory:

```bash
cd EazyEd
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Project Structure

```text
src/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── libs/
├── pages/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

---

 ## Key Learning Outcomes

* Building scalable React applications
* State management with Context API
* Implementing client-side pagination and advanced responsive layout shifts
* Persisting user data with Local Storage
* Creating responsive UI with Tailwind CSS ailored to HCI principles
* Deploying production applications with Vercel 

---

 ## Future Improvements

* Backend database integration
* User authentication and secure profiles
* Resource uploads and peer-to-peer file managemen
* Analytics dashboard for study habits
* Personalized recommendations
* Course discussion forums
* Push notifications for new announcements

---

## Authors

Developed as a university project.

---

## License

This project was created for educational purposes.
