import * as React from 'react';

import { Container, useTheme } from '@mui/joy';

import { Chat } from '@/components/Chat';
import { NoSSR } from '@/components/util/NoSSR';
import { isValidOpenAIApiKey, SettingsModal } from '@/components/dialogs/SettingsModal';
import { useSettingsStore } from '@/lib/stores/store-settings';
import { useState, useEffect } from 'react';
import { userService } from 'services';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  // state
  const [settingsShown, setSettingsShown] = React.useState(false);

  // external state
  const theme = useTheme();
  const apiKey = useSettingsStore(state => state.apiKey);
  const centerMode = useSettingsStore(state => state.centerMode);

  // show the Settings Dialog at startup if the API key is required but not set
  useEffect(() => {
    if (!process.env.HAS_SERVER_KEY_OPENAI && !isValidOpenAIApiKey(apiKey))
      setSettingsShown(true);
  }, [apiKey]);

  const { data, status } = useSession();
  if (status === 'loading') return <h1> loading... please wait</h1>;
  if (status === 'authenticated') {

  return (
    /**
     * Note the global NoSSR wrapper
     *  - Even the overall container could have hydration issues when using localStorage and non-default maxWidth
     */
    <NoSSR>

      <Container maxWidth={centerMode === 'full' ? false : centerMode === 'narrow' ? 'md' : 'xl'} disableGutters sx={{
        boxShadow: {
          xs: 'none',
          md: centerMode === 'narrow' ? theme.vars.shadow.md : 'none',
          xl: centerMode !== 'full' ? theme.vars.shadow.lg : 'none',
        },
      }}>

        <Chat onShowSettings={() => setSettingsShown(true)} />

        <SettingsModal open={settingsShown} onClose={() => setSettingsShown(false)} />

      </Container>

    </NoSSR>
  );
}
  return (
    <div>
      <button onClick={() => signIn('google')}>sign in with gooogle</button>
    </div>
  );
}