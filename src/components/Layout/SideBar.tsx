import {
  Card,
  CardContent,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

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
        // make sidebar transparent
        // "& .MuiDrawer-paperAnchorDockedLeft": {
        //   borderRight: "none",
        //   backgroundColor: "transparent",
        // },
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
            {items.map((item: any) => (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton>
                  {/* <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon> */}
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
