export type RepoEntry = {
    id: number,
    name: string,
    url: string,
    owner: {
        login: string,
        avatarUrl: string,
        url: string
    }
}

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

export type APISettings = {
    sortType: sortTypeSetting,
    sortOrder: sortOrderSetting,
    query: string,
}

export function constructAPIURL(settings: APISettings, page: number): URL {
    let url = new URL("https://api.github.com/search/repositories");
    url.searchParams.append("q", settings.query);
    url.searchParams.append("sort", settings.sortType);
    url.searchParams.append("order", settings.sortOrder)
    url.searchParams.append("page", String(page));
    return url;
}

export function parseJSON(json: any): RepoEntry[] {
    return json.items.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        owner: {
            login: repo.owner.login,
            avatarUrl: repo.owner.avatar_url,
            url: repo.owner.html_url
        }
    } as RepoEntry));
}

export async function requestData(settings: APISettings, page: number, signal: AbortSignal): Promise<RepoEntry[]> {
    return fetch(constructAPIURL(settings, page), { signal })
        .then((response: Response) => response.json())
        .then(parseJSON)
}
