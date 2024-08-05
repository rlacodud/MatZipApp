import { useState } from "react";

const initialFilters = {
  RED: true,
  YELLOW: true,
  GREEN: true,
  BLUE: true,
  PURPLE: true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
}

function useMarkerFilter() {
  const [filterItems, setFilterItems] = useState(initialFilters);

  const transfromFilterMarker = () => {
    
  }
}

export default useMarkerFilter;