import { IconButton } from '@mui/material';
import { appHistory } from '../../utils/history.utils';
import { getUserId } from '../../utils/login.utils';
import { CreateSharp } from '@mui/icons-material';
import React from 'react';


export function CollectionToolbar() {
  return <div style={{ paddingBottom: 15, paddingTop: 25 }}>
    <IconButton color={'default'}
                onClick={() => {
                  getUserId();
                  appHistory.push(`/collection/create`);
                }}>
      <CreateSharp/> Create New
    </IconButton>
  </div>;
}

