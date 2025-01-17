import { ReactNode, useState } from "react";
import "./Settings.module.css"

export enum sortTypeSetting {
    STARS = "stars",
    FORKS = "forks",
    ISSUES = "help-wanted-issues",
    UPDATED = "updated"
}

export enum sortOrderSetting {
    ASC = "asc",
    DESC = "desc"
}

export type ListSettings = {
    sortType: sortTypeSetting,
    sortOrder: sortOrderSetting,
    query: string,
}

interface settingsProps {
    settings: ListSettings,
    handleChange: (newListSettings: ListSettings) => void
}

export function Settings({ settings: { sortType: oldSortType, sortOrder: oldSortOrder, query: oldQuery }, 
                           handleChange }: settingsProps): ReactNode {
    const [sortType, setSortType] = useState<sortTypeSetting>(oldSortType);
    const [sortOrder, setSortOrder] = useState<sortOrderSetting>(oldSortOrder);
    const [query, setQuery] = useState<string>(oldQuery);
    return (
        <div styleName="settings">
            <input name="query" type="text" value={query} onChange={e => setQuery(e.target.value)}/>
            <select name="sortType" value={sortType}
                    onChange={e => setSortType(e.target.value as sortTypeSetting)}>
                <option value={sortTypeSetting.STARS}>{sortTypeSetting.STARS}</option>
                <option value={sortTypeSetting.FORKS}>{sortTypeSetting.FORKS}</option>
                <option value={sortTypeSetting.ISSUES}>{sortTypeSetting.ISSUES}</option>
                <option value={sortTypeSetting.UPDATED}>{sortTypeSetting.UPDATED}</option>
            </select>
            <select name="sortOrder" value={sortOrder}
                    onChange={e => setSortOrder(e.target.value as sortOrderSetting)}>
                <option value={sortOrderSetting.ASC}>Ascending</option>
                <option value={sortOrderSetting.DESC}>Descending</option>
            </select>
            <input type="submit" name="submit" onClick={_ => 
                handleChange({
                    sortOrder, query
                } as ListSettings)
            } value="Search" />
        </div>
    )
}
