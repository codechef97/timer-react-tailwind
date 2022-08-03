import React,{ useState, useEffect } from 'react';


const Timer = (props) => {
    let intervalId = null;

    const updatedTime = JSON.parse(window.localStorage.getItem('timeLeft')) || {};

    var durationSplit = props.duration && props.duration.split(":");
    var propDuration = durationSplit && {
        hours :  parseInt(durationSplit[0]),
        minutes: parseInt(durationSplit[1]),
        seconds: parseInt(durationSplit[2])
    };
    const defaultTime = {
        hours: updatedTime.hours || (propDuration && propDuration.hours) || 0,
        minutes: updatedTime.minutes || (propDuration && propDuration.minutes) || 0,
        seconds: updatedTime.seconds || (propDuration && propDuration.seconds) || 0
    };
    const [time, setTime] = useState(defaultTime);

    const startTimer = () => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            props.changeState({ isCompleted: true });
            clearInterval(intervalId);
        } else if (time.minutes === 0 && time.seconds === 0) {
            setTime({
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
            });
        } else if (time.seconds === 0) {
            setTime({
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
            });
        } else {
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
            });
        }
    };
    const addPad = data => data.toString().padStart(2, 0);

    useEffect(() => {
        setTime(defaultTime);
    },[propDuration? propDuration.seconds : 0]);

    useEffect(() => {
        intervalId = setInterval(() => startTimer(), 1000);

        window.localStorage.setItem('timeLeft', JSON.stringify(time));

        return () => clearInterval(intervalId);
    }, [time]);

    return (
        <div className="duration grid grid-cols-5 justify-center gap-2 text-center text-white">
            <div className="hours">
                <p>{ addPad(time.hours) }</p>
                <small className="text-sm">Hours</small>
            </div>
            <span>:</span>
            <div className="minutes">
                <p>{ addPad(time.minutes) }</p>
                <small className="text-sm">Minutes</small>
            </div>
            <span>:</span>
            <div className="seconds">
                <p>{ addPad(time.seconds) }</p>
                <small className="text-sm">Seconds</small>
            </div>
        </div>
    )
}

export default Timer;