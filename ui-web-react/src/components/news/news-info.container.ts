import { StoredState } from "../../model/types/datatypes";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { selectedNewsRequested } from "../../model/actions/actions";
import { NewsInfoComponent } from "./news-info.component";

const mapStateToProps = (state: StoredState) => {
  return {
    newsItemExt: state.selectedNews
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDataReload: (id: number) => dispatch(selectedNewsRequested(id))
});

const NewsInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsInfoComponent);

export default NewsInfoContainer;
