import { makeAutoObservable } from 'mobx'

class WishListStore {
  data = []
  id
  filteredFilmList = []
  constructor() {
    makeAutoObservable(this)
  }

  getFilms = () => {
    return JSON.parse(localStorage.getItem('wishFilms')) || []
  }

  setId = (id) => {
    this.id = id
  }

  setFilms = (film) => {
    localStorage.setItem('wishFilms', JSON.stringify(film))
  }

  deleteFilm = (idToDelete) => {
    this.data = this.getFilms()
    this.filteredFilmList = this.data.filter((film) => film.id !== idToDelete)
    this.setFilms(this.filteredFilmList)
  }
}

const wishListStore = new WishListStore()
export default wishListStore
