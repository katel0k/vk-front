import { ReactNode, useState, useEffect } from "react";
import { List, ListElement } from "./List/List";
import { ListSettings, Settings } from "./Settings/Settings";
import { constructAPIURL } from "./lib/utils";

export default function App(): ReactNode {
    const [ list, setList ] = useState<ListElement[]>([]);
    const [ settings, setSettings ] = useState<ListSettings>({
        sortOrder: 'asc'
    });
    useEffect(() => {
        fetch(constructAPIURL(settings, 1))
        .then(response => response.json())
        .then(json => setList(json.items))
    }, []);
    return (
        <div className="wrapper">
            <Settings oldSettings={settings} handleChange={setSettings}/>
            <List body={list} />
        </div>
    )
}
