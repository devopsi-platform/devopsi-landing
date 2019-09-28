import React, { useRef, useState, useCallback } from 'react';
import {
  Container,
  TopBar,
  Header,
  Spacing,
  Typography,
  LargeHeader,
  Bold,
} from '~/ui';
import styled from 'styled-components';
import { colors } from '~/config';
import { useLockBodyScroll } from '~/hooks/dom';
import color from 'color';
import { Button } from '~/ui/buttons';
import { useRequestAccess } from '~/domains/requestAccess';
import { useClickOutside } from '~/hooks/dom/useClickOutside';
import { IoIosExit, IoIosCloseCircleOutline } from 'react-icons/io/index.esm';
import { requestBetaWithEmail } from '~/services/tracking';
import { getIsEmailValid } from '~/services/text';
import { AnimatedContentHeight } from '~/ui/animations';
import { medium } from '~/services/styles';
import { createAccessRequest } from '~/services/data';

const modalBgColor = color(colors.primary)
  .alpha(0.9)
  .toString();

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${modalBgColor};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  color: ${colors.primary};
`;

const Modal = styled.div`
  position: relative;
  max-width: 480px;
  /* width: 90vw; */
  background-color: #fff;
  padding: 40px;
  padding-top: 80px;
  border-radius: 20px;
  box-shadow: 0 0 30px #0004;
  max-height: 90vh;
  overflow-y: auto;

  ${medium`
    padding-top: 40px;
  `}
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TransparentInput = styled.input`
  font: inherit;
  border: 2px solid #0001;
  border-radius: 5px;
  line-height: 1;
  padding: 10px 15px;
  outline: none;
  background: transparent;
  color: inherit;
  width: 100%;
  box-sizing: border-box;
  transition: 0.15s all;

  &:hover {
    border-color: #0002;

    &::placeholder {
      color: #0008;
    }
  }

  &:focus {
    border-color: ${colors.primary};
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #0004;
    transition: 0.15s all;
  }
`;

const CloseButtonHolder = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  transition: 0.15s all;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.15);
  }

  ${medium`
    top: 10px;
    right: 10px;
  `}
`;

const SuccessLabel = styled.div`
  line-height: 1.5;
  background-color: ${colors.primary};

  color: #fff;
  padding: 15px;
  font-size: 0.9rem;
  border-radius: 10px;
`;

export function RequestAccessModal() {
  const { close } = useRequestAccess();
  const modalRef = useRef<HTMLDivElement>(null);

  const [isRequested, setIsRequested] = useState(false);

  const [email, setEmail] = useState('');

  const isEmailValid = getIsEmailValid(email);

  useClickOutside(modalRef, close);
  useLockBodyScroll();

  const handleSubmit = useCallback(async () => {
    // requestBetaWithEmail(email);
    await createAccessRequest(email);
    setIsRequested(true);
  }, [email]);

  const handleEmailChange = useCallback((emailValue: string) => {
    setEmail(emailValue);
    setIsRequested(false);
  }, []);

  return (
    <Holder>
      <Content>
        <Modal ref={modalRef}>
          <CloseButtonHolder onClick={close}>
            <IoIosCloseCircleOutline size={40} />
          </CloseButtonHolder>

          <Spacing size="xsmall">
            <LargeHeader>Devopsi Early Access</LargeHeader>
          </Spacing>
          <Spacing size="small">
            <Typography>
              <p>
                <Bold>Thank you for Requesting Devopsi&nbsp;early access.</Bold>
              </p>
              <p>
                We're actively working on Devopsi, but
                it's&nbsp;not&nbsp;ready&nbsp;yet. If you want to get updates
                about our progress and get early access, leave us your email
                address.
              </p>
              <p>
                We'll also <Bold>really</Bold> appreciate any&nbsp;kind of&nbsp;
                <a href="mailto:adam@pietrasiak.com?subject=Devopsi Feedback&body=Thank you!">
                  feedback
                </a>
                !
              </p>
            </Typography>
          </Spacing>
          <Spacing size="small">
            <TransparentInput
              type="email"
              name="email"
              placeholder="Email adress..."
              value={email}
              onChange={(event) => handleEmailChange(event.target.value)}
            />
          </Spacing>
          <AnimatedContentHeight>
            {isRequested && (
              <Spacing size="small">
                <SuccessLabel>
                  Thank you! We'll mail you directly with detailed instructions,
                  as soon as we'll be able to provide beta testing environment
                  for you.
                </SuccessLabel>
              </Spacing>
            )}
          </AnimatedContentHeight>
          <ButtonHolder>
            <Button
              label="Submit Request"
              inverted
              onClick={handleSubmit}
              disabled={!isEmailValid || isRequested}
            />
          </ButtonHolder>
        </Modal>
      </Content>
    </Holder>
  );
}
