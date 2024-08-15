function NumResultLengthMovie({ query }: { query: any[] }) {
  let total: Number = 0;
  if (!query) total = 0;
  total = query?.length || 0;

  return (
    <p className="num-results">
      Found <strong>{+total}</strong> results
    </p>
  );
}
export default NumResultLengthMovie;
