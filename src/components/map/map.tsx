import React, { memo } from "react";
import type { FC, CSSProperties } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { styled } from "@mui/material/styles";

const center = {
  lat: -33.873907,
  lng: 151.091261,
};

interface MapProps {
  isMapExpand?: boolean;
  onClickExpand?: () => void;
}

const MapExpandButton = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 80,
  left: 0,
  height: 80,
  width: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: theme.palette.info.main,
}));

const Map: FC<MapProps> = ({ isMapExpand, onClickExpand }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  });

  if (!isLoaded) return <></>;

  return (
    <GoogleMap
      zoom={14}
      center={center}
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapExpandButton onClick={onClickExpand}>
        {isMapExpand ? (
          <ChevronRightIcon sx={{ color: "#fff" }} />
        ) : (
          <ChevronLeftIcon sx={{ color: "#fff" }} />
        )}
      </MapExpandButton>
    </GoogleMap>
  );
};

export default memo(Map);
