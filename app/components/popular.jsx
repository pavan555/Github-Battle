import * as React from "react";
import PropTypes from "prop-types";
import { fetchRepos } from "../api/utils";
import { Table } from "./Table";

const LanguagesNav = ({ selectedLanguage, onUpdate }) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <select onChange={onUpdate} value={selectedLanguage}>
      {languages.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
};
LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: [],
    error: null,
    loading: true,
  };

  componentDidMount() {
    const lang = this.state.selectedLanguage || "All";
    return this.fetchFamousRepositeris(lang);
  }

  updateLanguage = (e) => {
    const selectedLanguage = this.state.selectedLanguage || "All";
    const value = e.target.value;
    if (selectedLanguage === value) {
      return;
    }
    return this.setState(
      { selectedLanguage: value, error: null, loading: true },
      () => {
        return this.fetchFamousRepositeris(value);
      }
    );
  };

  fetchFamousRepositeris = (lang) => {
    return fetchRepos(lang)
      .then((data) => {
        return this.setState({ repos: data, error: null, loading: false });
      })
      .catch((err) => {
        console.warn("error fetching repos", err);
        return this.setState({
          error: `There is an error while fetching the repos for Lang: ${lang}`,
          repos: [],
          loading: false,
        });
      });
  };

  render() {
    const { selectedLanguage = "All", repos, error, loading } = this.state;
    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Popular</h1>
          <LanguagesNav
            selectedLanguage={selectedLanguage}
            onUpdate={this.updateLanguage}
          />
        </div>
        {repos && <Table repos={repos} loading={loading} />}
        {error && <p className="error text-center">{error}</p>}
      </main>
    );
  }
}
