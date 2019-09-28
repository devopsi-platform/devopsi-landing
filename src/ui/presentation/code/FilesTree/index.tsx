import React from 'react';
import styled, { css } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
// @ts-ignore
import { IoIosFolder, IoIosDocument } from 'react-icons/io/index.esm';
import { colors } from '~/config';

type ItemType = 'file' | 'folder';

export interface FilesTreeItem {
  type: ItemType;
  name: string;
  isActive?: boolean;
  children?: FilesTreeItem[];
}

interface Props {
  items: FilesTreeItem[];
  noRoot?: boolean;
}

const Holder = styled.div<{ isRoot: boolean }>`
  line-height: 1.5;
  font-weight: bold;
  font-size: 14px;
  will-change: height;

  ${(props) => {
    if (props.isRoot) {
      return css`
        background-color: #fff1;
        padding: 15px;
        border-radius: 10px;
        overflow: hidden;
      `;
    }
  }}
`;
const ItemHolder = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
`;
const ItemLabelHolder = styled.div<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  ${(props) => {
    if (props.isActive) {
      return css`
        background-color: #fff2;
        padding-left: 5px;
        padding-right: 5px;
        margin-left: -5px;
        border-radius: 5px;
      `;
    }
  }}
`;
const ItemIconHolder = styled.div`
  display: flex;
  padding-right: 5px;
  max-height: 1.5em;
`;
const ItemNameLabelHolder = styled.div``;
const ItemChildrenHolder = styled.div`
  /* margin-top: 3px; */
  & ${ItemHolder} {
    border-left: 1px solid #fff2;
    padding-left: 10px;
    margin-left: 6px;
  }
`;

function getTotalChildrenCount(item: FilesTreeItem): number {
  const children = item.children ? item.children : [];
  const directChildrenCount = children.length;

  const nestedChildrenCount = children.reduce((sume, nextChild) => {
    return sume + getTotalChildrenCount(nextChild);
  }, 0);

  return directChildrenCount + nestedChildrenCount;
}

function FilesTreeItem({ item }: { item: FilesTreeItem }) {
  const { isActive = false } = item;
  const totalChildrenCount = getTotalChildrenCount(item);
  return (
    <ItemHolder>
      <ItemLabelHolder isActive={isActive}>
        <ItemIconHolder>
          {item.type === 'folder' && <IoIosFolder color={'#fff'} />}
          {item.type === 'file' && <IoIosDocument color={'#fff'} />}
        </ItemIconHolder>
        <ItemNameLabelHolder>{item.name}</ItemNameLabelHolder>
      </ItemLabelHolder>
      <AnimatePresence>
        {item.children && item.children.length > 0 && (
          <motion.div
            style={{
              willChange: 'height',
            }}
            key={`${item.name}`}
            initial={{
              opacity: 0,
              translateX: 20,
              height: '0em',
            }}
            animate={{
              opacity: 1,
              translateX: 0,
              height: `${totalChildrenCount * 1.5}em`,
            }}
            exit={{
              opacity: 0,
              translateX: 20,
              height: '0em',
            }}
          >
            <ItemChildrenHolder>
              <FilesTree items={item.children} noRoot />
            </ItemChildrenHolder>
          </motion.div>
        )}
      </AnimatePresence>
    </ItemHolder>
  );
}

export function FilesTree({ items, noRoot }: Props) {
  return (
    <Holder isRoot={!noRoot}>
      <AnimatePresence>
        {...items.map((item, index) => {
          const totalChildrenCount = getTotalChildrenCount(item) + 1;
          return (
            <motion.div
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragPropagation
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
              key={`${item.name}-${index}`}
              initial={{
                opacity: 0,
                translateX: 20,
                height: '0em',
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                height: `${totalChildrenCount * 1.5}em`,
              }}
              exit={{
                opacity: 0,
                translateX: 20,
                height: '0em',
              }}
            >
              <FilesTreeItem item={item} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Holder>
  );
}
