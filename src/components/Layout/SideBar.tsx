import {
  Card,
  CardContent,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const items = [
  {
    title: 'Dashboard',
    path: '/',
  },
  {
    title: 'Albums',
    path: '/albums',
  },
  {
    title: 'Tracks',
    path: '/tracks',
  },
];

export default function SideBar({ drawerWidth }: { drawerWidth: number }) {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography>Muse</Typography>
      </Toolbar>
      <Divider />
      <Card
        sx={{
          m: 0.5,
        }}
      >
        <CardContent>
          <List>
            {items.map((item: { title: string; path: string }) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton>
                  <ListItemText>
                    <NavLink to={item.path}>{item.title}</NavLink>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Drawer>
  );
}
