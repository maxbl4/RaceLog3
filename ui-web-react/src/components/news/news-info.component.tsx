import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { NewsItemExt } from "../../model/types/datatypes";
import { DEFAULT_ID, DEFAULT_DATE } from "../../model/utils/constants";
import { FetchingComponent } from "../fetching/fetching.component";
import { Row, Col } from "react-bootstrap";

interface NewsInfoParams {
  id: string;
}

interface NewsInfoComponentProps extends RouteComponentProps<NewsInfoParams> {
  newsItemExt: NewsItemExt;
  onDataReload: any;
}

export class NewsInfoComponent extends React.Component<NewsInfoComponentProps> {
  componentDidMount() {
    const newsID = this.props.match.params.id;
    this.props.onDataReload(newsID ? parseInt(newsID) : DEFAULT_ID);
  }

  render() {
    if (this.props.newsItemExt.isFetching) {
      return <FetchingComponent />;
    } else if (!this.props.newsItemExt.id.isPresent()) {
      return <div>Упс... Что то мы ничего не знаем об этой новости.</div>;
    } else {
      return (
        <div>
          <Row>
            <Col>{this.props.newsItemExt.header.orElse("")}</Col>
          </Row>
          <Row>
            <Col>{this.props.newsItemExt.text.orElse("")}</Col>
          </Row>
          <Row>
            <Col>
              {new Date(
                this.props.newsItemExt.date.orElse(DEFAULT_DATE)
              ).toDateString()}
            </Col>
          </Row>
        </div>
      );
    }
  }
}
