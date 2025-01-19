import { UserLayoutByIdResponse } from '@/types/response/UserLayoutResponse';
import { Editor } from '@craftjs/core';
import { FC } from 'react';
import { Container } from '@/components/user/Container';
import { Card, CardBottom, CardTop } from '@/components/user/Card';
import { Button } from '@/components/user/Button';
import { Text } from '@/components/user/Text';
import { EditorPreviewer } from '@/components/editor-previewer';

type ChooseLayoutDetailsUIProps = {
  layout: UserLayoutByIdResponse;
  onSelectLayout: (layout: UserLayoutByIdResponse) => void;
};

export const ChooseLayoutDetailsUI: FC<ChooseLayoutDetailsUIProps> = ({
  layout,
  onSelectLayout,
}) => {
  return (
    <div className="flex justify-between items-start">
      {/* Editor on the left side */}
      <div className="flex-1">
        <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
          <EditorPreviewer jsonData={layout.layout_data} />
        </Editor>
      </div>

      {/* Description and Button Section on the right */}
      <div className="ml-4 w-1/3 p-6 shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{layout.name}</h3>
        <p className="text-gray-600 mb-5">{layout.description}</p>
        <button
          onClick={() => onSelectLayout(layout)}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Выбрать этот шаблон
        </button>
      </div>
    </div>
  );
};
