'use client';
import React, { useEffect, useRef, FC, useState } from 'react';
import { useNode } from '@craftjs/core';
import { DxfViewer, DxfViewerOptions } from 'dxf-viewer';
import { Color } from 'three';
import { api, API_URL } from '@/lib/api';
import { useMediaQuery } from 'react-responsive';
import styles from '../../../settings-common/settings-common.module.scss';
import debounce from 'debounce';

export interface DXF_001Props {
  dxfUrl: string;
  backgroundColor: string;
  width: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  height: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  padding: {
    desktop: { top: string; bottom: string; left: string; right: string };
    tablet: { top: string; bottom: string; left: string; right: string };
    mobile: { top: string; bottom: string; left: string; right: string };
  };
  margin: {
    desktop: { top: string; bottom: string; left: string; right: string };
    tablet: { top: string; bottom: string; left: string; right: string };
    mobile: { top: string; bottom: string; left: string; right: string };
  };
}

export const DXFRenderer: FC<{ url: string; isMobile: boolean }> = ({ url, isMobile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<DxfViewer | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const boundsRef = useRef<{ minX: number; maxX: number; minY: number; maxY: number } | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.offsetWidth || window.innerWidth;
        const desiredHeight = containerRef.current.parentElement?.clientHeight || window.innerHeight;
        setDimensions({ width: parentWidth, height: desiredHeight });
      }
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 50);

    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);
    return () => window.removeEventListener('resize', debouncedUpdateDimensions);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOverlayVisible(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!url || !containerRef.current) return;

    const initViewer = async () => {
      try {
        const options: DxfViewerOptions = {
          clearColor: new Color(0xffffff),
          clearAlpha: 1.0,
          autoResize: true,
          pointSize: isMobile ? 2 : 1,
        };

        viewerRef.current = new DxfViewer(containerRef.current!, options);
        await viewerRef.current.Load({
          url,
          fonts: [`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/uploads/T-FLEX Type A.TTF`],
          progressCbk: () => {},
          workerFactory: () => new Worker(new URL('../DxfViewerWorker', import.meta.url)),
        });

        const bounds = viewerRef.current.GetBounds();
        boundsRef.current = bounds
          ? {
              minX: bounds.minX,
              maxX: bounds.maxX,
              minY: bounds.minY,
              maxY: bounds.maxY,
            }
          : { minX: 0, maxX: 1000, minY: 0, maxY: 1000 };

        if (dimensions.width > 0 && dimensions.height > 0 && boundsRef.current) {
          viewerRef.current.SetSize(dimensions.width, dimensions.height);
          viewerRef.current.FitView(
            boundsRef.current.minX,
            boundsRef.current.maxX,
            boundsRef.current.minY,
            boundsRef.current.maxY,
            0.1
          );
        }
      } catch (err) {
        console.error('Error loading DXF:', err);
      }
    };

    initViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.GetCanvas().remove();
        viewerRef.current.Destroy();
        viewerRef.current = null;
      }
    };
  }, [url, isMobile]); 

  useEffect(() => {
    if (viewerRef.current && dimensions.width > 0 && dimensions.height > 0 && boundsRef.current) {
      console.log('Updating canvas size:', dimensions, 'Bounds:', boundsRef.current);
      viewerRef.current.SetSize(dimensions.width, dimensions.height);
      viewerRef.current.FitView(
        boundsRef.current.minX,
        boundsRef.current.maxX,
        boundsRef.current.minY,
        boundsRef.current.maxY,
        0.1
      );
    }
  }, [dimensions]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', margin: '0 auto' }}>
      {url ? (
        <>
          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
          {isOverlayVisible && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setIsOverlayVisible(false)}
            />
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            color: '#333',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '2px dashed #333',
          }}
        >
          Добавьте чертеж
        </div>
      )}
    </div>
  );
};

