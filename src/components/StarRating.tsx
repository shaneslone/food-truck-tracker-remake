interface Iprops {
  overallRating: number;
  currentRating: number;
}

const StarRating: React.FC<Iprops> = ({ overallRating, currentRating }) => {
  if (overallRating >= currentRating)
    return (
      <span className="text-primary mx-1 h3">
        <i className="bi bi-star-fill"></i>
      </span>
    );

  if (overallRating >= currentRating - 0.5)
    return (
      <span className="text-primary mx-1 h3">
        <i className="bi bi-star-half"></i>
      </span>
    );

  return (
    <span className="text-primary mx-1 h3">
      <i className="bi bi-star"></i>
    </span>
  );
};

export default StarRating;
