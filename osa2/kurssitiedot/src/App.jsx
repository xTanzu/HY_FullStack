import { useState } from 'react'

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

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <Course course={course} />
    )
}

export default App
