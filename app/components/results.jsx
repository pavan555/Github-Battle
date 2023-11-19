import * as React from "react";
import { getUserProfileScores } from "../api/utils";
import PropTypes from "prop-types";
import Loading from "./loading";
import { withSearchParams } from "./withSearchParams";
import { Link } from "react-router-dom";
const Card = ({ profile }) => {
  const {
    login,
    avatar_url,
    html_url,
    followers,
    following,
    public_repos,
    location,
    company,
  } = profile;

  return (
    <div className="card bg-light">
      <header className="split">
        <div>
          <h4>
            <a href={html_url}>{login}</a>
          </h4>
          <p>{location || "unknown"}</p>
        </div>
        <img
          className="avatar large"
          src={avatar_url}
          alt={`Avatar for ${login}`}
        />
      </header>
      <ul className="stack">
        <li className="split">
          <span>Name:</span> <span>{login || "n/a"}</span>
        </li>
        <li className="split">
          <span>Company:</span> <span>{company || "n/a"}</span>
        </li>
        <li className="split">
          <span>Followers:</span> <span>{followers}</span>
        </li>
        <li className="split">
          <span>Following:</span> <span>{following}</span>
        </li>
        <li className="split">
          <span>Repositories:</span> <span>{public_repos}</span>
        </li>
      </ul>
    </div>
  );
};

Card.propTypes = {
  profile: PropTypes.shape({
    login: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
  }),
};

const WINNER_ICON = "https://ui.dev/images/certificate.svg";

class Results extends React.Component {

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };
  
  componentDidMount() {
    const sp = this.props.router.searchParams;
    const playerOne = sp.get("playerOne");
    const playerTwo = sp.get("playerTwo");

    return getUserProfileScores([playerOne, playerTwo])
      .then((data) => {
        return this.setState({
          winner: data[0],
          loser: data[1],
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        return this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { loading, error, winner, loser } = this.state;
    if (loading) {
      return <Loading text="Battling" />;
    }

    if (error !== null) {
      return <p className="text-center error">{error}</p>;
    }

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Results</h1>

          <Link to="/battle" className="btn secondary">
            Reset
          </Link>
        </div>
        <section className="grid">
          <article className="results-container">
            <Card profile={winner.profile} />
            <p className="results">
              <span>
                {winner.score === loser.score ? "Tie" : "Winner"}{" "}
                {winner.score.toLocaleString()}
              </span>
              {winner.score !== loser.score && (
                <img width={80} src={WINNER_ICON} alt="Winner-Icon" />
              )}
            </p>
          </article>

          <article className="results-container">
            <Card profile={loser.profile} />
            <p className="results">
              <span>
                {winner.score === loser.score ? "Tie" : "Loser"}{" "}
                {loser.score.toLocaleString()}
              </span>
            </p>
          </article>
        </section>
      </main>
    );
  }
}
export default withSearchParams(Results);
