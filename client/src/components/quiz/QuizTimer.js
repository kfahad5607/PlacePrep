import React, { useState, useEffect, useRef } from 'react';

const QuizTimer = (props) => {

    let durInSec = Math.round((new Date(props.endAt).getTime() - new Date().getTime()) / 1000);
    let durMin = Math.floor(durInSec / 60);
    let durSec = durInSec % 60;

    const [countdownDate, setCountdownDate] = useState(new Date(props.endAt).getTime());
    const [timer, setTimer] = useState({
        minutes: durMin,
        seconds: durSec
    });

    let myInterval;
    useEffect(() => {
        myInterval = setInterval(() => setNewTime(), 1000);

        return () => clearInterval(myInterval);
    }, [timer]);

    const setNewTime = () => {
        if (timer.seconds <= 0 && timer.minutes <= 0) {
            return clearInterval(myInterval);
        }
        else if (countdownDate) {
            const currentTime = new Date().getTime();

            const distanceToDate = countdownDate - currentTime;

            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
            setTimer({ minutes, seconds });
        }
    };


    return (
        (timer.minutes <= 0 && timer.seconds <= 0) ?
            (<span className='time_sec float-right mt-1 pr-1' >Time's Up!</span>)
            :
        (<span className='time_sec float-right mt-1 pr-1' >{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</span>)
    );
};

export default QuizTimer;
