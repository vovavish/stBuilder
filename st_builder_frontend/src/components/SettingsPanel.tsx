import React from "react";
import { useEditor } from "@craftjs/core";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if ( currentNodeId ) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable()
      };
    }

    return {
      selected
    }
  });

  return selected ? ( 
    <div className="bg-gray-100 mt-4 p-4 rounded-md">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Selected</span>
            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
              Selected
            </span>
          </div>
        </div>
        { 
          selected.settings && React.createElement(selected.settings)
        }
        {selected.isDeletable &&
          <button onClick={() => {
            actions.delete(selected.id);
          }} className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition">
            Delete
          </button>
        }
      </div>
    </div>
  ) : null;
};
