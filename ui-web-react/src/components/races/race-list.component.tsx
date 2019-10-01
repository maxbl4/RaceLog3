import React from "react";
import { Races } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import { RaceItemComponent } from "./race-item.component";
import { DEFAULT_ID } from "../../model/utils/constants";

export type RaceListComponentProps = {
  races: Races;
  onDataReload: any;
};

export class RaceListComponent extends React.Component<RaceListComponentProps> {
  componentDidMount(): void {
    this.props.onDataReload();
  }

  render() {
    if (this.props.races.isFetching) {
      return <FetchingComponent />;
    } else {
      if (!this.props.races.items.isPresent()) {
        return <div>В данный момент у нет гонок.</div>;
      } else {
        return (
          <>
            {this.props.races.items.orElse([]).map(item => (
              <RaceItemComponent key={item.id.orElse(DEFAULT_ID)} item={item} />
            ))}
          </>
        );
      }
    }
  }
}
