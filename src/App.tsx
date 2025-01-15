import { ReactNode, useState, useEffect } from "react";
import { List, ListElement } from "./List/List";

export default function App(): ReactNode {
    const [ list, setList ] = useState<ListElement[]>([]);
    useEffect(() => {
        fetch("https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=1")
        .then(response => response.json())
        .then(json => setList(json.items))
    }, []);
    return (
        <div className="wrapper">
            <List body={list} />
        </div>
    )
}
