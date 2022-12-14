import React from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import man from '../../images/man.svg';
import { ReactComponent as Mail } from '../../images/icons/Mail.svg';
import { ReactComponent as View } from '../../images/icons/View.svg';
import { ReactComponent as Hide } from '../../images/icons/Hide.svg';
import StyledSingUpPage from './SingUpPage.styles';
import userThunks from '../../store/slices/user/thunks/index';
import { useAppDispatch } from '../../store/hooks';
import Input from '../../components/Input';
import Button from '../../components/Button';

const singupSchema = yup.object().shape({
  password: yup.string()
    .min(8, 'Too Short!')
    .matches(/^[a-zA-Z0-9-_]{8,}$/, 'The password must consist of numbers and latin characters')
    .required('Enter your password'),
  repeatPassword: yup.string()
    .when('password', {
      is: (val: string) => (!!(val && val.length > 0)),
      then: yup.string().oneOf(
        [yup.ref('password')],
        'Both password need to be the same',
      ),
    })
    .required('Repeat your password without errors'),
  email: yup.string().email('Invalid email').required('Enter your email'),
});

interface IState {
  from?: { pathname: string };
}

const SingUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: { email: '', password: '', repeatPassword: '' },
    validationSchema: singupSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(userThunks.singUpByPassEmail(values)).unwrap();
        let path = '/';
        if (location.state) {
          const { from } = location.state as IState;
          path = from?.pathname ?? '/';
        }
        navigate(path);
      } catch (err) {
        if (err.message) {
          if (err.message.includes('email')) {
            setErrors({ email: err.message });
          }
        }
      }
    },
  });

  return (

    <StyledSingUpPage>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
          className="styled-singup__input"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeHolder="Email"
            nameInput="email"
            Icon1={Mail}
            type1="text"
            error={formik.errors.email}
          />
          <Input
          className="styled-singup__input"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeHolder="Password"
            nameInput="password"
            Icon1={Hide}
            Icon2={View}
            type1="password"
            type2="text"
            error={formik.errors.password}
          />
          <Input
          className="styled-singup__input"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            placeHolder="Password replay"
            nameInput="repeatPassword"
            Icon1={Hide}
            Icon2={View}
            type1="password"
            type2="text"
            error={formik.errors.repeatPassword}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
      <img className="styled-singup__img" src={man} alt="man" />
    </StyledSingUpPage>

  );
};

export default SingUpPage;
