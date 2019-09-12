import React from "react";
import { News } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import { NewsItemComponent } from "./newsitem.component";

export type NewsComponentProps = {
  news: News;
  onItemSelect: any;
};

export class NewsComponent extends React.Component<NewsComponentProps> {
  render() {
    if (this.props.news.isFetching) {
      return <FetchingComponent />;
    } else {
      return (
        <>
          {this.props.news.items.map(item => (
            <NewsItemComponent
              item={item}
              onItemSelect={this.props.onItemSelect}
            />
          ))}
        </>
      );
    }
  }
}
