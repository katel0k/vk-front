import { ReactNode } from 'react'

import './List.module.css'

export type ListElement = {
    name: string,
    url: string,
    owner: {
        login: string,
        avatar_url: string,
    }
}

const REQUEST_FOR_NEW_DATA_THRESHOLD: number = 500;

interface ListProps {
    body: ListElement[],
    isLoading: boolean,
    requestNewData: () => void
}

export function List({ body = [], isLoading, requestNewData }: ListProps): ReactNode {
    return (
        <div styleName='body'
            onScroll={e => {
                if (e.currentTarget.getBoundingClientRect().bottom + 100 > REQUEST_FOR_NEW_DATA_THRESHOLD) {
                    requestNewData();
                }
            }} >
            {body.map((a: ListElement, i: number) =>
                <div styleName='element' key={i}>
                    <span>{a.name}</span>
                    <a href={a.url}></a>
                </div>
            )}
            {isLoading && (<div styleName='dataLoading'> Data is loading</div>)}
        </div>
    )
}
