import { constructAPIURL } from "./utils";
import { sortOrderSetting, sortTypeSetting } from "../Settings/Settings";

test('Basic url construction', () => {
    expect(constructAPIURL({
        sortOrder: sortOrderSetting.DESC,
        sortType: sortTypeSetting.STARS,
        query: 'vk'
    }, 1))
    .toStrictEqual(new URL('https://api.github.com/search/repositories?q=vk&sort=stars&order=desc&page=1'))
});
