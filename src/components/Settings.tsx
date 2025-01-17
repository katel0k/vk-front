import { ReactNode, useState } from "react";
import "./Settings.module.css"

import { sortTypeSetting, sortOrderSetting, APISettings } from "src/lib/api"

interface settingsProps {
    readonly settings: APISettings,
    readonly handleSubmit: (newAPISettings: APISettings) => void
}

export default function Settings({ settings: oldSettings, handleSubmit, ...props }: settingsProps): ReactNode {
    const [settings, setSettings] = useState<APISettings>(oldSettings);
    return (
        <div styleName="settings" {...props}>
            <input name="query" type="text" value={settings.query} 
                    onChange={({target: {value: query}}) =>
                        setSettings(old => ({...old, query}))} />
            <select name="sortType" value={settings.sortType}
                    onChange={({target: {value: sortType}}) => 
                        setSettings(old => ({...old, sortType: sortType as sortTypeSetting}))}>
                <option value={sortTypeSetting.STARS}>{sortTypeSetting.STARS}</option>
                <option value={sortTypeSetting.FORKS}>{sortTypeSetting.FORKS}</option>
                <option value={sortTypeSetting.UPDATED}>{sortTypeSetting.UPDATED}</option>
            </select>
            <select name="sortOrder" value={settings.sortOrder}
                    onChange={({target: {value: sortOrder}}) => 
                        setSettings(old => ({...old, sortOrder: sortOrder as sortOrderSetting}))}>
                <option value={sortOrderSetting.ASC}>Ascending</option>
                <option value={sortOrderSetting.DESC}>Descending</option>
            </select>
            <input type="submit" name="submit" onClick={_ => handleSubmit(settings)} value="Search" />
        </div>
    )
}
