import { FC, useEffect } from 'react';

import {  useEditor } from '@craftjs/core';

import { Frame } from '@craftjs/core';

import lz from 'lzutf8';

export const EditorPreviewer: FC<{ jsonData: string }> = ({ jsonData }) => {
  const {
    actions: { deserialize, setOptions },
  } = useEditor();

  useEffect(() => {
    setOptions((options) => (options.enabled = false));
    const json = lz.decompress(lz.decodeBase64(jsonData));
    deserialize(json);
  }, [jsonData]);

  return (
    <div className="flex flex-col">
      <Frame />
    </div>
  );
};
