import { useState } from "react";
import Genres from "../Genres/Genres";
import FilmsOnGenres from "../FilmsOnGenres/FilmsOnGenres";

function Films({ setId }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleExit = () => {
    setSelectedGenre(null);
  };

  return (
    <>
      {selectedGenre ? (
        <>
          <button className="exit-button" onClick={handleExit}>
            Exit
          </button>
          <FilmsOnGenres genre={selectedGenre} setId={setId} />
        </>
      ) : (
        <Genres setGenre={setSelectedGenre} />
      )}
    </>
  );
}

export default Films;
