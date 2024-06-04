import { memo } from 'react'
import '../../index.css'
import './WishList.css'
import { observer } from 'mobx-react-lite'
import wishListStore from '../../stores/WishListStore.tsx'
import modalStore from '../../stores/ModalStore.tsx'
import { useSearchParams } from 'react-router-dom'
import React from 'react'
import { IResult } from '../../types.ts'

const WishList = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { openModal, setFilm } = modalStore
  const { getFilms, deleteFilm } = wishListStore

  const handleOpenModal = (film: IResult) => {
    setFilm(film)
    openModal()
    setSearchParams({ film: film.id.toString() })
  }

  return (
    <div className="wish-list">
      {getFilms().map((film) => (
        <li key={film.id} className="wish-item">
          <div className="film" onClick={() => handleOpenModal(film)}>
            <img
              src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
              alt={film.title}
            />
            <p>{film.title}</p>
          </div>
          <button className="delete-btn" onClick={() => deleteFilm(film.id)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  )
})

export default memo(WishList)
