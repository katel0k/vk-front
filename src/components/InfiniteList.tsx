import { DOMAttributes, PropsWithChildren, ReactNode } from "react"
import "./InfiniteList.module.css"

const DEFAULT_REQUEST_FOR_NEW_DATA_THRESHOLD: number = 1000;

interface InfiniteListProps extends PropsWithChildren {
    readonly threshold?: number,
    readonly isLoading: boolean,
    readonly requestNewData: () => void
}

export default function ({
        threshold = DEFAULT_REQUEST_FOR_NEW_DATA_THRESHOLD,
        isLoading,
        requestNewData,
        children,
        ...props }: InfiniteListProps): ReactNode {
    let handleScroll: Exclude<DOMAttributes<HTMLDivElement>["onScroll"], undefined> = e => {
        if (isLoading) return;
        let t = e.currentTarget;
        if (t.scrollHeight - (t.scrollTop + t.clientHeight) < threshold) {
            requestNewData();
        }
    }
    return (
        <div styleName="body" onScroll={handleScroll} {...props} >
            { children }
            { isLoading && (<div styleName="dataLoading"> Data is loading</div>) }
        </div>
    )
}
