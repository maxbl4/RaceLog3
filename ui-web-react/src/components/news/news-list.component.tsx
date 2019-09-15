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
      return (
        <>
          {this.props.news.items.map(item => (
            <NewsItemComponent key={item.id} item={item} />
          ))}
        </>
      );
    }
  }
}
