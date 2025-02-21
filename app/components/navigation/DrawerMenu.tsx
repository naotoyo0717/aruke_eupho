'use client';

import { AddLocation, Home, Logout, SvgIconComponent, ContactMail} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import styles from "@/app/statics/styles/navigation.module.css"

type MenuItem = {
    title: string;
    href: string;
    icon: SvgIconComponent;
};

const menu: MenuItem[] = [
    { title: 'ホーム', href: '/top', icon: Home },
    { title: 'マップ', href: '/allMap', icon: AddLocation },
    // { title: '天気', href: '/weather', icon: BeachAccess },
    { title: 'お問い合わせ', href: '/contact', icon: ContactMail },
    { title: 'ログアウト', href: '/signin', icon: Logout },
];

export default function DrawerMenu() {
    const [show, setShow] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const openDrew = () => setShow(true);
    const closeDrew = () => setShow(false);

    return (
        <div>
            <Button onClick={openDrew}>
                <MenuIcon
                    sx={{
                        fontSize: 55,
                        color: "white",
                        '@media (max-width: 600px)': {
                            fontSize: 40,
                        },
                    }}
                />
            </Button>
            <Drawer anchor={isSmallScreen ? 'bottom' : 'left'} open={show} onClose={closeDrew}>
                <Box sx={{ height: isSmallScreen ? '65vh' : '100vh', width: isSmallScreen ? '100%' : '17rem', backgroundColor: '#DBF3FF' }}>
                    <List>
                        <div className={styles.drawerCancel}>
                            <ListItemText
                                primary="MENU"
                                primaryTypographyProps={{ fontSize: '2rem', fontWeight: 'bold', color: '#443322' }}
                                sx={{ marginLeft: '2.2rem' }}
                            />
                            <Button>
                                <CloseIcon
                                    sx={{ fontSize: 40, color: '#443322' }}
                                    onClick={closeDrew}
                                />
                            </Button>
                        </div>
                        {menu.map((obj) => {
                            const Icon = obj.icon;
                            return (
                                <ListItem key={obj.title}>
                                    <ListItemButton href={obj.href}>
                                        <ListItemIcon
                                            sx={{
                                                fontSize: 35,
                                                color: '#443322',
                                            }}
                                        >
                                            <Icon fontSize="inherit" />
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