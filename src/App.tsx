import { ReactNode } from "react";
import List from "./List/List";

export default function App(): ReactNode {
    return (
        <div className="wrapper">
            <List body={[{
                name: '',
                url: '',
                owner: {
                    login: '',
                    avatar_url: ''
                }
            }]} />
        </div>
    )
}
