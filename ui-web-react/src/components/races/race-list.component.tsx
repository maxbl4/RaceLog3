import React from "react";
import { Races } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import { RaceItemComponent } from "./race-item.component";

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
      if (this.props.races.items.isNone()) {
        return <div>В данный момент у нет гонок.</div>;
      } else {
        return (
          <>
            {this.props.races.items.getOrElse([]).map(item => (
              <RaceItemComponent key={item.id.getOrUndefined()} item={item} />
            ))}
          </>
        );
      }
    }
  }
}
