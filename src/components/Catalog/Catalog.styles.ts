import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .styled-catalog__grid {
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 15px)); 
    grid-column-gap: 20px;
    grid-row-gap: 60px;
  }

  :last-child {
    width: auto;
  }

  @media (max-width: 1295px) {
    .styled-catalog__grid {
      grid-template-columns: repeat(3, calc(33% - 15px));
    }
  }

`;
