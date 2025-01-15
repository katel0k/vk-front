import { ReactNode, useState, useEffect } from "react";
import { List, ListElement } from "./List/List";
import { ListSettings, Settings } from "./Settings/Settings";

export default function App(): ReactNode {
    const [ list, setList ] = useState<ListElement[]>([]);
    const [ settings, setSettings ] = useState<ListSettings>({
        sortOrder: 'asc'
    });
    useEffect(() => {
        fetch("https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=1")
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
