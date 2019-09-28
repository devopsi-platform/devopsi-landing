import React, { useState, useEffect } from 'react';
import produce from 'immer';
import { useFeature, FilesTree, FilesTreeItem } from '~/ui/presentation';
import styled from 'styled-components';

const Holder = styled.div`
  position: relative;
  min-height: 160px;
`;

const initialItems: FilesTreeItem[] = [
  {
    name: 'myapp',
    type: 'folder',
    children: [
      {
        name: 'customers',
        type: 'folder',
      },
      {
        name: 'products',
        type: 'folder',
        children: [
          { name: 'Dockerfile', type: 'file' },
          { name: 'server.js', type: 'file' },
        ],
      },
    ],
  },
];

const newServiceItems = produce(initialItems, (items) => {
  items[0].children![1].children!.push({
    name: 'devopsi.yml',
    type: 'file',
    isActive: true,
  });

  return items;
});

export function DevopsiConfig() {
  const [itemsToShow, setItemsToShow] = useState(initialItems);
  const { showingProgress } = useFeature();

  useEffect(
    () =>
      showingProgress.onChange((value) => {
        if (value < -0.25) {
          setItemsToShow(initialItems);
          return;
        }
        if (value < 0) {
          setItemsToShow(newServiceItems);
          return;
        }
      }),
    [showingProgress],
  );

  return (
    <Holder>
      <FilesTree items={itemsToShow} />
    </Holder>
  );
}
