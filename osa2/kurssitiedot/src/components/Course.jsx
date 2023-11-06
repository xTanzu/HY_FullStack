const Course = ({ course }) => {
    return (
        <div className="course">
            <Header>{course.name}</Header>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
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

const Total = ({ parts }) => {
    const totalExerciseAmount = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p><b>total of {totalExerciseAmount} exercises</b></p>
    )
}

export default Course
