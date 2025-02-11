"use client";

import QuizIcon from "@mui/icons-material/Quiz";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbsContainer } from "../../Breadcrumbs/ui/BreadcrumbsContainer";
import { NavigateNext } from "@mui/icons-material";

export function Header() {
  const session = useSession();

  const menuAnchor = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = useCallback(
    (action?: () => void) => {
      action?.();
      setMenuOpen(false);
    },
    [setMenuOpen]
  );

  const pathname = usePathname();

  return (
    <AppBar component="header" position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <MuiLink
            component={Link}
            href="/"
            sx={{ textDecoration: "none", color: "inherit" }}
            variant="h4"
          >
            <QuizIcon sx={{ fontSize: "inherit", alignSelf: "center" }} /> Brand
          </MuiLink>
        </Box>
        {!session.data && (
          <Button variant="contained" onClick={() => signIn()}>
            Войти
          </Button>
        )}
        <BreadcrumbsContainer separator={<NavigateNext fontSize="small" />} />
        {session.data && (
          <>
            <Button
              tabIndex={0}
              ref={menuAnchor}
              sx={{
                gap: 1,
                flexDirection: "row",
                alignItems: "center",
                color: "inherit",
              }}
              onClick={() => {
                setMenuOpen(!isMenuOpen);
              }}
            >
              {session.data?.user?.image && (
                <Avatar src={session.data?.user?.image} />
              )}
              <Typography variant="body1">
                {session.data?.user?.name}
              </Typography>
            </Button>
            <Menu
              open={isMenuOpen}
              anchorEl={menuAnchor.current}
              onClose={() => setMenuOpen(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MenuItem
                sx={{ gap: 1 }}
                onClick={() => handleMenuItemClick()}
                component={Link}
                href="/profile"
                type="link"
              >
                <AccountCircleIcon /> Профиль
              </MenuItem>
              <MenuItem
                sx={{ gap: 1 }}
                onClick={() => handleMenuItemClick(() => signOut())}
              >
                <LogoutIcon /> Выход
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
