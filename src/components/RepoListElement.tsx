import { ReactNode } from "react";
import { repoEntry } from "src/lib/api";
import "./RepoListElement.module.css"

export default function (
        {
            entry: {
                url,
                name,
                stars,
                forks,
                updated,
                owner: {
                    login,
                    avatarUrl,
                    url: ownerUrl
                }
            }
        } : { entry: repoEntry }
        ): ReactNode {
    return (
        <div styleName="element">
            <a href={url}><span>{name}</span></a>
            <div styleName="stats">
                <span>Stars: {stars}</span>
                <span>Forks: {forks}</span>
                <span styleName="lastUpdated">Last updated: {updated.toString()}</span>
            </div>
            <a styleName="ownerUrl" href={ownerUrl}>
                <span styleName="ownerLogin">{login}</span>
                <img styleName="ownerImg" src={avatarUrl} alt={login} />
            </a>
        </div>
    )
}