export const DXF_001: FC<DXF_001Props> & {
  craft?: {
    props: typeof DXF_001DefaultProps;
    related: { settings: typeof DXFBlockSettings };
  };
} = ({ dxfUrl, backgroundColor, width, height, padding, margin }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const isTablet = useMediaQuery({ maxWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const currentWidth = isMobile ? width.mobile : isTablet ? width.tablet : width.desktop;
  const currentHeight = isMobile ? height.mobile : isTablet ? height.tablet : height.desktop;
  const currentPadding = isMobile ? padding.mobile : isTablet ? padding.tablet : padding.desktop;
  const currentMargin = isMobile ? margin.mobile : isTablet ? margin.tablet : margin.desktop;

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        backgroundColor,
        padding: `${currentPadding.top} ${currentPadding.right} ${currentPadding.bottom} ${currentPadding.left}`,
        margin: `${currentMargin.top} ${currentMargin.right} ${currentMargin.bottom} ${currentMargin.left}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: currentHeight,
        width: currentWidth,
        maxWidth: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DXFRenderer url={dxfUrl} isMobile={isMobile} />
    </div>
  );
};

const DXFBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleDxfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileUrl = response.data.filePath;
        setProp((props: DXF_001Props) => {
          props.dxfUrl = `${API_URL}/${uploadedFileUrl}`;
        });

        console.log('DXF file uploaded successfully, URL:', uploadedFileUrl);
      } catch (error) {
        console.error('Error uploading DXF file:', error);
      }
    }
  };

  return (
    <div className="dxf-settings">
      <div className={styles.settings_buttons_wrapper}>
        <button
          onClick={() => setDevice('desktop')}
          className={device === 'desktop' ? styles.activeButton : ''}
        >
          Настольный
        </button>
        <button
          onClick={() => setDevice('tablet')}
          className={device === 'tablet' ? styles.activeButton : ''}
        >
          Планшет
        </button>
        <button
          onClick={() => setDevice('mobile')}
          className={device === 'mobile' ? styles.activeButton : ''}
        >
          Мобильный
        </button>
      </div>

      <label className={styles.settings_label}>DXF File (.dxf)</label>
      <input type="file" accept=".dxf" onChange={handleDxfChange} />
      <label className={styles.settings_label}>DXF URL</label>
      <input
        type="text"
        value={props.dxfUrl}
        onChange={(e) => setProp((props: DXF_001Props) => (props.dxfUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Ширина</label>
      <input
        type="text"
        value={props.width[device]}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.width[device] = e.target.value))
        }
        placeholder="например, 100% или 800px"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Высота</label>
      <input
        type="text"
        value={props.height[device]}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.height[device] = e.target.value))
        }
        placeholder="например, 600px или 50vh"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ сверху</label>
      <input
        type="text"
        value={props.padding[device].top}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.padding[device].top = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ снизу</label>
      <input
        type="text"
        value={props.padding[device].bottom}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.padding[device].bottom = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ слева</label>
      <input
        type="text"
        value={props.padding[device].left}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.padding[device].left = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ справа</label>
      <input
        type="text"
        value={props.padding[device].right}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.padding[device].right = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ сверху (внешний)</label>
      <input
        type="text"
        value={props.margin[device].top}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.margin[device].top = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ снизу (внешний)</label>
      <input
        type="text"
        value={props.margin[device].bottom}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.margin[device].bottom = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ слева (внешний)</label>
      <input
        type="text"
        value={props.margin[device].left}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.margin[device].left = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ справа (внешний)</label>
      <input
        type="text"
        value={props.margin[device].right}
        onChange={(e) =>
          setProp((props: DXF_001Props) => (props.margin[device].right = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) => setProp((props: DXF_001Props) => (props.backgroundColor = e.target.value))}
        className="w-full p-1 border rounded"
      />
    </div>
  );
};

export const DXF_001DefaultProps = {
  dxfUrl: '',
  backgroundColor: '#ffffff',
  width: {
    desktop: '800px',
    tablet: '100%',
    mobile: '100%',
  },
  height: {
    desktop: '600px',
    tablet: '400px',
    mobile: '300px',
  },
  padding: {
    desktop: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' },
    tablet: { top: '0.75rem', bottom: '0.75rem', left: '0.75rem', right: '0.75rem' },
    mobile: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
  },
  margin: {
    desktop: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
    tablet: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
    mobile: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
  },
};

DXF_001.craft = {
  props: DXF_001DefaultProps,
  related: {
    settings: DXFBlockSettings,
  },
};