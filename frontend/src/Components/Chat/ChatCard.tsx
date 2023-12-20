import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface PropsInfo {
    username: string;
    avatarSrc: string;
    message: string;
  }
 const ChatCard = ({username, avatarSrc, message} : PropsInfo) => {
  return (
    <div className="">
        <Link to="">
        <Card
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          gap: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "0",
          backgroundColor: "white",
          height: "5rem",
          width: "18rem"
        }}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "gray",
          }}
          alt={username}
          src={avatarSrc}
          variant={`circular`}
        >
          {/* Placeholder for user avatar */}
        </Avatar>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            "&:last-child": {
              paddingBottom: "16px", // Override Material-UI CardContent padding
            },
          }}
        >
          <Typography variant="subtitle1">{username}</Typography>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        </CardContent>
      </Card>
        </Link>
    </div>
  );
};

export default ChatCard;