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
        name: 'products',
        type: 'folder',
      },
      {
        name: 'customers',
        type: 'folder',
      },
    ],
  },
];

const newServiceItems = produce(initialItems, (items) => {
  items[0].children!.push({
    name: 'orders',
    type: 'folder',
    children: [],
    isActive: true,
  });

  return items;
});

const newServiceOneFileItems = produce(newServiceItems, (items) => {
  items[0].children![2].children!.push({ name: 'Dockerfile', type: 'file' });

  return items;
});

const newServiceTwoFilesItems = produce(newServiceOneFileItems, (items) => {
  items[0].children![2].children!.push({ name: 'server.js', type: 'file' });

  return items;
});

export function NewServiceFiles() {
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
        if (value < 0.25) {
          setItemsToShow(newServiceOneFileItems);
          return;
        }
        if (value < 0.5) {
          setItemsToShow(newServiceTwoFilesItems);
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
