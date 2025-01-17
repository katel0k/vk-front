import { ReactNode, useState, useEffect, useCallback } from "react";
import InfiniteList from "./components/InfiniteList";
import Settings from "./components/Settings";
import { requestData, RepoEntry, sortOrderSetting, sortTypeSetting, APISettings } from "./lib/api";
import "./App.module.css"

export default function App(): ReactNode {
    const [ data, setData ] = useState<RepoEntry[]>([]);
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
            .then((newData: RepoEntry[]) => {
                setData((l: RepoEntry[]) => l.concat(newData));
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
    return (
        <div className="wrapper">
            { apiError && <div styleName="error">{ apiError.name }</div> }
            <div styleName="settingsWrapper">
                <Settings 
                    settings={settings}
                    handleChange={(newAPISettings: APISettings) => {
                        setSettings(newAPISettings);
                        setData([]);
                        setPage(1);
                        setIsLoading(true);
                        setApiError(null);
                    }} />
            </div>
            <div styleName="listWrapper">
                <InfiniteList
                    elements={data}
                    requestNewData={requestNewData}
                    isLoading={isLoading} />
            </div>
        </div>
    )
}
