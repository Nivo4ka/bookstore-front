import styled from 'styled-components';

export const StyledCatalog = styled.div`

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  width: 100%;

  .styled__catalog--grid{
    display: grid;
    grid-template-columns: repeat(4, calc(25% - 15px)); 
    grid-column-gap: 20px;
    grid-row-gap: 60px;

  }
  :last-child{
    width: auto;
  }

  .styled_catalog--pagination{
    width: 100%;
    background-color: aqua;
    height: 30px;
  }
`;