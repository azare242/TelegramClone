import * as React from 'react';
import {Box} from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Chat, GroupAdd } from '@mui/icons-material';
import { useLanguage } from '../../Config/Languages/useLanguage';
import { LanguageConfig } from '../../Config/Languages/LanguageProvider';




export default function FloatingButton() {
  const { language, FA, EN } = useLanguage();
  const languageConfig = React.useMemo<LanguageConfig>((): LanguageConfig => {
    if (language === "FA") return FA as LanguageConfig;
    else return EN as LanguageConfig;
  }, [EN, FA, language]);
  const actions = React.useMemo(() => {
    return [
      {icon: <Chat/>, name: languageConfig.chat},
      {icon: <GroupAdd/>, name: languageConfig.groupAdd},
    ];
  }, [languageConfig])
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
      
        ariaLabel="SpeedDial basic example"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}