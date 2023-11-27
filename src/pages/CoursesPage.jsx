import React, { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"

import CourseModal from "../components/CourseModal"
import { MoonLoader } from "react-spinners"
import { useDispatch } from "react-redux"
import { setCourse } from "../features/courseSlice"

import axios from "../api/axios"

const CoursesPage = () => {
  const [search, setSearch] = useState("")

  const [render, setRender] = useState(false)

  const [courses, setCourses] = useState([])

  const dispatch = useDispatch()

  const fetchData = async () => {
    const response = await axios.get(
      "https://65477e13902874dff3ac6052.mockapi.io/courses"
    )

    setCourses(response.data)
    setRender(true)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="h-screen w-full overflow-y-scroll">
      <nav className="z-10 py-4 sticky top-0 w-full flex items-center justify-around border-b border-gray-300 shadow-md bg-gray-100">
        <img
          src="./logo.png"
          alt="LOGO"
          width={120}
          height={120}
          className="cursor-pointer"
        />
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Type to search..."
            className="w-[200px] md:w-[500px] outline-none py-2 pl-4"
          />
          <button className="max-md:hidden">
            <CiSearch className="w-10 h-10 opacity-60" />
          </button>

          <button className="hover:text-blue-900 hover:border-blue-900 rounded-sm border border-blue-500 text-blue-500 font-semibold py-2 px-4">
            Login
          </button>
        </div>
      </nav>

      {render ? (
        <main className="flex items-center justify-center w-full h-auto py-10 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {courses
              .filter((course) => {
                return search.toLowerCase() === ""
                  ? course
                  : course.name.toLowerCase().includes(search)
              })
              .map((course) => (
                <div
                  className="bg-indigo-200/50 w-[300px] rounded-md overflow-hidden shadow-sm hover:scale-105 hover:duration-300 cursor-pointer hover:shadow-xl hover:rounded-none border"
                  key={course.id}
                  onClick={() => {
                    console.log("course clicked")
                    dispatch(setCourse(course))
                  }}
                >
                  <img src={course.thumbnail} className="h-[120px]" />
                  <div className="bg-white py-6 pl-4">
                    <span className="text-gray-400">{course.duration}</span>
                    <br />
                    <span className="font-bold">{course.name}</span>

                    <p className="text-gray-500">
                      <br />
                      &#11088;{course.rating}&emsp;|&emsp;{course.students}{" "}
                      Students
                    </p>
                  </div>
                  <button className="py-2 text-blue-600 font-semibold pl-4">
                    Know more &#8250;
                  </button>
                </div>
              ))}
          </div>
        </main>
      ) : (
        <div className="w-full h-96 flex justify-center items-center text-blue-400">
          <MoonLoader color="#000000" speedMultiplier={1.5} />
        </div>
      )}

      <CourseModal />
    </div>
  )
}

export default CoursesPage
