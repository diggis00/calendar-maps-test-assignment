import React from "react";
import type { FC } from "react";
import { styled } from "@mui/material/styles";
import { FormControlLabel, Switch, Typography } from "@mui/material";
import { format } from "date-fns";

interface HeaderProps {
  mapViewChecked: boolean;
  onChangeMapView?: () => void;
}

const HeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(4),
  backgroundColor: '#ebf3f7',
}));

export const Header: FC<HeaderProps> = ({
  mapViewChecked,
  onChangeMapView,
}) => {
  return (
    <HeaderContainer>
      <Typography variant="h5" sx={{ mx: 4 }}>
        {format(new Date(), "EEEE dd MMMM yyyy")}
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={mapViewChecked}
            onChange={onChangeMapView}
            size="medium"
          />
        }
        label={<Typography sx={{ fontWeight: 500 }}>Map View</Typography>}
      />
    </HeaderContainer>
  );
};
