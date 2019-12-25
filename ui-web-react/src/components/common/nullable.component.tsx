import React from "react";
import Optional from "optional-js";

type NullableProps = {
  value: Optional<any>;
};

const NullableComponent: React.FC<NullableProps> = (props: NullableProps) => {
  const value = props.value.isPresent() ? props.value.get() : null;
  return (
    <div>
      {!!value && { value }}
      {!value && "&#8212;"}
    </div>
  );
};

export default NullableComponent;
