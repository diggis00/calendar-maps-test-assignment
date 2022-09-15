import React from "react";
import type { FC } from "react";
import {
  Avatar,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
  tooltipClasses,
} from "@mui/material";
import type { TypographyProps, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { stringAvatar } from "src/utils/avatar-info";

interface CalendarEventTooltipProps {
  children: React.ReactElement;
  itemProps: any;
}

const CalendarTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement="bottom-start"
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    minWidth: 350,
    fontSize: theme.typography.pxToRem(12),
  },
}));

const Text = styled(({ ...props }: TypographyProps) => (
  <Typography variant="body1" {...props} />
))(({ theme }) => ({
  padding: theme.spacing(0, 2),
  fontSize: theme.typography.pxToRem(14),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  height: 24,
  width: 24,
  marginRight: theme.spacing(1),
}));

const Seperator = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export const CalendarEventTooltip: FC<CalendarEventTooltipProps> = ({
  children,
  itemProps,
}) => {
  const {
    event: {
      _def: { extendedProps: data },
      title,
    },
  } = itemProps;

  const ToolTipContent = () => {
    return (
      <Paper elevation={10} sx={{ py: 1 }}>
        <Stack flexDirection="row" justifyContent="space-between">
          <Text variant="subtitle2" color="InactiveCaptionText">
            9:30 AM - 10:30 AM
          </Text>
          <UserAvatar {...stringAvatar("John Citizen")} />
        </Stack>
        <Text sx={{ fontWeight: "bold" }}>{title}</Text>
        <Text>{`${data?.user?.first_name} ${data?.user?.last_name}`}</Text>
        <Text>{data?.address}</Text>
        <Seperator />
        <Text>0476655366</Text>
        <Text>Entry code 8655</Text>
        <Text>Booking reminder</Text>
        <Seperator />
        <Text>Job note goes here</Text>
        <Seperator />
        <Text>Every week on Wednesday never end</Text>
        <Seperator />
        <Stack flexDirection="row" justifyContent="space-between">
          <Text variant="subtitle2" color="InactiveCaptionText">
            Previous:30 Jun 2022
          </Text>
          <Text variant="subtitle2" color="InactiveCaptionText">
            Next:10 Oct 2022
          </Text>
        </Stack>
      </Paper>
    );
  };
  return (
    <CalendarTooltip title={<ToolTipContent />}>{children}</CalendarTooltip>
  );
};
