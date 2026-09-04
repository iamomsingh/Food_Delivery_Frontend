import { Avatar } from "@mui/material";

function UserAvatar({ user, onClick }) {
  const getInitials = () => {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";

    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Avatar
      onClick={onClick}
      sx={{
        width: 38,
        height: 38,
        cursor: onClick ? "pointer" : "default",
      }}
      src={user?.profileImageUrl || undefined}
      alt={user ? `${user.firstName} ${user.lastName}` : "User"}
    >
      {getInitials()}
    </Avatar>
  );
}

export default UserAvatar;
