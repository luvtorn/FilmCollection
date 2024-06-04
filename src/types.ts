export interface IFilm {
  results: IResult[]
  total_pages: number
}

export interface IResult {
  id: number
  backdrop_path: string
  title: string
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
}

export interface IGenres {
  genres: Genres[]
}

interface Genres {
  id: number
  name: string
}
