"use client";

import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  type PaletteMode,
  Tooltip,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

const themeModes = [
  ["light", "Светлая"],
  ["system", "Как в системе"],
  ["dark", "Темная"],
];

export type TThemeSwitch = {
  currentTheme: PaletteMode;
};

export function ThemeSwitch({ currentTheme }: TThemeSwitch) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const rootRef = useRef(null);
  return (
    <>
      <Tooltip title="Тема оформления">
        <IconButton
          sx={{ color: "inherit" }}
          onClick={toggleMenu}
          ref={rootRef}
        >
          {currentTheme === "light" && <LightMode />}
          {currentTheme === "dark" && <DarkMode />}
        </IconButton>
      </Tooltip>

      <Menu anchorEl={rootRef.current} open={isMenuOpen} onClose={toggleMenu}>
        {themeModes.map(([themeKey, label]) => (
          <MenuItem
            selected={theme === themeKey}
            onClick={() => {
              setTheme(themeKey);
              toggleMenu();
            }}
            key={themeKey}
          >
            {themeKey === "light" && <LightMode />}
            {themeKey === "dark" && <DarkMode />}
            {themeKey === "system" && <SettingsBrightness />}
            &nbsp;
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
