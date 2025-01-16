import { ListSettings } from "../Settings/Settings"

export function constructAPIURL(settings: ListSettings, page: number): URL {
    let url = new URL("https://api.github.com/search/repositories");
    url.searchParams.append("q", settings.query);
    url.searchParams.append("sort", settings.sortType);
    url.searchParams.append("order", settings.sortOrder)
    url.searchParams.append("page", String(page));
    return url;
}
