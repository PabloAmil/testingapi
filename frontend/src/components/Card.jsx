import './card.css'

function Card ({ movie }) {
  return (
    <div className="card">
      <img src={movie.img} alt="" />
      <div className='data'>
        <div>
          {movie.name}
        </div>
        <div>
          <h5>
            Genre: {movie.genre}
          </h5>
        </div>
      </div>
    </div>
  )
}

export default Card;