import { AppBar, Toolbar, Typography } from "@mui/material"

export function TwitterAppBar(props) {
    return (
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${props.drawerWidth}px)`, ml: `${props.drawerWidth}px` }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Politica en Twitter
                </Typography>
            </Toolbar>
        </AppBar>
    )
}