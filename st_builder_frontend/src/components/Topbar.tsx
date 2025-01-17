import { useEditor } from '@craftjs/core';
import { useState } from 'react';
import lz from 'lzutf8';
import copy from 'copy-to-clipboard';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [stateToLoad, setStateToLoad] = useState('');

  return (
    <div className="px-4 py-2 mt-3 mb-1 bg-teal-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label className="mr-2 text-sm">Enable</label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) =>
              actions.setOptions((options) => (options.enabled = event.target.checked))
            }
            className="w-4 h-4 accent-teal-500"
          />
        </div>
        <div>
          <Button
            onClick={() => {
              const json = query.serialize();
              copy(lz.encodeBase64(lz.compress(json)));
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-teal-500 border border-teal-600 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Copy current state
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-teal-500 border border-teal-600 rounded hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Serialize JSON to console
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Load State</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <textarea
                  placeholder='Paste the contents that was copied from the "Copy Current State" button'
                  value={stateToLoad}
                  onChange={(e) => setStateToLoad(e.target.value)}
                  className="w-full"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    const json = lz.decompress(lz.decodeBase64(stateToLoad));
                    console.log('json', json)
                    actions.deserialize(json);
                  }}
                >
                  Load
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
