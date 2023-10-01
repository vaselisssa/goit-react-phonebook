import React from 'react';
import { StyledIconButton } from './IconButton.Styled';

const IconButton = ({ children, onClick, ...allyProps }) => {
  return (
    <StyledIconButton type="button" onClick={onClick} {...allyProps}>
      {children}
    </StyledIconButton>
  );
};

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

export default IconButton;
