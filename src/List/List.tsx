import { ReactNode } from "react"

import "./List.module.css"

export type ListElement = {
    id: number,
    name: string,
    url: string,
    owner: {
        login: string,
        avatarUrl: string,
        url: string
    }
}

const REQUEST_FOR_NEW_DATA_THRESHOLD: number = 1000;

interface ListProps {
    elements: ListElement[],
    isLoading: boolean,
    requestNewData: () => void
}

export function List({ elements = [], isLoading, requestNewData }: ListProps): ReactNode {
    return (
        <div styleName="body"
            onScroll={e => {
                let t = e.currentTarget;
                if (t.scrollHeight - (t.scrollTop + t.clientHeight) < REQUEST_FOR_NEW_DATA_THRESHOLD) {
                    requestNewData();
                }
            }} >
            {elements.map(({id, url, name, owner: {login, avatarUrl, url: ownerUrl}}: ListElement) =>
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
