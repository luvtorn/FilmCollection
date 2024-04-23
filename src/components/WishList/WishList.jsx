import { getFilmService } from '../../services/film.service'
import { memo, useEffect, useState } from 'react'
import '../../index.css'
import './WishList.css'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { CSSTransition } from 'react-transition-group'
import { observer } from 'mobx-react-lite'
import wishListStore from '../../stores/WishListStore'
import modalStore from '../../stores/ModalStore'
import { useSearchParams } from 'react-router-dom'

const WishList = observer(() => {
  const [wishFilms, setWishFilms] = useState([])
  const [openWishList, setOpenWishList] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const { id, setFilms, getFilms, deleteFilm } = wishListStore
  const { openModal } = modalStore

  useEffect(() => {
    const fetchNewFilms = async () => {
      try {
        const { data } = await getFilmService.getData(id)
        if (!wishFilms.find((film) => film.id === data.id)) {
          setWishFilms((prev) => [...prev, data])
          const saveFilms = getFilms()
          saveFilms.push(data)
          setFilms(saveFilms)
          if (localFilms.find((film) => film.id === data.id)) {
            setWishFilms((prev) => [...prev])
            setFilms(getFilms())
          }
        } else {
          setWishFilms((prev) => [...prev])
        }
      } catch (error) {
        console.error('Error: ', error)
      }
    }

    fetchNewFilms()

    const localFilms = getFilms()

    setWishFilms(localFilms)
  }, [id])

  const deleteFilmState = (idToDelete) => {
    deleteFilm(idToDelete)
    setWishFilms(getFilms())
  }

  const handleOpenModal = (id) => {
    openModal()
    setSearchParams({ film: id })
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="wish" onClick={() => setOpenWishList(!openWishList)}>
      <div className="start">
        <p>WishList</p>
        {openWishList ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </div>
      <CSSTransition
        in={openWishList}
        timeout={200}
        classNames="wish-list"
        unmountOnExit
      >
        <ul className="wish-list">
          {wishFilms.length > 0 ? (
            wishFilms?.map((elem) => (
              <li
                key={elem.id}
                onClick={(e) => e.stopPropagation()}
                className="wish-item"
              >
                <div
                  className="wish-content"
                  onClick={() => handleOpenModal(elem.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${elem.poster_path}`}
                    style={
                      windowWidth < 776
                        ? { display: 'none' }
                        : { display: 'block' }
                    }
                    alt={elem.title}
                  />
                  <p>{elem.title}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteFilmState(elem.id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <h2 style={{ color: 'black' }}>WishList is empty</h2>
          )}
        </ul>
      </CSSTransition>
    </div>
  )
})

export default memo(WishList)
