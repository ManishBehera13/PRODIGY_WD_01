document.addEventListener('DOMContentLoaded', (event) => {
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');
    let lapButton = document.getElementById('laps');
    let lapsContainer = document.querySelector('.laps');

    let minutesElement = document.querySelector('.minutes');
    let secondsElement = document.querySelector('.second');
    let millisecondsElement = document.querySelector('.milliseconds');

    let timer;
    let running = false;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

    startButton.addEventListener('click', function() {
        if (running) {
            clearInterval(timer);
            startButton.textContent = 'Start';
        } else {
            timer = setInterval(updateTime, 10);
            startButton.textContent = 'Pause';
        }
        running = !running;
    });

    resetButton.addEventListener('click', function() {
        clearInterval(timer);
        running = false;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        minutesElement.textContent = '00 :';
        secondsElement.textContent = '00 :';
        millisecondsElement.textContent = '00';
        startButton.textContent = 'Start';
        lapsContainer.innerHTML = '';
    });

    lapButton.addEventListener('click', function() {
        if (running) {
            let lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
            let lapElement = document.createElement('div');
            lapElement.className = 'lap';
            lapElement.textContent = lapTime;
            lapsContainer.appendChild(lapElement);
        }
    });

    function updateTime() {
        milliseconds += 10;
        if (milliseconds >= 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        minutesElement.textContent = formatTime(minutes) + ' :';
        secondsElement.textContent = formatTime(seconds) + ' :';
        millisecondsElement.textContent = formatMilliseconds(milliseconds);
    }

    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    function formatMilliseconds(time) {
        if (time < 10) {
            return '00' + time;
        } else if (time < 100) {
            return '0' + time;
        } else {
            return time;
        }
    }
});