export default function Home() {
  return (
    <>
      <img
        id="landingImage"
        src={process.env.URL_SITE + '/img/landing.jpg'}
        alt="landing"
        className="w-full h-full object-cover p-0 m-0"
      />
    </>
  );
}
