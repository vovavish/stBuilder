import { EditorForLoading } from "@/components/editor-with-loading/editor-with-loading";
import { UserLayoutByIdResponse } from "@/types/response/UserLayoutResponse";
import { Editor } from "@craftjs/core";
import debounce from "debounce";
import { FC } from "react";
import { Container } from '@/components/user-blocks/Container';
import { Card, CardBottom, CardTop } from '@/components/user-blocks/Card';
import { Button } from '@/components/user-blocks/Button';
import { Text } from '@/components/user-blocks/Text';

type AdminLayoutDesignEditUIProps = {
  layout: UserLayoutByIdResponse;
  onUpdateLayoutData: (layoutData: string) => void;
};

export const AdminLayoutDesignEditUI: FC<AdminLayoutDesignEditUIProps> = ({layout, onUpdateLayoutData}) => {
  return (
    <Editor
      resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}
      onNodesChange={debounce((query) => {
        const json = query.serialize();
        onUpdateLayoutData(json);
      }, 1000)}
    >
      <EditorForLoading jsonData={layout.layout_data}/>
    </Editor>
  );
}