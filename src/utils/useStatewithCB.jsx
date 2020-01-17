import React from 'react';

export default function useStatewithCB(initValue) {
  const [data, setData] = React.useState(initValue);
  const isFirst = React.useRef(true);
  const CB = React.useRef(null);
  const setDataWrapper = (value, _CB) => {
    CB.current = _CB;
    setData(value);
  };
  React.useEffect(() => {
    if (!isFirst.current) {
      CB.current();
      CB.current = null;
      return;
    }
    isFirst.current = false;
  }, [data]);
  return [data, setDataWrapper];
}
