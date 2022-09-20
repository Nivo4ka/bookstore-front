import styled from 'styled-components';
import books from '../../images/booksLite.svg';

export default styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  border-radius: 16px;
  width: 100%;
  height: 400px;
  background-repeat: no-repeat;
  background-color: #F0F4EF;
  margin-bottom: 120px;
  background-image:url(${books});
  background-size: auto;
  background-position: bottom left;
  
  div{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-left: 108px;
  }
  img{
    position: absolute;
    right: 98px;
  }

  h2{
    margin-bottom: 10px;
  }
  a{
    text-decoration: none;
  }
  p{
    width: 217px;
    margin-bottom: 50px;
  }
`;
