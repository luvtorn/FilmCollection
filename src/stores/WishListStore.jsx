import { makeAutoObservable } from 'mobx'

class WishListStore {
  wishedFilms = []
  id = 0
  filteredFilmList = []

  constructor() {
    makeAutoObservable(this)

    
    this.init()
  }

  _getFilms = () => {
    return JSON.parse(localStorage.getItem('wishFilms')) || []
  }

  _setFilms = (films) => {
    localStorage.setItem('wishFilms', JSON.stringify(films))
  }

  init = () => {
    this.wishedFilms = this.getFilms()
  }

  deleteFilm = (idToDelete) => {
    this.data = this.getFilms()
    this.filteredFilmList = this.data.filter((film) => film.id !== idToDelete)
    this.setFilms(this.filteredFilmList)
  }
}

const wishListStore = new WishListStore()
export default wishListStore
