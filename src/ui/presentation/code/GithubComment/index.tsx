import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Bold } from '~/ui/typo';
import { colors } from '~/config';
import { motion } from 'framer-motion';
import { WiggleDrag } from '~/ui/interactions';

interface Props {
  author?: string;
  hoursAgo?: number;
  content: ReactNode;
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const Holder = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;
const AuthorHolder = styled.div`
  margin-right: 15px;
`;
const AuthorAvatar = styled.div`
  background-color: ${colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-transform: uppercase;
`;
const CommentHolder = styled.div`
  flex-grow: 1;
  border: 1px solid #d1d5da;
  background-color: #fff;
  color: #222;

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  line-height: 21px;

  position: relative;
  color: #24292e;
  background-color: #fff;
  border: 1px solid #d1d5da;
  border-radius: 3px;
`;

const CommentTopBar = styled.div`
  background-color: #f6f8fa;
  padding: 8px 15px;
  border-bottom: 1px solid #d1d5da;
  position: relative;

  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  &:before {
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
    display: block;
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;

    border-width: 8px;
    border-right-color: #d1d5da;

    /* border-width: 8px;
    border-right-color: #d1d5da; */
  }

  &:after {
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
    display: block;
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;

    margin-top: 1px;
    margin-left: 2px;
    border-width: 7px;
    border-right-color: #f6f8fa;
  }
`;

const ContentHolder = styled.div`
  padding: 15px;

  & a {
    color: #0366d6;
    text-decoration: none;
    pointer-events: none !important;
  }
`;

export function GithubComment({
  author = 'devopsibot',
  hoursAgo = 2,
  content,
}: Props) {
  const authorFirstLetter = author.substr(0, 1);
  return (
    <WiggleDrag>
      <Wrapper>
        <Holder>
          <AuthorHolder>
            <AuthorAvatar>{authorFirstLetter}</AuthorAvatar>
          </AuthorHolder>
          <WiggleDrag dragPropagation>
            <CommentHolder>
              <CommentTopBar>
                <Bold>{author}</Bold> commented {hoursAgo} hours ago
              </CommentTopBar>
              <ContentHolder>{content}</ContentHolder>
            </CommentHolder>
          </WiggleDrag>
        </Holder>
      </Wrapper>
    </WiggleDrag>
  );
}
