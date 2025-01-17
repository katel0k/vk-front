import { ReactNode, useState, useEffect, useCallback } from "react";
import { List, ListElement } from "./components/InfiniteList";
import { ListSettings, Settings, sortOrderSetting, sortTypeSetting } from "./components/Settings";
import { constructAPIURL } from "./lib/utils";
import "./App.module.css"

export default function App(): ReactNode {
    const [ list, setList ] = useState<ListElement[]>([]);
    const [ settings, setSettings ] = useState<ListSettings>({
        sortOrder: sortOrderSetting.DESC,
        sortType: sortTypeSetting.STARS,
        query: "vk"
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
            setList((l: ListElement[]) => l.concat(nextPageItems));
            setIsLoading(false);
            setApiError(null);
        })();
        return () => controller.abort("Use effect fetch was cancelled");
    }, [ page ]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const requestNewData: (() => void) = useCallback(() => {
        if (!isLoading) {
            setIsLoading(true);
            setPage(page + 1);
        }
    }, [ isLoading, page ]);
    return (
        <div className="wrapper">
            { apiError && <div styleName="error">{ apiError.name }</div> }
            <div styleName="settingsWrapper">
                <Settings settings={settings} handleChange={(newListSettings: ListSettings) => {
                    setSettings(newListSettings);
                    setList([]);
                    setPage(1);
                    setIsLoading(true);
                    setApiError(null);
                }}/>
            </div>
            <div styleName="listWrapper">
                <List elements={list} requestNewData={requestNewData} isLoading={isLoading} />
            </div>
        </div>
    )
}
