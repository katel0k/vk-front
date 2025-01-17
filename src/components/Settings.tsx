import { ReactNode, useState } from "react";
import "./Settings.module.css"

import { sortTypeSetting, sortOrderSetting, APISettings } from "src/lib/api"

interface settingsProps {
    settings: APISettings,
    handleChange: (newAPISettings: APISettings) => void
}

export default function Settings({ settings: { sortType: oldSortType, sortOrder: oldSortOrder, query: oldQuery }, 
                           handleChange, ...props }: settingsProps): ReactNode {
    const [sortType, setSortType] = useState<sortTypeSetting>(oldSortType);
    const [sortOrder, setSortOrder] = useState<sortOrderSetting>(oldSortOrder);
    const [query, setQuery] = useState<string>(oldQuery);
    return (
        <div styleName="settings" {...props}>
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
                } as APISettings)
            } value="Search" />
        </div>
    )
}
