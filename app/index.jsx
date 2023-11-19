import * as React from "react";
import * as ReactDom from "react-dom/client";
import "./index.css";

const Popular = React.lazy(() => import("./components/popular"));
const Battle = React.lazy(() => import("./components/battle"));
const Results = React.lazy(() => import("./components/results"));

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/loading";
const consoleStyle =
  "background: blue; color: white; font-size: xxx-large; border-radius: 10px;margin:10px; padding: 10px";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
    };
  }

  componentDidMount() {
    console.log("%cLearnt and Built by SP", consoleStyle);
  }

  toggleTheme = () => {
    return this.setState(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    const { theme } = this.state;
    return (
      <Router>
        <div className={theme}>
          <div className="container">
            <Nav theme={theme} toggleTheme={this.toggleTheme.bind(this)} />
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Popular />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </React.Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("app");
const root = ReactDom.createRoot(rootElement);
root.render(<App />);
