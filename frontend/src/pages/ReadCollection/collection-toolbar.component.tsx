import { Button, IconButton, Link } from '@mui/material';
import { appHistory } from '../../utils/history.utils';
import { getUserId, isLoggedIn, removeCredentialItems } from '../../utils/login.utils';
import { CreateSharp } from '@mui/icons-material';
import React from 'react';


export function CollectionToolbar() {
  return <div style={{ paddingBottom: 15, paddingTop: 25 }}>


    <Link>
      <Button onClick={() => appHistory.push('/registration')}>
        Registration
      </Button>
    </Link>

    <Link>
      <Button onClick={() => appHistory.push('/login')}>
        Login
      </Button>
    </Link>

    <Link>
      {!isLoggedIn() &&
        <Button onClick={() => {
          removeCredentialItems();
          appHistory.push('/login');
        }}>
          Logout
        </Button>
      }
    </Link>


    <IconButton color={'default'}
                onClick={() => {
                  getUserId();
                  appHistory.push(`/collection/create`);
                }}>
      <CreateSharp/> Create New
    </IconButton>
  </div>;
}

