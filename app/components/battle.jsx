import * as React from "react";
import { getCloseIcon } from "./icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <section className="instructions-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 Github users</li>
        <li>Battle</li>
        <li>See the winners</li>
      </ol>
    </section>
  );
};

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      label: props.label || "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const userName = e.target.value;
    return this.setState({ userName });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userName = this.state.userName;
    return this.props.handleSubmit(userName);
  };

  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.state.label}
        </label>
        <div className="input-row">
          <input
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.userName || ""}
            onChange={this.handleChange}
          />
          <button
            className="btn link"
            type="submit"
            disabled={!this.state.userName}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const PlayerInfo = ({ label, userName, onRemoveClick }) => {
  return (
    <article className="card">
      <h3 className="player-label">{label} </h3>
      <div className="split">
        <div className="row gap-md">
          <img
            width="32"
            height="32"
            className="avatar"
            src={`https://github.com/${userName}.png?size=200`}
            alt="Avatar for as"
          />
          <a href={`https://github.com/${userName}`} className="link">
            {userName}
          </a>
        </div>
        <button className="btn secondary icon" onClick={onRemoveClick}>
          {getCloseIcon()}
        </button>
      </div>
    </article>
  );
};

PlayerInfo.propTypes = {
  label: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  };
  handleSubmit = (id, value) => {
    return this.setState({ [id]: value });
  };

  onRemoveUser = (id) => {
    return this.handleSubmit(id, null);
  };

  render() {
    const { playerOne, playerTwo, battle } = this.state;
    const disabled = !!playerOne && !!playerTwo;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Players</h1>
          <Link
            to={{
              pathname: "/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
            className={`btn primary ${disabled ? "" : " disabled"}`}
          >
            Battle
          </Link>
        </div>
        <section className="grid">
          {playerOne ? (
            <PlayerInfo
              label="Player One"
              userName={playerOne}
              onRemoveClick={this.onRemoveUser.bind(this, "playerOne")}
            />
          ) : (
            <PlayerInput
              label="Player One"
              handleSubmit={this.handleSubmit.bind(this, "playerOne")}
            />
          )}
          {playerTwo ? (
            <PlayerInfo
              label="Player Two"
              userName={playerTwo}
              onRemoveClick={this.onRemoveUser.bind(this, "playerTwo")}
            />
          ) : (
            <PlayerInput
              label="Player Two"
              handleSubmit={this.handleSubmit.bind(this, "playerTwo")}
            />
          )}
        </section>
        <Instructions />
      </main>
    );
  }
}
