export type repoEntry = {
    id: number,
    name: string,
    url: string,
    stars: number,
    forks: number,
    updated: Date,
    owner: {
        login: string,
        avatarUrl: string,
        url: string
    }
}

export enum sortTypeSetting {
    STARS = "stars",
    FORKS = "forks",
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

export function parseJSON(json: any): repoEntry[] {
    return json.items.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: new Date(repo.updated_at),
        owner: {
            login: repo.owner.login,
            avatarUrl: repo.owner.avatar_url,
            url: repo.owner.html_url
        }
    } as repoEntry));
}

export async function requestData(settings: APISettings, page: number, signal: AbortSignal): Promise<repoEntry[]> {
    return fetch(constructAPIURL(settings, page), { signal })
        .then((response: Response) => response.json())
        .then(parseJSON)
}
