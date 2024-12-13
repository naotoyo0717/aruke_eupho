'use client';

import { AddLocation, BeachAccess, Home, Logout, Map, SvgIconComponent, } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import styles from "@/app/statics/styles/navigation.module.css"

type MenuItem = {
    title: string;
    href: string;
    icon: SvgIconComponent;
};

const menu: MenuItem[] = [
    { title: 'ホーム', href: '/top', icon: Home },
    { title: 'マップ', href: '/map', icon: AddLocation },
    { title: 'ルート投稿', href: '/reccomed_route', icon: Map },
    { title: '天気', href: '/weather', icon: BeachAccess },
    { title: 'ログアウト', href: '/signin', icon: Logout },
];

export default function DrawerMenu() {
    const [show, setShow] = useState(false);
    const openDrew = () => setShow(true);
    const closeDrew = () => setShow(false);

    return(
        <div>
            <Button onClick={openDrew}>
                <MenuIcon sx={{ fontSize: 55, color: "white" }}/>
            </Button>
            <Drawer anchor='left' open={show}>
                <Box sx={{ height: '100vh', width: '17rem', backgroundColor: '#DBF3FF'}}>
                <List>
                    <div className={styles.drawerCancel}>
                        <ListItemText
                            primary="MENU"
                            primaryTypographyProps={{ fontSize: '2rem', fontWeight: 'bold', color: '#443322'}}
                            sx={{ marginLeft: '2.2rem' }}
                        />
                        <Button>
                            <CloseIcon
                                sx={{ fontSize: 40, color: '#443322'}}
                                onClick={closeDrew}
                                />
                        </Button>
                    </div>
                    {menu.map((obj) => {
                        const Icon = obj.icon;
                        return (
                            <ListItem key={obj.title}>
                                <ListItemButton href={obj.href}>
                                    <ListItemIcon sx={{ fontSize: 35, color: '#443322' }}>
                                        <Icon
                                            fontSize="inherit" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={obj.title}
                                        primaryTypographyProps={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#443322' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
                </Box>
            </Drawer>
        </div>
    );
}