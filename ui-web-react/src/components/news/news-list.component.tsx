import React from "react";
import { News } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import { NewsItemComponent } from "./news-item.component";

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
      if (this.props.news.items.isNone()) {
        return <div>There is data for races</div>;
      } else {
        return (
          <>
            {this.props.news.items.getOrElse([]).map(item => (
              <NewsItemComponent key={item.id.getOrUndefined()} item={item} />
            ))}
          </>
        );
      }
    }
  }
}
