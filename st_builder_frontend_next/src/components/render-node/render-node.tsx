import { useEditor, useNode } from '@craftjs/core';

import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Move, Trash, Settings } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';

type RenderNodeProps = {
  render: React.ReactElement;
};

export const RenderNode: FC<RenderNodeProps> = observer(({ render }) => {
  const { id } = useNode();

  const { actions, query, isActive, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return { isActive: query.getEvent('selected').contains(id), selected };
  });

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    isDragged,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    props: node.data.props,
    isDragged: query.node(node.id).isDragged(),
  }));

  const currentRef = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState<{ top: string; left: string } | null>(null);

  const { selectedNodeStore } = useStore();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  useEffect(() => {
    if (dom) {
      setPos({ top: `${dom.offsetTop}px`, left: `${dom.offsetLeft}px` });
    }
  }, [dom, isActive, isHover, isDragged]);

  return (
    <>
      {isHover && pos
        ? ReactDOM.createPortal(
            <div
              ref={currentRef}
              className="px-2 py-2 text-white bg-primary absolute flex items-center gap-2"
              style={{
                left: pos.left,
                top: pos.top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1">{name}</h2>
              <button onClick={() => (selectedNodeStore.selectedNode = selected)}><Settings /></button>
              {moveable ? (
                <button className="cursor-move" ref={(el) => drag(el as HTMLButtonElement)}>
                  <Move />
                </button>
              ) : null}
              {deletable ? (
                <button
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Trash />
                </button>
              ) : null}
            </div>,
            document.querySelector('.craftjs-renderer')!,
          )
        : null}
      {render}
    </>
  );
});
