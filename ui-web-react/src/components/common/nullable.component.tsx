import React from "react";
import Optional from "optional-js";

type NullableProps = {
  value: Optional<any>;
};

const NullableComponent: React.FC<NullableProps> = (props: NullableProps) => {
  const value = props.value.isPresent() ? props.value.get() + "" : null;
  return (
    <React.Fragment>
      {!!value && <span>{value}</span>}
      {!value && <span>&#8212;</span>}
    </React.Fragment>
  );
};

export default NullableComponent;
