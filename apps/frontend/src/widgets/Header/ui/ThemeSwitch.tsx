'use client';

import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material';
import { type PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from 'next-themes';
import { useRef, useState } from 'react';

const themeModes = [
  ['light', 'Светлая'],
  ['system', 'Как в системе'],
  ['dark', 'Темная'],
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
      <Tooltip title="Тема оформления" ref={rootRef}>
        <IconButton sx={{ color: 'inherit' }} onClick={toggleMenu}>
          {currentTheme === 'light' && <LightMode />}
          {currentTheme === 'dark' && <DarkMode />}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={rootRef.current}
        open={isMenuOpen}
        onClose={toggleMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {themeModes.map(([themeKey, label]) => (
          <MenuItem
            selected={theme === themeKey}
            onClick={() => {
              setTheme(themeKey);
              toggleMenu();
            }}
            key={themeKey}
          >
            {themeKey === 'light' && <LightMode />}
            {themeKey === 'dark' && <DarkMode />}
            {themeKey === 'system' && <SettingsBrightness />}
            &nbsp;
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
