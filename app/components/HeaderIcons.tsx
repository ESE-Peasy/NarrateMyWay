import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const BackIcon = ({ theme }) => {
  return (
    <Ionicons
      name="arrow-back"
      style={{ color: theme.textColor, paddingLeft: 10 }}
      size={35}
      accessible={true}
      accessibilityLabel="Back"
    />
  );
};

const SettingsIcon = ({ theme }) => {
  return (
    <Ionicons
      name="settings-outline"
      style={{ color: theme.textColor, paddingRight: 10 }}
      size={35}
      accessible={true}
      accessibilityLabel="Settings"
    />
  );
};

export { BackIcon, SettingsIcon };
