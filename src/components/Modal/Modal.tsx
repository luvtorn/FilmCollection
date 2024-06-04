import { useEffect } from 'react'
import './Modal.css'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Spin } from 'antd'
import modalStore from '../../stores/ModalStore.tsx'
import { StarFilled } from '@ant-design/icons'

import { filmsService } from '../../services/film.service.ts'
import Trailer from '../Trailer/Trailer.jsx'
import React from 'react'

const Modal = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filmId = searchParams.get('film')
  const { isOpen, openModal, closeModal, getFilm, setFilm } = modalStore

  const data = getFilm()

  const handleModalClose = () => {
    closeModal()
    if (searchParams.has('film')) {
      searchParams.delete('film')
      setSearchParams(searchParams)
    }
  }

  // Как сделать, что при загрузке страницы открывается нужный фильм?

  // useEffect(() => {
  //   if (searchParams.has('film')) {
  //     const { isLoading, data } = useQuery({
  //       queryKey: ['film', filmId],
  //       queryFn: () => filmsService.getFilmById(Number(filmId)),
  //       select: (data) => data,
  //     })

  //     if (!isLoading && data) {
  //       setFilm(data)
  //       openModal()
  //     }
  //   }
  // }, [])

  const stars: JSX.Element[] = []
  if (data) {
    for (let i = 0; i < Math.ceil(data?.vote_average / 2); i++) {
      stars.push(<StarFilled key={i} />)
    }
  }

  return (
    <div
      className={`modal ${isOpen ? 'active' : ''}`}
      onClick={() => handleModalClose()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="filmInfo">
          <Trailer id={data?.id} />
          <div className="details">
            <p className="title">{data?.title}</p>
            <p className="description">{data?.overview}</p>
            <p className="release-date">Release date: {data?.release_date}</p>
            <p className="raiting">
              Raiting: {data?.vote_average?.toFixed(2)} {stars}
            </p>
            <p className="raiting">Quantity: {data?.vote_count}</p>
          </div>
        </div>
      </div>
      )
    </div>
  )
}

export default Modal
