import { ReactNode, useState, useEffect } from "react";
import { List, ListElement } from "./List/List";
import { ListSettings, Settings } from "./Settings/Settings";
import { constructAPIURL } from "./lib/utils";
import "./App.module.css"

export default function App(): ReactNode {
    const [ list, setList ] = useState<ListElement[]>([]);
    const [ settings, setSettings ] = useState<ListSettings>({
        sortOrder: 'asc'
    });
    const [ page, setPage ] = useState<number>(1);
    useEffect(() => {
        (async () => {
            let nextPageItems = await fetch(constructAPIURL(settings, page))
                .then(response => response.json())
                .then(json => json.items);
            setList((prev: ListElement[]) => prev.concat(nextPageItems));
            setIsLoading(false);
        })();
    }, [ page ]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    return (
        <div className="wrapper">
            <Settings oldSettings={settings} handleChange={setSettings}/>
            <div styleName="listWrapper">
                <List body={list} requestNewData={() => {
                    if (!isLoading) {
                        setIsLoading(true);
                        setPage(page + 1);
                    }
                }} isLoading={isLoading} />
            </div>
        </div>
    )
}
