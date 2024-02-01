import { Avatar, Badge, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ChatCard: React.FC<{
  username: string;
  avatarSrc: string;
  message: string;
  time: string;
  link: string
}> = ({ username, avatarSrc, message, time, link }) => {
  return (
    <div className='px-3'>
      <Link to={`/ppllss/${link}/10`}>
        <Badge
          badgeContent={1}
          color='primary'
          anchorOrigin={{
            vertical: `bottom`,
            horizontal: 'left',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              gap: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '0',
              backgroundColor: 'white',
              height: '5rem',
              width: '18rem',
            }}
          >
            <Badge
              variant='dot'
              color='error'
              anchorOrigin={{
                vertical: `bottom`,
                horizontal: 'right',
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'gray',
                }}
                alt={username}
                src={avatarSrc}
                variant={`circular`}
              >
                {/* Placeholder for user avatar */}
              </Avatar>
            </Badge>

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                '&:last-child': {
                  paddingBottom: '16px', // Override Material-UI CardContent padding
                },
              }}
            >
              <Typography variant='subtitle1'>{username}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {message}
              </Typography>
            </CardContent>
            <Typography variant='caption' color='text.secondary'>
              {`${time}`}
            </Typography>
          </Card>
        </Badge>
      </Link>
    </div>
  );
};

export default ChatCard;
