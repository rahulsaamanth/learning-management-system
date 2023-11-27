import { useDispatch, useSelector } from "react-redux"
import { selectCourse, setCourse } from "../features/courseSlice"
import _ from "lodash"

const CourseModal = () => {
  const dispatch = useDispatch()
  const selected = useSelector(selectCourse)

  console.log(selected)
  if (_.isEmpty(selected)) return <></>

  return (
    <div
      className="z-50 cursor-pointer fixed bg-black/50 inset-0 w-full h-screen grid place-items-center"
      onClick={() => dispatch(setCourse(null))}
    >
      <div className="text-white" onClick={(e) => e.stopPropagation()}>
        {selected.name}
      </div>
    </div>
  )
}

export default CourseModal
