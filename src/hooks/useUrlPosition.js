import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const lat = searchParams.get("lat"); // get value from URL
  // eslint-disable-next-line no-unused-vars
  const lng = searchParams.get("lng");

  return [lat, lng];
}
