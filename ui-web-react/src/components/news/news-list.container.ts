import { StoredState } from "../../model/types/datatypes";
import { NewsListComponent } from "./news-list.component";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { newsRequested } from "../../model/actions/actions";

const mapStateToProps = (state: StoredState) => {
  return {
    news: state.news
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDataReload: () => dispatch(newsRequested())
});

const NewsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsListComponent);

export default NewsListContainer;
