import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout.tsx'
import MainPage from '../components/MainPage/MainPage.tsx'
import TopFilms from '../components/TopFilms/TopFilms.tsx'
import Modal from '../components/Modal/Modal.tsx'
import FilmsOnGenres from '../components/FilmsOnGenres/FilmsOnGenres.tsx'
import ErrorPage from '../components/ErrorPage/ErrorPage.tsx'
import WishList from '../components/WishList/WishList.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Modal />
        <Layout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'top20/',
        element: <TopFilms />,
      },
      {
        path: 'wishlist',
        element: <WishList />,
      },
      {
        path: 'genres/:id',
        element: <FilmsOnGenres />,
      },
    ],
  },
])
