import './styles.css';

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.targetTime = targetDate.getTime()
        this.selector = document.querySelector(selector);
        this.refs = {
            days: this.selector.querySelector('span[data-value="days"]'),
            hours: this.selector.querySelector('span[data-value="hours"]'),
            mins: this.selector.querySelector('span[data-value="mins"]'),
            secs: this.selector.querySelector('span[data-value="secs"]'),
        }
        this.start();
    }

    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const time = this.targetTime - currentTime;
            const timeComponents = this.getTimeComponents(time);
            this.updateTimerFace(timeComponents);
            if (time < 1000) {
                clearInterval(this.intervalId);
                return;
            }
        }, 1000)
    }

    pad(value) {
        return String(value).padStart(2, '0');
    };

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs }
    }

    updateTimerFace({ days, hours, mins, secs }) {
        this.refs.days.textContent = days;
        this.refs.hours.textContent = hours;
        this.refs.mins.textContent = mins;
        this.refs.secs.textContent = secs;
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Dec 04, 2020'),
});
