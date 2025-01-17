import { FC, useEffect } from 'react';

import { useEditor } from '@craftjs/core';

import { Frame } from '@craftjs/core';

import lz from 'lzutf8';

import { Toolbox } from '@/components/Toolbox';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Topbar } from '@/components/Topbar';

export const EditorForLoading: FC<{ jsonData: string }> = ({ jsonData }) => {
  const {
    actions: { deserialize },
  } = useEditor();

  useEffect(() => {
    const json = lz.decompress(lz.decodeBase64(jsonData));
    deserialize(json);
  }, []);

  return (
    <div className="flex flex-col">
      {/* <Topbar /> */}

      <Frame />

      <div className="col-span-1">
        <div className="bg-gray-100 shadow-md rounded-md p-4">
          <Toolbox />
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
};
