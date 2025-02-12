import React, { MouseEvent } from 'react';
import { useEditor } from '@craftjs/core';

import styles from './settings-panel.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';

export const SettingsPanel: React.FC = observer(() => {
  const { actions } = useEditor();

  const { selectedNodeStore } = useStore();

  const onClickOutside = (e: MouseEvent) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      selectedNodeStore.selectedNode = undefined;
    }
  };

  if (!selectedNodeStore.selectedNode) return null;

  return (
    <div className={styles.overlay} onClick={onClickOutside}>
      <div className={styles.settingsPanel}>
        <div className={styles.header}>
          <h3 className={styles.title}>Настройки элемента</h3>
          <span className={styles.badge}>Выбрано</span>
        </div>

        <div className={styles.content}>
          {selectedNodeStore.selectedNode.settings && React.createElement(selectedNodeStore.selectedNode.settings)}
          
          {selectedNodeStore.selectedNode.isDeletable && (
            <button
              onClick={() => {
                actions.delete(selectedNodeStore.selectedNode!.id)
                selectedNodeStore.selectedNode = undefined
              }}
              className={styles.deleteButton}
            >
              Удалить элемент
            </button>
          )}
        </div>
      </div>
    </div>
  );
});