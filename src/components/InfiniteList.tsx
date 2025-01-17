import { ReactNode } from "react"
import { RepoEntry } from "src/lib/api";
import "./InfiniteList.module.css"

const REQUEST_FOR_NEW_DATA_THRESHOLD: number = 1000;

interface InfiniteListProps {
    elements: RepoEntry[],
    isLoading: boolean,
    requestNewData: () => void
}

export default function ({ elements = [], isLoading, requestNewData, ...props }: InfiniteListProps): ReactNode {
    return (
        <div styleName="body"
            onScroll={e => {
                let t = e.currentTarget;
                if (t.scrollHeight - (t.scrollTop + t.clientHeight) < REQUEST_FOR_NEW_DATA_THRESHOLD) {
                    requestNewData();
                }
            }} {...props} >
            {elements.map(({id, url, name, owner: {login, avatarUrl, url: ownerUrl}}: RepoEntry) =>
                <div styleName="element" key={id}>
                    <a href={url}><span>{name}</span></a>
                    <a styleName="ownerUrl" href={ownerUrl}>
                        <span styleName="ownerLogin">{login}</span>
                        <img styleName="ownerImg" src={avatarUrl} alt={login} />
                    </a>
                </div>
            )}
            {isLoading && (<div styleName="dataLoading"> Data is loading</div>)}
        </div>
    )
}
