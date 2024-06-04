import './FilmCard.css'

import { message } from 'antd'
import { useSearchParams } from 'react-router-dom'
import modalStore from '../../stores/ModalStore.tsx'
import { observer } from 'mobx-react'
import wishListStore from '../../stores/WishListStore.tsx'
import { FC } from 'react'
import { IResult } from '../../types'
import React from 'react'

interface ICardProps {
  filmData: IResult
  page?: string
}

const FilmCard: FC<ICardProps> = observer(({ filmData, page }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const { setFilm, openModal } = modalStore

  const { addFilm, isFilmInWish } = wishListStore

  const [searchParams, setSearchParams] = useSearchParams()

  const handleAddFilm = (film: IResult) => {
    if (isFilmInWish(film)) {
      addFilm(film)
      messageApi.open({
        type: 'success',
        content: 'Successfully added',
      })
    } else {
      messageApi.open({
        type: 'error',
        content: 'Already in wishlist',
      })
    }
  }

  const handleModalOpen = (film: IResult) => {
    setFilm(film)
    openModal()
    setSearchParams({ page: page ? page : '1', film: film.id.toString() })
  }

  return (
    <>
      {contextHolder}
      <div className="film" onClick={() => handleModalOpen(filmData)}>
        <img
          src={`https://image.tmdb.org/t/p/original${filmData.backdrop_path}`}
          alt={filmData.title}
        />
        <p>{filmData.title}</p>
      </div>
      <button
        className="add-to-wish-btn"
        onClick={() => handleAddFilm(filmData)}
      >
        Add to Wish List
      </button>
    </>
  )
})

export default FilmCard
