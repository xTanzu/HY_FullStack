import { useState } from 'react'

const Header = ({children}) => {
    return (
        <h1>{children}</h1>
    )
}

const Feedback = ({handleClick}) => {
    return (
        <div>
            <Header>give feedback</Header>
            <Button handleClick={() => handleClick('good')} text='good'/>
            <Button handleClick={() => handleClick('neutral')} text='neutral'/>
            <Button handleClick={() => handleClick('bad')} text='bad'/>
        </div>        
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>        
    )
}

const Statistics = ({stats}) => {
    return (
        <div>
            <Header>statistics</Header>            
            <Stat text='good' value={stats.good} /> 
            <Stat text='neutral' value={stats.neutral} /> 
            <Stat text='bad' value={stats.bad} /> 
        </div>
    )
}

const Stat = ({text, value}) => {
    return (
        <div>{text} {value}</div>
    )
}
const App = () => {

    const [fbStats, setFbStats] = useState({good: 0, neutral: 0, bad: 0}) 
    const handleClick = (signal) => {
        if (signal === 'good') {
            setFbStats(( currentStats ) => ({...currentStats, good: currentStats.good + 1}))
        } else if (signal === 'neutral') {
            setFbStats(( currentStats ) => ({...currentStats, neutral: currentStats.neutral + 1}))
        } else if (signal = 'bad') {
            setFbStats(( currentStats ) => ({...currentStats, bad: currentStats.bad + 1}))
        }
    }

    return (
        <>
            <Feedback handleClick={handleClick} />
            <Statistics stats={fbStats}/>
        </>
    )
}

export default App
