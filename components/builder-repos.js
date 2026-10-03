import Image from "next/image";
import { ArrowUpRight, FolderGit2, Lock, MapPin } from "lucide-react";

const PROFILE_URL = "https://github.com/jperaleselizondo-hash";

const repos = [
  {
    name: "goodz.io",
    description: "B2B market cooperation software.",
    languages: ["XanoScript", "Python"],
    topic: "b2b-saas",
    url: "https://github.com/jperaleselizondo-hash/goodz.io",
    isPrivate: true,
    status: "In development",
  },
  {
    name: "secure-xano-oauth",
    description: "Hardened OAuth flow for Xano backends.",
    languages: ["XanoScript", "JavaScript"],
    url: "https://github.com/jperaleselizondo-hash/secure-xano-oauth",
    isPrivate: false,
    status: "Open source",
  },
];

function RepoBody({ repo }) {
  return (
    <>
      <div className="repoTop">
        <FolderGit2 className="repoIcon" size={18} strokeWidth={1.5} aria-hidden="true" />
        <span className="repoOwner">jperaleselizondo-hash /</span>
        <span className="repoName">{repo.name}</span>
        {repo.isPrivate ? (
          <Lock className="repoArrow" size={16} strokeWidth={1.5} aria-label="Private repository" />
        ) : (
          <ArrowUpRight className="repoArrow" size={18} strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>

      <p className="repoDesc">{repo.description}</p>

      <div className="repoMeta">
        <span className="repoStatus">
          <span className={repo.isPrivate ? "repoDot" : "repoDot isLive"} aria-hidden="true" />
          {repo.status}
        </span>
        <span>{repo.languages.join(" · ")}</span>
        {repo.topic ? <span>#{repo.topic}</span> : null}
      </div>
    </>
  );
}

export default function BuilderRepos() {
  return (
    <div className="builder">
      <div className="builderProfile" data-reveal>
        <div className="sectionLabel">Behind Arquet</div>

        <div className="builderId">
          <Image
            src="/images/founder.jpg"
            alt="Jesús Perales Elizondo"
            width={64}
            height={64}
            className="builderAvatar"
          />
          <div>
            <h2 className="builderName">Jesús Perales Elizondo</h2>
            <p className="builderRole">Founder &amp; engineer</p>
          </div>
        </div>

        <p className="vvLede builderLede">
          Arquet is run by one engineer who designs the data model, writes the
          backend, and ships the interface. The work below is in the open.
        </p>

        <div className="builderLinks">
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
            github.com/jperaleselizondo-hash
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <span>
            <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
            Spain
          </span>
        </div>
      </div>

      <ul className="repoList" aria-label="Repositories">
        {repos.map((repo, index) => (
          <li key={repo.name} data-reveal style={{ "--delay": `${index * 90}ms` }}>
            {repo.isPrivate ? (
              <div className="repoCard isPrivate">
                <RepoBody repo={repo} />
              </div>
            ) : (
              <a className="repoCard" href={repo.url} target="_blank" rel="noopener noreferrer">
                <RepoBody repo={repo} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
