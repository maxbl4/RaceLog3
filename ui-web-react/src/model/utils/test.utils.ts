import { NewsItem, NewsItemExt } from "../types/datatypes";
import Optional from "optional-js";

export const UNKNOWN_ACTION_TYPE = "UNKNOWN_ACTION_TYPE";

export const DEFAULT_NEWS_ITEM_1: NewsItem = {
  id: Optional.of(1),
  header: Optional.of("Some header 1"),
  date: Optional.of(1570728837485)
};
export const DEFAULT_NEWS_ITEM_2: NewsItem = {
  id: Optional.of(2),
  header: Optional.of("Some header 2"),
  date: Optional.of(1571529537459)
};
export const DEFAULT_NEWS_ITEM_EXT: NewsItemExt = {
  isFetching: false,
  id: Optional.of(1),
  header: Optional.of("Some header 1"),
  date: Optional.of(1570728837485),
  text: Optional.of(
    "Cillum voluptate aute nostrud non sit laboris consectetur. Do ipsum minim exercitation sit ullamco consectetur culpa enim reprehenderit elit velit aliqua. Amet cupidatat nostrud cillum commodo non labore ullamco officia non ex. Nisi officia aute aliquip sunt voluptate aute voluptate sunt. Lorem mollit adipisicing ea voluptate Lorem anim esse aliqua ut mollit ipsum in. Duis labore sit commodo cillum aliquip ullamco aliquip do ipsum duis eu in exercitation. Labore ullamco fugiat do amet dolore nisi in velit ad aute exercitation."
  )
};
