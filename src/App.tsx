import { ReactNode, useState, useEffect } from "react";
import { List, ListElement } from "./List/List";
import { ListSettings, Settings } from "./Settings/Settings";
import { constructAPIURL } from "./lib/utils";
import "./App.module.css"

export default function App(): ReactNode {
    const [ list, setList ] = useState<ListElement[]>([]);
    const [ settings, setSettings ] = useState<ListSettings>({
        sortOrder: 'desc'
    });
    const [ page, setPage ] = useState<number>(1);
    const [ apiError, setApiError ] = useState<Error | null>(null);
    useEffect(() => {
        let controller = new AbortController();
        let signal = controller.signal;
        (async () => {
            let nextPageItems: ListElement[] = await fetch(constructAPIURL(settings, page), { signal })
                .then((response: Response) => response.json())
                .then((parsed: any): ListElement[] => parsed.items.map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    url: repo.html_url,
                    owner: {
                        login: repo.owner.login,
                        avatarUrl: repo.owner.avatar_url,
                        url: repo.owner.html_url
                    }
                } as ListElement)))
                .catch((e: Error) => {
                    setApiError(e);
                    return [];
                });
            setList((prev: ListElement[]) => prev.concat(nextPageItems));
            setIsLoading(false);
        })();
        return () => controller.abort("Use effect fetch was cancelled");
    }, [ page ]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    return (
        <div className="wrapper">
            { apiError && <div styleName="error">{ apiError.name }</div> }
            <Settings oldSettings={settings} handleChange={setSettings}/>
            <div styleName="listWrapper">
                <List elements={list} requestNewData={() => {
                    if (!isLoading) {
                        setIsLoading(true);
                        setPage(page + 1);
                    }
                }} isLoading={isLoading} />
            </div>
        </div>
    )
}
