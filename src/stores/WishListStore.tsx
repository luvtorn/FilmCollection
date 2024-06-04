import { makeAutoObservable, toJS } from 'mobx'
import { IResult } from '../types'

class WishListStore {
  wishFilms: IResult[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addFilm = (film: IResult) => {
    if (!this.wishFilms.find((elem) => elem.id === film.id)) {
      this.wishFilms.push(film)
    }
  }

  getFilms = () => {
    return toJS(this.wishFilms)
  }

  deleteFilm = (filmId: number) => {
    this.wishFilms = this.wishFilms.filter((elem) => elem.id !== filmId)
  }

  isFilmInWish = (film: IResult) => {
    if (this.wishFilms.find((elem) => elem.id === film.id)) {
      return false
    } else {
      return true
    }
  }
}

const wishListStore = new WishListStore()
export default wishListStore
