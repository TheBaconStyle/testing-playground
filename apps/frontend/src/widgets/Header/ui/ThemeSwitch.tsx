'use client';

import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material';
import { useColorScheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import {} from '@mui/system/cssVars';
import { useRef, useState } from 'react';

const themeModes: [
  NonNullable<ReturnType<typeof useColorScheme>['mode']>,
  string,
][] = [
  ['light', 'Светлая'],
  ['dark', 'Темная'],
  ['system', 'Системная'],
];

export function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const rootRef = useRef(null);

  return (
    <>
      <Tooltip title="Тема оформления" ref={rootRef}>
        <IconButton sx={{ color: 'inherit' }} onClick={toggleMenu}>
          {mode === 'light' && <LightMode />}
          {mode === 'system' && <SettingsBrightness />}
          {mode === 'dark' && <DarkMode />}
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
            selected={mode === themeKey}
            onClick={() => {
              setMode(themeKey);
              toggleMenu();
            }}
            key={themeKey}
          >
            {themeKey === 'light' && <LightMode />}
            {themeKey === 'system' && <SettingsBrightness />}
            {themeKey === 'dark' && <DarkMode />}
            &nbsp;
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
