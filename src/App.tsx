import { ReactNode, useState, useEffect, useCallback } from "react";
import InfiniteList from "./components/InfiniteList";
import Settings from "./components/Settings";
import RepoListElement from "./components/RepoListElement";
import { requestData, repoEntry, sortOrderSetting, sortTypeSetting, APISettings } from "./lib/api";
import "./App.module.css"

export default function App(): ReactNode {
    const [ data, setData ] = useState<repoEntry[]>([]);
    const [ settings, setSettings ] = useState<APISettings>({
        sortOrder: sortOrderSetting.DESC,
        sortType: sortTypeSetting.STARS,
        query: "vk"
    });
    const [ page, setPage ] = useState<number>(1);
    const [ apiError, setApiError ] = useState<Error | null>(null);
    useEffect(() => {
        let controller = new AbortController();
        let signal = controller.signal;
        requestData(settings, page, signal)
            .then((newData: repoEntry[]) => {
                setData((l: repoEntry[]) => l.concat(newData));
                setIsLoading(false);
                setApiError(null);
            })
            .catch(setApiError);
        return () => controller.abort("Use effect fetch was cancelled");
    }, [ page, settings ]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const requestNewData: (() => void) = useCallback(() => {
        if (!isLoading) {
            setIsLoading(true);
            setPage(page + 1);
        }
    }, [ isLoading, page ]);
    const handleNewSettings: (newAPISettings: APISettings) => void = useCallback(newAPISettings => {
        setSettings(newAPISettings);
        setData([]);
        setPage(1);
        setIsLoading(true);
        setApiError(null);
    }, []);
    return (
        <div styleName="app">
            { apiError && <div styleName="error">{ apiError.name }</div> }
            <Settings settings={settings} handleSubmit={handleNewSettings} />
            <InfiniteList requestNewData={requestNewData} isLoading={isLoading} >
                { data.map((a: repoEntry) => <RepoListElement entry={a} key={a.id} />) }
            </InfiniteList >
        </div>
    )
}
