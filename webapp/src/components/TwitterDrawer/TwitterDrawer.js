import { Drawer, Toolbar, Divider, List, ListItem, ListItemText } from "@mui/material"
import { Link } from "react-router-dom"
import './TwitterDrawer.scss'
export function TwitterDrawer({ sections, drawerWidth }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar style={{position:"relative"}}>
        <img alt="page logo" style={{position:"absolute"}} src="logo.png" height="100%"/></Toolbar>
      <Divider />
      <List>
        {sections.map((section, index) => (
          <Link key={section.title} to={section.href} >
            <ListItem button >
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={section.title} />
            </ListItem>
          </Link>
          
        ))}
      </List>
      {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
    </Drawer>
  )
}