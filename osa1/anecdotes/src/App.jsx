import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Heading = ({children}) => {
    return <h1>{children}</h1>
}

const Anecdote = ({content, votes}) => {
    return ( 
        <>
            <p>{content}</p>
            <p>has {votes} votes</p>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
        'The only way to go fast, is to go well.'
    ]


    const [selected, setSelected] = useState(randInt(anecdotes.length))
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    let mostVotes = indexOfMax(votes)
    
    const onNextAnecdote = () => {
        setSelected(randInt(anecdotes.length, selected))
    }

    const onVote = () => {
        const newVotes = [...votes]
        newVotes[selected]++
        setVotes(newVotes)
    }

    return (
        <div>
            <Heading>Anecdote of the day</Heading>
            <Anecdote content={anecdotes[selected]} votes={votes[selected]} />
            <Button text='vote' onClick={onVote} />
            <Button text='next anecdote' onClick={onNextAnecdote} />
            <Heading>Anecdote with most votes</Heading>
            <Anecdote content={anecdotes[mostVotes]} votes={votes[mostVotes]} />
        </div>
    )
}

/* ------------ Helper functions ------------ */

const randInt = (ceil, avoid = -1) => {
    let rndInt
    do {
        rndInt = Math.floor(Math.random() * ceil)
    } while (rndInt === avoid)
    return rndInt
}

const indexOfMax = (arr) => {
    if (arr.length === 0) {
        return -1
    }

    let maxIndex = 0
    let maxValue = arr[maxIndex]

    for (let i=1; i<arr.length; i++) {
        if (arr[i] > maxValue) {
            maxIndex = i
            maxValue = arr[i]
        }
    }

    return maxIndex
}

export default App
