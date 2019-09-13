import { StoredState } from "../../model/types/datatypes";
import { NewsComponent } from "./news.component";
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

const NewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsComponent);

export default NewsContainer;
