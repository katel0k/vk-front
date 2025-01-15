import { ReactNode } from "react";
import "./Settings.module.css"

type sortOrderSetting = 'asc' | 'desc';

export type ListSettings = {
    sortOrder: sortOrderSetting,
}

type settingsProps = {
    oldSettings: ListSettings,
    handleChange: (newListSettings: ListSettings) => void
}

export function Settings({ oldSettings: { sortOrder }, handleChange }: settingsProps): ReactNode {
    return (
        <div styleName="settings">
            <select
                    name="sorting"
                    value={sortOrder}
                    onChange={e =>
                        handleChange({
                            sortOrder: e.target.value as sortOrderSetting
                        } as ListSettings)
                    }>
                <option value='asc'>Возрастание</option>
                <option value='desc'>Убывание</option>
            </select>
        </div>
    )
}
