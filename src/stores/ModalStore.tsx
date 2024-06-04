import { makeAutoObservable } from 'mobx'
import { IResult } from '../types'

class ModalStore {
  isOpen = false
  _film: IResult = {
    id: 0,
    backdrop_path: '',
    title: '',
    overview: '',
    release_date: '',
    vote_average: 0,
    vote_count: 0,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setFilm = (film: IResult) => {
    this._film = film
  }

  getFilm = () => {
    return this._film
  }

  openModal = () => {
    this.isOpen = true
  }

  closeModal = () => {
    this.isOpen = false
  }
}

const modalStore = new ModalStore()
export default modalStore
