import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { filmsService } from '../../services/film.service'

import './Tabs.css'

function Tabs() {
  const { data } = useQuery({
    queryKey: ['Genres'],
    queryFn: () => filmsService.getData('Genres'),
    select: (data) => data.data.genres,
  })

  return (
    <aside>
      <ul className="nav">
        <Link to={'/'}>
          <li>Main</li>
        </Link>
        <Link to={'/top20'}>
          <li>Top 20 films</li>
        </Link>
        {data?.map((genre) => (
          <Link key={genre.id} to={`genres/${genre.id}`}>
            <li>{genre.name}</li>
          </Link>
        ))}
      </ul>
    </aside>
  )
}

export default Tabs
