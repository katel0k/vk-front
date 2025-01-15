import { constructAPIURL } from "./utils";

test('Basic url construction', () => {
    expect(constructAPIURL({
        sortOrder: 'asc'
    }, 1))
    .toStrictEqual(new URL('https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=1'))
});
