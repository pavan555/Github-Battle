const client_id = "CLIENT_ID";
const client_secret = "CLIENT_SECRET";
const params = `client_id=${client_id}&client_secret=${client_secret}`;

export const fetchRepos = (lang) => {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`
  );
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (!data || !data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
};

const getErrorMessage = (message, userName) => {
  if (message === "Not Found") {
    return `User: ${userName} not found`;
  }
  return message;
};

const getUserData = (userName) => {
  const endpoint = window.encodeURI(
    `https://api.github.com/users/${userName}?${params}`
  );
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        throw new Error(getErrorMessage(data.message, userName));
      }

      return data;
    });
};

const getReposForUser = (userName) => {
  const endpoint = window.encodeURI(
    `https://api.github.com/users/${userName}/repos?${params}&per_page=150`
  );
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        throw new Error(getErrorMessage(data.message, userName));
      }
      return data;
    });
};

const getStarScore = (repos) => {
  return repos.reduce((acc, { stargazers_count }) => acc + stargazers_count, 0);
};

const getScore = (followers, repos) => {
  return followers * 2 + getStarScore(repos);
};

const getUserProfileData = (userName) => {
  const pr1 = getUserData(userName);
  const pr2 = getReposForUser(userName);
  return Promise.all([pr1, pr2]).then(([profile, repos]) => {
    return {
      profile: profile,
      score: getScore(profile.followers, repos),
    };
  });
};

const sortPlayers = (players) => {
  return players.sort((a, b) => b.score - a.score);
};

export const getUserProfileScores = (players) => {
  const pr1 = getUserProfileData(players[0]);
  const pr2 = getUserProfileData(players[1]);
  return Promise.all([pr1, pr2]).then(sortPlayers);
};
