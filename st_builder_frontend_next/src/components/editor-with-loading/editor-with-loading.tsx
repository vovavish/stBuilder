import { FC, useEffect } from 'react';

import { Element, useEditor } from '@craftjs/core';

import { Frame } from '@craftjs/core';

import lz from 'lzutf8';

import { Toolbox } from '../Toolbox/Toolbox';
import { SettingsPanel } from '@/components/settings-panel/settings-panel';
import { Container } from '../user-blocks/Container';

export const EditorForLoading: FC<{ jsonData: string }> = ({ jsonData }) => {
  const {
    actions: { deserialize },
  } = useEditor();

  useEffect(() => {
    if (!jsonData) return;
    
    const json = lz.decompress(lz.decodeBase64(jsonData));
    console.log(JSON.parse(json).ROOT.nodes.length)
    deserialize(json);
  }, [deserialize, jsonData]);

  return (
    <div className="flex flex-col">
      {/* <Topbar /> */}

      <Frame>
        <Element canvas is={Container} paddingY={20} />
      </Frame>

      <div className="col-span-1">
        <div className="bg-gray-100 shadow-md rounded-md p-4">
          <Toolbox />
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
};
