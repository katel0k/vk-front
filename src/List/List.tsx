import { ReactNode } from 'react'

import styles from './List.module.css'

type ListElement = {
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

export default function List({ body }: ListProps): ReactNode {
    return (
        <div className={ styles.body }>
            {
                body.map((a: ListElement, i: number) =>
                    <div className={ styles.element }>

                    </div>
                )
            }
        </div>
    )
}
