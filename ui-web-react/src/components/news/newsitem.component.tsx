import React from "react";
import { NewsItem } from "../../model/types/datatypes";

export type NewsItemProps = {
    item: NewsItem;
    onItemSelect: any;
}

export class NewsItemComponent extends React.Component<NewsItemProps> {
    render() {
        return (
            <div>
                <span>{new Date(this.props.item.date).toDateString()}</span>
                <span>{this.props.item.header}</span>
                <button onClick={this.props.onItemSelect(this.props.item.id)}>Show...</button>
            </div>
        );
    }
}