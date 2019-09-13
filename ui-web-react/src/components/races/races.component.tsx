import React from "react";
import { Races } from "../../model/types/datatypes";
import { FetchingComponent } from "../fetching/fetching.component";
import { RaceItemComponent } from "./raceitem.component";

export type RacesComponentProps = {
  races: Races;
  onDataReload: any;
};

export class RacesComponent extends React.Component<RacesComponentProps> {
  componentDidMount(): void {
    this.props.onDataReload();
  }

  render() {
    if (this.props.races.isFetching) {
      return <FetchingComponent />;
    } else {
      return (
        <>
          {this.props.races.items.map(item => (
            <RaceItemComponent item={item} />
          ))}
        </>
      );
    }
  }
}
