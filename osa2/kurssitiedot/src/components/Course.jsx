const Course = ({ course }) => {
    return (
        <div className="course">
            <Header>{course.name}</Header>
            <Content parts={course.parts} />
        </div>
    )
}

const Header = ({ children }) => (
        <h1>{children}</h1>
)

const Content = ({ parts }) => {
    return (
        <div className="course_parts">
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

export default Course
