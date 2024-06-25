import axios from "axios";
import { useEffect, useState } from "react";
import Config from "react-native-config";
import { LatLng } from "react-native-maps";

function useSearchLocation(keyword: string, location: LatLng) {
  const [pageParam, setPageParam] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(
          `https://dapi.kakao.com/v2/local/search/category.json?query=${keyword}&y=${location.latitude}&x=${location.longitude}&page=${pageParam}`,
          {
            headers: {
              Authorization: `kakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        console.log(data);
      } catch (error) {

      }
    })
  })
}

export default useSearchLocation;