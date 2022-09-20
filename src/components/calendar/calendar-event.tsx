import React from "react";
import type { FC } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { EventContentArg } from "@fullcalendar/react";
import { Cached as CachedIcon } from "../../icons/cached";
import { ChatAlt as ChatAltIcon } from "../../icons/chat-alt";
interface CalendarEventProps {
  eventProps: EventContentArg;
}

const EventBox = styled(Box)(({ theme, borderColor }) => ({
  width: "100%",
  height: "100%",
  background: blue[400],
  padding: theme.spacing(0.4),
  borderRadius: theme.spacing(0.5),
  borderLeft: borderColor ? `6px solid ${borderColor}` : "",
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  wordWrap: "break-word",
  color: theme.palette.common.white,
}));

const TextWithIconContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));
const CalendarEvent: FC<CalendarEventProps> = ({ eventProps }) => {
  return (
    <EventBox borderColor={eventProps?.borderColor}>
      <TextWithIconContainer>
        <Text>{eventProps?.event?._def.title}</Text>
        <CachedIcon sx={{ fontSize: 14, color: "#fff" }} />
      </TextWithIconContainer>

      <TextWithIconContainer>
        <Text>Joe Bloggs</Text>
        <ChatAltIcon sx={{ fontSize: 14, color: "#fff" }} />
      </TextWithIconContainer>
      <Text>63 The Drive</Text>
    </EventBox>
  );
};

export default CalendarEvent;
