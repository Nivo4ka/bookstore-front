import styled, { css } from 'styled-components';

export default styled.div<{ isActive: boolean; name: string }>`
  position: relative;

  .styled-drop-down-list__name {
    position: relative;
    margin-left: 20px;
    background-color: #F0F4EF;
    border-radius: ${(p) => p.theme.borderRadius};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 196px;
    height: fit-content;
    cursor: pointer;

    p {
      padding: 10px 0 10px 15px;
    }

    svg {
    margin-right: 8px;
    transition: 200ms ease all;
    stroke: ${(p) => (!p.name.includes('Sort by') ? p.theme.mainTheme.color.darkBlue : p.theme.mainTheme.color.dark)};
    ${(p) => {
    if (p.isActive) {
      return css`
        transform: rotate(90deg);
        `;
    }
  }}
  }
  }

  .styled-drop-down-list__name_last-child {
    background: none;
    white-space: nowrap;
    width: fit-content;

    p {
      color: ${(p) => p.theme.mainTheme.color.dark};
      margin-right: 20px;
    }
  }

  .styled-drop-down-list__list {
    width: 100%;
    position: absolute;
    display: none;
    flex-direction: row;
    align-items: center;
    top: 76px;
    margin-left: 20px;
    z-index: -1;
    transition: 10ms ease all;
    ${(p) => {
    if (p.isActive) {
      return css`
        display: flex;
        z-index: 1;
        `;
    }
  }}
  }

  .list__decoration {
    position: absolute;
    top: -23px;
    left: 7px;
    border: 15px solid transparent;
    border-bottom: 15px solid ${(p) => p.theme.mainTheme.color.light};
  }

  .main-info__price-area {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    width: 300px;
    height: 500px;
  }

  @media (max-width: 1360px) {
    .styled-drop-down-list__list {
      margin-left: 0;
    }
  }

  @media (max-width: 840px) {
    width: 100%;
    .styled-drop-down-list__name {
      width: 100%;
      max-width: 250px;
      p {
        margin-right: 20px;
      }
    }

    .list__decoration {
      display: none;
    }

    .styled-drop-down-list__list {
      top: 50px;
      margin-left: 0;
    }
  }

  @media (max-width: 500px) {
    margin: 10px 0;
    .styled-drop-down-list__name {
      width: 100%;
      max-width: 500px;
    }
  }
`;
