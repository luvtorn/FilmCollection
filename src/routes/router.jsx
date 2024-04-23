import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import MainPage from '../components/MainPage/MainPage'
import TopFilms from '../components/TopFilms/TopFilms'
import Modal from '../components/Modal/Modal'
import FilmsOnGenres from '../components/FilmsOnGenres/FilmsOnGenres'
import ErrorPage from '../components/ErrorPage/ErrorPage'

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
        path: 'genres/:id',
        element: <FilmsOnGenres />,
      },
    ],
  },
])
