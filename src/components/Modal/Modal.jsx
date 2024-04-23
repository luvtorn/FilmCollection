import { useEffect } from 'react'
import './Modal.css'
import { useSearchParams } from 'react-router-dom'
import { getFilmService } from '../../services/film.service'
import { useQuery } from '@tanstack/react-query'
import { Spin } from 'antd'
import modalStore from '../../stores/ModalStore'
import useWindowResize from '../../hooks/useWindowResize'
import { StarFilled } from '@ant-design/icons'

const Modal = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filmId = searchParams.get('film')
  const { isOpen, openModal, closeModal } = modalStore
  const windowWidth = useWindowResize()

  const { isLoading, data } = useQuery({
    queryKey: ['film', filmId],
    queryFn: () => getFilmService.getData(filmId),
    select: (data) => data || [],
  })

  const {
    poster_path,
    title,
    overview,
    release_date,
    vote_average,
    vote_count,
    backdrop_path,
  } = data?.data || []

  const handleModalClose = () => {
    closeModal()
    if (searchParams.has('film')) {
      searchParams.delete('film')
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    if (searchParams.has('film')) {
      openModal()
    }
  }, [])

  const stars = []
  for (let i = 0; i < Math.ceil(vote_average / 2); i++) {
    stars.push(<StarFilled key={i} />)
  }

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={() => handleModalClose()}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="filmInfo">
            <img
              style={
                windowWidth < 580
                  ? { width: '150px' }
                  : { width: '350px', padding: '15px' }
              }
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
            />
            <div className="details">
              <p className="title">{title}</p>
              <p className="description">{overview}</p>
              <p className="release-date">Release date: {release_date}</p>
              <p className="raiting">
                Raiting: {vote_average?.toFixed(2)} {stars}
              </p>
              <p className="raiting">Quantity: {vote_count}</p>
              <img
                className={windowWidth < 928 ? 'modal-img none' : 'modal-img'}
                style={{ width: '80%' }}
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
