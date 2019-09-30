import React from "react";
import { News } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import { NewsItemComponent } from "./news-item.component";
import { DEFAULT_ID } from "../../model/utils/constants";

export type NewsListComponentProps = {
  news: News;
  onDataReload: any;
};

export class NewsListComponent extends React.Component<NewsListComponentProps> {
  componentDidMount(): void {
    this.props.onDataReload();
  }

  render() {
    if (this.props.news.isFetching) {
      return <FetchingComponent />;
    } else {
      if (!this.props.news.items.isPresent()) {
        return <div>В данный момент у нас нет для вас новостей.</div>;
      } else {
        return (
          <>
            {this.props.news.items.orElse([]).map(item => (
              <NewsItemComponent key={item.id.orElse(DEFAULT_ID)} item={item} />
            ))}
          </>
        );
      }
    }
  }
}
