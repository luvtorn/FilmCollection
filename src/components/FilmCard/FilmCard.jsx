import './FilmCard.css'

import { message } from 'antd'
import { useSearchParams } from 'react-router-dom'
import modalStore from '../../stores/ModalStore'
import { observer } from 'mobx-react'
import wishListStore from '../../stores/WishListStore'

const FilmCard = observer(({ filmData, page }) => {
  const [messageApi, contextHolder] = message.useMessage()

  const openModal = modalStore.openModal
  const { setId } = wishListStore

  const [searchParams, setSearchParams] = useSearchParams()

  const handleIdClick = (id) => {
    setId(id)
    messageApi.open({
      type: 'success',
      content: 'Successfully added',
    })
  }

  const handleModalOpen = (id) => {
    openModal()
    setSearchParams({ page: page ? page : 1, film: id })
  }

  return (
    <>
      {contextHolder}
      <div className="film" onClick={() => handleModalOpen(filmData.id)}>
        <img
          src={`https://image.tmdb.org/t/p/original${filmData.backdrop_path}`}
          alt={filmData.title}
        />
        <p>{filmData.title}</p>
      </div>
      <button
        className="add-to-wish-btn"
        onClick={() => handleIdClick(filmData.id)}
      >
        Add to Wish List
      </button>
    </>
  )
})

export default FilmCard
