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
    const good_fb = stats.good
    const neutral_fb = stats.neutral
    const bad_fb = stats.bad
    const all_fb = good_fb + neutral_fb + bad_fb
    
    if (all_fb > 0) {
        const average_fb = Math.round((good_fb - bad_fb) / all_fb * 100) / 100
        const positive_fb_percent = Math.round(good_fb / all_fb * 100)
        return (
            <div>
                <Header>statistics</Header>            
                <Stat text='good' value={good_fb} /> 
                <Stat text='neutral' value={neutral_fb} /> 
                <Stat text='bad' value={bad_fb} /> 
                <Stat text='all' value={all_fb} /> 
                <Stat text='average' value={average_fb} /> 
                <Stat text='positive' value={positive_fb_percent + '%'} /> 
            </div>
        )
    }

    return <p>No feedback given</p>
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
