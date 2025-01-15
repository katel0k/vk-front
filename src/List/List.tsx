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

interface ListProps {
    body: ListElement[]
}

export function List({ body = [] }: ListProps): ReactNode {
    return (
        <div styleName='body'>
            {
                body.map((a: ListElement, i: number) =>
                    <div styleName='element' key={i}>
                        <span>{a.name}</span>
                        <a href={a.url}></a>
                    </div>
                )
            }
        </div>
    )
}
