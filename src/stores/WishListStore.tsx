import { makeAutoObservable, toJS } from 'mobx'
import { IResult } from '../types'

interface FilmStore<T> {
  addFilm: (id: number) => void
  getFilms: () => T[]
}

class WishListStore implements FilmStore<IResult>{
  private wishFilms: IResult[] = []

  constructor() {
    makeAutoObservable(this)
  }

  //проверка через айдишку isFilmInWIsh

  addFilm = (film) => {
    if (!this.isFilmInWish(film)) {
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
    return this.wishFilms.find((elem) => elem.id === film.id)
  }
}

const wishListStore = new WishListStore<IFilm>()
export default wishListStore
