import React from "react";
import type { FC } from "react";
import type { User } from "src/types/user";
import { styled } from "@mui/material/styles";
import { Box, Stack, Avatar, Typography } from "@mui/material";
import { stringAvatar } from "src/utils/avatar-info";

interface CalendarUserListProps {
  users: User[];
}

const List = styled(Box)(({ theme }) => ({
  width: 200,
  padding: theme.spacing(4, 0),
}));

const UserContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(4, 2),
  fontSize: 14,
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  height: 24,
  width: 24,
  marginRight: theme.spacing(1),
}));

const CalendarUserList: FC<CalendarUserListProps> = ({ users }) => {
  const getFullName = (first_name: string, last_name: string) => {
    return `${first_name} ${last_name}` || "";
  };

  return (
    <List>
      <Stack>
        {users.map(({ first_name, last_name, id }) => {
          return (
            <UserContainer key={id}>
              <UserAvatar
                {...stringAvatar(getFullName(first_name, last_name))}
              />
              <Typography variant="h6">
                {getFullName(first_name, last_name)}
              </Typography>
            </UserContainer>
          );
        })}
      </Stack>
    </List>
  );
};

export default CalendarUserList;
