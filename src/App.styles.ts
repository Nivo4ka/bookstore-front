import styled from 'styled-components';

export const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  .styled-app__container {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    min-height: calc(100vh - 341px);
  }

  .loading-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .loading {
      width: 60px;
      animation: loading-anim 1.2s linear infinite;
    }
    
    @keyframes loading-anim {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

`;
