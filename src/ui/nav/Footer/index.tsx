import React from 'react';
import styled from 'styled-components';
import { Bold } from '~/ui/typo';
import { WiggleDrag } from '~/ui/interactions';
import { medium } from '~/services/styles';

const Holder = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 14px;
  line-height: 2;
`;

const Limiter = styled.span`
  display: inline-block;
  padding: 0 1em;
  opacity: 0.25;
  &:before {
    content: ' | ';
  }

  ${medium`
    display: block;

    &:before {
      display: none;
    }
  `}
`;

export function Footer() {
  return (
    <Holder>
      <WiggleDrag>
        <Bold>
          Created with 🔥 in Dragon Valley
          <Limiter />
          &copy; Devopsi.
          <Limiter />
          <a href="mailto:adam@pietrasiak.com?subject=Devopsi&body=Thank you for reaching out!">
            Get in touch 👋
          </a>
        </Bold>
      </WiggleDrag>
    </Holder>
  );
}
