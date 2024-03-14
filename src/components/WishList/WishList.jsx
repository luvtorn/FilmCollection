import { wishListService } from "../../services/film.service";
import { useEffect, useState } from "react";
import FilmCard from "../FilmCard/FilmCard";

function WishList(id) {
  const [wishFilms, setWishFilms] = useState([]);

  useEffect(() => {
    console.log(id);
    const fetchNewFilms = async () => {
      try {
        const { data } = await wishListService.getData(id);
        setWishFilms(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error);
      }
    };

    fetchNewFilms();
  }, [id]);

  const filmData = {
    title: wishFilms.original_title,
    backdrop_path: wishFilms.backdrop_path,
    id: wishFilms.id,
    vote_average: wishFilms.vote_average,
    overview: wishFilms.overview,
    release_date: wishFilms.release_date,
    vote_count: wishFilms.vote_count,
  };

  return (
    <div>
      {wishFilms.original_title ? <FilmCard filmData={filmData}/> : <h2>Films are empty</h2>}
    </div>
  );
}

export default WishList;
