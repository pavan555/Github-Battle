import PropTypes from "prop-types";
import * as React from "react";
import { getHashTagSVG } from "./icons";
import Tooltip from "./tooltip";
import Loading from "./loading";

export const TableHead = () => {
  return (
    <thead>
      <tr>
        <th style={{ width: "5%" }}>{getHashTagSVG()}</th>
        <th style={{ width: "50%" }}>Repository</th>
        <th style={{ width: "15%" }}>Stars</th>
        <th style={{ width: "15%" }}>Forks</th>
        <th style={{ width: "15%" }}>Open Issues</th>
      </tr>
    </thead>
  );
};

export const TableRow = ({
  index,
  name,
  owner,
  html_url,
  description,
  stargazers_count,
  forks_count,
  language,
  open_issues_count,
  watchers_count,
  created_at,
  updated_at,
}) => {
  const { login, avatar_url } = owner;

  const toolTipElement = getToolTipElement(
    login,
    created_at,
    updated_at,
    watchers_count,
    language
  );
  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        <Tooltip elem={toolTipElement}>
          <div className="row gap-md">
            <img
              width={32}
              height={32}
              src={avatar_url}
              className="avatar"
              alt={`Avatar for ${login}`}
            />
            <a href={html_url}>{name}</a>
          </div>
        </Tooltip>
      </td>

      <td>{stargazers_count}</td>
      <td>{forks_count}</td>
      <td>{open_issues_count}</td>
    </tr>
  );
};

const getToolTipElement = (owner, created, updated, watchers, language) => {
  const createdOn = new Date(created).toLocaleDateString();
  const updatedOn = new Date(updated).toLocaleDateString();
  return (
    <ul className="tooltip stack">
      <li className="split">
        <span>Owner:</span> <span>{owner}</span>
      </li>
      {language && (
        <li className="split">
          <span>Language:</span> <span>{language}</span>
        </li>
      )}
      <li className="split">
        <span>Created On:</span> <span>{createdOn}</span>
      </li>
      <li className="split">
        <span>Updated On:</span> <span>{updatedOn}</span>
      </li>
      <li className="split">
        <span>Watchers:</span> <span>{watchers}</span>
      </li>
    </ul>
  );
};

getToolTipElement.propTypes = {
  owner: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  watchers: PropTypes.number.isRequired,
  language: PropTypes.string,
};

TableRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  html_url: PropTypes.string.isRequired,
  description: PropTypes.string,
  stargazers_count: PropTypes.number.isRequired,
  forks_count: PropTypes.number.isRequired,
  open_issues_count: PropTypes.number.isRequired,
};

export const Table = ({ repos, loading }) => {
  let view;
  if (loading) {
    view = <Loading />;
  } else {
    view = repos.map((repo, index) => (
      <TableRow key={index} index={index} {...repo} />
    ));
  }

  return (
    <table>
      <TableHead />
      <tbody>{view}</tbody>
    </table>
  );
};

Table.propTypes = {
  repos: PropTypes.array.isRequired,
};
