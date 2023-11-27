import { configureStore } from "@reduxjs/toolkit"
import courseReducer from "./features/courseSlice"

export const store = configureStore({
  reducer: courseReducer,
})

export const data = [
  {
    name: "Digital Marketing",
    instructor: "Bhargav",
    description:
      "Become an ace digital marketer - learn Google Analytics, Google Ads, SEO, social media marketing, email marketing, and more.",
    enrollmentStatus: "open",
    thumbnail:
      "https://trainings.internshala.com/cached_uploads/homepage/media/courses_section/card_images/digital-marketing.png",
    schedule: "1hr/day (flexible schedule)",
    location: "online",
    prerequisites: [
      "Basic Understanding of Web Presence",
      "Basic knowledge on Web Development",
    ],
    syllabus: [
      "Building Web Presence",
      "Search Engine Optimization",
      "Digital Advertising with Google Ads",
      "Google Ads Search Certification",
      "Social Media Marketing",
      "Email Marketing",
      "Inbound Marketing",
      "Revisiting Google Analytics",
      "Newer Trends in Digital Marketing",
      "Final Project",
    ],
    students: 1001,
    rating: "4.5",
    id: "3",
  },
]
