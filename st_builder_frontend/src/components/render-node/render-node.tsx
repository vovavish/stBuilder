import { ROOT_NODE, useEditor, useNode } from "@craftjs/core";

import { FC, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom";
import { Move, ArrowUp, Trash } from "lucide-react";

type RenderNodeProps = {
  render: React.ReactElement;
}

export const RenderNode: FC<RenderNodeProps> = ({render}) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));
  
  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
    isDragged
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
    isDragged: query.node(node.id).isDragged(),
  }));

  const currentRef = useRef<HTMLDivElement>(null);
  
  const [pos, setPos] = useState<{ top: string, left: string } | null>(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  useEffect(() => {
    console.log('isDragged', isDragged);
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
              className="px-2 py-2 text-white bg-primary absolute flex items-center"
              style={{
                left: pos.left,
                top: pos.top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                <button className="mr-2 cursor-move" ref={(el) => drag(el as HTMLButtonElement)}>
                  <Move />
                </button>
              ) : null}
              {id !== ROOT_NODE && (
                <button
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent!);
                  }}
                >
                  <ArrowUp />
                </button>
              )}
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
            document.querySelector('.craftjs-renderer')!
          )
        : null}
      {render}
    </>
  );
}