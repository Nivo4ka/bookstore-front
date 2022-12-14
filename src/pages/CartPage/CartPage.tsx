import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '../../components/Button';
import BookPlate from '../../components/BookPlate';
import bookThunks from '../../store/slices/book/thunks/index';
import StyledCartPage from './CartPage.styles';
import { ReactComponent as BooksPlaceholder } from '../../images/unsplash_DgQf1dUKUTM.svg';

const CartPage = () => {
  const userInfo = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);

  useEffect(() => {
    try {
      dispatch(bookThunks.getBooksByArray(userInfo.cart)).unwrap();
    } catch (err) {
      toast.error(err.message);
    }
  }, [dispatch, userInfo.cart]);

  const goToCatalog = () => {
    navigate('/');
  };

  const totalSum = useMemo(() => {
    let summ = 0;
    books.reduce((acc, item) => acc + (item.price), 0);

    books.forEach((i) => {
      const count = userInfo.cart.find((item) => (item.bookId === i.id))?.count || 0;
      summ += count * i.price;
    });
    return summ;
  }, [books, userInfo.cart]);

  return (
    <StyledCartPage>
      {books.length
        ? (
          <div>
            <div className="styled-cartpage__content">
              {books.map((item) => (
                <BookPlate
                  key={item.id}
                  book={item}
                  isCartPage
                  count={userInfo.cart.find((i) => i.bookId === item.id)?.count}
                />
              ))}
            </div>
            <div className="styled-cartpage__total-area">
            <h2><span className="styled-cartpage__total-price">Total: </span>{totalSum.toFixed(2)}</h2>

              <div className="styled-cartpage__buttom-area">
                <Button onClick={goToCatalog} secondary>Continue shopping</Button>
                <Button>Chekout</Button>
              </div>
            </div>
          </div>
        )
        : (
          <div className="styled-cartpage__no-books">
            <BooksPlaceholder />
            <div className="styled-cartpage__no-books_text">
              <h2>Your cart is empty</h2>
              <p>Add items to cart to make a purchase. Go to the catalog.</p>
              <Button className="styled-cartpage__no-books_button" onClick={goToCatalog}>Go to catalog</Button>
            </div>
          </div>
        )
      }
    </StyledCartPage>
  );
};

export default CartPage;
