import { ListSettings } from "../Settings/Settings"

export function constructAPIURL(settings: ListSettings, page: number): URL {
    let url = new URL("https://api.github.com/search/respositories");
    url.searchParams.append('q', 'javascript');
    url.searchParams.append('sort', 'stars');
    url.searchParams.append("order", settings.sortOrder)
    url.searchParams.append("page", String(page));
    return url;
}
