import Course from './Course'

const CourseList = ({ courses }) => courses.map(course => <Course key={course.id} course={course} />)

export default CourseList
