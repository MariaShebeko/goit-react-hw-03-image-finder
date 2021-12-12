export default function ImageErrorView({ message }) {
  return (
    <div role="alert">
      {/* <img src="" width="" alt=""/> */}
      <p>{message}</p>
    </div>
  );
}
