import {createSignal, onCleanup} from "solid-js";
import html from "solid-js/html";

const Home = () => {
  //const bellUrl = "https://upload.wikimedia.org/wikipedia/commons/b/bd/Bienenkorbglocke.1133.Hz.ogg";
  const initialTimes = Object.freeze([25, 5]);
  const [pomodorosCompleted, setPomodorosCompleted] = createSignal(0);
  const [durationMinutes, setDurationMinutes] = createSignal(initialTimes);
  const [labels, setLabels] = createSignal(["work", "break"]);
  const [running, setRunning] = createSignal(false);
  const [interval, setInterval_] = createSignal(0);
  const [time, setTime] = createSignal(new Date());
  const [endTime, setEndTime] = createSignal(new Date());

  const startTimer = () => {
    setInterval_(prev => {
      clearInterval(prev);
      return setInterval(() => {
        const diff = endTime() - time();

        if (diff <= 0) {
          //clearInterval(interval());
          const type = durationMinutes()[0] === initialTimes[0];
          setEndTime(new Date(new Date().getTime() + durationMinutes()[1] * 60_000));
          setDurationMinutes(prev => [...prev].reverse());
          setLabels(prev => [...prev].reverse());
          //new Audio(bellUrl).play();
          
          if (!type) {
            setPomodorosCompleted(prev => prev + 1);
          }

          alert(type ? "Break done!" : "Pomodoro done!");
        }

        setTime(new Date());
      }, 100);
    });
    setEndTime(new Date(new Date().getTime() + durationMinutes()[0] * 60_000));
    setDurationMinutes(prev => [...prev].reverse());
  };

  const toggleTimer = () => {
    if (running()) {
      setDurationMinutes(initialTimes);
      clearInterval(interval());
    }
    else {
      startTimer();
    }

    setRunning(prev => !prev);
  };

  const keyListener = event => {
    if (event.code === "Space") {
      event.preventDefault();
      toggleTimer();
    }
  };
  document.addEventListener("keydown", keyListener);

  onCleanup(() => {
    clearInterval(interval);
    document.removeEventListener("keydown", keyListener);
  });

  const pad = x => `${x}`.padStart(2, 0);

  const fmtTime = () => {
    const diff = endTime() - time();
    const diffT = new Date(diff >= 0 ? diff : 0);
    return `${pad(diffT.getMinutes())}:${pad(diffT.getSeconds())}`;
  };

  return html`
    <div>
      <div style=${{"display": "flex", "align-items": "center"}}>
      <h1>
        ${fmtTime}
      </h1>
      <p style=${{"margin-left": "0.5em"}}>
        <small>(${labels()[0]} time)</small>
      </p>
      </div>
      <button style=${{padding: "0.4em"}} type="button" onClick=${toggleTimer}>
        ${() => running() ? "Stop" : "Start"}
      </button>
      <p>
        Pomodoros completed: ${() => pomodorosCompleted}
      </p>
    </div>
  `;
};

export default Home;
