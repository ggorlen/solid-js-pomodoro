import html from "solid-js/html";
import {render} from "solid-js/web";
import {A, Route, Router, Routes} from "@solid-js/router";

import Home from "./Home.mjs";
import About from "./About.mjs";

// experimental chrome flag only for now, apparently
// import sheet from "./style.css" assert {type: "css"};
// document.adoptedStyleSheets = [sheet];

const App = () => {
  return html`
    <${Router}>
      <header>
        <h2>Solid Pomodoro</h2>
        <nav>
          <${A} href="/">Home</A> | 
          <${A} href="/about">About</A>
        </nav>
      </header>
      <${Routes}>
        <${Route} path="/" component=${() => Home} />
        <${Route} path="/about" component=${() => About} />
      </Routes>
    </Router>
  `;
};

render(App, document.querySelector("#app"));
